const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');

const loginData = require('../fixtures/loginData.json');

test.describe("Login Module", () => {

    let login;

    test.beforeEach(async ({ page }) => {

        login = new LoginPage(page);

        await login.openLoginPage();

    });

    test("Verify user can login with valid credentials", async ({ page }) => {

        await login.login(loginData.validUser);

        await expect(page).toHaveURL(/dashboard/);

    });

    test("Verify login with invalid password", async () => {

        await login.login(loginData.invalidPassword);

        await expect(login.errorMessage).toBeVisible();

    });

    test("Verify login with invalid email", async () => {

        await login.login(loginData.invalidEmail);

        await expect(login.errorMessage).toBeVisible();

    });

    test("Verify login with blank email", async () => {

        await login.login(loginData.blankEmail);

        const message = await login.getEmailValidationMessage();

        expect(message).not.toBe("");

    });

    test("Verify login with blank password", async () => {

        await login.login(loginData.blankPassword);

        const message = await login.getPasswordValidationMessage();

        expect(message).not.toBe("");

    });

    test("Verify login with blank email and password", async () => {

        await login.login(loginData.blankCredentials);

        const message = await login.getEmailValidationMessage();

        expect(message).not.toBe("");

    });

    test("Verify login with numbers only", async () => {

        await login.login(loginData.numbersOnly);

        await expect(login.errorMessage).toBeVisible();

    });

    test("Verify login with invalid email format", async () => {

        await login.login(loginData.invalidEmailFormat);

        const message = await login.getEmailValidationMessage();

        expect(message).not.toBe("");

    });

    test("Verify login with special characters", async () => {

        await login.login(loginData.specialCharacters);

        const message = await login.getEmailValidationMessage();

        expect(message).not.toBe("");

    });

});


