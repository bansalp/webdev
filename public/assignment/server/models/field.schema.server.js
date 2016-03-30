"use strict";
module.exports = function (db) {
    var FieldSchema = db.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    });
    return FieldSchema;
};