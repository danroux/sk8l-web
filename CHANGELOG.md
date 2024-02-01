## v0.5.0 (February 01, 2024)
Generating changelog for release-v0.5.0 from v0.4.0...


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
