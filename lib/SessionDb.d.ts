import type { Hero } from '@ulixee/hero/lib/extendables';
import { ClientPlugin } from '@ulixee/hero-plugin-utils';
import type ISessionDb from '../interfaces/ISessionDb';
import SessionDb from '@ulixee/hero-core/dbs/SessionDb';
export declare class ClientSessionDbPlugin extends ClientPlugin {
    static readonly id = "session-db-plugin";
    _sessionDb?: SessionDb;
    onHero(hero: Hero): void;
    private getSessionDb;
}
declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends ISessionDb {
    }
}
declare const _default: {
    ClientSessionDbPlugin: typeof ClientSessionDbPlugin;
};
export default _default;
//# sourceMappingURL=SessionDb.d.ts.map