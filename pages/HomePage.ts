import { Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;
    private burgerMenu: Locator;
    private shoppingCart: Locator;
    private inventoryItems: Locator;
    private productSortContainer: Locator;
    private itemsInCart: Locator;
    private addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.inventoryItems = page.locator('.inventory_item');
        this.productSortContainer = page.locator('[data-test="product_sort_container"]');
        this.itemsInCart = page.locator('.shopping_cart_badge');
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    }

    async goto(): Promise<void> {
        // Navigates to the homepage (inventory page)
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async openMenu(): Promise<void> {
        await this.burgerMenu.click();
    }

    async logout(): Promise<void> {
        await this.openMenu();
        await this.page.locator('#logout_sidebar_link').click();
    }

    async getProductCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.productSortContainer.selectOption(sortOption);
    }

    async addProductToCart(productName: string): Promise<void> {
        // Find product by name and click its Add to Cart button
        await this.addToCartButton.click();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        // Find product by name and click its Remove button
        await this.page
            .locator(`.inventory_item:has-text("${productName}") [data-test^="remove"]`)
            .click();
    }

    async getCartCount(): Promise<number | null> {
        if (await this.itemsInCart.isVisible()) {
            const text = await this.itemsInCart.innerText();
            return parseInt(text);
        }
        return 0;
    }

    async goToCart(): Promise<void> {
        await this.shoppingCart.click();
    }

    async getProductPrice(productName: string): Promise<string> {
        const priceElement = this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_price`);
        return await priceElement.innerText();
    }

    async getProductDescription(productName: string): Promise<string> {
        const descElement = this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_desc`);
        return await descElement.innerText();
    }
} 