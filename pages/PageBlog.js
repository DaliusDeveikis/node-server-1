import { PageTemplate } from '../lib/PageTemplate.js';
import { blogsSection } from '../components/blogSection.js';

class PageBlog extends PageTemplate {
  /**
   * Sabloninio puslapio konstruktorius.
   * @constructor
   * @param {object} data Duomenu objektas
   */
  constructor(data) {
    super(data);
    this.pageCSSfileName = 'blog';
  }

  async mainHTML() {
    return blogsSection();
  }
}

export { PageBlog };
