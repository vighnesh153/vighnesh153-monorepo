import { StaticSite, type StackContext } from 'sst/constructs';

export function WebsiteStack({ stack }: StackContext) {
  const { stage } = stack;

  const site = new StaticSite(stack, 'vighnesh153.com_astro', {
    path: '.',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    errorPage: '404.html',
    customDomain: {
      domainName: `${stage}-ui.aws.vighnesh153.com`,
      hostedZone: 'aws.vighnesh153.com',
    },
    dev: {
      url: 'http://localhost:1305',
    },
    cdk: {
      bucket: {
        bucketName: `${stage}.vighnesh153.com_astro`,
      },
      distribution: {
        comment: `${stage} vighnesh153.com_astro`,
      },
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
