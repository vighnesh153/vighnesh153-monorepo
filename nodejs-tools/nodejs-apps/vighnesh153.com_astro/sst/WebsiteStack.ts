import { StaticSite, type StackContext } from 'sst/constructs';

export function WebsiteStack({ stack }: StackContext) {
  const { stage } = stack;

  const site = new StaticSite(stack, 'Vighnesh153Astro', {
    path: '.',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    errorPage: '404.html',
    customDomain: {
      domainName: `${stage}.ui.aws.vighnesh153.com`,
      hostedZone: 'aws.vighnesh153.com',
    },
    environment: {
      PUBLIC_VIGHNESH153_STAGE: stage,
    },
    cdk: {
      bucket: {
        bucketName: `vighnesh153.com-astro-${stage}`,
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
