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

  console.log('Bandom atidaryti:', trimmedPath);

  req.on('data', () => {
    console.log('Klientas atsiunte duomenu...');
  });

  req.on('end', () => {
    console.log('Uzklausa pilnai gauta - ziurim ko nori klientas...');
    let contentHTML = server.routes[404];
    if (server.routes[trimmedPath]) {
      contentHTML = server.routes[trimmedPath];
    }
    const urlParts = trimmedPath.split('/');
    if (urlParts[0] === 'blog' && urlParts.length > 1) {
      contentHTML = `BLOG INNER: ${urlParts[1]}`;
    }
    if (urlParts[0] === 'blog' && urlParts.length > 2) {
      contentHTML = `BLOG SUB INNER: ${urlParts[2]}`;
    }

    const HTML = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <header>
                    <img src="#" alt="Logo">
                    <nav>
                    <a href="register">Register</a>
                    <a href="login">Login</a>
                    </nav>
                    </header>
                    <main>
                      ${contentHTML}
                    </main>
                    
                    <footer>
                    Copyright &copy; 2022
                    </footer>
                </body>
                </html>`;

    res.end(HTML);
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
