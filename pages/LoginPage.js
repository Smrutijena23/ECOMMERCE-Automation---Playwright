const BasePage = require("./BasePage");

class LoginPage extends BasePage {

    constructor(page) {
        super(page);

        // =========================
        // Login Page Locators
        // =========================

        this.email = page.getByPlaceholder("email@example.com");

        this.password = page.getByPlaceholder("enter your passsword");

        this.loginButton = page.locator("#login");

        // Application toast error
        this.errorMessage = page.locator(".toast-error");

        // Application validation messages
        this.emailRequiredMessage = page.getByText(
            "*Email is required",
            { exact: true }
        );

        this.passwordRequiredMessage = page.getByText(
            "*Password is required",
            { exact: true }
        );
    }


    // =========================
    // Open Login Page
    // =========================

    async openLoginPage() {

        await this.navigate(
            "https://rahulshettyacademy.com/client/#/auth/login"
        );

        await this.email.waitFor({
            state: "visible"
        });
    }


    // =========================
    // Enter Email
    // =========================

    async enterEmail(email) {

        await this.email.fill(email);
    }


    // =========================
    // Enter Password
    // =========================

    async enterPassword(password) {

        await this.password.fill(password);
    }


    // =========================
    // Click Login
    // =========================

    async clickLogin() {

        await this.loginButton.click();
    }


    // =========================
    // Login
    // =========================

    async login(user) {

        await this.enterEmail(user.email);

        await this.enterPassword(user.password);

        await this.clickLogin();
    }


    // =========================
    // Error Toast
    // =========================

    async getToastMessage() {

        await this.errorMessage.waitFor({
            state: "visible"
        });

        return await this.errorMessage.textContent();
    }


    async isErrorMessageVisible() {

        return await this.errorMessage.isVisible();
    }


    // =========================
    // Email Validation
    // =========================

    async isEmailRequiredMessageVisible() {

        return await this.emailRequiredMessage.isVisible();
    }


    // =========================
    // Password Validation
    // =========================

    async isPasswordRequiredMessageVisible() {

        return await this.passwordRequiredMessage.isVisible();
    }


    // =========================
    // Native Browser Validation
    // =========================

    async getEmailValidationMessage() {

        return await this.email.evaluate(
            element => element.validationMessage
        );
    }


    async getPasswordValidationMessage() {

        return await this.password.evaluate(
            element => element.validationMessage
        );
    }
}

module.exports = LoginPage;