const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');

const loginData = require('../fixtures/loginData.json');
const productData = require('../fixtures/productData.json');

test.describe("Product Module", () => {

    let login;
    let product;

    test.beforeEach(async ({ page }) => {

        login = new LoginPage(page);
        product = new ProductPage(page);

        // Login
        await login.openLoginPage();
        await login.login(loginData.validUser);

        // Verify Product Page
        await product.verifyProductPageLoaded();

    });

    test("Verify Product Page is displayed", async ({ page }) => {

        await expect(page).toHaveURL(/dashboard/);

    });

    test("Verify total products are displayed", async () => {

        const count = await product.getProductCount();

        expect(count).toBeGreaterThan(0);

    });

    test("Verify ZARA COAT 3 is available", async () => {

        const status = await product.verifyProductVisible(
            productData.product1.name
        );

        expect(status).toBeTruthy();

    });

    test("Verify ADIDAS ORIGINAL is available", async () => {

        const status = await product.verifyProductVisible(
            productData.product2.name
        );

        expect(status).toBeTruthy();

    });

    test("Verify invalid product is not available", async () => {

        const status = await product.verifyProductVisible(
            productData.invalidProduct.name
        );

        expect(status).toBeFalsy();

    });

    test("Verify user can add ZARA COAT 3 to cart", async () => {

        await product.addProductToCart(
            productData.product1.name
        );

    });

    test("Verify user can add ADIDAS ORIGINAL to cart", async () => {

        await product.addProductToCart(
            productData.product2.name
        );

    });

    test("Verify user can add multiple products", async () => {

        const products = [
            productData.product1.name,
            productData.product2.name
        ];

        await product.addMultipleProducts(products);

    });

    test("Verify user can open Cart", async ({ page }) => {

        await product.openCart();

        await expect(page).toHaveURL(/cart/);

    });

    test("Verify user can open Orders", async ({ page }) => {

        await product.openOrders();

        await expect(page).toHaveURL(/myorders/);
        

    });

  test("Verify User can Add the products to cart", async ({ page }) => {

    await product.addProductToCart("ZARA COAT 3");

    await product.openCart();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

});
    

    test("Verify User can Add Two Products to cart", async ({ page}) => {

        await product.addProductToCart("ZARA COAT 3");

        await product.addProductToCart("ADIDAS ORIGINAL");

        await product.openCart();

        await expect(
            page.getByText("ZARA COAT 3", { exact: true })
        ).toBeVisible();

        await expect(
            page.getByText("ADIDAS ORIGINAL", { exact: true })
        ).toBeVisible();

    });

        test("Verify User can Add ADIDAS ORIGINAL to cart", async ({ page }) => {

        await product.addProductToCart("ADIDAS ORIGINAL");

        await product.openCart();

        await expect(
            page.getByText("ADIDAS ORIGINAL", { exact: true })
        ).toBeVisible();

    });


    test("Verify User can Add IPHONE 13 PRO to cart", async ({ page}) => {

        await product.addProductToCart("IPHONE 13 PRO");

        await product.openCart();

        await expect(
            page.getByText("IPHONE 13 PRO", { exact: true })
        ).toBeVisible();

    });

test("Verify User can Add Multiple Products to cart", async ({ page}) => {

    await product.addProductToCart("ZARA COAT 3");

    await product.addProductToCart("ADIDAS ORIGINAL");

    await product.addProductToCart("IPHONE 13 PRO");

    await product.openCart();

    await expect(
        page.getByText("ZARA COAT 3", { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText("ADIDAS ORIGINAL", { exact: true })
    ).toBeVisible();


});



});
