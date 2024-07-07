import { type Handler } from 'aws-lambda';
import { constructAuthRedirectUrl } from './constructAuthRedirectUrl';
import { controller } from './controller';

export const handler: Handler = () => Promise.resolve(controller(constructAuthRedirectUrl));
