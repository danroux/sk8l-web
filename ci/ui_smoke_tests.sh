#!/bin/bash

set -e

pr_image_tag="$1"

kubectl apply -f https://raw.githubusercontent.com/danroux/sk8l-api/main/testdata/sk8l-cronjobs.yml -n sk8l > /dev/null
kubectl wait -n sk8l --for=condition=ready pod -l app.kubernetes.io/pod=sk8l-ui --timeout=300s

cp testdata/cypress-job.yml testdata/cypress-job.yml.bak
yq e -i ".spec.template.spec.containers[0].image = \"$pr_image_tag\"" testdata/cypress-job.yml

set +e
echo "after"
diff -C2 testdata/cypress-job.yml.bak testdata/cypress-job.yml
diff_status=$?
set -e
if [ $diff_status -eq 0 ]; then
  echo "No differences found between the files."
  exit 1
fi

kubectl apply -f testdata/sk8l-demo-job.yml -n sk8l
kubectl wait --for=condition=complete job.batch/sk8l-demo-job -n sk8l --timeout=300s
kubectl apply -f testdata/cypress-job.yml -n sk8l
set +e
kubectl wait --for=condition=complete job.batch/cypress-job -n sk8l --timeout=300s
set -e

failed=$(kubectl get jobs cypress-job -n sk8l -o jsonpath='{.status.failed}')
kubectl logs job.batch/cypress-job -n sk8l
if [[ "$failed" -gt 0 ]]; then
    echo "Failed jobs found. Failing the step."
    find cypress/ -type f
    exit 1
fi
