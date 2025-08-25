// import { test, expect } from '@playwright/test';
//
// test.use({
//     screenshot: 'on',
//     video: 'on',
//     headless: false,
//     storageState: 'auth.json',
// });

// test('авторизованный пользователь видит дашборд', async ({ page }) => {
//     await page.goto('http://localhost:3000/main/fundTasks');
//     await page.waitForSelector('text=Недостаточно прав');
//     await page.waitForSelector('text=Недостаточно прав', { state: 'detached' });
// await page.waitForSelector('[data-testid="add-button"]', { state: 'visible' });
//     // await page.click('[data-testid="add-button"]');
//
// });

// tests/dashboard.spec.ts
import {expect, test} from '@playwright/test';
import {goToNewTask, login} from "./utils";

test.use({headless: false});
test('авторизованный пользователь видит дашборд', async ({page}) => {
    await login(page);
    await goToNewTask(page)
    const inputs = page.locator('input[placeholder="..."], textarea[placeholder="..."]');

    await expect(inputs).toHaveCount(4);

    const values = ['+79880000000', 'musa@musa.com', 'куратор', 'Малыгина1'];


    for (let i = 0; i < 4; i++) {
        await inputs.nth(i).fill(values[i]);
    }

    const addContactInput = page.locator('input[placeholder="Добавить контакт"]')
    await addContactInput.fill('Мусаев Муса')
    const addCompanyInput = page.locator('textarea[placeholder="Добавить компанию"]')
    await addCompanyInput.fill('Company')
    const contactType = page.locator('[data-testid="contactType"]');
    await contactType.click();
    const typeBox = page.locator('[data-testid="typeCheckbox"]');
    await expect(typeBox).toHaveCount(5);
    await typeBox.nth(2).click();
    await typeBox.nth(4).click();
    const closeTypes = page.locator('[data-testid="closeTypes"]');
    await closeTypes.click();
    await expect(contactType).toContainText('Мед учреждение фонда');
    await expect(contactType).toContainText('Директор фонда');

    const bottomSaveBar = page.locator('[data-testid="addBottom"]');
    await expect(bottomSaveBar).toHaveCount(1);

    for (let i = 0; i < 4; i++) {
        await inputs.nth(i).fill("");
    }
    await addContactInput.fill("")
    await addCompanyInput.fill("")
    await contactType.click();
    await typeBox.nth(2).click();
    await typeBox.nth(4).click();
    await closeTypes.click();
    await expect(bottomSaveBar).toHaveCount(0);
    await addContactInput.fill('Мусаев Муса')
    await expect(bottomSaveBar).toHaveCount(1);
    await addContactInput.fill("")
    await expect(bottomSaveBar).toHaveCount(0);
    await addCompanyInput.fill('Company')
    await expect(bottomSaveBar).toHaveCount(1);
    await addCompanyInput.fill('')
    await expect(bottomSaveBar).toHaveCount(0);
    await contactType.click();
    await typeBox.nth(2).click();
    await typeBox.nth(4).click();
    await closeTypes.click();
    await expect(bottomSaveBar).toHaveCount(1);
    await contactType.click();
    await typeBox.nth(2).click();
    await typeBox.nth(4).click();
    await closeTypes.click();
    await expect(bottomSaveBar).toHaveCount(0);
    for (let i = 0; i < 4; i++) {
        await inputs.nth(i).fill(values[i]);
        await expect(bottomSaveBar).toHaveCount(1);
        await inputs.nth(i).fill("");
        await expect(bottomSaveBar).toHaveCount(0);
    }
    const birthInput = page.locator('input[placeholder="dd.mm.yyyy"]');
    await birthInput.fill('20.08.2010');
    await expect(bottomSaveBar).toHaveCount(1);
    await birthInput.fill('06.08.2025');
    await expect(bottomSaveBar).toHaveCount(0);
    await addContactInput.fill('Мусаев Муса')
    await addCompanyInput.fill('Company')
    await contactType.click();
    await typeBox.nth(2).click();
    await typeBox.nth(4).click();
    await closeTypes.click();
    for (let i = 0; i < 4; i++) {
        await inputs.nth(i).fill(values[i]);
    }

    await birthInput.fill('20.08.2010');
     const saveButton = page.locator('[data-testid="saveButton"]');
     await saveButton.click();
    await page.getByRole('button', { name: 'еще' }).click();

    await page.pause();
});

