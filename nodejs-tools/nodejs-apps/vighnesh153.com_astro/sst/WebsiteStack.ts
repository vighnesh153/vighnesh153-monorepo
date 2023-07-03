import { StaticSite, type StackContext } from 'sst/constructs';

export function WebsiteStack({ stack }: StackContext) {
  const { stage } = stack;

  if (!stage) {
    throw new Error('Stage is not defined in Website stack');
  }

  const site = new StaticSite(stack, 'Vighnesh153Astro', {
    path: '.',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    errorPage: '404.html',
    customDomain: {
      domainName: `${stage}.ui.aws.vighnesh153.com`,
      hostedZone: 'aws.vighnesh153.com',
    },
    fileOptions: [
      {
        exclude: '*',
        include: '*.html',
        // cacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
        cacheControl: ['max-age=300', 's-max-age=300', 'public', 'must-revalidate'].join(','),
      },
      {
        exclude: '*',
        include: ['*.js', '*.css'],
        cacheControl: ['max-age=31536000', 'public', 'immutable'].join(','),
      },
    ],
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
