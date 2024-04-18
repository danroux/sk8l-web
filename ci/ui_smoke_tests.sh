#!/bin/bash

set -e

kubectl apply -f https://raw.githubusercontent.com/danroux/sk8l-api/main/testdata/sk8l-cronjobs.yml -n sk8l > /dev/null
kubectl wait -n sk8l --for=condition=ready pod -l app.kubernetes.io/pod=sk8l-ui --timeout=300s
sleep 10
kubectl apply -f testdata/cypress-job.yml -n sk8l
kubectl wait --for=condition=complete job.batch/cypress-job -n sk8l --timeout=600s

failed=$(kubectl get jobs cypress-job -n sk8l -o jsonpath='{.status.failed}')
kubectl logs job.batch/cypress-job -n sk8l
if [[ "$failed" -gt 0 ]]; then
    echo "Failed jobs found. Failing the step."
    find cypress/ -type f
    exit 1
fi
