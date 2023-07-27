import { type SSTConfig } from 'sst';
import { WebsiteStack } from './sst/WebsiteStack';

const sstConfig: SSTConfig = {
  config(input) {
    const { stage } = input;
    if (!stage) {
      throw new Error('Stage is not defined in sstConfig.config() func');
    }
    return {
      name: `${stage}-DrawVighnesh153DotCom`,
      region: 'ap-south-2', // hyderabad
    };
  },
  stacks(app) {
    const { stage } = app;
    if (!stage) {
      throw new Error('Stage is not defined in sstConfig.stacks() func');
    }
    app.stack(WebsiteStack, {
      stackName: `${stage}-DrawVighnesh153DotComStack`,
    });
  },
};

export default sstConfig;
