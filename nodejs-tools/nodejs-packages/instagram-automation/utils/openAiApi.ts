import { Configuration, OpenAIApi } from 'openai';

const apiKey = process.env.OPEN_AI_API_KEY;

const configuration = new Configuration({
  apiKey,
});

export const openaiApi = new OpenAIApi(configuration);
