const BasePage = require("./BasePage");

class CartPage extends BasePage {

    constructor(page) {
        super(page);

        // Cart page elements
        this.cartItems = page.locator(".cartSection");
        this.cartProductNames = page.locator(".cartSection h3");

        // Cart navigation
        this.cartButton = page.getByRole("link", { name: /cart/i });

        // Continue Shopping button
        this.continueShoppingButton = page.getByRole("button", {
            name: /continue shopping/i
        });
    }


    // -----------------------------------------
    // Open Cart
    // -----------------------------------------

    async openCart() {

        await this.page.getByRole("link", {
            name: /cart/i
        }).click();

        await this.page.waitForURL(/\/cart/);
    }


    // -----------------------------------------
    // Verify Cart Page is displayed
    // -----------------------------------------

    async isCartPageDisplayed() {

        return await this.page
            .getByRole("heading", { name: /my cart/i })
            .isVisible();
    }


    // -----------------------------------------
    // Get number of products in cart
    // -----------------------------------------

    async getCartItemCount() {

        return await this.cartItems.count();
    }


    // -----------------------------------------
    // Check product is present in cart
    // -----------------------------------------

    async isProductVisible(productName) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        return await product.isVisible();
    }


    // -----------------------------------------
    // Verify product is present
    // -----------------------------------------

    async verifyProduct(productName) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        await product.waitFor({
            state: "visible"
        });
    }


    // -----------------------------------------
    // Remove product from cart
    // -----------------------------------------

    async removeProduct(productName) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        await product
            .getByRole("button", {
                name: /delete|remove/i
            })
            .click();
    }


    // -----------------------------------------
    // Verify product is removed
    // -----------------------------------------

    async isProductRemoved(productName) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        return await product.count() === 0;
    }


    // -----------------------------------------
    // Continue Shopping
    // -----------------------------------------

    async continueShopping() {

        await this.continueShoppingButton.click();
    }
}

module.exports = CartPage;