const BasePage = require('./BasePage');

class DashboardPage extends BasePage {

    constructor(page) {

        super(page);

        this.dashboardTitle = page.locator(".left.mt-1");

        this.products = page.locator(".card-body");

        this.cartButton = page.locator("[routerlink='/dashboard/cart']");

        this.ordersButton = page.locator("[routerlink='/dashboard/myorders']");

        this.logoutButton = page.locator("button.btn.btn-custom[routerlink='/dashboard/auth']");

        this.toastMessage = page.locator("#toast-container");

    }

    async verifyDashboardLoaded() {

        await this.dashboardTitle.waitFor();

    }

    async addProductToCart(productName) {

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {

            const product = this.products.nth(i);

            const name = await product.locator("b").textContent();

            if (name.trim() === productName) {

                await product.locator("button:has-text('Add To Cart')").click();

                break;

            }

        }

    }

    async verifyProductAdded() {

        await this.toastMessage.waitFor();

    }

    async openCart() {

        await this.cartButton.click();

    }

    async openOrders() {

        await this.ordersButton.click();

    }

    async logout() {

        await this.logoutButton.click();

    }

}

module.exports = DashboardPage;