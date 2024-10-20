import { Link, Tooltip } from "@mui/material";
import { Folder as FolderIcon } from "@mui/icons-material";
import { Vighnesh153File } from "../../../types";
import { FileName } from "./FileName";
import { DownloadItem } from "./DownloadItem";
import { ListItemWrapper } from "./ListItemWrapper";
import { windowPathname } from "../utils";

export interface DirectoryListItemProps {
  file: Vighnesh153File;
}

export function DirectoryListItem({ file }: DirectoryListItemProps) {
  return (
    <ListItemWrapper
      leading={<FolderIcon />}
      middle={
        <Tooltip title="Open this folder">
          <Link
            href={`${windowPathname}/${file.name}`}
            sx={{ display: "flex" }}
          >
            <FileName fileName={file.name} />
          </Link>
        </Tooltip>
      }
      trailing={
        <DownloadItem
          type="by-name"
          fileType="directory"
          fileName={file.name}
        />
      }
    />
  );
}
