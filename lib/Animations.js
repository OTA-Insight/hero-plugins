"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreAnimationsPlugin = exports.ClientAnimationsPlugin = void 0;
const hero_plugin_utils_1 = require("@ulixee/hero-plugin-utils");
const IAnimations_1 = require("../interfaces/IAnimations");
const id = 'animations-plugin';
class ClientAnimationsPlugin extends hero_plugin_utils_1.ClientPlugin {
    onHero(hero, sendToCore) {
        Object.keys(IAnimations_1.ACTION).forEach((action) => {
            const oneAction = {
                [action]: function () {
                    return sendToCore(id, action);
                },
            };
            Object.assign(hero, oneAction);
        });
    }
    onTab(hero, tab, sendToCore) {
        Object.keys(IAnimations_1.ACTION).forEach((action) => {
            const oneAction = {
                [action]: function () {
                    return sendToCore(id, action);
                },
            };
            Object.assign(hero, oneAction);
        });
    }
}
exports.ClientAnimationsPlugin = ClientAnimationsPlugin;
ClientAnimationsPlugin.id = id;
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
</style>`;
class CoreAnimationsPlugin extends hero_plugin_utils_1.CorePlugin {
    async onClientCommand(meta, action) {
        const frame = meta.page.mainFrame;
        await this.inFrame(this, frame)[action]();
    }
    inFrame(parent, frame) {
        return {
            [IAnimations_1.ACTION.disableAnimations]: async function () {
                await this.disableCssAnimations();
                // await this.pauseDebugger();
            },
            [IAnimations_1.ACTION.disableCssAnimations]: async function () {
                const fn = (disableString) => {
                    document.body.outerHTML += disableString;
                };
                await parent.executeFn(IAnimations_1.ACTION.disableCssAnimations, frame, fn, disableCssString);
            },
            [IAnimations_1.ACTION.enableAnimations]: async function () {
                await this[IAnimations_1.ACTION.enableCssAnimations]();
            },
            [IAnimations_1.ACTION.enableCssAnimations]: async function () {
                const fn = (disableString) => {
                    document.body.outerHTML = document.body.outerHTML.replace(disableString, '');
                };
                await parent.executeFn(IAnimations_1.ACTION.enableCssAnimations, frame, fn, disableCssString);
            },
        };
    }
    ;
    async executeFn(action, frame, fn, ...args) {
        const fnSerialized = `(${fn.toString()})(${JSON.stringify(args).slice(1, -1)});`;
        const result = await frame.evaluate(fnSerialized);
        if (result?.error) {
            this.logger.error(action, { error: result.error });
            throw new Error(result.error);
        }
    }
}
exports.CoreAnimationsPlugin = CoreAnimationsPlugin;
CoreAnimationsPlugin.id = id;
exports.default = { ClientAnimationsPlugin, CoreAnimationsPlugin };
//# sourceMappingURL=Animations.js.map