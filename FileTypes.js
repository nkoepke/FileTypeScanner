const fs = require('fs');
const path = require('path');

function getFileSizes(basePath) {
  const fileSizes = {};

  function traverseDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const fileExtension = path.extname(filePath).slice(1);

        if (!fileSizes[fileExtension]) {
          fileSizes[fileExtension] = {
            size: 0,
            count: 0
          };
        }

        fileSizes[fileExtension].size += stats.size;
        fileSizes[fileExtension].count++;
      } else if (stats.isDirectory()) {
        traverseDirectory(filePath);
      }
    }
  }

  traverseDirectory(basePath);

  const totalSize = Object.values(fileSizes).reduce(
    (acc, { size }) => acc + size,
    0
  );

  const result = Object.entries(fileSizes).map(([extension, { size, count }]) => ({
    extension,
    size,
    count,
    percent: ((size / totalSize) * 100).toFixed(2)
  }));

  result.sort((a, b) => b.size - a.size); // Sort by size in descending order

  return result;
}

module.exports = getFileSizes;


// Test
//console.log(getFileSizes('./'));