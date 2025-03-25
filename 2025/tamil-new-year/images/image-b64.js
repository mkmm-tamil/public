import fs from 'fs/promises'; // Import fs.promises
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function imageToBase64(imageFilePath) {
  try {
    const imageBuffer = await fs.readFile(imageFilePath);
    const base64String = imageBuffer.toString('base64');

    const txtFilePath = imageFilePath.replace(/\.[^/.]+$/, '.txt');
    await fs.writeFile(txtFilePath, base64String);
    console.log(`Image converted to base64 and saved to ${txtFilePath}`);
  } catch (error) {
    console.error('Error in imageToBase64:', error);
  }
}

async function listImageFiles(folderPath) {
  try {
    const files = await fs.readdir(folderPath);

    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
    });

    console.log('Image files (JPEG and PNG):');
    imageFiles.forEach(async (file) => {
        const imagePath = path.join(folderPath, file);
        await imageToBase64(imagePath);
    });

    return imageFiles; // Return the array of image files if needed

  } catch (error) {
    console.error('Error in listImageFiles:', error);
    return []; // Return empty array in case of error
  }
}

async function main(){
    const folderPath = __dirname;
    await listImageFiles(folderPath);
}

main();