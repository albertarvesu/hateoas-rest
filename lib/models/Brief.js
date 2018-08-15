"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// tslint:disable-next-line:variable-name
var BriefSchema = new Schema({
    budget: Schema.Types.Mixed,
    call_to_action: String,
    createdAt: {
        "default": Date.now,
        type: Date
    },
    donts: [String],
    dos: [String],
    follower_threshold: Number,
    hero_16x9: Schema.Types.Mixed,
    hero_image: Schema.Types.Mixed,
    objective: String,
    product: Schema.Types.Mixed,
    publishing_rules: [String],
    status: String,
    supported_submission_types: [String],
    updatedAt: {
        "default": Date.now,
        type: Date
    }
});
// tslint:disable-next-line:variable-name
var Brief = mongoose.model('Brief', BriefSchema);
exports["default"] = Brief;
