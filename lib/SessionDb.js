"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSessionDbPlugin = void 0;
const hero_plugin_utils_1 = require("@ulixee/hero-plugin-utils");
const SessionDb_1 = require("@ulixee/hero-core/dbs/SessionDb");
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
        this._sessionDb = new SessionDb_1.default(sessionId, {
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