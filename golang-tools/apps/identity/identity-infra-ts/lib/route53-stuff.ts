import { Construct } from "constructs";

import * as apiGatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";

export function route53Configuration(
  scope: Construct,
  stage: string,
  domainName: string
) {
  // lookup hosted zone
  const myHostedZone = route53.HostedZone.fromLookup(
    scope,
    "HostedZoneLookup",
    {
      domainName: "vighnesh153.dev",
    }
  );

  // create a ACM certificate
  const myCertificate = new acm.Certificate(scope, "ACMCertificate", {
    domainName,
    validation: acm.CertificateValidation.fromDns(myHostedZone),
  });

  const myDomain = new apiGatewayv2.DomainName(scope, "ApiGatewayDomainName", {
    domainName,
    certificate: myCertificate,
  });

  const recordTarget = route53.RecordTarget.fromAlias(
    new route53Targets.ApiGatewayv2DomainProperties(
      myDomain.regionalDomainName,
      myDomain.regionalHostedZoneId
    )
  );

  const aRecord = new route53.ARecord(scope, "ARecord", {
    zone: myHostedZone,
    target: recordTarget,
    recordName: `${stage}.identity`,
  });

  const aaaaRecord = new route53.AaaaRecord(scope, "ARecord", {
    zone: myHostedZone,
    target: recordTarget,
    recordName: `${stage}.identity`,
  });

  return {
    hostedZone: myHostedZone,
    certificate: myCertificate,
    domain: myDomain,
    aRecord,
    aaaaRecord,
  };
}
