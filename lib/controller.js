"use strict";

var winston = require("winston");

var settings = require("./settings");

var setsCtrl = null;

try {
  setsCtrl = require("nodebb-plugin-emoji-extended/lib/sets/controller");
} catch (e) {
  winston.error("[plugins/emoji] nodebb-plugin-emoji-extended is not installed. " + settings.name + " depends on it.");
}

if (setsCtrl != null) {
  setsCtrl.register(require("./set/main"), "apple");
}
