import { useKeyPress, UseKeyPressKey } from "@vighnesh153/react-hooks";
import { webKeyToAndroidKey } from "./webKeyToAndroidKey";
import { useDevices } from "./useDevices";
import { useHistory } from "./useHistory";

export function useActionOnKeyPress() {
  const { selectedDevice } = useDevices();
  const { fetchHistory } = useHistory();

  const executeInputKeyEvent = async (key: string) => {
    if (!selectedDevice) return;

    const url = `/api/execute?device=${
      encodeURIComponent(selectedDevice)
    }&command=${
      encodeURIComponent(
        `shell input keyevent ${key}`,
      )
    }`;
    await fetch(url, { method: "POST" });
    fetchHistory();
  };

  useKeyPress({
    keys: Object.keys(webKeyToAndroidKey) as UseKeyPressKey[],
    onEvent: (_, key) => {
      const inputKey = webKeyToAndroidKey[key] ?? null;
      if (inputKey === null) return;
      executeInputKeyEvent(inputKey);
    },
  });
  const onUpClick = () => {
    executeInputKeyEvent("DPAD_UP");
  };
  const onDownClick = () => {
    executeInputKeyEvent("DPAD_DOWN");
  };
  const onLeftClick = () => {
    executeInputKeyEvent("DPAD_LEFT");
  };
  const onRightClick = () => {
    executeInputKeyEvent("DPAD_RIGHT");
  };
  const onCenterClick = () => {
    executeInputKeyEvent("DPAD_CENTER");
  };
  const onBackClick = () => {
    executeInputKeyEvent("BACK");
  };
  const onHomeClick = () => {
    executeInputKeyEvent("HOME");
  };

  return {
    onUpClick,
    onDownClick,
    onLeftClick,
    onRightClick,
    onCenterClick,
    onBackClick,
    onHomeClick,
  };
}
