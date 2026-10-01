const BasePage = require("./BasePage");

class CartPage extends BasePage {

    constructor(page) {
        super(page);

        // -----------------------------
        // Navigation
        // -----------------------------

        this.cartLink = page.locator(
            "[routerlink='/dashboard/cart']"
        );


        // -----------------------------
        // Cart
        // -----------------------------

        this.cartItems = page.locator(".cartSection");

        this.cartProductNames = page.locator(
            ".cartSection h3"
        );


        // -----------------------------
        // Buttons
        // -----------------------------

        this.continueShoppingButton = page.getByRole(
            "button",
            {
                name: /continue shopping/i
            }
        );


        // -----------------------------
        // Empty Cart Message
        // -----------------------------

        this.emptyCartMessage = page.getByText(
            "No Products in Your Cart !",
            {
                exact: true
            }
        );
    }


    // ==========================================
    // Open Cart
    // ==========================================

    async openCart() {

        await this.cartLink.click();

        await this.page.waitForURL(
            /\/dashboard\/cart/
        );
    }


    // ==========================================
    // Get Cart Product
    // ==========================================

    getCartProduct(productName) {

        return this.cartItems.filter({
            hasText: productName
        });
    }


    // ==========================================
    // Check Product Is Visible
    // ==========================================

    async isProductVisible(productName) {

        const product = this.getCartProduct(
            productName
        );

        return await product.isVisible();
    }


    // ==========================================
    // Verify Product
    // ==========================================

    async verifyProduct(productName) {

        const product = this.getCartProduct(
            productName
        );

        await product.waitFor({
            state: "visible"
        });
    }


    // ==========================================
    // Get Number Of Cart Products
    // ==========================================

    async getProductCount() {

        return await this.cartItems.count();
    }


    // ==========================================
    // Remove Product
    // ==========================================

    async removeProduct(productName) {

        const product = this.getCartProduct(
            productName
        );

        await product
            .getByRole("button")
            .last()
            .click();
    }


    // ==========================================
    // Buy Product
    // ==========================================

    async buyProduct(productName) {

        const product = this.getCartProduct(
            productName
        );

        await product
            .getByRole("button", {
                name: /buy now/i
            })
            .click();
    }


    // ==========================================
    // Continue Shopping
    // ==========================================

    async continueShopping() {

        await this.continueShoppingButton.click();
    }


    // ==========================================
    // Check Empty Cart
    // ==========================================

    async isCartEmpty() {

        return await this.emptyCartMessage.isVisible();
    }


    // ==========================================
    // Get Product Names
    // ==========================================

    async getProductNames() {

        return await this.cartProductNames.allTextContents();
    }
}

module.exports = CartPage;