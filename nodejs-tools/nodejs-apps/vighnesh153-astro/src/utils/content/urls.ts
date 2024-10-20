import { constructRoutesForDev, constructRoutesForProd } from '@vighnesh153/tools/vighnesh153';
import { stage } from '../stage.ts';

export const routes = stage === 'prod' ? constructRoutesForProd() : constructRoutesForDev();
