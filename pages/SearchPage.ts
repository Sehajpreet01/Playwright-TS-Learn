// pages/SearchPage.ts
import { Page, Locator } from '@playwright/test';

export class SearchPage {
    private page: Page;
    private searchInput: Locator;
    private searchResults: Locator;
    private filterDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('[data-test="search-box"]');
        this.searchResults = page.locator('.inventory_item');
        this.filterDropdown = page.locator('[data-test="product_sort_container"]');
    }

    async goto(): Promise<void> {
        // Navigate to inventory page where search is available
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async searchFor(term: string): Promise<void> {
        await this.searchInput.fill(term);
        await this.page.keyboard.press('Enter');
    }

    async getResultsCount(): Promise<number> {
        return await this.searchResults.count();
    }

    async filterBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.filterDropdown.selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        const products = this.page.locator('.inventory_item_name');
        const count = await products.count();
        const names: string[] = [];
        
        for (let i = 0; i < count; i++) {
            names.push(await products.nth(i).innerText());
        }
        
        return names;
    }

    async addToCart(productName: string): Promise<void> {
        await this.page
            .locator(`.inventory_item:has-text("${productName}") [data-test^="add-to-cart"]`)
            .click();
    }
}

