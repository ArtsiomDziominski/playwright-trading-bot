const { test, expect } = require('@playwright/test');
require('dotenv').config();

const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const BURL = process.env.BURL;

test.describe('Login Tests', () => {
    test('should log in successfully and save token in cookies', async ({ page }) => {
        await page.goto(`${BURL}/login`, { waitUntil: 'networkidle' });

        await page.waitForSelector('input[name="email"]');
        await page.fill('input[name="email"]', LOGIN_EMAIL);
        await page.fill('input[name="current-password"]', LOGIN_PASSWORD);

        await page.click('button[type="submit"]');

        await page.waitForURL('**/bots');
        await expect(page).toHaveURL(/\/bots$/);

        const cookies = await page.context().cookies();
        const tokenCookie = cookies.find(cookie => cookie.name === 'token');
        expect(tokenCookie).toBeDefined();
        expect(tokenCookie.value).not.toBe('');
    });
});
