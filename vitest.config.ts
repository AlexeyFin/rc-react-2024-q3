import {mergeConfig} from 'vite'
import {defineConfig} from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: './src/setupTests.ts',
            exclude: [
                '**/node_modules/**',
                '**/dist/**',
                '**/cypress/**',
                '**/.{idea,git,cache,output,temp}/**',
                './src/config/**',
                '.enum.ts',
            ],
            coverage: {
                reporter: ['text', 'json', 'html'],
                exclude: ['**/*.enum.ts', '.eslintrc.cjs ']
            },

        },
    }),
)
