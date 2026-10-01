const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/LoginPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/cartpage");

const loginData = require("../fixtures/logindata.json");
const cartData = require("../fixtures/cartData.json");


test.describe("Cart Module", () => {


    // ==================================================
    // Test 1
    // Verify User Can Open Cart
    // ==================================================

    test("Verify user can open Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        // Wait for Dashboard
        await page.waitForURL(
            /\/dashboard/
        );


        // Open Cart
        await cart.openCart();


        // Verify URL
        await expect(page).toHaveURL(
            /\/dashboard\/cart/
        );


        // Verify My Cart
        await expect(
            page.getByText("My Cart", {
                exact: true
            })
        ).toBeVisible();

    });


    // ==================================================
    // Test 2
    // Add One Product
    // ==================================================

    test("Verify user can add product to Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        // Add Product
        await product.addProductToCart(
            cartData.product1.productName
        );


        // Open Cart
        await cart.openCart();


        // Verify Product
        await cart.verifyProduct(
            cartData.product1.productName
        );


        await expect(
            cart.getCartProduct(
                cartData.product1.productName
            )
        ).toBeVisible();

    });


    // ==================================================
    // Test 3
    // Verify Multiple Products
    // ==================================================

    test("Verify Cart can contain multiple products", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        // Add Product 1
        await product.addProductToCart(
            cartData.product1.productName
        );


        // Add Product 2
        await product.addProductToCart(
            cartData.product2.productName
        );


        // Add Product 3
        await product.addProductToCart(
            cartData.product3.productName
        );


        // Open Cart
        await cart.openCart();


        // Verify Product 1
        await expect(
            cart.getCartProduct(
                cartData.product1.productName
            )
        ).toBeVisible();


        // Verify Product 2
        await expect(
            cart.getCartProduct(
                cartData.product2.productName
            )
        ).toBeVisible();


        // Verify Product 3
        await expect(
            cart.getCartProduct(
                cartData.product3.productName
            )
        ).toBeVisible();

    });


    // ==================================================
    // Test 4
    // Verify Cart Product Count
    // ==================================================

    test("Verify correct number of products in Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        await product.addProductToCart(
            cartData.product1.productName
        );


        await product.addProductToCart(
            cartData.product2.productName
        );


        await product.addProductToCart(
            cartData.product3.productName
        );


        await cart.openCart();


        const count = await cart.getProductCount();


        expect(count).toBe(3);

    });


    // ==================================================
    // Test 5
    // Verify Product Names
    // ==================================================

    test("Verify product names displayed in Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        await product.addProductToCart(
            cartData.product1.productName
        );


        await product.addProductToCart(
            cartData.product2.productName
        );


        await product.addProductToCart(
            cartData.product3.productName
        );


        await cart.openCart();


        await expect(
            cart.getCartProduct(
                cartData.product1.productName
            )
        ).toBeVisible();


        await expect(
            cart.getCartProduct(
                cartData.product2.productName
            )
        ).toBeVisible();


        await expect(
            cart.getCartProduct(
                cartData.product3.productName
            )
        ).toBeVisible();

    });


    // ==================================================
    // Test 6
    // Verify Product Can Be Removed
    // ==================================================

    test("Verify user can remove product from Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        await product.addProductToCart(
            cartData.product1.productName
        );


        await cart.openCart();


        // Verify product exists
        await expect(
            cart.getCartProduct(
                cartData.product1.productName
            )
        ).toBeVisible();


        // Remove
        await cart.removeProduct(
            cartData.product1.productName
        );


        // Verify removed
        await expect(
            cart.getCartProduct(
                cartData.product1.productName
            )
        ).toHaveCount(0);

    });


    // ==================================================
    // Test 7
    // Verify Continue Shopping
    // ==================================================

    test("Verify user can continue shopping from Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const cart = new CartPage(page);


        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        await cart.openCart();


        await cart.continueShopping();


        await expect(page).toHaveURL(
            /\/dashboard/
        );

    });


    // ==================================================
    // Test 8
    // Verify Buy Now Button
    // ==================================================

    test("Verify Buy Now button is displayed for product", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        await product.addProductToCart(
            cartData.product1.productName
        );


        await cart.openCart();


        const productCard = cart.getCartProduct(
            cartData.product1.productName
        );


        await expect(
            productCard.getByRole("button", {
                name: /buy now/i
            })
        ).toBeVisible();

    });


    // ==================================================
    // Test 9
    // Verify Delete Button
    // ==================================================

    test("Verify delete button is displayed for product", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        await product.addProductToCart(
            cartData.product1.productName
        );


        await cart.openCart();


        const productCard = cart.getCartProduct(
            cartData.product1.productName
        );


        const buttons = productCard.getByRole("button");


        expect(
            await buttons.count()
        ).toBeGreaterThanOrEqual(2);

    });


    // ==================================================
    // Test 10
    // Verify Cart Badge
    // ==================================================

    test("Verify Cart badge shows product count", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        await page.waitForURL(
            /\/dashboard/
        );


        await product.addProductToCart(
            cartData.product1.productName
        );


        await product.addProductToCart(
            cartData.product2.productName
        );


        await product.addProductToCart(
            cartData.product3.productName
        );


        await cart.openCart();


        // Cart should contain 3 products
        expect(
            await cart.getProductCount()
        ).toBe(3);

    });

});