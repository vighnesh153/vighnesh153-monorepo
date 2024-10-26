import { ReactElement } from "react";
import { Typography } from "@mui/material";

export interface FileNameProps {
  fileName: string;
}

export function FileName({ fileName }: FileNameProps): ReactElement {
  return (
    <Typography
      component="span"
      sx={{
        display: "block",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {fileName}
    </Typography>
  );
}
