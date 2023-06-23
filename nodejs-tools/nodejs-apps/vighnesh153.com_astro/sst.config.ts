import { type SSTConfig } from 'sst';
import { WebsiteStack } from './sst/WebsiteStack';

const sstConfig: SSTConfig = {
  config(input) {
    const { stage } = input;
    return {
      name: `${stage}-vighnesh153.com_astro`,
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(WebsiteStack);
  },
};

export default sstConfig;
