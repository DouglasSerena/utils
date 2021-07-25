export declare const $: {
    <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K];
    <K_1 extends keyof SVGElementTagNameMap>(selectors: K_1): SVGElementTagNameMap[K_1];
    <E extends Element = Element>(selectors: string): E;
};
export declare const $$: {
    <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    <K_1 extends keyof SVGElementTagNameMap>(selectors: K_1): NodeListOf<SVGElementTagNameMap[K_1]>;
    <E extends Element = Element>(selectors: string): NodeListOf<E>;
};
