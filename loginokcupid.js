'use strict';
const fs = require('fs');

const cookies = require('./okcupidcookies.json');
const creds = require('./creds.json');
module.exports = {
    oklogin: async function (browser) {

        const page = await browser.newPage();
        await page.bringToFront();
        if (browser === false )
            console.log(" you have null problem");

        // Check if we have a previosly saved session

        if(Object.keys(cookies).length)
        {

            // Set the seved cookies in the puppeteer browser page

            await page.setCookie(...cookies);
            await page.goto("https://www.okcupid.com/login",{ waitUntil: 'networkidle2' });

            console.log('Login for okcupid by cookies Succsessfully!!')
            await page.waitForTimeout(5000);
            await page.close();
        }
        else
        {

            await page.goto("https://www.okcupid.com/login",{ waitUntil: 'networkidle0' });

            console.log("click on login button")
            //Click on Login button with gmail.
            await page.waitForTimeout(5000);

            await page.click("login-actions-link");
//cookies btn okcupid
            await page.waitForSelector("button#onetrust-accept-btn-handler");
            await page.click("button#onetrust-accept-btn-handler");
//click login by facebook.
             await page.waitForSelector("button.login-actions-link");


            await page.waitForTimeout(5000);


            const pageList = await browser.pages();
            console.log("NUMBER TABS:", pageList.length); //NUMBER TABS: 3
            await page.waitForTimeout(2000);
            //FOCUS ON NEW TAB !! KUS EMEK!!!!!
            await pageList[pageList.length-1].bringToFront();
            await page.waitForTimeout(3000);
            await pageList[pageList.length-1].waitForSelector('input[type="email"]');

            await pageList[pageList.length-1].type('input[type="email"]', creds.user);
            await page.waitForTimeout(2000);
            //click submit
            await pageList[pageList.length-1].keyboard.press('Enter');
            await page.waitForTimeout(2000);
            //click submit
            await pageList[pageList.length-1].waitForSelector('input[type="password"]');

            await pageList[pageList.length-1].type('input[type="password"]',creds.password);
            await page.waitForTimeout(2000);
            await pageList[pageList.length-1].keyboard.press('Enter');
            await page.waitForTimeout(2000);
            await console.log("Login for okcupid Succsessfully!");

            await page.bringToFront();
            await page.waitForTimeout(3000);

            /* Get the current browser page session */
            let currentCookies = await page.cookies();
            /*Create a cookie file (if not already created) to hold the session  */
            fs.writeFileSync('okcupidcookies.json',JSON.stringify(currentCookies));
            await page.waitForTimeout(5000);
            await page.close();
            await page.waitForTimeout(2000);
        }

    },
};
