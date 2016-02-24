"use strict";

let nconf = require("nconf");

let packageJSON = require("../package.json");

/*
 * This file exports a NodeBB Settings Object and a few meta-data of the project.
 *
 * See https://docs.nodebb.org/en/latest/plugins/settings.html for more details on the Settings Object.
 *
 * This file by default gets meta-replaced (thus @{...} gets resolved within the grunt-tasks).
 * It is not recommended to add any more files, rather it is recommended to add additional exports here if needed.
 */

let env = "@{env}", dev = (env === "development");

/*===================================================== Exports  =====================================================*/

exports.urlBase = nconf.get("url") + "/plugins/@{name}/static";
exports.name = "@{name}";
exports.id = "@{id}";
exports.Id = "@{Id}";
exports.iD = "@{iD}";
exports.ID = "@{ID}";
exports.dev = dev;
exports.env = env;
exports.pkg = packageJSON;
