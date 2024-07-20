export const isValidUrl = (url: string): boolean => {
  const urlPattern: RegExp = /^(https?:\/\/)?([\w.]+\.\w{2,})(\/[\w\/]*)*$/;
  return urlPattern.test(url);
};
