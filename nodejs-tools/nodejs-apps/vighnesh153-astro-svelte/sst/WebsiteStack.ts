import { StaticSite, type StackContext } from 'sst/constructs';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

const oneYear = '31536000';
const oneDay = '86400';
const fiveMinutes = '300';

const hostedZoneDomainName = 'vighnesh153.dev';
const domainNames = {
  staging: 'staging.vighnesh153.dev',
  production: 'vighnesh153.dev',
};
const createCertificateArn = (accountNumber: string) => ({
  staging: `arn:aws:acm:us-east-1:${accountNumber}:certificate/a57e0ab8-c09c-4571-9731-56c18d7358d5`,
  production: `arn:aws:acm:us-east-1:${accountNumber}:certificate/4d626d87-33e4-4c01-9dc0-a3e81ac7c4c9`,
});

export function WebsiteStack({ stack }: StackContext) {
  const { stage } = stack;

  if (!stage) {
    throw new Error('Stage is not defined in Website stack');
  }

  const domainName = stage === 'prod' ? domainNames.production : domainNames.staging;
  const certificateArn =
    stage === 'prod' ? createCertificateArn(stack.account).production : createCertificateArn(stack.account).staging;

  const hostedZone = HostedZone.fromLookup(stack, 'Vighnesh153Astro_HostedZone', {
    domainName: hostedZoneDomainName,
  });

  const certificate = Certificate.fromCertificateArn(stack, 'Vighnesh153Astro_ACM_Cert', certificateArn);

  const site = new StaticSite(stack, 'Vighnesh153Astro', {
    path: '.',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    errorPage: '404.html',
    customDomain: {
      domainName,
      hostedZone: hostedZone.zoneName,
      cdk: {
        certificate,
      },
    },
    assets: {
      fileOptions: [
        // HTML files
        {
          files: '**/*.html',
          // cacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
          cacheControl: [`max-age=${fiveMinutes}`, `s-max-age=${fiveMinutes}`, 'public', 'must-revalidate'].join(','),
        },
        // images
        ...['**/*.webp', '**/*.png', '**/*.jpeg', '**/*.jpg', '**/*.ico'].map((imageRegex) => ({
          files: imageRegex,
          cacheControl: [`max-age=${oneDay}`, `s-max-age=${oneDay}`, 'public', 'must-revalidate'].join(','),
        })),
        // CSS and JS files
        ...['*.js', '*.css'].map((jsCssFilesRegex) => ({
          files: jsCssFilesRegex,
          cacheControl: [`max-age=${oneYear}`, 'public', 'immutable'].join(','),
        })),
      ],
    },
    environment: {
      PUBLIC_VIGHNESH153_STAGE: stage,
    },
    cdk: {
      bucket: {
        bucketName: `vighnesh153-astro-${stage}`,
      },
      distribution: {
        comment: `${stage} Vighnesh153 Astro`,
      },
    },
  });

  stack.addOutputs({
    CloudfrontUrl: site.url,
    CustomDomainUrl: site.customDomainUrl,
  });
}
