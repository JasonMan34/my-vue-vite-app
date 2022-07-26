/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_IS_COVID: string;
  readonly VITE_HAMMING_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
