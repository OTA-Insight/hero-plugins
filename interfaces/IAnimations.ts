import type { IFrame } from '@ulixee/unblocked-specification/agent/browser/IFrame';

export enum ACTION {
    disableAnimations = 'disableAnimations',
    disableCssAnimations = 'disableCssAnimations',
    pauseDebugger = 'pauseDebugger',
    enableAnimations = 'enableAnimations',
    enableCssAnimations = 'enableCssAnimations',
    resumeDebbuger = 'resumeDebbuger',
}

export default interface IAnimations {
    [ACTION.disableAnimations](frame?: IFrame): Promise<void>;
    [ACTION.disableCssAnimations](frame?: IFrame): Promise<void>;
    [ACTION.pauseDebugger](frame?: IFrame): Promise<void>;
    [ACTION.enableAnimations](frame?: IFrame): Promise<void>;
    [ACTION.enableCssAnimations](frame?: IFrame): Promise<void>;
    [ACTION.resumeDebbuger](frame?: IFrame): Promise<void>;
}
