import AllureReporter from "@wdio/allure-reporter";
import { LoginScreen } from "../screens/login.main.js"
import { expect } from "chai";

describe('Login Screen Test', () => {
    before(async () => {
        await LoginScreen.navMailLoginScreen();
    });

    afterEach(async function() {
        if(this.currentTest.state === 'failed') {
            const screenshot = await browser.takeScreenshot();

            AllureReporter.addAttachment(
                'Test Results',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
        }

    });

    it('should display error msg when using invalid credentials', async() => {

        const invalidCredentials = { 
            email: 'wrong@mail.com',
            password: 'wrongpass'
        };

        await LoginScreen.enterEmail(invalidCredentials.email);
        expect(await LoginScreen.getEmailText()).to.equal(invalidCredentials.email);

        expect(await LoginScreen.isLoginBtnEnabled()).to.be.false;

        await LoginScreen.enterPassword(invalidCredentials.password);
        expect(await LoginScreen.isLoginBtnEnabled()).to.be.true;

        await LoginScreen.clickLogin();
        const errMsg = await LoginScreen.getErrorMsg();
        expect(errMsg).to.equal('•メールアドレスまたは、パスワードに誤りがあります。');
    });

    it('should login successfully when using valid credentials', async() => {

        const validCredentials = { 
            email: 'suram@mail.com',
            password: 'admin'
        };

        await LoginScreen.enterEmail(validCredentials.email);
        expect(await LoginScreen.getEmailText()).to.equal(validCredentials.email);

        await LoginScreen.enterPassword(validCredentials.password);
        expect(await LoginScreen.isLoginBtnEnabled()).to.be.true;

        await LoginScreen.clickLogin();
        expect(await LoginScreen.isPermissionDisplay()).to.be.true;
    })
})