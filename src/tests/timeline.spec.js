import AllureReporter from "@wdio/allure-reporter";
import { TimelineScreen } from "../screens/timeline.main.js";
import { expect } from "chai";

describe('Timeline Screen', () => {

    before(async() => {
        await TimelineScreen.navTimeline();
        await TimelineScreen.openMyPost();
    });
    afterEach(async function () {
        if(this.currentTest.state === 'failed') { 
            const screenshot = await browser.takeScreenshot();

            AllureReporter.addAttachment(
                'Test Results',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
        };
    });

    it('should post timeline text', async() => {

        const template = { 
            description: 'sample-test-auto'
        };


        await TimelineScreen.postTimelineText(template.description);
        const latestContent = await TimelineScreen.getLatestPostDescription();
        expect(latestContent).to.equal(template.description);

    
        const status = await TimelineScreen.getLatestPostStatus();
        expect(status).to.equal('スタッフが内容を確認中です\n承認後、投稿されます。');

    });
})