export const onFileChange = (files, onLoadCb, getFileCb) => {
  const file = files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const imageUrl = event.target.result;
    onLoadCb(imageUrl);
  };

  if (file) {
    reader.readAsDataURL(file);
    getFileCb(file);
  }
};
