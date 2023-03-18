/* eslint-disable @typescript-eslint/naming-convention, no-await-in-loop */
import { milliseconds, sleep } from '@vighnesh153/utils';
import { axiosInstance } from './axiosInstance';

const alwaysTrue = Math.random() < 2;
const errorCodesLink = 'https://developers.facebook.com/docs/instagram-api/reference/error-codes';

interface ResponseType {
  status: string;
  status_code: string;
}

export interface WaitForContainerToBeReadyProps {
  containerId: string;
  accessToken: string;
  pollingDuration?: number;
}

/**
 * Wait for the container to be ready for publish
 * @param props
 */
export async function waitForContainerToBeReady(props: WaitForContainerToBeReadyProps): Promise<void> {
  const { containerId, accessToken, pollingDuration = milliseconds(5000) } = props;
  const url = `/${containerId}`;
  while (alwaysTrue) {
    const {
      data: { status_code, status },
    } = await axiosInstance.get<ResponseType>(url, {
      params: {
        fields: 'status,status_code',
        access_token: accessToken,
      },
    });
    if (status_code === 'FINISHED') {
      return;
    }
    if (status_code === 'ERROR') {
      throw new Error(`Error subcode: ${status}. Checkout what different error codes mean here: ${errorCodesLink}`);
    }
    await sleep(pollingDuration);
  }
}
