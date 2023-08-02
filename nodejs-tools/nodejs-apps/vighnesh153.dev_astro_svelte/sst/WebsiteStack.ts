import { StaticSite, type StackContext } from 'sst/constructs';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';

const oneYear = '31536000';
const oneDay = '86400';
const fiveMinutes = '300';

const hostedZoneDomainName = 'vighnesh153.dev';
const domainNames = {
  staging: 'staging.vighnesh153.dev',
  production: 'vighnesh153.dev',
};

export function WebsiteStack({ stack }: StackContext) {
  const { stage } = stack;

  if (!stage) {
    throw new Error('Stage is not defined in Website stack');
  }

  const domainName = stage === 'prod' ? domainNames.production : domainNames.staging;

  const hostedZone = HostedZone.fromLookup(stack, 'Vighnesh153Astro_HostedZone', {
    domainName: hostedZoneDomainName,
  });

  const certificate = new Certificate(stack, 'Vighnesh153Astro_ACM_Cert', {
    domainName,
    validation: CertificateValidation.fromDns(hostedZone),
  });

  const site = new StaticSite(stack, 'Vighnesh153Astro', {
    path: '.',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    errorPage: '404.html',
    customDomain: {
      domainName,
      hostedZone: hostedZone.zoneName,
      certificate,
    },
    fileOptions: [
      // HTML files
      {
        exclude: '*',
        include: '*.html',
        // cacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
        cacheControl: [`max-age=${fiveMinutes}`, `s-max-age=${fiveMinutes}`, 'public', 'must-revalidate'].join(','),
      },
      // images
      {
        exclude: '*',
        include: ['*.webp', '*.png', '*.jpeg', '*.jpg', '*.ico'],
        cacheControl: [`max-age=${oneDay}`, `s-max-age=${oneDay}`, 'public', 'must-revalidate'].join(','),
      },
      // CSS and JS files
      {
        exclude: '*',
        include: ['*.js', '*.css'],
        cacheControl: [`max-age=${oneYear}`, 'public', 'immutable'].join(','),
      },
    ],
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