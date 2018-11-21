var fs = require('fs'),
  marked = require('marked'),
  path = require('path'),
  util = require('util');

var PATTERN_MARKDOWN_TAG = /<x-markdown\s+src="(.*?)"\s*\/>/g,

  PATTERN_HEADER_TAG = /<h([2-3]).*?>(.*?)<\/h\1>/g,

  PATTERN_INDEX_TAG = /<x-index\s*\/>/g,

  PATTERN_EXTNAME = /\.\w+$/;

/**
 * Convert template to HTML.
 * @param pathname {string}
 */
function main(pathname) {
  var base = path.dirname(pathname),
    tmpl = read(pathname);

  tmpl = compile(tmpl, base);
  tmpl = generateIndex(tmpl);

  write(pathname.replace(PATTERN_EXTNAME, '.html'), tmpl);
}

/**
 * Embed markdown contents.
 * @param tmpl {string}
 * @param base {string}
 * @reutrn {string}
 */
function compile(tmpl, base) {
  return tmpl.replace(PATTERN_MARKDOWN_TAG, function (all, pathname) {
    return marked(read(path.join(base, pathname)));
  });
}

/**
 * Generate index.
 * @param tmpl {string}
 * @reutrn {string}
 */
function generateIndex(tmpl) {
  var html = '',
    index = [],
    re;

  html += '<ul>\n';

  tmpl = tmpl.replace(PATTERN_HEADER_TAG, function (all, num, text) {
    var level = num - 1;

    while (level > index.length) {
      index.push(0);
    }

    while (level < index.length) {
      index.pop();
    }

    index[index.length - 1] += 1;

    html += util.format('<li class="level%s"><a href="#%s">%s</a></li>',
      num, index.join('.'), text);

    return util.format('<h%s id="%s">%s</h%s>',
      num, index.join('.'), text, num);
  });

  html += '</ul>\n';

  /**
   * 根据h标签id制作左侧导航
   * 1、找到h2 及其id 从而匹配其下的h3标签
   * */
  var findH2 = /<h2 id="(.*?)">(.*?)<\/h2>/g
  var findH3 = /<h3 id="(.*?)">(.*?)<\/h3>/g
  var navLeft = '<div>'
  tmpl.replace(findH2, function(all, id, content) {
    navLeft += util.format('<div><img id="%s" class="arrow-svg delDeg" src="./qianblue.svg" alt=""><a href="#%s">%s</a>\n' +
      '<ul class="second-ul %s-dis">', id, id, content, id)

    tmpl.replace(findH3, function(allk, idk, contentk) {

      if(Math.floor(idk) == id) {
        navLeft += util.format('<li><a href="#%s">%s</a></li>', idk, contentk)
      }
    })

    navLeft += '</ul></div>\n'

  })

  navLeft += '</div>'



  // tmpl = tmpl.replace(PATTERN_INDEX_TAG, html);
  tmpl = tmpl.replace(PATTERN_INDEX_TAG, navLeft);

  return tmpl;
}

/**
 * Read a file.
 * @param pathname {string}
 * @return {string}
 */
function read(pathname) {
  return fs.readFileSync(pathname, 'utf-8');
}

/**
 * Write a file.
 * @param pathname {string}
 * @param data {string}
 */
function write(pathname, data) {
  fs.writeFileSync(pathname, data);
}

module.exports = main;
