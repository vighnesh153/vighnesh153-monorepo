import { axiosInstance } from './axiosInstance';

interface ResponseType {
  id: string;
}

export interface PublishContainerProps {
  accessToken: string;
  containerId: string;
  userId: string;
}

/**
 * Publish the container that contains the image or video
 * @param props
 */
export async function publishContainer(props: PublishContainerProps): Promise<{ mediaId: string }> {
  const { accessToken, containerId, userId } = props;
  const url = `/${userId}/media_publish`;
  const response = await axiosInstance.post<ResponseType>(url, null, {
    params: {
      creation_id: containerId,
      access_token: accessToken,
    },
  });

  return { mediaId: response.data.id };
}
