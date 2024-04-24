# https://gist.github.com/mpneuried/0594963ad38e68917ef189b4e6a269db

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Bump these on release
VERSION_MAJOR ?= 0
VERSION_MINOR ?= 10
VERSION_PATCH ?= 0

WITHOUT ?= $(VERSION_MAJOR).$(VERSION_MINOR).$(VERSION_PATCH)
VERSION ?= v$(WITHOUT)

version:
	@echo $(VERSION)

# For changelog generation, default the last release to the last tag on
# any branch, and this release to just be the current branch we're on.
LAST_RELEASE?=$$(git describe --tags $$(git rev-list --tags --max-count=1))
THIS_RELEASE?=$$(git rev-parse --abbrev-ref HEAD)

# expected to be invoked by make changelog LAST_RELEASE=gitref THIS_RELEASE=gitref
changelog: ## generate changelog
	@echo "Generating changelog for $(THIS_RELEASE) from $(LAST_RELEASE)..."
	@echo
	@changelog-build -last-release $(LAST_RELEASE) \
		-entries-dir .changelog/ \
		-changelog-template .changelog/changelog.tmpl \
		-note-template .changelog/note.tmpl \
		-this-release $(THIS_RELEASE)

changelog-entry: ## changelog-entry
	@changelog-entry -dir .changelog/

.PHONY: version changelog changelog-entry
setup-certs: # setup-certs
	helm repo add jetstack https://charts.jetstack.io --force-update
	kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.crds.yaml
	helm upgrade --install \
	  cert-manager jetstack/cert-manager \
	  --namespace cert-manager \
	  --create-namespace=true \
	  --version v1.14.4 \
	  --set prometheus.enabled=false \
	  --set extraArgs={--feature-gates=AdditionalCertificateOutputFormats=true} \
	  --set webhook.extraArgs={--feature-gates=AdditionalCertificateOutputFormats=true} \
	  --set webhook.timeoutSeconds=4
	kubectl apply -f https://raw.githubusercontent.com/danroux/sk8l-api/main/testdata/sk8l-cert-manager.yml
	helm upgrade --install trust-manager jetstack/trust-manager \
	  --install \
	  --namespace cert-manager \
	  --set app.trust.namespace=sk8l \
	  --wait
	kubectl apply -f https://raw.githubusercontent.com/danroux/sk8l-api/main/testdata/sk8l-trust.yml

install-chart-ci: # install-chart-ci
	helm repo add sk8l https://sk8l.io/charts
	set +e; \
	helm uninstall sk8l -n sk8l; \
	kubectl get ns sk8l --ignore-not-found -o name | xargs -r kubectl wait --for=delete namespace/sk8l  --timeout=120s; \
	set -e
	helm upgrade --install sk8l sk8l/sk8l \
	  -f testdata/sk8l-values.yml \
	  --namespace sk8l \
	  --create-namespace=false \
	  --set namespace.create=false \
	  --set namespace.name=sk8l
