import type { DefineComponent } from "vue";

/**
 * 组件类型
 * @param {P} P - 组件的Props类型
 * @param {E} E - 组件的Exposes类型
 * @param {S} S - 组件的Slots类型
 * @param {M} M - 组件的Emits类型
 */
// @ts-expect-error
export type SFCWithInstall<P, E, S, M> = DefineComponent<P, E, {}, {}, {}, S, {}, M>;
