import '@ulixee/hero/lib/extendables';
import type Hero from '@ulixee/hero';
import { ISendToCoreFn } from '@ulixee/hero-interfaces/IClientPlugin';
import type { IOnClientCommandMeta } from '@ulixee/hero-interfaces/ICorePlugin';
import { ClientPlugin, CorePlugin } from '@ulixee/hero-plugin-utils';
import type { IFrame } from '@ulixee/unblocked-specification/agent/browser/IFrame';
import type IAnimations from '../interfaces/IAnimations';
import { ACTION } from '../interfaces/IAnimations';
const id = 'animations-plugin';

export class ClientAnimationsPlugin extends ClientPlugin {
    static readonly id = id;

    onHero(hero: Hero, sendToCore: ISendToCoreFn) {
        Object.keys(ACTION).forEach((action) => {
            const oneAction = {
                [action]: function (frame?: IFrame | undefined): Promise<void> {
                    return sendToCore(id, action, frame);
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

export class CoreAnimationsPlugin extends CorePlugin implements IAnimations {
    static readonly id = id;

    async onClientCommand(
        meta: IOnClientCommandMeta,
        action: ACTION,
        frame?: IFrame,
    ) {
        const frames = frame ? [frame] : meta.page.frames;
        for (const frame of frames) {
            await this[action](frame);
        }
    }

    async [ACTION.disableAnimations](frame: IFrame) {
        await this.disableCssAnimations(frame);
        // await this.pauseDebugger(frame);
    }

    async [ACTION.disableCssAnimations](frame: IFrame) {
        const fn = (disableString: string) => {
            document.body.outerHTML += disableString;
        };
        await this.executeFn(
            ACTION.disableCssAnimations,
            frame,
            fn,
            disableCssString,
        );
    }

    // Currently doesn't work
    async [ACTION.pauseDebugger](frame: IFrame) {
        const page = frame.page
        await page?.devtoolsSession.send('Debugger.enable');
        await page?.devtoolsSession.send('Debugger.pause');
    }

    async [ACTION.enableAnimations](frame: IFrame) {
        await this.enableCssAnimations(frame);
        await this.resumeDebbuger(frame);
    }

    async [ACTION.enableCssAnimations](frame: IFrame) {
        const fn = (disableString: string) => {
            document.body.outerHTML = document.body.outerHTML.replace(
                disableString,
                '',
            );
        };
        await this.executeFn(
            ACTION.enableCssAnimations,
            frame,
            fn,
            disableCssString,
        );
    }

    async [ACTION.resumeDebbuger](frame: IFrame) {
        const page = frame.page
        await page?.devtoolsSession.send('Debugger.resume');
    }

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
}

export default { ClientAnimationsPlugin, CoreAnimationsPlugin }