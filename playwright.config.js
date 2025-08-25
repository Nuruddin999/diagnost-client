import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        headless: false, // чтоб видно было окно
        viewport: null,  // отключить ограничение viewport
        launchOptions: {
            args: ['--start-maximized'], // открыть в максимальном размере
        },
    },
});