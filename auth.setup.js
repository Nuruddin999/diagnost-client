const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/auth/login');

    await page.waitForSelector('input[placeholder="Email"]');
    await page.fill('input[placeholder="Email"]', 'test2@test2.com');
    await page.fill('input[placeholder="Пароль"]', 'Filltest22999@');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/main/table');

    const storage = await context.storageState();
    fs.writeFileSync('auth.json', JSON.stringify(storage));

    await browser.close();
})();
