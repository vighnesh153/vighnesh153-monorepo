export async function getRandomWord(): Promise<string> {
  const randomWords = (await import("./random_words.json")).default;

  const randomIndex = Math.floor(Math.random() * randomWords.length);
  return randomWords[randomIndex];
}
