const path = require('path');
const fromPairs = require('lodash.frompairs');
const emoji = require('emoji-datasource-apple/emoji');

function defineEmoji(callback) {
  const pairs = emoji.filter(e => e.has_img_apple).map((e) => {
    const name = e.short_name.toLowerCase().replace(/[^a-z0-9-]+/g, '_');
    const aliases = e.short_names.slice(1);
    const ascii = (e.texts || []).map(x => x.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    const character = e.unified
      .split('-')
      .map(code => String.fromCodePoint(parseInt(code, 16)))
      .join('');
    let category = e.category.toLowerCase();
    if (category === 'skin tones') { category = 'modifier'; }
    else if (category === 'foods') { category = 'food'; }
    else if (category === 'places') { category = 'travel'; }

    return [name, {
      aliases,
      ascii,
      character,
      categories: [category],
      keywords: e.keywords,
      backgroundPosition: `-${e.sheet_x * 23}px -${e.sheet_y * 23}px`,
    }];
  });

  const dictionary = fromPairs(pairs);

  callback(null, {
    name: 'Apple',
    id: 'apple',
    attribution: 'From <a href="https://github.com/iamcal/emoji-data" target="_blank" rel="noopener">iamcal/emoji-data on Github</a>',
    license: 'Copyright © Apple Inc. License terms unknown. Use at own risk.',
    mode: 'sprite',
    sprite: {
      file: path.join(path.dirname(require.resolve('emoji-datasource-apple')), 'img/apple/sheets-256/64.png'),
      backgroundSize: `${3136 / 64 * 23}px`,
    },
    dictionary,
  });
}

module.exports = defineEmoji;
