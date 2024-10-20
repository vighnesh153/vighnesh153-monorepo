import { ReactElement } from "react";
import { InsertDriveFileOutlined as InsertDriveFileOutlinedIcon } from "@mui/icons-material";
import { Vighnesh153File } from "../../../types";
import { FileName } from "./FileName";
import { DownloadItem } from "./DownloadItem";
import { ListItemWrapper } from "./ListItemWrapper";

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
