import type { Hero } from '@ulixee/hero/lib/extendables';
import { ISendToCoreFn } from '@ulixee/hero-interfaces/IClientPlugin';
import type { IOnClientCommandMeta } from '@ulixee/hero-interfaces/ICorePlugin';
import { ClientPlugin, CorePlugin } from '@ulixee/hero-plugin-utils';
import type { IFrame } from '@ulixee/unblocked-specification/agent/browser/IFrame';
import type IAnimations from '../interfaces/IAnimations';
import { ACTION } from '../interfaces/IAnimations';
import type { Tab } from '@ulixee/hero';
const id = 'animations-plugin';

export class ClientAnimationsPlugin extends ClientPlugin {
    static readonly id = id;

    onHero(hero: Hero, sendToCore: ISendToCoreFn) {
        Object.keys(ACTION).forEach((action) => {
            const oneAction = {
                [action]: function (): Promise<void> {
                    return sendToCore(id, action);
                },
            };
            Object.assign(hero, oneAction);
        });
    }

    onTab(hero: Hero, tab: Tab, sendToCore: ISendToCoreFn) {
        Object.keys(ACTION).forEach((action) => {
            const oneAction = {
                [action]: function (): Promise<void> {
                    return sendToCore(id, action);
                },
            };
            Object.assign(hero, oneAction);
        });
    }
}

const disableCssString = `<style>
    *,
    *::after,
    *::before {
        transition-delay: 0s !important;
        transition-duration: 0s !important;
        animation-delay: -0.0001s !important;
        animation-duration: 0s !important;
        animation-play-state: paused !important;
        caret-color: transparent !important;
    }
</style>` as const;

export class CoreAnimationsPlugin extends CorePlugin {
    static readonly id = id;

    async onClientCommand(
        meta: IOnClientCommandMeta,
        action: ACTION,
    ) {
        const frame = meta.page.mainFrame;
        await this.inFrame(this, frame)[action]()
    }

    inFrame(parent: CoreAnimationsPlugin, frame: IFrame) {
        return {
            [ACTION.disableAnimations]: async function (): Promise<void> {
                await this.disableCssAnimations();
                // await this.pauseDebugger();
            },
            [ACTION.disableCssAnimations]: async function (): Promise<void> {
                const fn = (disableString: string) => {
                    document.body.outerHTML += disableString;
                };
                await parent.executeFn(
                    ACTION.disableCssAnimations,
                    frame,
                    fn,
                    disableCssString,
                );
            },
            [ACTION.enableAnimations]: async function (): Promise<void> {
                await this[ACTION.enableCssAnimations]()
            },
            [ACTION.enableCssAnimations]: async function (): Promise<void> {
                const fn = (disableString: string) => {
                    document.body.outerHTML = document.body.outerHTML.replace(
                        disableString,
                        '',
                    );
                };
                await parent.executeFn(
                    ACTION.enableCssAnimations,
                    frame,
                    fn,
                    disableCssString,
                );
            },
            
        } satisfies IAnimations;
    };

    async executeFn<T extends unknown[]>(
        action: ACTION,
        frame: IFrame,
        fn: string | ((...args: T) => unknown),
        ...args: T
    ) {
        const fnSerialized = `(${fn.toString()})(${JSON.stringify(args).slice(
            1,
            -1,
        )});`;

        const result = await frame.evaluate<{ error?: string }>(fnSerialized);
        if (result?.error) {
            this.logger.error(action, { error: result.error });
            throw new Error(result.error);
        }
    }
}

declare module '@ulixee/hero/lib/extendables' {
    interface Hero extends IAnimations {}
    interface Tab extends IAnimations {}
}

export default { ClientAnimationsPlugin, CoreAnimationsPlugin }