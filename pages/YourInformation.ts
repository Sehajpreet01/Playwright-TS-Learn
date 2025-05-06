import { Page, Locator, expect } from '@playwright/test';

export class YourInformation {
    private page: Page;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private postalCode: Locator;
    private continueButton: Locator;
    private finishButton: Locator;
    private completeHeader: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
    }

    async fillYourInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
        await this.finishButton.click();
        await expect(this.completeHeader).toBeVisible();
    }
}
