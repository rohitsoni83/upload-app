import CropIcon from "@mui/icons-material/Crop";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import FindReplaceIcon from "@mui/icons-material/FindReplace";

export const DrawerButtonConfig = {
  crop: <CropIcon />,
  rotateClockwise: <RotateRightIcon />,
  flipHorizontal: <SwapHorizontalCircleIcon />,
  flipVertical: <SwapVerticalCircleIcon />,
  replaceImage: <FindReplaceIcon />,
};

export const tooltipConfig = {
  crop: "Crop",
  rotateClockwise: "Rotate Clockwise",
  flipHorizontal: "Flip Horizontal",
  flipVertical: "Flip Vertical",
  replaceImage: "Replace Image",
};
