// @ts-nocheck
import { useGlobalState as useGlobalStateImport } from "@vighnesh153/react-hooks";

type UseGlobalStateType = <T>(key: string, value: T) => [T, (arg: T) => void];

export const useGlobalState: UseGlobalStateType = useGlobalStateImport;
