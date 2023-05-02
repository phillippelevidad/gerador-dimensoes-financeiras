import * as fs from "fs";

export function writeFile(filename: string, explodeEntries: unknown[]): void {
  const filePath = `./output/${filename}`;
  const content = JSON.stringify(explodeEntries, null, 2);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${filename} has been saved!`);
  });
}
