/**
 * API link: https://rapidapi.com/HealThruWords/api/universal-inspirational-quotes/
 */

import axios from 'axios';

const HOST = 'healthruwords.p.rapidapi.com';
const buildUrl = (version = 'v1') => `https://${HOST}/${version}`;
const URL_V1 = `${buildUrl('v1')}`;

export interface HealThroughWordsTopic {
  topic: string;
}

export interface HealThroughWordsTopics {
  /**
   * RapidAPI key
   */
  RAPID_API_KEY: string;
}

export interface HealThroughWordsQuote {
  id: string;
  title: string;
  author: string;
  url: string;
  media: string;
  cat: string;
}

export interface HealThroughWordsQuotes {
  /**
   * RapidAPI key
   */
  RAPID_API_KEY: string;

  /**
   * Comma separated topics
   */
  topics?: string;

  /**
   * How many quotes?
   *
   * @default 1
   */
  count?: number;

  /**
   * Size of the quote
   *
   * @default thumbnail
   */
  size?: 'medium' | 'thumbnail';

  /**
   * If not provided, a random quote will be returned
   */
  id?: number;
}

/**
 * Fetch topics from RapidAPI HealThroughWords host
 * @param props
 */
export async function healThroughWordsTopics(props: HealThroughWordsTopics): Promise<Array<HealThroughWordsTopic>> {
  const { RAPID_API_KEY } = props;

  const response = await axios.get<Array<HealThroughWordsTopic>>(`${URL_V1}/topics/`, {
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': HOST,
    },
  });

  return response.data;
}

/**
 * Fetch quotes from RapidAPI HealThroughWords host
 * @param props
 */
export async function healThroughWordsQuotes(props: HealThroughWordsQuotes): Promise<Array<HealThroughWordsQuote>> {
  const { RAPID_API_KEY, topics, id, size = 'thumbnail', count = 1 } = props;

  const response = await axios.get<Array<HealThroughWordsQuote>>(`${URL_V1}/quotes/`, {
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': HOST,
    },
    params: {
      t: topics,
      maxR: `${count}`,
      size,
      id,
    },
  });

  return response.data;
}
