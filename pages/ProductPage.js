const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class ProductPage extends BasePage {

    constructor(page) {

        super(page);

        this.page = page;

        // Product Cards
        this.products = page.locator(".card-body");

        // Navigation
        this.cartButton = page.locator("[routerlink='/dashboard/cart']");
        this.ordersButton = page.locator("[routerlink='/dashboard/myorders']");

        // Loader & Toast
        this.spinner = page.locator(".ng-animating");
        this.toast = page.locator("#toast-container");

        // Search (optional)
        this.searchBox = page.locator("input[placeholder='Search']");
    }

    // ==========================
    // Verify Product Page Loaded
    // ==========================

    async verifyProductPageLoaded() {

        await expect(this.products.first()).toBeVisible();

    }

    // ==========================
    // Search Product
    // ==========================

    async searchProduct(productName) {

        if (await this.searchBox.count() > 0) {

            await this.searchBox.fill(productName);

        }

    }

    // ==========================
    // Get Product Count
    // ==========================

    async getProductCount() {

        return await this.products.count();

    }

    // ==========================
    // Get All Product Names
    // ==========================

    async getAllProductNames() {

        const names = [];

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {

            const productName = await this.products
                .nth(i)
                .locator("b")
                .textContent();

            names.push(productName.trim());

        }

        return names;

    }

    // ==========================
    // Verify Product Exists
    // ==========================

    async verifyProductVisible(productName) {

        const products = await this.getAllProductNames();

        return products.includes(productName);

    }

    // ==========================
    // Wait For Loader
    // ==========================

    async waitForLoader() {

        if (await this.spinner.count() > 0) {

            await this.spinner.last().waitFor({
                state: "hidden",
                timeout: 10000
            });

        }

    }

    // ==========================
    // Add Single Product
    // ==========================

    async addProductToCart(productName) {

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {

            const product = this.products.nth(i);

            const name = await product.locator("b").textContent();

            if (name.trim() === productName) {

                const addButton = product.locator("button:has-text('Add To Cart')");

                await addButton.click();

                break;

            }

        }

        // Wait for loading animation to finish
        await this.waitForLoader();

        // Small UI stabilisation wait
        await this.page.waitForTimeout(500);

    }

    // ==========================
    // Add Multiple Products
    // ==========================

    async addMultipleProducts(productList) {

        for (const product of productList) {

            await this.addProductToCart(product);

        }

    }

    // ==========================
    // Open Cart
    // ==========================

    async openCart() {

        await this.cartButton.click();

    }

    // ==========================
    // Open Orders
    // ==========================

    async openOrders() {

        await this.ordersButton.click();

    }

}

module.exports = ProductPage;