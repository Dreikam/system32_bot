"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildController = void 0;
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("@hapi/boom"));
class GuildController {
    service;
    constructor(service) {
        this.service = service;
    }
    getGuild(req, res, next) {
        if (!req.params.guildId)
            return next(boom_1.default.notFound("Debes colocar la ID"));
        const getGuildData = this.service.getGuild(req.params.guildId);
    }
}
exports.GuildController = GuildController;
