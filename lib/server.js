import http from 'http';

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

  req.on('end', () => {
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
    const isTextFile = false;
    const isBinaryFile = false;
    const isAPI = false;
    const isPage = !isTextFile && !isBinaryFile && isAPI;
    let responseContent = '';
    if (isTextFile) {
      responseContent = 'TEXT FILE CONTENT';
    }
    if (isBinaryFile) {
      responseContent = 'BINARY FILE CONTENT';
    }
    if (isAPI) {
      responseContent = 'API CONTENT';
    }
    if (isPage) {
      responseContent = 'PAGE CONTENT';
    }
    res.end(responseContent);
  });
});

server.routes = {
  '': 'home',
  404: '404',
  register: 'register',
  login: '<h1>LOGIN</h1>',
  blog: 'blog'
};

server.init = () => {
  console.log('Bandau paleisti serverio procesa...');
  const port = 3000;
  server.httpServer.listen(port, () => {
    console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
  });
};

export { server };
