

//auto scroll down
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }

            }, 100);

        });

    });

}

module.exports = {
    Getmygirls: async function (browser, page,JobNumber) {
        await page.setDefaultNavigationTimeout(0);
        try {

            await page.bringToFront();
            if (browser === null)
                console.log('Error: you have null problem');

            await page.goto("https://www.okcupid.com/who-you-like?cf=likesIncoming");

            await page.waitForTimeout(5000);

            await autoScroll(page);

            await page.waitForTimeout(10000);
//הרשימה של הבנות
            let girlslist = await page.$$("img.userthumb-img");
            console.log(`list of girl: ${girlslist.length}`);

            await page.waitForTimeout(4000);

            for (let i = JobNumber; i <= 45; i++)
            {
                await autoScroll(page);
                await page.waitForTimeout(10000);
                let elementsToClick = await page.$$("img.userthumb-img");
//click on girl
                await page.waitForTimeout(10000);

                await elementsToClick[0].click();

                await page.waitForTimeout(8000);

//השם של הבחורה בשביל לשלוח לה הודעה עם השם שלה

                const girlname = await page.evaluate(() => {
                    let mygirlname = document.querySelectorAll("div.profile-basics-username")[0].innerText.trim()

                    return {mygirlname};
                });

                 let nameofgirl = Object.values(girlname)

                //לחיצה על MESSAGE יצירת הודעה
                let msgongirl = await page.$$("div.profile-pill-buttons-button-inner");
                await page.waitForTimeout(4000);

                await msgongirl[1].click();
                await page.waitForTimeout(4000);

                //msg nothing to see here - err msg girl
                await page.waitForTimeout(4000);

                //msg nothing to see here - err msg girl

                //כל עוד זה NULL אז הכל סבבה, אחרת יש בעיה
                let Erorrfound = false;

                try {
                           if (( null !== await page.evaluate(() => document.querySelector("h3.messenger-empty-state-title").textContent) ))
                          Erorrfound=true;
                    }
                    catch (err)
                    {
                        //console.log("not erorre girl!");
                    }

                    if(Erorrfound)
                console.log("erorr girl ? : ", Erorrfound );



                if(Erorrfound)
                {
                    await page.evaluate(() => {
                        //סגור את הבחורה ותמחק אותה מהרשימה
                        document.querySelectorAll("span.icon.i-close")[1].click();

                    });

                    await page.waitForTimeout(4000);

                    //click pass on girl - err msg. bye.
                    msgongirl = await page.$$("div.pass-pill-button-inner");
                    await page.waitForTimeout(4000);
                    await msgongirl[1].click();

                    //new navigate, beacuse errore girl msg

                    await page.waitForTimeout(5000);

                    await page.goto("https://www.okcupid.com/who-you-like?cf=likesIncoming");

                    await page.waitForTimeout(5000);

                    let elementsToClick = await page.$$("img.userthumb-img");
//click on girl
                    await page.waitForTimeout(2000);

                    await elementsToClick[0].click();
                    await page.waitForTimeout(2000);

                    let msgongirl2err = await page.$$("div.profile-pill-buttons-button-inner");
                    await page.waitForTimeout(4000);

                    await msgongirl2err[1].click();

                }
                else {

                    //    console.log("girl name: ", nameofgirl) // ['Tal']
                    console.log(`girl name: ${nameofgirl} girl number: [${i} \ ${girlslist.length}]`) // Tal

                    await page.waitForTimeout(5000);

                    //שליחת הודעה לבחורה
                    let SENDMSG = await page.$$("textarea.messenger-composer");
                    await page.waitForTimeout(2000);

                    await SENDMSG[0].type(` היי ${nameofgirl} `)
                    // await page.keyboard.type(` היי ${nameofgirl}  `)
//                await page.keyboard.type("\n")
                    await page.waitForTimeout(2000);
                    // await page.keyboard.type(" נעים מאד, שמי יגאל בן 33 הנדסאי תוכנה ביום יום אני עוסק בפיתוח תוכנה בזמני הפנוי אני הולך לשחות וגם יודע לבשל אוכל טוב ..בקיצור ראיתי אותך באפליקציה  ומצאת חן בעיניי..  אשמח לשמוע ממך:)")
                    await SENDMSG[0].type(" נעים מאד, שמי יגאל בן 33 הנדסאי תוכנה ביום יום אני עוסק בפיתוח תוכנה בזמני הפנוי אני הולך לשחות וגם יודע לבשל אוכל טוב ..בקיצור ראיתי אותך באפליקציה  ומצאת חן בעיניי..  אשמח לשמוע ממך:)")

                    await page.waitForTimeout(5000);


                    //לחיצה על שליחת הודעה
                    let btnsend = await page.$$("button.messenger-toolbar-send");

                    await btnsend[0].click();

                    await page.waitForTimeout(5000);

                    await page.goto("https://www.okcupid.com/who-you-like?cf=likesIncoming");

//אם הוא הגיע לאיבר שלפני הסוף- הוא יתאחל את הלולאה מההתחלה
                    if (i === (girlslist.length - 1)) {
                        girlslist = await page.$$("img.userthumb-img");
                        i = 0;
                    }

                }

            }
            console.log(`Finishe girl job List: ${girlslist.length}`);
            await Getmygirls(browser,page,0);
        }
    catch (err) {
            console.log(err);
            //console.log("Someting of Error!.. i close the browser before banned!");
            //browser.close();
        }
    },
};
