import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'node:fs';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { atoms } from '@metagptx/web-sdk/plugins';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import Sitemap from 'vite-plugin-sitemap';
import { getBlogRoutes } from './prerender/blog-routes.js';
import { getSitemapLastmod } from './prerender/blog-sitemap.js';

const BASE_PATH = '/kaarox-site/';

function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

process.env.VITE_APP_TITLE ??=
  process.env.OVERVIEW_TITLE ?? 'Kaarox';

process.env.VITE_APP_DESCRIPTION ??=
  process.env.OVERVIEW_DESCRIPTION ??
  'Connect, discover services, professionals and opportunities with Kaarox.';

process.env.VITE_APP_TITLE = escapeHtmlAttr(
  process.env.VITE_APP_TITLE,
);

process.env.VITE_APP_DESCRIPTION = escapeHtmlAttr(
  process.env.VITE_APP_DESCRIPTION,
);

// Always use the Kaarox logo.
// Do not allow an old Atoms/MetaGPT overview logo to override it.
process.env.VITE_APP_LOGO_URL =
  `${BASE_PATH}assets/kaarox-logo.png`;

function ensureBuildOutDir() {
  let outDir = path.resolve(__dirname, 'dist');

  return {
    name: 'ensure-build-out-dir',

    configResolved(config: any) {
      outDir = path.resolve(
        config.root,
        config.build.outDir,
      );
    },

    closeBundle: {
      order: 'pre' as const,

      handler() {
        fs.mkdirSync(outDir, {
          recursive: true,
        });
      },
    },
  };
}

export default defineConfig(({ command }) => {
  const blogPrerenderRoutes =
    command === 'build'
      ? getBlogRoutes()
      : [];

  return {
    base: BASE_PATH,

    plugins: [
      viteSourceLocator({
        prefix: 'mgx',
      }),

      react(),

      atoms(),

      ensureBuildOutDir(),

      Sitemap({
        hostname: 'https://bartnx24.github.io/kaarox-site',

        outDir: path.resolve(
          __dirname,
          'dist',
        ),

        lastmod: getSitemapLastmod(),

        readable: true,

        generateRobotsTxt: false,
      }),

      ...(blogPrerenderRoutes.length > 0
        ? vitePrerenderPlugin({
            renderTarget: '#root',

            prerenderScript: path.resolve(
              __dirname,
              'prerender/blog.js',
            ),

            additionalPrerenderRoutes:
              blogPrerenderRoutes,
          })
        : []),
    ],

    resolve: {
      alias: {
        '@': path.resolve(
          __dirname,
          './src',
        ),
      },
    },

    server: {
      host: '0.0.0.0',

      port: parseInt(
        process.env.VITE_PORT || '3000',
      ),

      proxy: {
        '/api': {
          target: `http://localhost:${
            process.env.BACKEND_PORT || '8000'
          }`,

          changeOrigin: true,
        },
      },

      watch: {
        usePolling: true,
        interval: 600,
      },
    },

    build: {
      outDir: 'dist',

      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': [
              'react',
              'react-dom',
            ],

            'router-vendor': [
              'react-router-dom',
            ],

            'ui-vendor': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-aspect-ratio',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-context-menu',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-hover-card',
              '@radix-ui/react-label',
              '@radix-ui/react-menubar',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-progress',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-scroll-area',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slider',
              '@radix-ui/react-slot',
              '@radix-ui/react-switch',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-toggle',
              '@radix-ui/react-toggle-group',
              '@radix-ui/react-tooltip',
            ],

            'form-vendor': [
              'react-hook-form',
              '@hookform/resolvers',
              'zod',
            ],

            'utils-vendor': [
              'axios',
              'clsx',
              'tailwind-merge',
              'class-variance-authority',
              'date-fns',
              'lucide-react',
            ],

            'query-vendor': [
              '@tanstack/react-query',
            ],
          },
        },
      },

      chunkSizeWarningLimit: 1000,
    },
  };
});
