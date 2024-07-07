import { constructRoutesForDev, constructRoutesForProd } from '@vighnesh153/tools-platform-independent';
import { stage } from '../stage';

export const routes = stage === 'prod' ? constructRoutesForProd() : constructRoutesForDev();
