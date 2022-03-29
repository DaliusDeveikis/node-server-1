import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const file = {};

file.fullPath = (dir, fileName = '') => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '../.data', dir, fileName);
};

file.fullPublicPath = (filePath = '') => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '../public', filePath);
};

/**
 *  Async function will create file in to data sub folder and write content.
 * @param {string} dir Create data sub folder.
 * @param {string} fileName Full file name with file extension.
 * @param {*} content Write content (Object).
 * @returns {Promise<[boolean, string | object]} Status if created file.
 */

file.create = async (dir, fileName, content) => {
  let fileDesscriptor = null;

  try {
    const filePath = file.fullPath(dir, fileName);
    fileDesscriptor = await fs.open(filePath, 'wx');
    let text = JSON.stringify(content);
    await fs.writeFile(fileDesscriptor, text);
    return [false, 'OK'];
  } catch (error) {
    return [true, error];
  } finally {
    if (fileDesscriptor) {
      await fileDesscriptor.close();
    }
  }
};

/**
 * Reading and return **text** file.
 * @param {string} dir Create data sub folder.
 * @param {string} fileName Full file name with file extension.
 * @returns {[Promise<[boolean, string | object]]} Status if readed file.
 */

file.read = async (dir, fileName) => {
  const filePath = file.fullPath(dir, fileName);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return [false, fileContent];
  } catch (error) {
    return [true, error];
  }
};

/**
 * Reading file from 'public' dir.
 * @param {string} filePath File Path.
 * @returns {[Promise<[boolean, string | object]]} Status if readed file.
 */

file.readPublic = async filePath => {
  const fullFileContent = file.fullPublicPath(filePath);
  try {
    const fileContent = await fs.readFile(fullFileContent, 'utf-8');
    return [false, fileContent];
  } catch (error) {
    return [true, error];
  }
};

/**
 *  Async function will create file in to data sub folder and write new content.
 * @param {string} dir Create data sub folder.
 * @param {string} fileName Full file name with file extension.
 * @param {*} content Write content (Object).
 * @returns {Promise<[boolean, string | object]} Status if created file.
 */

file.update = async (dir, fileName, content) => {
  let fileDesscriptor = null;

  try {
    const filePath = file.fullPath(dir, fileName);
    fileDesscriptor = await fs.open(filePath, 'r+');
    await fileDesscriptor.truncate();
    let text = JSON.stringify(content);
    await fs.writeFile(fileDesscriptor, text);
    return [false, 'OK'];
  } catch (error) {
    return [true, error];
  } finally {
    if (fileDesscriptor) {
      await fileDesscriptor.close();
    }
  }
};

/**
 * Deleting file.
 * @param {string} dir Delete file in data sub folder.
 * @param {string} fileName Full file name with file extension.
 * @returns {[Promise<[boolean, string | object]]} Status if deleted file.
 */

file.delete = async (dir, fileName) => {
  const filePath = file.fullPath(dir, fileName);
  try {
    await fs.unlink(filePath);
    return [false, 'OK'];
  } catch (error) {
    return [true, error];
  }
};

/**
 * Get a list of all files from dir.
 * @param {string} dir Delete file in data sub folder.
 * @returns {[Promise<[boolean, string[] | object]]} Status if file list exist
 */

file.list = async dir => {
  const folderPath = file.fullPath(dir);
  try {
    const files = await fs.readdir(folderPath);
    return [false, files];
  } catch (error) {
    return [true, error];
  }
};
