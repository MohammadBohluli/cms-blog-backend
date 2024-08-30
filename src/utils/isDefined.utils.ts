const isDefined = function <T>(obj: T | undefined): obj is T {
  return obj !== undefined;
};

export default isDefined;
