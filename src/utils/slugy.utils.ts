import slugify from "slugify";
const slugy = function (input: string) {
  return slugify(input, { lower: true });
};

export default slugy;
