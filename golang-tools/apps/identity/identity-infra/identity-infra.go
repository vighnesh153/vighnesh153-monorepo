package main

import (
	"os"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdklambdagoalpha/v2"
	"github.com/aws/jsii-runtime-go"

	"github.com/vighnesh153/utils"
)

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)

	awscdk.NewStack(app, utils.StringPointer("IdentityAppStack"), &awscdk.StackProps{
		Env: &awscdk.Environment{
			// Region:  jsii.String(os.Getenv("CDK_DEFAULT_REGION")),
			Region:  jsii.String("ap-south-2"), // Hyderabad
			Account: jsii.String(os.Getenv("CDK_DEFAULT_ACCOUNT")),
		},
	})

	awscdklambdagoalpha.NewGoFunction(app, jsii.String("IdentityAppHandler"), &awscdklambdagoalpha.GoFunctionProps{
		Entry: jsii.String("../identity-app"),
		Bundling: &awscdklambdagoalpha.BundlingOptions{
			Entrypoint: &[]*string{},
		},
	})

	app.Synth(nil)
}
