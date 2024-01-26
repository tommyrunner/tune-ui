import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'es',
    //静态文件目录
    assetsDir: 'css',
    //压缩
    minify: false,
    //css分离
    cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      input: ['packages/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: 'dist/es',
          assetFileNames: (assetInfo) => {
            //判断是静态资源且是css
            if (assetInfo.type === 'asset' && /\.(css)$/i.test(assetInfo.name || '')) {
              //截取出css打包名称中的组件名 button.vue_vue_type_style_index_0_lang.css 截出button
              let str = (assetInfo.name || 'style.').split('.')[0]
              //将组件css输出到组件目录下 组件/组件.css
              return `${str}/${str}.css`
            } else {
              //其他静态资源则返回默认的 后续也可以对其他资源文件细分
              return 'assets/[name].[ext]'
            }
          },
          preserveModulesRoot: ''
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: 'dist/lib',
          assetFileNames: (assetInfo) => {
            //判断是静态资源且是css
            if (assetInfo.type === 'asset' && /\.(css)$/i.test(assetInfo.name || '')) {
              //截取出css打包名称中的组件名 button.vue_vue_type_style_index_0_lang.css 截出button
              let str = (assetInfo.name || 'style.').split('.')[0]
              //将组件css输出到组件目录下 组件/组件.css
              return `${str}/${str}.css`
            } else {
              //其他静态资源则返回默认的 后续也可以对其他资源文件细分
              return 'assets/[name].[ext]'
            }
          },
          preserveModulesRoot: ''
        }
      ]
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    vue(),
    dts({
      //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
      outDir: 'dist/es'
    }),
    //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
    dts({
      outDir: 'dist/lib'
    }),
    {
      name: 'vite:import-css',
      apply: 'build',
      enforce: 'post',
      renderChunk(code, chunk) {
        // 判断是不是组件入口js
        if (!chunk.isEntry && chunk.type === 'chunk' && /\index.(js)$/i.test(chunk.fileName)) {
          // 截取出组件名称
          let str = chunk.fileName.split('/')[0]
          return `import './${str}.css';\n${code}`
        }
      }
    }
  ]
})
