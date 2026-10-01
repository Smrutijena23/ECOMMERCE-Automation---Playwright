const BasePage = require('./BasePage');

class RegistrationPage extends BasePage {

    constructor(page) {

        super(page);

        this.firstName = page.getByLabel('First Name', { exact: true });

        this.lastName = page.getByPlaceholder('Last Name');

        this.email = page.getByPlaceholder('email@example.com', { exact: true });

        this.mobile = page.getByPlaceholder('enter your number', { exact: true });

        this.genderMale = page.locator("input[value='Male']");

        this.password = page.getByPlaceholder('Passsword', { exact: true });

        this.confirmPassword = page.getByLabel('Confirm Password', { exact: true });

        this.terms = page.locator("input[type='checkbox']");

        this.registerButton = page.locator("[name='login']");

        // Update this locator if your application shows a different message
        this.successMessage = page.locator(".headcolor");
    }

    async openRegistrationPage() {

        await this.navigate(
            "https://rahulshettyacademy.com/client/#/auth/register"
        );

    }

    async fillRegistrationForm(user) {

        await this.enterText(this.firstName, user.firstName);
        await this.enterText(this.lastName, user.lastName);
        await this.enterText(this.email, user.email);
        await this.enterText(this.mobile, user.mobile);
        await this.check(this.genderMale);
        await this.enterText(this.password, user.password);
        await this.enterText(this.confirmPassword, user.password);
        await this.check(this.terms);
    }
    async clickRegister() {
        await this.click(this.registerButton);
    }

    async register(user) {
        await this.fillRegistrationForm(user);
        await this.clickRegister();
    }

}

module.exports = RegistrationPage;