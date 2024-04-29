const { test, expect } = require('@playwright/test');

// 1. Go to https://surveyrc.taxcreditco.com/automation-challenge
test.beforeEach(async ({ page }) => {
    await page.goto('https://surveyrc.taxcreditco.com/automation-challenge');
});

test.describe('Testing Form', () => {

    // Declaring the User Information
    const FirstName = 'Joe';
    const LastName = 'Sample';
    const Fullname = FirstName + ' ' + LastName;
    const Email = 'xyztest1001@taxcc.bg';
    const Street = 'Street line 1';
    const City = 'Monterey Park';
    const ZipCode = '91754';

// 2.a. Fill all text fields under “Let’s begin by getting some basic information!” 
    test('Fill Information Form', async ({ page }) => {
        await page.getByLabel('First Name', { exact: true }).fill(FirstName);
        await page.getByLabel('Last Name', { exact: true }).fill(LastName);
        await page.getByLabel('Email Address', { exact: true }).fill(Email);
        await page.getByLabel('Street Address', { exact: true }).fill(Street);
        await page.getByLabel('City').fill(City);
        await page.getByLabel('Zip Code').fill(ZipCode);

// 2.b. and click on Next button
        await page.getByRole('button', { name: 'Next' }).click();

// 3.a. Answer “NO” to all questions under “At this time, please answer Yes or No to the following questions:” 
    
        await page.locator('#SurveyControl_Question11396 > div > label:nth-child(2)').check();
        await page.locator('#SurveyControl_Question11397 > div > label:nth-child(2)').check();
        await page.locator('#SurveyControl_Question914 > div > label:nth-child(2)').check();
        await page.locator('#SurveyControl_Question11361 > div > label:nth-child(2)').check();
        await page.locator('#SurveyControl_Question1244 > div > label:nth-child(2)').check();

        /* According to the webpage of Playwright, using CSS selectors and XPaths are a 
   bad practice as the DOM can often change leading to non resilient tests.
   But I used the CSS selector in these  steps because the buttons don't have a name nor label */

// 3.b. and click on Next button

        await page.getByRole('button', { name: 'Next' }).click();

// 4. Verify the name in the text field matches what you entered in Step 2.
    const textboxValue = await page.getByLabel('Please confirm your first and last name:').inputValue();
    expect(textboxValue).toEqual(Fullname); // Here is where we do the assertion between the result of the confirmation and what we wrote in the Step 2

    await page.getByRole('button', { name: 'Submit Form' }).click();

// 5. Assert that you were redirected to “https://www.experian.com/employer-services”

// Check if the current URL matches the expected one
    await expect(page).toHaveURL(/.*experian.com/);
    const pageURL = page.url();
    console.log("The full URL is: " + pageURL)

    });


});