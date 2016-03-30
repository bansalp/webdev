"use strict";
module.exports = function (db) {
    var FieldSchema = require("./field.schema.server.js")(db);
    var FormSchema = db.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date
        }
    }, {collection: 'form'});
    return FormSchema;
};