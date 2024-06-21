## v0.14.0 (June 21, 2024)

ENHANCEMENTS:

* Docker: Build Docker images for multi-platforms: linux/amd64,linux/arm{64,v8} [[GH-93](https://github.com/danroux/sk8l-ui/issues/93)]
* ci/dependabot: docker:(deps): bump alpine from 3.19 to 3.20 [[GH-80](https://github.com/danroux/sk8l-ui/issues/80)]
* ci/dependabot: docker:(deps): bump cypress/included from 13.11.0 to 13.12.0 [[GH-106](https://github.com/danroux/sk8l-ui/issues/106)]
* ci/dependabot: docker:(deps): bump cypress/included from 13.9.0 to 13.11.0 [[GH-91](https://github.com/danroux/sk8l-ui/issues/91)]
* ci/dependabot: docker:(deps): bump node from 22.1.0-bookworm-slim to 22.2.0-bookworm-slim [[GH-74](https://github.com/danroux/sk8l-ui/issues/74)]
* ci/dependabot: docker:(deps): bump node from 22.2.0-bookworm-slim to 22.3.0-bookworm-slim [[GH-98](https://github.com/danroux/sk8l-ui/issues/98)]
* ci/dependabot: gha:(deps): bump actions/checkout from 4.1.4 to 4.1.7 [[GH-99](https://github.com/danroux/sk8l-ui/issues/99)]
* ci/dependabot: gha:(deps): bump docker/build-push-action from 5.3.0 to 6.0.2 [[GH-109](https://github.com/danroux/sk8l-ui/issues/109)]
* ci/dependabot: gha:(deps): bump docker/login-action from 3.1.0 to 3.2.0 [[GH-82](https://github.com/danroux/sk8l-ui/issues/82)]
* ci/dependabot: npm:(deps): bump @achrinza/node-ipc from 10.1.10 to 10.1.11 [[GH-83](https://github.com/danroux/sk8l-ui/issues/83)]
* ci/dependabot: npm:(deps): bump @grpc/grpc-js from 1.10.7 to 1.10.8 [[GH-75](https://github.com/danroux/sk8l-ui/issues/75)]
* ci/dependabot: npm:(deps): bump @grpc/grpc-js from 1.10.8 to 1.10.9 [[GH-96](https://github.com/danroux/sk8l-ui/issues/96)]
* ci/dependabot: npm:(deps): bump @primer/octicons from 19.8.0 to 19.10.0 [[GH-108](https://github.com/danroux/sk8l-ui/issues/108)]
* ci/dependabot: npm:(deps): bump vue from 3.4.27 to 3.4.29 [[GH-103](https://github.com/danroux/sk8l-ui/issues/103)]
* ci/dependabot: npm:(deps): bump vue-router from 4.3.2 to 4.3.3 [[GH-95](https://github.com/danroux/sk8l-ui/issues/95)]
* ci/dependabot: npm:(deps-dev): bump @babel/core from 7.23.9 to 7.24.7 [[GH-90](https://github.com/danroux/sk8l-ui/issues/90)]
* ci/dependabot: npm:(deps-dev): bump @bufbuild/protobuf from 1.9.0 to 1.10.0 [[GH-86](https://github.com/danroux/sk8l-ui/issues/86)]
* ci/dependabot: npm:(deps-dev): bump @vitejs/plugin-vue from 5.0.4 to 5.0.5 [[GH-88](https://github.com/danroux/sk8l-ui/issues/88)]
* ci/dependabot: npm:(deps-dev): bump eslint from 9.2.0 to 9.5.0 [[GH-102](https://github.com/danroux/sk8l-ui/issues/102)]
* ci/dependabot: npm:(deps-dev): bump sass from 1.70.0 to 1.77.6 [[GH-105](https://github.com/danroux/sk8l-ui/issues/105)]
* ci/dependabot: npm:(deps-dev): bump vite from 5.2.11 to 5.3.1 [[GH-101](https://github.com/danroux/sk8l-ui/issues/101)]

DEPENDENCIES:

* yarn: Update to version 4.2.2 on package.json#packageManager [[GH-93](https://github.com/danroux/sk8l-ui/issues/93)]

NOTES:

* yarn: Set specific resolutions on package.json for rollup/wasm-node && typescript@4.9.5

- https://github.com/rollup/rollup/issues/5194 Failed to run on arm platforms #5194 [[GH-93](https://github.com/danroux/sk8l-ui/issues/93)]
* yarn: Set supportedArchitectures to `arm64`, `x64` and os to linux on .yarnrc.yml

- https://nodejs.org/docs/latest-v20.x/api/process.html#processarch [[GH-93](https://github.com/danroux/sk8l-ui/issues/93)]

## v0.13.0 (May 16, 2024)

ENHANCEMENTS:

* ci/dependabot: docker:(deps): bump cypress/included from 13.8.1 to 13.9.0[[GH-67](https://github.com/danroux/sk8l-ui/issues/67)]
* ci/dependabot: npm deps:(deps-dev): bump @vue/vue3-jest from 27.0.0 to 29.2.6 [[GH-21](https://github.com/danroux/sk8l-ui/issues/21)]
* ci/dependabot: npm deps:(deps-dev): bump eslint-plugin-vuejs-accessibility from 1.2.0 to 2.3.0 [[GH-39](https://github.com/danroux/sk8l-ui/issues/39)]
* ci/dependabot: npm:(deps): bump @grpc/grpc-js from 1.10.6 to 1.10.7[[GH-68](https://github.com/danroux/sk8l-ui/issues/68)]
* ci/dependabot: npm:(deps): bump cronstrue from 2.49.0 to 2.50.0 [[GH-71](https://github.com/danroux/sk8l-ui/issues/71)]
* ci/dependabot: npm:(deps): bump vue from 3.4.18 to 3.4.27 [[GH-60](https://github.com/danroux/sk8l-ui/issues/60)]
* ci/dependabot: npm:(deps): bump vue-router from 4.3.1 to 4.3.2 [[GH-70](https://github.com/danroux/sk8l-ui/issues/70)]
* ci/dependabot: npm:(deps-dev): bump @bufbuild/protobuf from 1.7.2 to 1.9.0 [[GH-64](https://github.com/danroux/sk8l-ui/issues/64)]
* ci/dependabot: npm:(deps-dev): bump @connectrpc/connect-web from 1.3.0 to 1.4.0 [[GH-69](https://github.com/danroux/sk8l-ui/issues/69)]
* ci/dependabot: npm:(deps-dev): bump @vue/test-utils from 2.4.4 to 2.4.6 [[GH-55](https://github.com/danroux/sk8l-ui/issues/55)]
* ci/dependabot: npm:(deps-dev): bump eslint from 8.56.0 to 9.2.0 [[GH-63](https://github.com/danroux/sk8l-ui/issues/63)]
* ci/dependabot: npm:(deps-dev): bump eslint-plugin-vue from 8.7.1 to 9.26.0 [[GH-65](https://github.com/danroux/sk8l-ui/issues/65)]
* ci/dependabot: npm:(deps-dev): bump jest from 27.5.1 to 29.7.0 [[GH-62](https://github.com/danroux/sk8l-ui/issues/62)]
* ci/dependabot: npm:(deps-dev): bump vite from 5.2.9 to 5.2.11 [[GH-61](https://github.com/danroux/sk8l-ui/issues/61)]

## v0.12.0 (May 07, 2024)

ENHANCEMENTS:

* Add logo, fix jobRow.finishedAt and test CronJobRow/JobRow elements [[GH-54](https://github.com/danroux/sk8l-ui/issues/54)]
* ci/dependabot: docker:(deps): bump node from 22.0.0-bookworm-slim to 22.1.0-bookworm-slim

docker:(deps): bump node

Bumps node from 22.0.0-bookworm-slim to 22.1.0-bookworm-slim.

---
updated-dependencies:
- dependency-name: node
  dependency-type: direct:production
  update-type: version-update:semver-minor
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-53](https://github.com/danroux/sk8l-ui/issues/53)]
* ci/dependabot: gha:(deps): bump actions/checkout from 4.1.2 to 4.1.4

gha:(deps): bump actions/checkout from 4.1.2 to 4.1.4

Bumps [actions/checkout](https://github.com/actions/checkout) from 4.1.2 to 4.1.4.
- [Release notes](https://github.com/actions/checkout/releases)
- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)
- [Commits](https://github.com/actions/checkout/compare/v4.1.2...0ad4b8fadaa221de15dcec353f45205ec38ea70b)

---
updated-dependencies:
- dependency-name: actions/checkout
  dependency-type: direct:production
  update-type: version-update:semver-patch
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-52](https://github.com/danroux/sk8l-ui/issues/52)]
* ci/dependabot: npm:(deps): bump cronstrue from 2.48.0 to 2.49.0

npm:(deps): bump cronstrue from 2.48.0 to 2.49.0

Bumps [cronstrue](https://github.com/bradymholt/cronstrue) from 2.48.0 to 2.49.0.
- [Release notes](https://github.com/bradymholt/cronstrue/releases)
- [Changelog](https://github.com/bradymholt/cRonstrue/blob/main/CHANGELOG.md)
- [Commits](https://github.com/bradymholt/cronstrue/compare/v2.48.0...v2.49.0)

---
updated-dependencies:
- dependency-name: cronstrue
  dependency-type: direct:production
  update-type: version-update:semver-minor
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-34](https://github.com/danroux/sk8l-ui/issues/34)]
* ci/dependabot: npm:(deps-dev): bump @connectrpc/connect from 1.3.0 to 1.4.0

npm:(deps-dev): bump @connectrpc/connect from 1.3.0 to 1.4.0

Dependabot couldn't find the original pull request head commit, ecdbd1ba458ef99aca6175c00e1d697b9951ee71. [[GH-41](https://github.com/danroux/sk8l-ui/issues/41)]

## v0.11.0 (May 02, 2024)

ENHANCEMENTS:

* Add /jobs/:namespace to list jobs in the namespace [[GH-47](https://github.com/danroux/sk8l-ui/issues/47)]
* ci/dependabot: docker deps:(deps): bump cypress/included from 13.7.3 to 13.8.1

docker deps:(deps): bump cypress/included from 13.7.3 to 13.8.1

Bumps cypress/included from 13.7.3 to 13.8.1.

---
updated-dependencies:
- dependency-name: cypress/included
  dependency-type: direct:production
  update-type: version-update:semver-minor
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-46](https://github.com/danroux/sk8l-ui/issues/46)]
* ci/dependabot: docker deps:(deps): bump node from 21.7.3-bookworm-slim to 22.0.0-bookworm-slim

docker deps:(deps): bump node

Bumps node from 21.7.3-bookworm-slim to 22.0.0-bookworm-slim.

---
updated-dependencies:
- dependency-name: node
  dependency-type: direct:production
  update-type: version-update:semver-major
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-49](https://github.com/danroux/sk8l-ui/issues/49)]
* ci/dependabot: gha deps:(deps): bump actions/checkout from 4.1.2 to 4.1.4

gha deps:(deps): bump actions/checkout from 4.1.2 to 4.1.4

Bumps [actions/checkout](https://github.com/actions/checkout) from 4.1.2 to 4.1.4.
- [Release notes](https://github.com/actions/checkout/releases)
- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)
- [Commits](https://github.com/actions/checkout/compare/9bb56186c3b09b4f86b1c65136769dd318469633...0ad4b8fadaa221de15dcec353f45205ec38ea70b)

---
updated-dependencies:
- dependency-name: actions/checkout
  dependency-type: direct:production
  update-type: version-update:semver-patch
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-45](https://github.com/danroux/sk8l-ui/issues/45)]

## v0.10.0 (April 24, 2024)

ENHANCEMENTS:

* ci/dependabot: Configure dependabot version updates [[GH-15](https://github.com/danroux/sk8l-ui/issues/15)]
* ci/dependabot: docker deps:(deps): bump nginx from 1.25.3-alpine3.18-slim to 1.25.4-alpine3.18-slim

docker deps:(deps): bump nginx

Bumps nginx from 1.25.3-alpine3.18-slim to 1.25.4-alpine3.18-slim.

---
updated-dependencies:
- dependency-name: nginx
  dependency-type: direct:production
  update-type: version-update:semver-patch
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-16](https://github.com/danroux/sk8l-ui/issues/16)]
* ci/dependabot: docker deps:(deps): bump node from 20.5.1-bookworm-slim to 21.7.3-bookworm-slim

docker deps:(deps): bump node

Bumps node from 20.5.1-bookworm-slim to 21.7.3-bookworm-slim.

---
updated-dependencies:
- dependency-name: node
  dependency-type: direct:production
  update-type: version-update:semver-major
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-18](https://github.com/danroux/sk8l-ui/issues/18)]
* ci/dependabot: gha deps:(deps): bump actions/checkout from 4.1.1 to 4.1.2

gha deps:(deps): bump actions/checkout from 4.1.1 to 4.1.2

Bumps [actions/checkout](https://github.com/actions/checkout) from 4.1.1 to 4.1.2.
- [Release notes](https://github.com/actions/checkout/releases)
- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)
- [Commits](https://github.com/actions/checkout/compare/v4.1.1...9bb56186c3b09b4f86b1c65136769dd318469633)

---
updated-dependencies:
- dependency-name: actions/checkout
  dependency-type: direct:production
  update-type: version-update:semver-patch
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-32](https://github.com/danroux/sk8l-ui/issues/32)]
* ci/dependabot: gha deps:(deps): bump azure/setup-helm from 4.1.0 to 4.2.0

gha deps:(deps): bump azure/setup-helm from 4.1.0 to 4.2.0

Bumps [azure/setup-helm](https://github.com/azure/setup-helm) from 4.1.0 to 4.2.0.
- [Release notes](https://github.com/azure/setup-helm/releases)
- [Changelog](https://github.com/Azure/setup-helm/blob/main/CHANGELOG.md)
- [Commits](https://github.com/azure/setup-helm/compare/v4.1.0...v4.2.0)

---
updated-dependencies:
- dependency-name: azure/setup-helm
  dependency-type: direct:production
  update-type: version-update:semver-minor
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-31](https://github.com/danroux/sk8l-ui/issues/31)]
* ci/dependabot: npm deps:(deps): bump @grpc/grpc-js from 1.10.0 to 1.10.6

npm deps:(deps): bump @grpc/grpc-js from 1.10.0 to 1.10.6

Bumps [@grpc/grpc-js](https://github.com/grpc/grpc-node) from 1.10.0 to 1.10.6.
- [Release notes](https://github.com/grpc/grpc-node/releases)
- [Commits](https://github.com/grpc/grpc-node/compare/@grpc/grpc-js@1.10.0...@grpc/grpc-js@1.10.6)

---
updated-dependencies:
- dependency-name: "@grpc/grpc-js"
  dependency-type: direct:production
  update-type: version-update:semver-patch
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-19](https://github.com/danroux/sk8l-ui/issues/19)]
* ci/dependabot: npm deps:(deps): bump ip from 2.0.0 to 2.0.1

npm deps:(deps): bump ip from 2.0.0 to 2.0.1

Bumps [ip](https://github.com/indutny/node-ip) from 2.0.0 to 2.0.1.
- [Commits](https://github.com/indutny/node-ip/compare/v2.0.0...v2.0.1)

---
updated-dependencies:
- dependency-name: ip
  dependency-type: indirect
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-37](https://github.com/danroux/sk8l-ui/issues/37)]
* ci/dependabot: npm deps:(deps): bump vue-router from 4.2.5 to 4.3.0

npm deps:(deps): bump vue-router from 4.2.5 to 4.3.0

Bumps [vue-router](https://github.com/vuejs/router) from 4.2.5 to 4.3.0.
- [Release notes](https://github.com/vuejs/router/releases)
- [Commits](https://github.com/vuejs/router/compare/v4.2.5...v4.3.0)

---
updated-dependencies:
- dependency-name: vue-router
  dependency-type: direct:production
  update-type: version-update:semver-minor
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-26](https://github.com/danroux/sk8l-ui/issues/26)]
* ci/dependabot: npm deps:(deps): bump vue-router from 4.3.0 to 4.3.1

npm deps:(deps): bump vue-router from 4.3.0 to 4.3.1

Bumps [vue-router](https://github.com/vuejs/router) from 4.3.0 to 4.3.1.
- [Release notes](https://github.com/vuejs/router/releases)
- [Commits](https://github.com/vuejs/router/compare/v4.3.0...v4.3.1)

---
updated-dependencies:
- dependency-name: vue-router
  dependency-type: direct:production
  update-type: version-update:semver-patch
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-33](https://github.com/danroux/sk8l-ui/issues/33)]
* ci/dependabot: npm deps:(deps-dev): bump vite from 5.1.1 to 5.2.9

npm deps:(deps-dev): bump vite from 5.1.1 to 5.2.9

Bumps [vite](https://github.com/vitejs/vite/tree/HEAD/packages/vite) from 5.1.1 to 5.2.9.
- [Release notes](https://github.com/vitejs/vite/releases)
- [Changelog](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md)
- [Commits](https://github.com/vitejs/vite/commits/v5.2.9/packages/vite)

---
updated-dependencies:
- dependency-name: vite
  dependency-type: direct:development
  update-type: version-update:semver-minor
...

Signed-off-by: dependabot[bot] <support@github.com> [[GH-29](https://github.com/danroux/sk8l-ui/issues/29)]
* gha/ci: Execute smoke tests on GHA/CI [[GH-28](https://github.com/danroux/sk8l-ui/issues/28)]
* tests: Smoke tests: Test cronjob and pods pages [[GH-38](https://github.com/danroux/sk8l-ui/issues/38)]

IMPROVEMENTS:

* k8s: Update protobuf files for k8s v1.29.2 [[GH-36](https://github.com/danroux/sk8l-ui/issues/36)]

BUG FIXES:

* gha/docker: Remove branch name from .docker workflow for now [[GH-30](https://github.com/danroux/sk8l-ui/issues/30)]

## v0.9.0 (March 19, 2024)

BUG FIXES:

* Fix CronjobRow component that broke when `terminationDetails` needed to be displayed but it wasn't cast to Number. [[GH-13](https://github.com/danroux/sk8l-ui/issues/13)]
* Fix PolyLine component that broke because `#totals()` collected fields with outdated names. [[GH-13](https://github.com/danroux/sk8l-ui/issues/13)]
* Fix diverse capitalization issues in CronJob component [[GH-13](https://github.com/danroux/sk8l-ui/issues/13)]

DEPENDENCIES:

* Remove `axios` [[GH-13](https://github.com/danroux/sk8l-ui/issues/13)]

## v0.8.0 (February 29, 2024)

ENHANCEMENTS:

* grafana: Display json file that can be imported into Grafana to create a base Dashboard. [[GH-11](https://github.com/danroux/sk8l-ui/issues/11)]

## v0.7.0 (February 17, 2024)

NOTES:

* dependencies: Remove vue/cli related dependencies && use different octicons [[GH-9](https://github.com/danroux/sk8l-ui/issues/9)]

## v0.6.0 (February 16, 2024)

IMPROVEMENTS:

* Display pods with containers waiting when errored. Use cronjob/job.failed && update labels, counters, status components [[GH-6](https://github.com/danroux/sk8l-ui/issues/6)]
* security: Upgrade vulnerable dependencies, migrate to vite, connectrpc [[GH-7](https://github.com/danroux/sk8l-ui/issues/7)]

## v0.5.0 (February 01, 2024)

IMPROVEMENTS:

* Set USER on Dockerfiles to make it possible to run the container as non root(securityContext). [[GH-4](https://github.com/danroux/sk8l-ui/issues/4)]
* Split the process of replacing env vars to another step: Take it out of 'run_app.sh' and move it to '
replace-env-vars.sh'. [[GH-4](https://github.com/danroux/sk8l-ui/issues/4)]
* Update Docker base image. [[GH-4](https://github.com/danroux/sk8l-ui/issues/4)]

## 0.4.0 (Dec 6, 2023)

ENHANCEMENT:

* Add Makefile [[GH-2](https://github.com/danroux/sk8l-ui/issues/2)]
* Set up CHANGELOG && .changelog [[GH-2](https://github.com/danroux/sk8l-ui/issues/2)]
* Set up release-notes generation on CI [[GH-2](https://github.com/danroux/sk8l-ui/issues/2)]
* Tag docker image on docker GHA [[GH-2](https://github.com/danroux/sk8l-ui/issues/2)]
