export const extractFileName = (filename: string) => {
  return filename.split("/").at(-1);
};
