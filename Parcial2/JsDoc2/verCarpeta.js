import fs from 'fs/promises';
import path from 'path';

const currentDirectory = process.cwd();

async function getFolders(dir) {
  const files = await fs.readdir(dir);
  return files.filter(async (file) => {
    const stats = await fs.stat(path.join(dir, file));
    return stats.isDirectory();
  });
}

(async () => {
  try {
    const folders = await getFolders(currentDirectory);

    folders.forEach((folder) => {
      console.log('Carpeta padre:', currentDirectory);
      console.log('Carpeta hija:', path.join(currentDirectory, folder));
      console.log('---');
    });
  } catch (err) {
    console.error('Error al leer el directorio:', err);
  }
})();

