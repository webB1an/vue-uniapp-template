import { defineConfig, type UserConfig, type ConfigEnv, loadEnv } from "vite";

import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig>=> {
  console.log('mode:', mode);
  const env = loadEnv(mode, process.cwd());
  const UnoCss = await import('unocss/vite').then(i => i.default)

  return {
    plugins: [
      uni(),
      // 配置 UnoCSS
      UnoCss(),
      AutoImport({
        imports: [
          'vue',
          'uni-app',
        ],
        dts: 'src/types/auto-import.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json', // ESLint 配置文件路径
        },
      }),
    ],

    server: {
      host: '0.0.0.0',
      open: true,
      port: +env.VITE_PORT,
      // 反向代理配置
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_API_URL, // 目标服务器
          changeOrigin: true,           // 支持跨域
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""), // 去掉前缀
        },
      }
    }
  }
})
