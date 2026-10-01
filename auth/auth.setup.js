const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const loginData = require('../fixtures/loginData.json');

test('Login Once', async ({ page }) => {

    const login = new LoginPage(page);

    await login.openLoginPage();

    await login.login(loginData.validUser);

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

});