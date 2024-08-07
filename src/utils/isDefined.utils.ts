const isDefined = function <T>(obj: T | undefined): obj is T {
  if (obj === undefined) {
    throw new Error("ob is undefined");
  }
  return obj !== undefined;
};

export default isDefined;
