import path from 'path';
import HeroCore, { Session as HeroSession } from '@ulixee/hero-core';
import type { Hero } from '@ulixee/hero/lib/extendables';
import { ClientPlugin } from '@ulixee/hero-plugin-utils';
import type ISessionDb from '../interfaces/ISessionDb';
import SessionDb from '@ulixee/hero-core/dbs/SessionDb';

const id = 'session-db-plugin';

export class ClientSessionDbPlugin extends ClientPlugin {
    static readonly id = id;

    _sessionDb?: SessionDb;

    onHero(hero: Hero) {
        hero.readSessionDb = this.getSessionDb.bind(this, hero);
    }

    private async getSessionDb(hero: Hero): Promise<SessionDb> {
        if (this._sessionDb) {
            return this._sessionDb;
        }

        const sessionId = await hero.sessionId;
        // TODO support using any location specified by hero constructor.
        // Currently this info is not easy to get and would need a core plugin
        // that keeps track of this (for a limited amount of time?) and some more.
        const location = path.join(
            HeroCore.dataDir,
            'hero-sessions',
            `${sessionId}.db`,
        );
        this._sessionDb = new SessionDb(sessionId, location, {
            readonly: true,
            fileMustExist: true,
        });
        return this._sessionDb;
    }
}

declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends ISessionDb { }
}

export default { ClientSessionDbPlugin }
