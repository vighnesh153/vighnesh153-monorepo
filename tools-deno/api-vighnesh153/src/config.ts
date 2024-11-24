function getEnvVar(key: string): string {
  const variable = Deno.env.get(key);
  if (!variable) {
    throw new Error(`Environment variable: "${key}" is not defined`);
  }
  return variable;
}

export const config = {
  googleClientId: getEnvVar("GOOGLE_CLIENT_ID"),
  googleClientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
  cookieSecret: getEnvVar("COOKIE_SECRET"),
  firebaseConfig: JSON.parse(
    atob(getEnvVar("FIREBASE_SERVICE_ACCOUNT_CONFIG_B64")),
  ),
};
