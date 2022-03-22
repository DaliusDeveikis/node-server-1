export class PageTemplate {
  constructor() {}
  headHTML() {
    return `<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>`;
  }
  headerHTML() {
    return `
    <header>
    <img src ='#' alt='Logo'>
    <nav>
    <a href='#'>Register</a>
    <a href='#'>Login</a>
    </nav>
    </header>
    `;
  }
  footerHTML() {
    return `
    <footer>
    </footer>
    `;
  }

  render() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    ${this.headHTML()}
    <body>
    
    <main></main>
    ${this.footerHTML()}
    </body>
    </html>
    `;
  }
}
