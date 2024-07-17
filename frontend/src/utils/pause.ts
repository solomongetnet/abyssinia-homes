const pause = (ms?: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms || 2000));
};
export default pause;
