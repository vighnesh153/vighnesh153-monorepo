import { waitForContainerToBeReady } from './waitForContainerToBeReady';
import { publishContainer } from './publishContainer';
import { createMediaContainer } from './createMediaContainer';

export interface CreateSingleMediaPostProps {
  accessToken: string;
  userId: string;
  sourceUrl: string;
  mediaType: 'video' | 'image';
  caption: string;
}

/**
 * Creates a single media post with a single image or a single video
 * @param props
 */
export async function createSingleMediaPost(props: CreateSingleMediaPostProps): Promise<{ mediaId: string }> {
  const { accessToken, userId, sourceUrl, mediaType, caption } = props;

  // create container
  const { containerId } = await createMediaContainer({
    userId,
    params: {
      [`${mediaType}_url`]: sourceUrl,
      caption,
      access_token: accessToken,
    },
  });

  // wait for the container to be ready to be published
  await waitForContainerToBeReady({ containerId, accessToken });

  // publish container
  return publishContainer({ userId, containerId, accessToken });
}
