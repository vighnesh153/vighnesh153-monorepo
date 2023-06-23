import { type SSTConfig } from 'sst';
import { WebsiteStack } from './sst/WebsiteStack';

const sstConfig: SSTConfig = {
  config(input) {
    const { stage = 'dev' } = input;
    return {
      name: `${stage}-Vighnesh153Astro`,
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(WebsiteStack, {
      stackName: `${app.stageName || 'dev'}-Vighnesh153AstroStack`,
    });
  },
};

export default sstConfig;
