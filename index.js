// const loginFillp = require('./fillip/LoginFillip');
const loginofkcupid = require('./loginokcupid');
const getgirlsok = require('./okcupidgetgirls');

const puppeteer = require('puppeteer');

const Creds = require('./creds.json');
let scanf = require('scanf');



(async () =>
{
    let choice;

    let JobNumber;

    const browser = await puppeteer.launch({
        executablePath: 'c:/chrome-win/chrome.exe',
        headless: false,
        defaultViewport: null,
        args: [
            '--start-maximized',
            '--disable-notifications',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--lang=en',
            '--disable-dev-shm-usage',
            '--disable-browser-side-navigation',
            '--load-extension=/path/to/my/extension',

        ],
    });

    const page = await browser.newPage();
    // UnhandledPromiseRejectionWarning: TimeoutError: Navigation Timeout Exceeded: 30000ms exceeded
    await page.setDefaultNavigationTimeout(0);
    // fake User Agent()
    await page.setUserAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
        //'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
    );

    console.log('Welcome to IGN Automation!');
    console.log('What Do you What to do?');

    await page.waitForTimeout(1000)
    console.log('press 1 to use okcupid\n');
    // choice = scanf('%d');
    choice = 1
    switch(choice) {
        case 1:
            //fillip
            console.log('to you what to continue any job number? from before? ');
            // JobNumber = scanf('%d');
            JobNumber = 0;

            await loginofkcupid.oklogin(browser);

            await getgirlsok.Getmygirls(browser, page,JobNumber);

            break;


    }
})();

