# AWS LAMBDA HTTP API

## Using this template
```shell
cd aws-serverless-tools
npx serverless create --template-path=../templates/aws-lambda-http-api --name delete-me
cd ..
npm i
```

## Updates
* Update following props in package.json
  * name
  * description
* Update the following in serverless.yml
  * `service-name`
  * custom domains
  * layers.NodeModules.name
  * functions.api.name

## Running locally
```shell
npm run local
```
