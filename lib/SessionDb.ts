import type { Hero } from '@ulixee/hero/lib/extendables';
import { ClientPlugin } from '@ulixee/hero-plugin-utils';
import type ISessionDb from '../interfaces/ISessionDb';
import SessionDb from '@ulixee/hero-core/dbs/SessionDb';

const id = 'session-db-plugin';

export class ClientSessionDbPlugin extends ClientPlugin {
    static readonly id = id;

    onHero(hero: Hero) {
        hero.readSessionDb = this.getSessionDb.bind(this, hero);
    }

    onTab(hero: Hero) {
        hero.readSessionDb = this.getSessionDb.bind(this, hero);
    }

    _sessionDb?: SessionDb;

    private async getSessionDb(hero: Hero): Promise<SessionDb> {
        if (this._sessionDb) {
            return this._sessionDb;
        }

        const sessionId = await hero.sessionId;
        this._sessionDb = new SessionDb(sessionId, {
            readonly: true,
            fileMustExist: true,
        });
        return this._sessionDb;
    }
}

declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends ISessionDb { }
    interface Tab extends ISessionDb { }
}

export default { ClientSessionDbPlugin }
