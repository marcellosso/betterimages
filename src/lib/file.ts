export const getBase64 = async (file: Blob): Promise<string | undefined> => {
  var reader = new FileReader();
  reader.readAsDataURL(file as Blob);

  return new Promise((reslove, reject) => {
    reader.onload = () => reslove(reader.result as any);
    reader.onerror = (error) => reject(error);
  });
};

const forceDownload = (blobUrl: string, filename: string) => {
  const a = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const downloadPhoto = (url: string, filename: string) => {
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch((e) => console.error(e));
};

export default downloadPhoto;
