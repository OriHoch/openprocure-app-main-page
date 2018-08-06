## Open Procurement (AKA GovBuy) main page app

To setup the continuous deployment via travis you should set some travis env variables, verify you have the required vars:

```
$ travis env list
# environment variables for OriHoch/socialmap-app-main-page
DOCKER_USERNAME=[secure]
DOCKER_PASSWORD=[secure]
GITHUB_TOKEN=[secure]
```
```
npm install
```

If you get errors, try to run `npm install` again

Run the dev server

```
npm run dist-serve
```

### deployment

To setup the continuous deployment via travis you should set some travis env variables, verify you have the required vars:

```
$ travis env list
# environment variables for OriHoch/socialmap-app-main-page
DOCKER_USERNAME=[secure]
DOCKER_PASSWORD=[secure]
GITHUB_TOKEN=[secure]
```

* Docker username / password - used to push to docker hub which is where the container orchestrator gets the images from.
* GitHub token - used to push the new docker image tag to the ops repository configuration values.
  * Make sure the token has write permissions to the relevant ops repo

further configuration of the continuous deployment process can be done in .travis.yml:

* `env.matrix` - configures the target deployment environment for each branch.
* `env.global` - 
  * `K8S_OPS_REPO_BRANCH` / `K8S_OPS_REPO_SLUG` - the ops repo configuration changes are pushed to
  * `DEPLOY_VALUES_CHART_NAME` / `DEPLOY_VALUES_IMAGE_PROP` - the chart name and image property to update for this deployment
  * `DEPLOY_COMMIT_MESSAGE` - the commit message which will be logged to ops repo
