const fs = require('fs');
const path = require('path')

fs.copyFile(
  path.resolve(process.cwd(), 'polymer.json'),
  path.resolve(process.cwd(), 'server/build/polymer.json'),
  (err) => {
    if (err) throw err;
    console.log('polymer config copied');
  });