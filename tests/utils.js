// helpers/login.ts
export async function login(page, email = 'test2@test2.com', password = 'Filltest22999@') {
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Пароль"]', password);
    await page.click('button[type="submit"]');

    // дождаться редиректа или нужной страницы
    await page.waitForURL('**/main/**');

    return page;
}

export async function goToNewTask(page) {
    await page.goto('http://localhost:3000/main/fundTasks');
    await page.waitForSelector('[data-testid="add-button"]', {state: 'visible'});
    await page.click('[data-testid="add-button"]');
    await page.waitForSelector('[data-testid="newTask"]', {state: 'visible'});
}