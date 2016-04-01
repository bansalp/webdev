"use strict";
module.exports = function (db) {
    var FieldSchema = db.Schema({
        label: String,
        type: {
            type: String,
            enum: ["TEXT", "TEXTAREA", "DATE", "OPTIONS", "CHECKBOXES", "RADIOS", "EMAIL", "PASSWORD"]
        },
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    });
    return FieldSchema;
};