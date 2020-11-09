import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.OutOfMilkv2',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'app',
} as NativeScriptConfig
