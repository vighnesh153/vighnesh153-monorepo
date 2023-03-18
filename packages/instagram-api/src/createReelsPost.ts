import { waitForContainerToBeReady } from './waitForContainerToBeReady';
import { publishContainer } from './publishContainer';
import { createMediaContainer } from './createMediaContainer';

export interface CreateReelsPostProps {
  accessToken: string;
  userId: string;
  sourceVideoUrl: string;
  caption: string;
}

export async function createReelsPost(props: CreateReelsPostProps): Promise<{ mediaId: string }> {
  const { accessToken, userId, sourceVideoUrl, caption } = props;

  // create container
  const { containerId } = await createMediaContainer({
    userId,
    params: {
      media_type: 'REELS',
      video_url: sourceVideoUrl,
      caption,
      access_token: accessToken,
    },
  });

  // wait for the container to be ready to be published
  await waitForContainerToBeReady({ containerId, accessToken });

  // publish container
  return publishContainer({ userId, containerId, accessToken });
}
