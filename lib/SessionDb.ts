import type { Hero } from '@ulixee/hero/lib/extendables';
import { ClientPlugin } from '@ulixee/hero-plugin-utils';
import type ISessionTraffic from '../interfaces/ISessionDb';
import SessionDb from '@ulixee/hero-core/dbs/SessionDb';
const id = 'animations-plugin';

export class ClientSessionTrafficPlugin extends ClientPlugin {
    static readonly id = id;

    onHero(hero: Hero) {
        var sessionDb: SessionDb;
        hero.readSessionDb = async function (): Promise<SessionDb> {
            if (sessionDb) {
                return sessionDb;
            }
            sessionDb = await getSessionDb(hero);
            return sessionDb;
        };
    }

    onTab(hero: Hero) {
        var sessionDb: SessionDb;
        hero.readSessionDb = async function (): Promise<SessionDb> {
            if (sessionDb) {
                return sessionDb;
            }
            sessionDb = await getSessionDb(hero);
            return sessionDb;
        };
    }
}

async function getSessionDb(hero: Hero): Promise<SessionDb> {
    const sessionId = await hero.sessionId;
    const sessionDb = new SessionDb(sessionId, {
        readonly: true,
        fileMustExist: true,
    });
    return sessionDb;
}

declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends ISessionTraffic { }
    interface Tab extends ISessionTraffic { }
}

export default { ClientSessionTrafficPlugin }
