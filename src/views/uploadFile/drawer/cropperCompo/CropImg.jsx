import { Box, IconButton, Stack } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ cropperRef, cropHandler, onClose, selectedFile }) => {
  return (
    <Stack direction="row" spacing="8px" justifyContent="space-between">
      <Box flexGrow={1} height="auto">
        <Cropper
          zoomable={false}
          ref={cropperRef}
          src={selectedFile["imageUrl"]}
          viewMode={3}
          background={false}
          checkOrientation={false}
          guides={true}
          style={{ height: "auto", objectFit: "contain" }}
        />
      </Box>

      <Stack spacing="2px">
        <IconButton size="small" color="error" onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
        <IconButton size="small" color="success" onClick={cropHandler}>
          <CheckIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ImageCropper;
