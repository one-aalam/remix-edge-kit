const alias = require('esbuild-plugin-alias');
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill');

// "build:worker": "esbuild --define:process.env.NODE_ENV='\"production\"' --minify --bundle --sourcemap --outdir=dist ./worker",
// "dev:worker": "esbuild --define:process.env.NODE_ENV='\"development\"' --bundle --sourcemap --outdir=dist ./worker",

const isProd = process.env.NODE_ENV === 'production'

require('esbuild')
  .build({
    entryPoints: ['./worker'],
    bundle: true,
    sourcemap: true,
    minify: isProd,
    outdir: 'dist',
    inject: ['./process-shim.js'],
    define: {
        __dirname: JSON.stringify(__dirname),
      "process.env.NODE_ENV": `"${process.env.NODE_ENV ?? 'development'}"`,
    },
    plugins: [
        NodeModulesPolyfillPlugin(),
        alias({
            '@prisma/client': require.resolve('@prisma/client'),
        }),
    ],
  })
  .catch(() => process.exit(1));
