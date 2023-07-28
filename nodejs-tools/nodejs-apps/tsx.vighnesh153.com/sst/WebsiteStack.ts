import { StaticSite, type StackContext } from 'sst/constructs';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';

const oneYear = '31536000';
const oneDay = '86400';
const fiveMinutes = '300';

const hostedZoneDomainName = 'vighnesh153.com';
const domainName = 'tsx.vighnesh153.com';

export function WebsiteStack({ stack }: StackContext) {
  const { stage } = stack;

  if (!stage) {
    throw new Error('Stage is not defined in Website stack');
  }

  const hostedZone = HostedZone.fromLookup(stack, 'TsxVighnesh153DotCom_HostedZone', {
    domainName: hostedZoneDomainName,
  });

  const certificate = new Certificate(stack, 'TsxVighnesh153DotCom_ACM_Cert', {
    domainName,
    validation: CertificateValidation.fromDns(hostedZone),
  });

  const site = new StaticSite(stack, 'TsxVighnesh153DotCom', {
    path: '.',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    errorPage: 'index.html',
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
    cdk: {
      bucket: {
        bucketName: `tsx-vighnesh153-com-${stage}`,
      },
      distribution: {
        comment: `tsx.vighnesh153.com`,
      },
    },
  });

  stack.addOutputs({
    CloudfrontUrl: site.url,
    CustomDomainUrl: site.customDomainUrl,
  });
}
