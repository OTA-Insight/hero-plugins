import type { Hero } from '@ulixee/hero/lib/extendables';
import { ClientPlugin } from '@ulixee/hero-plugin-utils';
import type ISessionTraffic from '../interfaces/ISessionDb';
import SessionDb from '@ulixee/hero-core/dbs/SessionDb';
const id = 'animations-plugin';

export class ClientSessionTrafficPlugin extends ClientPlugin {
    static readonly id = id;

    onHero(hero: Hero) {
        hero.readSessionDb = this.readSessionDb.bind(this, hero);
    }

    onTab(hero: Hero) {
        hero.readSessionDb = this.readSessionDb.bind(this, hero);
    }

    private async readSessionDb(hero: Hero): Promise<SessionDb> {
        const sessionId = await hero.sessionId;
        const sessionDb = new SessionDb(sessionId, {
            readonly: true,
            fileMustExist: true,
        });
        return sessionDb;
    }
}

declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends ISessionTraffic { }
    interface Tab extends ISessionTraffic { }
}

export default { ClientSessionTrafficPlugin }
