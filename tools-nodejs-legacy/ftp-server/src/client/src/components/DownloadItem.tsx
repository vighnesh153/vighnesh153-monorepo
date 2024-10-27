import { ReactElement, useMemo } from "react";
import { Link, Tooltip } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { Vighnesh153File } from "../../../types.ts";
import {
  directoryZipAndDownloadPath,
  isDirectory,
  windowPathname,
} from "../utils/index.ts";

export interface DownloadItemByNameProps {
  type: "by-name";
  fileName: string;
  fileType: Vighnesh153File["type"];
}

export interface DownloadItemByHrefProps {
  type: "by-href";
  href: string;
}

export function DownloadItem(
  props: DownloadItemByNameProps | DownloadItemByHrefProps,
): ReactElement {
  const linkHref = useMemo(() => {
    if (props.type === "by-href") {
      return props.href;
    }
    const { fileName, fileType } = props;
    const directoryDownloadPath = directoryZipAndDownloadPath(
      `${windowPathname}/${fileName}`,
    );
    const fileDownloadPath = `${windowPathname}/${fileName}`;
    return isDirectory(fileType) ? directoryDownloadPath : fileDownloadPath;
  }, Object.values(props));

  return (
    <Tooltip title="Download">
      <Link href={linkHref} sx={{ display: "inline-flex" }}>
        <DownloadIcon />
      </Link>
    </Tooltip>
  );
}
