const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/LoginPage");

const loginData = require("../fixtures/logindata.json");


test.describe("Login Module", () => {

    let login;


    // ==========================================
    // BEFORE EACH
    // ==========================================

    test.beforeEach(async ({ page }) => {

        login = new LoginPage(page);

        await login.openLoginPage();
    });


    // ==========================================
    // 1. VALID LOGIN
    // ==========================================

    test("Verify user can login with valid credentials", async ({ page }) => {

        await login.login(loginData.validUser);

        await expect(page).toHaveURL(/dashboard/);

    });


    // ==========================================
    // 2. INVALID PASSWORD
    // ==========================================

    test("Verify login with invalid password", async () => {

        await login.login(loginData.invalidPassword);

        await expect(login.errorMessage).toBeVisible();

    });


    // ==========================================
    // 3. INVALID EMAIL
    // ==========================================

    test("Verify login with invalid email", async () => {

        await login.login(loginData.invalidEmail);

        await expect(login.errorMessage).toBeVisible();

    });


    // ==========================================
    // 4. BLANK EMAIL
    // ==========================================

    test("Verify login with blank email", async () => {

        await login.login(loginData.blankEmail);

        await expect(
            login.emailRequiredMessage
        ).toBeVisible();

    });


    // ==========================================
    // 5. BLANK PASSWORD
    // ==========================================

    test("Verify login with blank password", async () => {

        await login.login(loginData.blankPassword);

        await expect(
            login.passwordRequiredMessage
        ).toBeVisible();
        console.log("Password required message is visible");

    });


    // ==========================================
    // 6. BLANK EMAIL AND PASSWORD
    // ==========================================

    test("Verify login with blank email and password", async () => {

        await login.login(loginData.blankCredentials);

        await expect(
            login.emailRequiredMessage
        ).toBeVisible();

        await expect(
            login.passwordRequiredMessage
        ).toBeVisible();

    });


    // ==========================================
    // 7. NUMBERS ONLY
    // ==========================================

    test("Verify login with numbers only", async () => {

        await login.login(loginData.numbersOnly);

        await expect(login.errorMessage).toBeVisible();

    });


    // ==========================================
    // 8. INVALID EMAIL FORMAT
    // ==========================================

    test("Verify login with invalid email format", async () => {

        await login.login(loginData.invalidEmailFormat);

        const message =
            await login.getEmailValidationMessage();

        expect(message).not.toBe("");

    });


    // ==========================================
    // 9. SPECIAL CHARACTERS
    // ==========================================

    test("Verify login with special characters", async () => {

        await login.login(loginData.specialCharacters);

        await expect(login.errorMessage).toBeVisible();

    });
    // 10. LONG CREDENTIALS
    
    test("Verify login with long credentials", async () => {

        await login.login(loginData.longCredentials);

        await expect(login.errorMessage).toBeVisible();

    });

    // 11. LOGIN PAGE DISPLAY

    test("Verify login page is displayed", async () => {

        await expect(login.email).toBeVisible();

        await expect(login.password).toBeVisible();

        await expect(login.loginButton).toBeVisible();

    });
    
    // 12. EMAIL FIELD EDITABLE
   
    
    test("Verify email field is editable", async () => {

        await expect(login.email).toBeEditable();

    });


    // ==========================================
    // 13. PASSWORD FIELD EDITABLE
    // ==========================================

    test("Verify password field is editable", async () => {

        await expect(login.password).toBeEditable();

    });


    // ==========================================
    // 14. PASSWORD IS MASKED
    // ==========================================

    test("Verify password field is masked", async () => {

        await expect(login.password).toHaveAttribute(
            "type",
            "password"
        );

    });

});


