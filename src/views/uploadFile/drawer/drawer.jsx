import { useRef, useCallback } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { DrawerButtonConfig } from "../helper/constant";

import "./drawer.scss";

const DrawerComponent = ({
  open,
  onSaveData,
  closeDrawer,
  selectedFile,
  setSelectedFile,
  handleReplaceImage,

  // default props
  width = "600px",
  anchor = "right",
  className = "upload-file-drawer",
  transitionDuration = { enter: 600, exit: 400 },
}) => {
  const canvasRef = useRef(null);

  const transformImage = useCallback(
    (transformFn) => {
      if (!selectedFile?.imageUrl) return;

      const img = new Image();
      img.src = selectedFile.imageUrl;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        transformFn(canvas, ctx, img);

        setSelectedFile((prev) => ({
          ...prev,
          imageUrl: canvas.toDataURL(),
        }));
      };
    },
    [selectedFile, setSelectedFile]
  );

  const handleRotateClockwise = () => {
    transformImage((canvas, ctx, img) => {
      canvas.width = img.height;
      canvas.height = img.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    });
  };

  const handleFlipHorizontal = () => {
    transformImage((canvas, ctx, img) => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
    });
  };

  const handleFlipVertical = () => {
    transformImage((canvas, ctx, img) => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0);
    });
  };

  const actionBtnHandler = ({ target }) => {
    const id = target.closest(".action-btn")?.id;
    const actions = {
      rotateClockwise: handleRotateClockwise,
      flipHorizontal: handleFlipHorizontal,
      flipVertical: handleFlipVertical,
      replaceImage: handleReplaceImage,
    };
    if (actions[id]) actions[id]();
  };

  const resetData = () => {
    setSelectedFile({});
    closeDrawer();
  };

  return (
    <Drawer
      open={open}
      anchor={anchor}
      className={className}
      PaperProps={{ sx: { width: width } }}
      transitionDuration={transitionDuration}
    >
      <Box p="12px 16px" className="top-nav">
        <Typography fontSize="20px" fontWeight="500">
          Uploaded File
        </Typography>
        <IconButton sx={{ p: 0 }} onClick={resetData}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box className="content-box">
        <Box height="auto">
          <canvas hidden ref={canvasRef} />
          <img
            width="100%"
            height="auto"
            alt="selected-img"
            src={selectedFile["imageUrl"]}
            style={{
              objectFit: "contain",
              maxHeight: "480px",
            }}
          />
        </Box>

        <Stack spacing="8px" alignItems={"flex-end"} onClick={actionBtnHandler}>
          {Object.entries(DrawerButtonConfig).map(([key, label], index) => (
            <Button
              id={key}
              size="small"
              variant="contained"
              className="action-btn"
              key={`action-btn${index + 1}`}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Divider />
      <Box p="12px 16px" className="action-btn">
        <Button size="small" onClick={resetData}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            onSaveData();
            resetData();
          }}
        >
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
