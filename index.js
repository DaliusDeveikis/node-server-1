import { server } from './lib/server.js';
export const app = {};

app.init = () => {
  // ready for new folders

  // ready for new files

  // connect to mysql

  // start server

  server.init();

  // launching regular processes:
  // -- delete old/unnecessary files
  // -- less use of file archiving
  // -- recoverable information via API
};

app.init();

console.log(app);
