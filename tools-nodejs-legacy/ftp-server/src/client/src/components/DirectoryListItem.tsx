import { Link, Tooltip } from "@mui/material";
import { Folder as FolderIcon } from "@mui/icons-material";
import { Vighnesh153File } from "../../../types.ts";
import { FileName } from "./FileName.tsx";
import { DownloadItem } from "./DownloadItem.tsx";
import { ListItemWrapper } from "./ListItemWrapper.tsx";
import { windowPathname } from "../utils/index.ts";

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
