"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSessionDbPlugin = void 0;
const path_1 = __importDefault(require("path"));
const hero_core_1 = __importDefault(require("@ulixee/hero-core"));
const hero_plugin_utils_1 = require("@ulixee/hero-plugin-utils");
const SessionDb_1 = __importDefault(require("@ulixee/hero-core/dbs/SessionDb"));
const id = 'session-db-plugin';
class ClientSessionDbPlugin extends hero_plugin_utils_1.ClientPlugin {
    onHero(hero) {
        hero.readSessionDb = this.getSessionDb.bind(this, hero);
    }
    async getSessionDb(hero) {
        if (this._sessionDb) {
            return this._sessionDb;
        }
        const sessionId = await hero.sessionId;
        // TODO support using any location specified by hero constructor.
        // Currently this info is not easy to get and would need a core plugin
        // that keeps track of this (for a limited amount of time?) and some more.
        const location = path_1.default.join(hero_core_1.default.dataDir, 'hero-sessions', `${sessionId}.db`);
        this._sessionDb = new SessionDb_1.default(sessionId, location, {
            readonly: true,
            fileMustExist: true,
        });
        return this._sessionDb;
    }
}
exports.ClientSessionDbPlugin = ClientSessionDbPlugin;
ClientSessionDbPlugin.id = id;
exports.default = { ClientSessionDbPlugin };
//# sourceMappingURL=SessionDb.js.map