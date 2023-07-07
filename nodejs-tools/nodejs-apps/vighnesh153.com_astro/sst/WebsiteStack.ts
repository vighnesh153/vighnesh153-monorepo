import { StaticSite, type StackContext } from 'sst/constructs';

const oneYear = '31536000';
const oneDay = '86400';
const fiveMinutes = '300';

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
