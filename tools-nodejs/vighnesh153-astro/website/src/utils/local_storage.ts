import ls from "localstorage-slim";
import { milliseconds } from "@vighnesh153/tools";

// flushes expired items from local storage
export function setupLocalStorageCleaner() {
  ls.flush();
  setInterval(() => {
    ls.flush();
  }, milliseconds({ hours: 6 }));
}
