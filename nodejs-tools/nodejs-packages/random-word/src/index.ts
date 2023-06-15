import randomWords from '../data.json';

/**
 * Returns a random word
 */
export function generateRandomWord() {
  const randomIndex = Math.floor(Math.random() * randomWords.length);
  return randomWords[randomIndex];
}
