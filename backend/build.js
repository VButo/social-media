import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = path.join(__dirname, '../build');

const DIRS_TO_COPY = ['database', 'objects', 'router'];
const FILES_TO_COPY = ['.env', 'package.json', 'server.js'];

async function createBuild() {
  try {
    console.log('Starting build process...');
    
    await fs.mkdir(BUILD_DIR, { recursive: true });
    console.log(`Created build directory at: ${BUILD_DIR}`);
    
    for (const dir of DIRS_TO_COPY) {
      const srcDir = path.join(__dirname, dir);
      const destDir = path.join(BUILD_DIR, dir);
      
      await fs.mkdir(destDir, { recursive: true });
      
      const files = await fs.readdir(srcDir);
      
      for (const file of files) {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);
        
        const stats = await fs.stat(srcFile);
        if (stats.isDirectory()) {
          console.log(`Skipping subdirectory: ${file}`);
          continue;
        }
        
        await fs.copyFile(srcFile, destFile);
        console.log(`Copied: ${dir}/${file}`);
      }
    }
    
    for (const file of FILES_TO_COPY) {
      try {
        const srcFile = path.join(__dirname, file);
        const destFile = path.join(BUILD_DIR, file);
        
        await fs.copyFile(srcFile, destFile);
        console.log(`Copied: ${file}`);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.warn(`Warning: File not found: ${file}`);
        } else {
          throw err;
        }
      }
    }
    
    console.log('Build completed successfully!');
    console.log(`\nTo start the production build:`);
    console.log(`cd ../build`);
    console.log(`npm install`);
    console.log(`npm start`);
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

createBuild();