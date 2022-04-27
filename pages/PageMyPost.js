import { PageTemplate } from '../lib/PageTemplate.js';
import { myposts } from '../components/mypost.js';

class PageMyPost extends PageTemplate {
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
    return myposts(this.data);
  }
}

export { PageMyPost };
