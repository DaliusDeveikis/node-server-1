import { file } from '../lib/file.js';
import { PageTemplate } from '../lib/PageTemplate.js';

class PageBlogPost extends PageTemplate {
  /**
   * Sabloninio puslapio konstruktorius.
   * @constructor
   * @param {object} data Duomenu objektas
   */
  constructor(data) {
    super(data);
    this.pageCSSfileName = 'blog-post';
  }

  async getPostData() {
    const trim = this.data.trimmedPath.split('/');
    const [ErrBlog, readContent] = await file.read('blog', trim[1] + '.json');
    if (ErrBlog) {
      return {};
    }
    const blogContent = JSON.parse(readContent);
    const [ErrAccount, accountsContent] = await file.read(
      'accounts',
      blogContent.author + '.json'
    );
    if (ErrAccount) {
      return (blogContent.name = 'Anonymouse');
    }
    const accounts = JSON.parse(accountsContent);
    blogContent.name = accounts.username;
    return blogContent;
  }

  isValidPost(post) {
    if (typeof post !== 'object' || Array.isArray(post) || post === null) {
      return false;
    }
    if (
      post.title === '' ||
      post.content === '' ||
      post.name === '' ||
      typeof post.title !== 'string' ||
      typeof post.content !== 'string' ||
      typeof post.name !== 'string'
    ) {
      return false;
    }
    return true;
  }

  badPostHTML() {
    return `<section class="container blog-inner">
                    <h1 class="row title">500</h1>
                    <p class="row">Something's wrong with server. Please, come back later.</p>
                </section>`;
  }

  correctPostHTML(post) {
    return `<section class="container blog-inner">
                    <h1 class="row title">${post.title}</h1>
                    <p class="row">${post.content}</p>
                    <footer class="row">${post.name}</footer>

                </section>`;
  }

  async mainHTML() {
    console.log(this.data.searchParams);
    const postData = await this.getPostData();
    if (this.isValidPost(postData)) {
      return this.correctPostHTML(postData);
    } else {
      return this.badPostHTML();
    }
  }
}

export { PageBlogPost };
