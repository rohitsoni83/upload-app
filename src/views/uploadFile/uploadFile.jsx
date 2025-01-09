import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddFileLogo from "../../assets/img/add-file-logo.png";
import DrawerComponent from "./drawer/drawer";
import "./uploadFile.scss";
import { onFileChange } from "./helper/utils";

const UploadFile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const inputRef = useRef(null);
  const uploadedFilesLen = !!uploadedFiles.length;

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const handleFileInputChange = ({ target: { files } }) => {
    onFileChange(
      files,
      (imageUrl) => setSelectedFile((prev) => ({ ...prev, imageUrl })),
      (file) => {
        const title = file.name?.split(".")?.[0];
        setSelectedFile((prev) => ({ ...prev, title }));
        !openDrawer && toggleDrawer();
      }
    );
  };

  return (
    <Box className="upload-file-container">
      {/* top nav */}
      <Box
        p="8px 16px"
        className={
          // we can use className lib as well for code smell purpose.
          uploadedFilesLen ? "nav-row-style sticky-box" : "nav-column-style "
        }
      >
        {uploadedFilesLen && (
          <Box flexGrow={1}>
            <TextField fullWidth size="small" label="Search Assets" />
          </Box>
        )}

        {!uploadedFilesLen && (
          <Box width="20%" height="30%" mb="16px">
            <img src={AddFileLogo} alt={"add-file-logo"} className="file-log" />
          </Box>
        )}

        <Button variant="contained" onClick={() => inputRef.current?.click?.()}>
          <AddIcon sx={{ mr: "6px" }} /> Add File
        </Button>
        <input
          hidden
          type={"file"}
          ref={inputRef}
          accept={".png, .jpeg, .jpg"}
          onChange={handleFileInputChange}
        />
      </Box>

      {/* image content container */}
      {uploadedFilesLen && (
        <Box mt="8px" width="100%" height="100%" p="0 16px">
          <ImageList cols={3} gap={8} variant={"masonry"}>
            {uploadedFiles.map((item, index) => (
              <ImageListItem
                key={`image-list-${index + 1}`}
                className="image-item-list"
              >
                <img src={item.imageUrl} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      {openDrawer && (
        <DrawerComponent
          open={openDrawer}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          handleReplaceImage={() => inputRef.current.click()}
          onSaveData={() =>
            setUploadedFiles((prev) => {
              return [selectedFile, ...prev];
            })
          }
          closeDrawer={() => {
            toggleDrawer();
            inputRef.current.value = "";
          }}
        />
      )}
    </Box>
  );
};

export default UploadFile;
