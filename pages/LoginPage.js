const BasePage = require('./BasePage');

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.email = page.getByPlaceholder('email@example.com');

        this.password = page.getByPlaceholder('enter your passsword');

        this.loginButton = page.locator('#login');

        this.errorMessage = page.locator('.toast-error');
    }

    async openLoginPage() {

        await this.navigate(
            "https://rahulshettyacademy.com/client/#/auth/login"
        );

    }

    async enterEmail(email) {

        await this.enterText(this.email, email);

    }

    async enterPassword(password) {

        await this.enterText(this.password, password);

    }

    async clickLogin() {

        await this.click(this.loginButton);

    }

    async login(user) {

        await this.enterEmail(user.email);

        await this.enterPassword(user.password);

        await this.clickLogin();

    }

    async getToastMessage() {

        return await this.errorMessage.textContent();

    }

    async getEmailValidationMessage() {

        return await this.email.evaluate(el => el.validationMessage);

    }

    async getPasswordValidationMessage() {

        return await this.password.evaluate(el => el.validationMessage);

    }

}

module.exports = LoginPage;