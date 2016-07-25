'use strict';

var _ = require('lodash');

function I18n(options) {
    var settings = _.merge(this.defaultSettings, options);
    this.keys = this.strings[settings.locale] || this.strings["en-us"];
    //this.keys = this.strings(settings.locale);
}

I18n.prototype.defaultSettings = {
    locale: "en-us"
};

I18n.prototype.translate = function (key) {
    return this.keys[key] || key;
};

//I18n.prototype.strings = function(locale) {
//    var url = this.settings.jsonUrl;
//    fetch(url).then(function(resp) {
//        if(resp.ok){
//            resp.json().then(function(json) {
//                that.setState({
//                    intlStore:json
//                });
//            });
//        }
//    });
//};

I18n.prototype.strings = {
    "en-us": {
        "o-bookmarks.TITLE": "Bookmarks",
        "o-bookmarks.NO_BOOKMARKS": "No Bookmarks were found.",
        "o-bookmarks.REMOVE_BOOKMARK": "Remove bookmark"
    },
    "fr-ca":{
        "o-bookmarks.TITLE": "Signets",
        "o-bookmarks.NO_BOOKMARKS": "Aucun signet trouvé.",
        "o-bookmarks.REMOVE_BOOKMARK": "Supprimer"
    }

};

module.exports = I18n;