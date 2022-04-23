import { file } from '../lib/file.js';
import { utils } from '../lib/utils.js';

/**
 * Tikrina ar validus tekstas.
 * @param {string} text Norimas tekstas.
 * @param {number} maxSize Teksto ilgis.
 * @returns {boolean}
 */
const isValidString = (text, maxSize) => {
  if (typeof text !== 'string' || text === '' || text.length > maxSize) {
    return false;
  }
  return true;
};

/**
 * Tikrina ar validus objektas
 * @param {object} blog Norimas objektas
 * @returns {boolean} Grazina false, jeigu patikrinimus nepraeina.
 */
const isValidBlog = blog => {
  const blogsKeysCount = 6;
  const maxSlugLength = 15;
  const maxTitleLength = 30;
  const maxContentLength = 500;
  if (
    typeof blog !== 'object' ||
    Array.isArray(blog) ||
    blog === null ||
    Object.keys(blog).length > blogsKeysCount ||
    Object.keys(blog).length < blogsKeysCount ||
    !isValidString(blog.title, maxTitleLength) ||
    !isValidString(blog.slug, maxSlugLength) ||
    !isValidString(blog.content, maxContentLength)
  ) {
    return false;
  }
  return true;
};

/**
 * Sutrumpina teksta,jeigu jis yra per ilgas, nepadalijus zodi dalimis.
 * @param {string} text Norimas tekstas
 * @returns {string}  Grazina sutrumpina teksta su gale esanciu daugtaskiu ...
 */
const sliceContent = text => {
  const limit = 40;
  const hardLimit = 60;
  if (text.length < hardLimit) {
    return text;
  }
  let sliceText = text.slice(0, limit);
  sliceText = sliceText.split('').reverse().join('');
  sliceText = sliceText.slice(sliceText.indexOf(' ') + 1);
  sliceText = sliceText.split('').reverse().join('');
  return sliceText + '...';
};

/**
 * Blog list
 * @returns {string} Grazina tuscia arba esamu blogu lista.
 */
async function blogsSection() {
  /**
   * Async funkcija, kuri nuskaito blog direktorijoje esanciu blogus ir juos nuskaito.
   * @returns {object} Grazina suparsinta objekta.
   */
  const getBlogData = async () => {
    const data = [];
    const [err, blogsFiles] = await file.list('blog');
    if (err) {
      return data;
    }

    for (const blogFileName of blogsFiles) {
      const [err, content] = await file.read('blog', blogFileName);
      if (err) {
        continue;
      }

      let obj = utils.parseJSONtoObject(content);
      if (!obj) {
        continue;
      }

      data.push(obj);
    }
    return data;
  };

  /**
   * Tuscias blog listo atvaizdavimas.
   * @returns {string}  Grazina HTML
   */
  const emptyListHTML = () => {
    return `<div class="row empty-list">Looks like blog list is emty right now</div>`;
  };

  /**
   *
   * @returns {string} Grazina blogus HTML
   */
  const renderList = async () => {
    const blogsData = await getBlogData();
    if (!Array.isArray(blogsData) || blogsData.length === 0) {
      return '';
    }

    let HTML = '<div class="row list">';
    for (const blog of blogsData) {
      if (!isValidBlog(blog)) {
        continue;
      }
      HTML += `
      <div class="post">
        <h2 class="post-title">${blog.title}</h2>
        <h2 class="post-description">${sliceContent(blog.content)}</h2>
        <a class="read-more" href="blog/${blog.slug}">
        Skaityk daugiau...
          <i class="icon fa fa-angle-right">
          </i>
        </a>
      </div>
      `;
    }
    return HTML + '</div>';
  };

  return `
  <section class="container blog-list">
    <h1 class="row title">My blog</h1>
    ${(await getBlogData().length) === 0 ? emptyListHTML() : await renderList()}
</section>`;
}

export { blogsSection, isValidBlog };
