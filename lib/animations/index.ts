// This import statement is important for all this to work, otherwise we don't extend but replace the ulixee module definition.
// https://github.com/microsoft/TypeScript/issues/10859
import type {} from '@ulixee/hero/lib/extendables';
import { IAnimations } from './IPlugin';
import { ClientAnimationsPlugin, CoreAnimationsPlugin } from './Plugin';

declare module '@ulixee/hero/lib/extendables' {
  interface Hero extends IAnimations {}
}

export { IAnimations, ClientAnimationsPlugin, CoreAnimationsPlugin };
export default { ClientAnimationsPlugin, CoreAnimationsPlugin };