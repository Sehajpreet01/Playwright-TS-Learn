import { Page, Locator } from '@playwright/test';

export class FeedbackPage {
    private page: Page;
    private feedbackLink: Locator;
    private nameInput: Locator;
    private emailInput: Locator;
    private subjectInput: Locator;
    private messageInput: Locator;
    private submitButton: Locator;
    private ratingStars: Locator;
    private successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // SauceDemo doesn't have a built-in feedback form, so we'll assume it's accessed via a link
        this.feedbackLink = page.locator('a:has-text("Feedback")');
        
        // Form elements - these selectors are hypothetical and would need to be adjusted
        // for a real feedback form on a different site
        this.nameInput = page.locator('#feedback-name');
        this.emailInput = page.locator('#feedback-email');
        this.subjectInput = page.locator('#feedback-subject');
        this.messageInput = page.locator('#feedback-message');
        this.ratingStars = page.locator('.rating-star');
        this.submitButton = page.locator('#feedback-submit');
        this.successMessage = page.locator('.feedback-success');
    }

    async goto(): Promise<void> {
        // Since SauceDemo doesn't have a feedback page, we'll use an example URL
        // In a real project, this would be the actual feedback page URL
        await this.page.goto('https://www.saucedemo.com/');
        
        // In a real scenario, you might need to navigate to the feedback page from the main page
        // await this.feedbackLink.click();
    }

    async fillFeedbackForm(data: {
        name: string;
        email: string;
        subject: string;
        message: string;
        rating: number; // 1-5
    }): Promise<void> {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.subjectInput.fill(data.subject);
        await this.messageInput.fill(data.message);
        
        // Click on the appropriate star rating (1-5)
        if (data.rating >= 1 && data.rating <= 5) {
            await this.ratingStars.nth(data.rating - 1).click();
        }
    }

    async submitFeedback(): Promise<void> {
        await this.submitButton.click();
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.innerText();
    }

    // Method to validate form fields before submission
    async validateForm(): Promise<string[]> {
        const errors: string[] = [];
        
        if (!(await this.nameInput.inputValue())) {
            errors.push('Name is required');
        }
        
        if (!(await this.emailInput.inputValue())) {
            errors.push('Email is required');
        } else {
            // Basic email validation
            const emailValue = await this.emailInput.inputValue();
            if (!emailValue.includes('@') || !emailValue.includes('.')) {
                errors.push('Invalid email format');
            }
        }
        
        if (!(await this.messageInput.inputValue())) {
            errors.push('Message is required');
        }
        
        return errors;
    }
} 