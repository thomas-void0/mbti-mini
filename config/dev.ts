import type { UserConfigExport } from "@tarojs/cli";
export default {
   logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {},
  env: {
    NODE_ENV: '"development"', // JSON.stringify('development')
  },
} satisfies UserConfigExport<'webpack5'>
