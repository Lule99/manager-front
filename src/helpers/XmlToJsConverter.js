import xml2js from "xml2js";

export const xmlToObject = (xml) => {
  let convertedObject;
  const parser = new xml2js.Parser({ strict: false, trim: true });
  parser.parseString(xml, (err, result) => {
    let firstKey = Object.keys(result)[0];
    convertedObject = result[firstKey];
  });
  return convertedObject;
};
