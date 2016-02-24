"use strict";

let settings = require("../settings");

/*===================================================== Exports  =====================================================*/

exports.description = "A set of well designed emoji mostly by Apple Inc.<br/>" +
    "License terms unknown. Use at own risk.<br/>" +
    "<a href=\"http://www.emoji-cheat-sheet.com/\" target=\"_blank\">Image Source</a>";

exports.attribution = null;

exports.preview = "//images.duckduckgo.com/iu/?u=http%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Mb24873a7b5d0e6971df17bfc70462a32o0%26pid%3D15.1&f=1";

exports.url = [settings.urlBase + "/images/", {key: "id", encode: true}, ".png"];
