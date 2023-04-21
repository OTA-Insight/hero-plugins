import type { Hero } from '@ulixee/hero/lib/extendables';
import { ISendToCoreFn } from '@ulixee/hero-interfaces/IClientPlugin';
import type { IOnClientCommandMeta } from '@ulixee/hero-interfaces/ICorePlugin';
import { ClientPlugin, CorePlugin } from '@ulixee/hero-plugin-utils';
import type { IFrame } from '@ulixee/unblocked-specification/agent/browser/IFrame';
import type IAnimations from '../interfaces/IAnimations';
import { ACTION } from '../interfaces/IAnimations';
import type { Tab } from '@ulixee/hero';
export declare class ClientAnimationsPlugin extends ClientPlugin {
    static readonly id = "animations-plugin";
    onHero(hero: Hero, sendToCore: ISendToCoreFn): void;
    onTab(hero: Hero, tab: Tab, sendToCore: ISendToCoreFn): void;
}
export declare class CoreAnimationsPlugin extends CorePlugin {
    static readonly id = "animations-plugin";
    onClientCommand(meta: IOnClientCommandMeta, action: ACTION): Promise<void>;
    inFrame(parent: CoreAnimationsPlugin, frame: IFrame): {
        disableAnimations: () => Promise<void>;
        disableCssAnimations: () => Promise<void>;
        enableAnimations: () => Promise<void>;
        enableCssAnimations: () => Promise<void>;
    };
    executeFn<T extends unknown[]>(action: ACTION, frame: IFrame, fn: string | ((...args: T) => unknown), ...args: T): Promise<void>;
}
declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends IAnimations {
    }
    interface Tab extends IAnimations {
    }
}
declare const _default: {
    ClientAnimationsPlugin: typeof ClientAnimationsPlugin;
    CoreAnimationsPlugin: typeof CoreAnimationsPlugin;
};
export default _default;
//# sourceMappingURL=Animations.d.ts.map