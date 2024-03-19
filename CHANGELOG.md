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
