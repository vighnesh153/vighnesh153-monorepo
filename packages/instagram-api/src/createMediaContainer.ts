import { axiosInstance } from './axiosInstance';

interface ResponseType {
  id: string;
}

export interface CreateMediaContainerProps {
  userId: string;
  params: Record<string, string>;
}

export async function createMediaContainer(props: CreateMediaContainerProps): Promise<{ containerId: string }> {
  const { userId, params } = props;
  const url = `/${userId}/media`;
  const {
    data: { id: containerId },
  } = await axiosInstance.post<ResponseType>(url, null, {
    params,
  });
  return { containerId };
}
