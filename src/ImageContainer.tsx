import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { ImagesResponseDataInner } from "openai";
import React from "react";

interface props {
  data: ImagesResponseDataInner[];
  searchValue: string;
}

const ImageContainer: React.FC<props> = ({ data, searchValue }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "650px",
        overflowY: "scroll",
        backgroundColor: "#151515",
      }}
      mt={4}
    >
      <ImageList cols={2} gap={16}>
        {data.map((item) => (
          <ImageListItem key={item.url}>
            <img src={item.url} alt={searchValue} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ImageContainer;
