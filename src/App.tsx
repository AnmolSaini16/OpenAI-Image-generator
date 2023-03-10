import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import "./index.css";
import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ImageContainer from "./ImageContainer";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoding] = useState<boolean>(false);
  const [images, setImages] = useState<ImagesResponseDataInner[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async () => {
    setLoding(true);
    const response = await openai.createImage({
      prompt: searchTerm,
      n: 10,
      size: "512x512",
    });
    const images_url = response.data.data;
    setImages(images_url);
    setLoding(false);
  };
  return (
    <>
      <Box
        p={2}
        boxShadow={6}
        borderRadius={2}
        mt={2}
        className="searchContainer"
      >
        <Box mb={2}>
          <Typography variant="h4">OpenAI Image Generator</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Search anything"
            value={searchTerm}
            onChange={handleSearchChange}
            className="input"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="small"
            disabled={!searchTerm || loading}
            style={{ marginLeft: 8 }}
          >
            {loading ? (
              <CircularProgress size="1.2rem" sx={{ color: "whitesmoke" }} />
            ) : (
              <SearchIcon fontSize="small" />
            )}
          </Button>
          <Button
            onClick={() => {
              setSearchTerm(""), setImages([]);
            }}
            variant="contained"
            size="small"
            color="error"
            style={{ marginLeft: 8 }}
          >
            <ClearIcon fontSize="small" />
          </Button>
        </Box>

        {loading ? (
          <Typography variant="h5" sx={{ marginTop: 4 }}>
            Wait a moment, AI is generating...
          </Typography>
        ) : (
          images.length > 0 && (
            <ImageContainer data={images} searchValue={searchTerm} />
          )
        )}
      </Box>
    </>
  );
}

export default App;
