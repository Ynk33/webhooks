import fs from "fs";

/**
 * Update a file by searching for a string and replacing it by another one. 
 * @param {string[]} searches String to search for.
 * @param {string[]} replaces String to replace by.
 * @param {string} filePath Path to the file to search and replace in.
 */
export function searchAndReplace(searches, replaces, filePath) {
  fs.readFile(filePath, "utf8", function (err, file) {
    if (err) {
      return console.log(err);
    }

    for (let i = 0; i < searches.length; i++) {
      const search = searches[i];
      const replace = replaces[i];

      search = search.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
      let regex = new RegExp(search, "g");
      file = file.replace(regex, replace);
    }

    fs.writeFile(filePath, file, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}
