"use strict";

let _ = require("lodash");
let Q = require("q");
let fs = require("fs");
let path = require("path");

const VERSION = 1;

/*===================================================== Exports  =====================================================*/

exports.build = buildIndex;
exports.read = readIndex;

/*==================================================== Functions  ====================================================*/

function readIndex(assetsPath) {
  return Q
      .nfcall(fs.readFile, path.join(assetsPath, "index.json"))
      .then(function (index) {
        let categoryById = {};
        _.each(JSON.parse(index).categories, function (ids, category) {
          _.each(ids, function (id) { categoryById[id] = category; });
        });
        return Q
            .nfcall(fs.readdir, assetsPath)
            .then(function (files) {
              return _
                  .chain(files)
                  .map(function (file) {
                    let id = path.basename(file, ".png");
                    if (categoryById.hasOwnProperty(id)) { return {id: id, category: categoryById[id]}; }
                  })
                  .compact()
                  .value();
            });
      });
}

function buildIndex(assetsPath, clonePath) {
  return Q
      .nfcall(fs.readFile, path.join(clonePath, "public", "index.html"))
      .then(categorize)
      .then(function (index) {
        return Q
            .nfcall(fs.writeFile, path.join(assetsPath, "index.json"), JSON.stringify({
              _v: VERSION, categories: index.categories
            }))
            .then(_.constant(index));
      });
}

function categorize(indexHtml) {
  let ids = [];
  let categories = {};
  let lines = indexHtml.toString().split("\n");
  let category = null;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (category == null) {
      let match = /<ul\s*?class="([^\s"]+)\s+emojis"/.exec(line);
      if (match != null) { category = categories[match[1]] = []; }
    } else if (/<\/ul>/.test(line)) {
      category = null;
    } else {
      let match = /<img[^>]*?>:<span[^>]*?>([^<]+?)<\/span>:/.exec(line);
      if (match != null) {
        category.push(match[1]);
        ids.push(match[1]);
      }
    }
  }
  return {categories: categories, ids: ids};
}
