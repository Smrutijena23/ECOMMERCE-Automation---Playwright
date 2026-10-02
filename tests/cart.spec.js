const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/LoginPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/cartpage");

const loginData = require("../fixtures/logindata.json");
const cartData = require("../fixtures/cartData.json");


test.describe("Cart Module", () => {


    // =====================================================
    // TEST 1 - Open Cart
    // =====================================================

    test("Verify User can open Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        // Open Cart
        await product.openCart();


        // Verify Cart URL
        await expect(page).toHaveURL(/\/cart/);


        // Verify My Cart heading
        await expect(
            page.getByRole("heading", {
                name: /my cart/i
            })
        ).toBeVisible();
    });



    // =====================================================
    // TEST 2 - Add One Product and Verify in Cart
    // =====================================================

    test("Verify added product is displayed in Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        // Add product
        await product.addProductToCart(
            cartData.product1.productName
        );


        // Open Cart
        await product.openCart();


        // Verify Cart page
        await expect(page).toHaveURL(/\/cart/);


        // Verify product
        await cart.verifyProduct(
            cartData.product1.productName
        );


        // Extra assertion
        await expect(
            page.getByText(
                cartData.product1.productName,
                { exact: true }
            )
        ).toBeVisible();
    });



    // =====================================================
    // TEST 3 - Add Multiple Products
    // =====================================================

    test("Verify multiple products are displayed in Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
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
        await product.openCart();


        // Verify Product 1
        await cart.verifyProduct(
            cartData.product1.productName
        );


        // Verify Product 2
        await cart.verifyProduct(
            cartData.product2.productName
        );


        // Verify Product 3
        await cart.verifyProduct(
            cartData.product3.productName
        );


        // Verify total cart items
        expect(
            await cart.getCartItemCount()
        ).toBe(3);
    });



    // =====================================================
    // TEST 4 - Verify Cart Count
    // =====================================================

    test("Verify Cart contains correct number of products", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        // Add three products
        await product.addProductToCart(
            cartData.product1.productName
        );

        await product.addProductToCart(
            cartData.product2.productName
        );

        await product.addProductToCart(
            cartData.product3.productName
        );


        // Open Cart
        await product.openCart();


        // Verify 3 products
        expect(
            await cart.getCartItemCount()
        ).toBe(3);
    });



    // =====================================================
    // TEST 5 - Remove Product
    // =====================================================

    test("Verify User can remove product from Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        // Add product
        await product.addProductToCart(
            cartData.product1.productName
        );


        // Open Cart
        await product.openCart();


        // Verify product exists
        await cart.verifyProduct(
            cartData.product1.productName
        );


        // Remove product
        await cart.removeProduct(
            cartData.product1.productName
        );


        // Verify product removed
        await expect(
            page.getByText(
                cartData.product1.productName,
                { exact: true }
            )
        ).not.toBeVisible();
    });



    // =====================================================
    // TEST 6 - Verify Empty Cart
    // =====================================================

    test("Verify Cart is empty after removing product", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        // Add product
        await product.addProductToCart(
            cartData.product1.productName
        );


        // Open Cart
        await product.openCart();


        // Remove product
        await cart.removeProduct(
            cartData.product1.productName
        );


        // Verify cart item count
        expect(
            await cart.getCartItemCount()
        ).toBe(0);


        // Verify empty cart message
        await expect(
            page.getByText(
                /No Products in Your Cart/i
            )
        ).toBeVisible();
    });



    // =====================================================
    // TEST 7 - Continue Shopping
    // =====================================================

    test("Verify User can Continue Shopping from Cart", async ({ page }) => {

        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);


        // Login
        await login.login(
            loginData.validUser.username,
            loginData.validUser.password
        );


        // Open Cart
        await product.openCart();


        // Continue Shopping
        await cart.continueShopping();


        // Verify user is back on products page
        await expect(page).not.toHaveURL(/\/cart/);
    });

});