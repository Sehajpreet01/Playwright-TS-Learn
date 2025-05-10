# Test info

- Name: Full E2E Flow: Login, Home, Checkout, Logout >> Checkout a product
- Location: D:\All Work\playwright-ts-demo\tests\pom_model.test.ts:92:9

# Error details

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#add-to-cart-sauce-labs-backpack')
    - locator resolved to <button id="add-to-cart-sauce-labs-backpack" name="add-to-cart-sauce-labs-backpack" data-test="add-to-cart-sauce-labs-backpack" class="btn btn_primary btn_small btn_inventory ">Add to cart</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

    at HomePage.addProductToCart (D:\All Work\playwright-ts-demo\pages\HomePage.ts:48:36)
    at D:\All Work\playwright-ts-demo\tests\pom_model.test.ts:94:22
```

# Page snapshot

```yaml
- button "Open Menu"
- img "Open Menu"
- text: Swag Labs Products Name (A to Z)
- combobox:
  - option "Name (A to Z)" [selected]
  - option "Name (Z to A)"
  - option "Price (low to high)"
  - option "Price (high to low)"
- link "Sauce Labs Backpack":
  - /url: "#"
  - img "Sauce Labs Backpack"
- link "Sauce Labs Backpack":
  - /url: "#"
- text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
- button "Add to cart"
- link "Sauce Labs Bike Light":
  - /url: "#"
  - img "Sauce Labs Bike Light"
- link "Sauce Labs Bike Light":
  - /url: "#"
- text: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99
- button "Add to cart"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
  - img "Sauce Labs Bolt T-Shirt"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
- text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
- button "Add to cart"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
  - img "Sauce Labs Fleece Jacket"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
- text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
- button "Add to cart"
- link "Sauce Labs Onesie":
  - /url: "#"
  - img "Sauce Labs Onesie"
- link "Sauce Labs Onesie":
  - /url: "#"
- text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
- button "Add to cart"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
  - img "Test.allTheThings() T-Shirt (Red)"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
- text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
- button "Add to cart"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
   1 | import { Page, Locator } from '@playwright/test';
   2 |
   3 | export class HomePage {
   4 |     private page: Page;
   5 |     private burgerMenu: Locator;
   6 |     private shoppingCart: Locator;
   7 |     private inventoryItems: Locator;
   8 |     private productSortContainer: Locator;
   9 |     private itemsInCart: Locator;
  10 |     private addToCartButton: Locator;
  11 |     private checkoutButton: Locator;
  12 |
  13 |     constructor(page: Page) {
  14 |         this.page = page;
  15 |         this.burgerMenu = page.locator('#react-burger-menu-btn');
  16 |         this.shoppingCart = page.locator('.shopping_cart_link');
  17 |         this.inventoryItems = page.locator('.inventory_item');
  18 |         this.productSortContainer = page.locator('[data-test="product_sort_container"]');
  19 |         this.itemsInCart = page.locator('.shopping_cart_badge');
  20 |         this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
  21 |         this.checkoutButton = page.locator('#checkout');
  22 |     }
  23 |
  24 |     async goto(): Promise<void> {
  25 |         // Navigates to the homepage (inventory page)
  26 |         await this.page.goto('https://www.saucedemo.com/inventory.html');
  27 |     }
  28 |
  29 |     async openMenu(): Promise<void> {
  30 |         await this.burgerMenu.click();
  31 |     }
  32 |
  33 |     async logout(): Promise<void> {
  34 |         await this.openMenu();
  35 |         await this.page.locator('#logout_sidebar_link').click();
  36 |     }
  37 |
  38 |     async getProductCount(): Promise<number> {
  39 |         return await this.inventoryItems.count();
  40 |     }
  41 |
  42 |     async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
  43 |         await this.productSortContainer.selectOption(sortOption);
  44 |     }
  45 |
  46 |     async addProductToCart(productName: string): Promise<void> {
  47 |         // Find product by name and click its Add to Cart button
> 48 |         await this.addToCartButton.click();
     |                                    ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  49 |     }
  50 |
  51 |     async removeProductFromCart(productName: string): Promise<void> {
  52 |         // Find product by name and click its Remove button
  53 |         await this.page
  54 |             .locator(`.inventory_item:has-text("${productName}") [data-test^="remove"]`)
  55 |             .click();
  56 |     }
  57 |
  58 |     async getCartCount(): Promise<number | null> {
  59 |         if (await this.itemsInCart.isVisible()) {
  60 |             const text = await this.itemsInCart.innerText();
  61 |             return parseInt(text);
  62 |         }
  63 |         return 0;
  64 |     }
  65 |
  66 |     async goToCart(): Promise<void> {
  67 |         await this.shoppingCart.click();
  68 |     }
  69 |
  70 |     async getProductPrice(productName: string): Promise<string> {
  71 |         const priceElement = this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_price`);
  72 |         return await priceElement.innerText();
  73 |     }
  74 |
  75 |     async getProductDescription(productName: string): Promise<string> {
  76 |         const descElement = this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_desc`);
  77 |         return await descElement.innerText();
  78 |     }
  79 |
  80 |     async checkout(): Promise<void> {
  81 |         await this.checkoutButton.click();
  82 |     }
  83 | } 
```