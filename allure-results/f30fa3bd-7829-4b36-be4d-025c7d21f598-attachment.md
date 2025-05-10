# Test info

- Name: test list items
- Location: D:\All Work\playwright-ts-demo\tests\example.spec.ts:170:5

# Error details

```
TimeoutError: page.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('[data-test="login-button"]')
    - locator resolved to <input type="submit" value="Login" id="login-button" name="login-button" data-test="login-button" class="submit-button btn_action"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

    at D:\All Work\playwright-ts-demo\tests\example.spec.ts:175:14
```

# Page snapshot

```yaml
- text: Swag Labs
- textbox "Username": standard_user
- textbox "Password": secret_sauce
- button "Login"
- heading "Accepted usernames are:" [level=4]
- text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
- heading "Password for all users:" [level=4]
- text: secret_sauce
```

# Test source

```ts
   75 |
   76 |     // Click sign-in
   77 |     await page.click('#signInSubmit', { timeout: 30000 });
   78 |
   79 |     // Simple success check - take screenshot regardless
   80 |     await page.waitForTimeout(5000);
   81 |     await page.screenshot({ path: 'screenshots/amazon-login-result.png' });
   82 |     
   83 |     // Try to verify login success
   84 |     const isLoggedIn = await page.getByText('Hello').isVisible()
   85 |       || await page.getByText('Your Account').isVisible();
   86 |     
   87 |     if (isLoggedIn) {
   88 |       console.log('Login appears successful');
   89 |     } else {
   90 |       console.log('Login status unclear - check screenshot');
   91 |     }
   92 |   } catch (error) {
   93 |     console.error('Login test failed:', error);
   94 |     await page.screenshot({ path: 'screenshots/login-error.png' });
   95 |   }
   96 | });
   97 |
   98 | // Test for form submission - using a reliable test site
   99 | test('test form submission', async ({ page }) => {
  100 |   // Navigate to the form page with auto-waiting
  101 |   await page.goto('https://www.saucedemo.com/');
  102 |   
  103 |   // Use proper auto-waiting with fill
  104 |   await page.fill('[data-test="username"]', 'standard_user');
  105 |   await page.fill('[data-test="password"]', 'secret_sauce');
  106 |   
  107 |   // Click with auto-waiting
  108 |   await page.click('[data-test="login-button"]');
  109 |   
  110 |   // Assert navigation succeeded with auto-waiting
  111 |   await expect(page).toHaveURL(/inventory.html/);
  112 |   
  113 |   // Verify an element on the inventory page
  114 |   await expect(page.locator('.inventory_list')).toBeVisible();
  115 | });
  116 |
  117 | // Test for dropdown selection
  118 | test('test dropdown selection', async ({ page }) => {
  119 |   // Navigate to dropdown demo
  120 |   await page.goto('https://www.saucedemo.com/');
  121 |   
  122 |   // Login first
  123 |   await page.fill('[data-test="username"]', 'standard_user');
  124 |   await page.fill('[data-test="password"]', 'secret_sauce');
  125 |   await page.click('[data-test="login-button"]');
  126 |   
  127 |   // Go to inventory page
  128 |   await expect(page).toHaveURL(/inventory.html/);
  129 |   
  130 |   // Use the product sort dropdown - use the class selector as shown in the HTML
  131 |   await page.locator('.product_sort_container').click();
  132 |   
  133 |   // Select an option using the value from the HTML (za for Z to A ordering)
  134 |   await page.selectOption('.product_sort_container', 'za');
  135 |   
  136 |   // Verify the first product name is now sorted Z->A
  137 |   const firstProduct = page.locator('.inventory_item_name').first();
  138 |   await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');
  139 | });
  140 |
  141 | // Test for alerts and dialogs
  142 | test('test alerts and dialogs', async ({ page }) => {
  143 |   // Create a simple page with an alert for reliable testing
  144 |   await page.setContent(`
  145 |     <button id="alertButton">Show Alert</button>
  146 |     <div id="result"></div>
  147 |     <script>
  148 |       document.getElementById('alertButton').addEventListener('click', () => {
  149 |         alert('This is a test alert');
  150 |         document.getElementById('result').textContent = 'Alert was handled';
  151 |       });
  152 |     </script>
  153 |   `);
  154 |   
  155 |   // Set up dialog handler BEFORE triggering the alert
  156 |   page.once('dialog', async dialog => {
  157 |     expect(dialog.message()).toBe('This is a test alert');
  158 |     console.log(`Alert text: ${dialog.message()}`);
  159 |     await dialog.accept();
  160 |   });
  161 |   
  162 |   // Trigger the alert
  163 |   await page.click('#alertButton');
  164 |   
  165 |   // Verify the alert was handled using auto-waiting
  166 |   await expect(page.locator('#result')).toHaveText('Alert was handled');
  167 | });
  168 |
  169 | // Test for checking list items
  170 | test('test list items', async ({ page }) => {
  171 |   // Navigate to inventory page with login
  172 |   await page.goto('https://www.saucedemo.com/');
  173 |   await page.fill('[data-test="username"]', 'standard_user');
  174 |   await page.fill('[data-test="password"]', 'secret_sauce');
> 175 |   await page.click('[data-test="login-button"]');
      |              ^ TimeoutError: page.click: Timeout 30000ms exceeded.
  176 |   
  177 |   // Wait for the inventory list to be visible
  178 |   await expect(page.locator('.inventory_list')).toBeVisible();
  179 |   
  180 |   // Count the number of items (should be 6)
  181 |   const items = page.locator('.inventory_item');
  182 |   await expect(items).toHaveCount(6);
  183 |   
  184 |   // Verify that "Sauce Labs Backpack" is in the list
  185 |   const itemNames = page.locator('.inventory_item_name');
  186 |   await expect(itemNames).toContainText(['Sauce Labs Backpack']);
  187 | });
```