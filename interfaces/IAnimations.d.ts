export declare enum ACTION {
    disableAnimations = "disableAnimations",
    disableCssAnimations = "disableCssAnimations",
    enableAnimations = "enableAnimations",
    enableCssAnimations = "enableCssAnimations"
}
export default interface IAnimations {
    [ACTION.disableAnimations](): Promise<void>;
    [ACTION.disableCssAnimations](): Promise<void>;
    [ACTION.enableAnimations](): Promise<void>;
    [ACTION.enableCssAnimations](): Promise<void>;
}
//# sourceMappingURL=IAnimations.d.ts.map