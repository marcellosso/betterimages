export const getBase64 = async (file: Blob): Promise<string | undefined> => {
  var reader = new FileReader();
  reader.readAsDataURL(file as Blob);

  return new Promise((reslove, reject) => {
    reader.onload = () => reslove(reader.result as any);
    reader.onerror = (error) => reject(error);
  });
};
