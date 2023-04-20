import type { Hero } from '@ulixee/hero/lib/extendables';
import { ClientPlugin } from '@ulixee/hero-plugin-utils';
import type ISessionTraffic from '../interfaces/ISessionDb';
export declare class ClientSessionTrafficPlugin extends ClientPlugin {
    static readonly id = "animations-plugin";
    onHero(hero: Hero): void;
    onTab(hero: Hero): void;
    private readSessionDb;
}
declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends ISessionTraffic {
    }
    interface Tab extends ISessionTraffic {
    }
}
declare const _default: {
    ClientSessionTrafficPlugin: typeof ClientSessionTrafficPlugin;
};
export default _default;
//# sourceMappingURL=SessionDb.d.ts.map