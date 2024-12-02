export function getClientStage(): "local" | "prod" {
  return location.host === "localhost:4321" ? "local" : "prod";
}
