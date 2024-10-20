import { ReactElement } from "react";
import { Box, ListItem } from "@mui/material";

export interface ListItemWrapperProps {
  leading: ReactElement;
  middle: ReactElement;
  trailing: ReactElement;
}

export function ListItemWrapper(
  { leading, middle, trailing }: ListItemWrapperProps,
): ReactElement {
  return (
    <ListItem divider>
      {leading}
      <Box
        sx={{
          ml: 2,
          flexGrow: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          pr: 10,
        }}
      >
        {middle}
      </Box>
      {trailing}
    </ListItem>
  );
}
