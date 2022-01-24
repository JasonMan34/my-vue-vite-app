import { InjectionKey, Ref } from 'vue';

export const ActiveTabKey: InjectionKey<Ref<number>> = Symbol('ActiveTabKey');
export const ChangeTabKey: InjectionKey<(index: number) => void> =
  Symbol('ChangeTabKey');
