const { test, expect } = require('@playwright/test');

const DashboardPage = require('../pages/DashboardPage');

const dashboardData = require('../fixtures/dashboardData.json');

test.describe("Dashboard Module", () => {

    let dashboard;

    test.beforeEach(async ({ page }) => {

        dashboard = new DashboardPage(page);

        await page.goto("https://rahulshettyacademy.com/client/#/dashboard");

    });

    test("Verify dashboard loads", async ({ page }) => {

        await dashboard.verifyDashboardLoaded();

        await expect(page).toHaveURL(/dashboard/);

    });

    test("Verify add product to cart", async () => {

        await dashboard.addProductToCart(
            dashboardData.product1.productName
        );

        await dashboard.verifyProductAdded();

    });

    test("Verify open cart", async ({ page }) => {

        await dashboard.openCart();

        await expect(page).toHaveURL(/cart/);

    });

});