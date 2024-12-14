export function getClientStage(): "local" | "prod" {
  return location.host.startsWith("localhost:") ? "local" : "prod";
}
