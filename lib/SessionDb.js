"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSessionTrafficPlugin = void 0;
const hero_plugin_utils_1 = require("@ulixee/hero-plugin-utils");
const SessionDb_1 = require("@ulixee/hero-core/dbs/SessionDb");
const id = 'animations-plugin';
class ClientSessionTrafficPlugin extends hero_plugin_utils_1.ClientPlugin {
    onHero(hero) {
        hero.readSessionDb = this.readSessionDb.bind(this, hero);
    }
    onTab(hero) {
        hero.readSessionDb = this.readSessionDb.bind(this, hero);
    }
    async readSessionDb(hero) {
        const sessionId = await hero.sessionId;
        const sessionDb = new SessionDb_1.default(sessionId, {
            readonly: true,
            fileMustExist: true,
        });
        return sessionDb;
    }
}
exports.ClientSessionTrafficPlugin = ClientSessionTrafficPlugin;
ClientSessionTrafficPlugin.id = id;
exports.default = { ClientSessionTrafficPlugin };
//# sourceMappingURL=SessionDb.js.map