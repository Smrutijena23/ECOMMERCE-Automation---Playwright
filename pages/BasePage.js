class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async enterText(locator, text) {
        await locator.fill(text);
    }

    async click(locator) {
        await locator.click();
    }

    async check(locator) {
        await locator.check();
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async isVisible(locator) {
        return await locator.isVisible();
    }

}

module.exports = BasePage;