import http from 'http';
import { utils } from './utils.js';
import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageRegister } from '../pages/PageRegister.js';
import { PageLogin } from '../pages/PageLogin.js';
import { file } from './file.js';

const server = {};

server.httpServer = http.createServer((req, res) => {
  const baseURL = `http${req.socket.encryption ? 's' : ''}://${
    req.headers.host
  }`;
  const parsedURL = new URL(req.url, baseURL);
  const httpMethod = req.method.toLowerCase();
  const parsedPathName = parsedURL.pathname;
  const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
  const header = req.headers;

  req.on('data', () => {
    console.log('Klientas atsiunte duomenu...');
  });

  req.on('end', async () => {
    const fileEtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg'];
    const binaryFileExtensions = [
      'png',
      'jpg',
      'ico',
      'ttf',
      'woff',
      'woff2',
      'otf',
      'eot'
    ];

    const isTextFile = textFileExtensions.includes(fileEtension);
    const isBinaryFile = binaryFileExtensions.includes(fileEtension);
    const isAPI = trimmedPath.split('/')[0] === 'api';
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    let responseContent = '';

    if (isTextFile) {
      const [err, content] = await file.readPublic(trimmedPath);
      if (err) {
        responseContent = 'Encoutered an error while trying to read';
      } else {
        responseContent = content;
      }
    }
    if (isBinaryFile) {
      responseContent = 'BINARY FILE CONTENT';
    }
    if (isAPI) {
      responseContent = 'API CONTENT';
    }
    if (isPage) {
      const pageClass = server.routes[trimmedPath]
        ? server.routes[trimmedPath]
        : server.routes[404];
      const pageObj = new pageClass();
      responseContent = pageObj.render();
    }
    res.end(responseContent);
  });
});

server.routes = {
  '': PageHome,
  404: Page404,
  register: PageRegister,
  login: PageLogin
};

server.init = () => {
  console.log('Bandau paleisti serverio procesa...');
  const port = 3000;
  server.httpServer.listen(port, () => {
    console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
  });
};

export { server };
