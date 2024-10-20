import { useGlobalState } from "@vighnesh153/react-hooks";

export function useDevices() {
  const [selectedDevice, setSelectedDevice] = useGlobalState<string | null>(
    "selectedDevice",
    null,
  );
  const [devices, setDevices] = useGlobalState("devices", <string[]> []);

  const fetchDevices = () => {
    fetch("/api/devices")
      .then((res) => res.json())
      .then((res) => {
        setDevices(res.devices);
        if (selectedDevice === null && res.devices.length > 0) {
          setSelectedDevice(res.devices[0]);
        }
      });
  };

  return {
    devices: devices ?? [],
    selectedDevice,
    setSelectedDevice,
    fetchDevices,
  };
}
