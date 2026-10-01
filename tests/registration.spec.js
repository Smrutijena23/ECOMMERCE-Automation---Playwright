const { test, expect } = require('@playwright/test');

const RegistrationPage = require('../pages/RegistrationPage');

const registrationData = require('../fixtures/registrationdata');

test.describe("Registration Module", () => {

    test("Register with valid user", async ({ page }) => {

        const registration = new RegistrationPage(page);

        await registration.navigate();

        await registration.register(
            registrationData.validUser
        );

        await expect(page).toHaveURL(/register/);

    });

    test("Register with invalid email", async ({ page }) => {

        const registration = new RegistrationPage(page);

        await registration.navigate();

        await registration.register(
            registrationData.invalidUser
        );

    
    });

});
