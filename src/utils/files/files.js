import fs from "fs";

/**
 * Update a file by searching for a string and replacing it by another one. 
 * @param {string} search String to search for.
 * @param {string} replace String to replace by.
 * @param {string} filePath Path to the file to search and replace in.
 */
export function searchAndReplace(search, replace, filePath) {
  fs.readFile(filePath, "utf8", function (err, file) {
    if (err) {
      return console.log(err);
    }

    let regex = new RegExp(search, "g");
    let result = file.replace(regex, replace);

    fs.writeFile(filePath, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}
