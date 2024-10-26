import { ReactElement } from "react";
import { InsertDriveFileOutlined as InsertDriveFileOutlinedIcon } from "@mui/icons-material";
import { Vighnesh153File } from "../../../types.ts";
import { FileName } from "./FileName.tsx";
import { DownloadItem } from "./DownloadItem.tsx";
import { ListItemWrapper } from "./ListItemWrapper.tsx";

export interface RegularFileListItemProps {
  file: Vighnesh153File;
}

export function RegularFileListItem(
  { file }: RegularFileListItemProps,
): ReactElement {
  return (
    <ListItemWrapper
      leading={<InsertDriveFileOutlinedIcon />}
      middle={<FileName fileName={file.name} />}
      trailing={
        <DownloadItem type="by-name" fileType="file" fileName={file.name} />
      }
    />
  );
}
