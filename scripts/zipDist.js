import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';
import process from 'process';

const zip = new JSZip();
const distPath = './dist';
const now = new Date();
const timestamp = now.getFullYear() + '-' + 
  String(now.getMonth() + 1).padStart(2, '0') + '-' + 
  String(now.getDate()).padStart(2, '0') + '-' + 
  String(now.getHours()).padStart(2, '0') + '-' + 
  String(now.getMinutes()).padStart(2, '0') + '-' + 
  String(now.getSeconds()).padStart(2, '0');
const zipFilename = '/Users/andrii/Downloads/' + timestamp + '-quick-tiles.zip';

const addFolderToZip = (folderPath, zipFolder) => {
  const items = fs.readdirSync(folderPath);
  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      const newZipFolder = zipFolder.folder(item);
      addFolderToZip(itemPath, newZipFolder);
    } else {
      zipFolder.file(item, fs.readFileSync(itemPath));
    }
  });
};

if (fs.existsSync(distPath)) {
  addFolderToZip(distPath, zip);
  zip.generateAsync({type: 'nodebuffer'}).then(content => {
    fs.writeFileSync(zipFilename, content);
    console.log('ZIP file created successfully: ' + zipFilename);
  });
} else {
  console.error('dist folder not found. Please run build first.');
  process.exit(1);
}

