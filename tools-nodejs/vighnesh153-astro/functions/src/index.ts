/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";

import { functionsRegion } from "../../constants";

setGlobalOptions({ maxInstances: 1, region: functionsRegion });
initializeApp();

export * from "./before_user_sign_up";
export * from "./before_user_sign_in";
export * from "./get_private_content";
