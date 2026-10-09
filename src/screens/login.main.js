export const LoginScreen = { 
    selectors: {
        signinBtn: 'id=com.fdc_machetalk_broadcaster:id/tvLogin',
        mailMethodBtn: 'id=com.fdc_machetalk_broadcaster:id/btnOtherMethod',
        inputEmail: 'id=com.fdc_machetalk_broadcaster:id/txtEmail',
        inputPassword: 'id=com.fdc_machetalk_broadcaster:id/txtPassword',
        loginButton: 'id=com.fdc_machetalk_broadcaster:id/btnLogin',
        errMsg: 'id=com.fdc_machetalk_broadcaster:id/tvErrorMsg',
        permissionDialog: 'id=com.fdc_machetalk_broadcaster:id/ll_permission_dialog',
    },

    async clickSignin () { 
        const el = $(LoginScreen.selectors.signinBtn);
        await el.waitForDisplayed();
        await el.click();
    },

    async clickMailMethod() { 
        const el = $(LoginScreen.selectors.mailMethodBtn);
        await el.waitForDisplayed();
        await el.click();
    },

    async enterEmail(email) {
        const el = $(LoginScreen.selectors.inputEmail);
        await el.clearValue();
        await el.setValue(email);
    },

    async enterPassword(password) { 
        const el = $(LoginScreen.selectors.inputPassword);
        await el.clearValue();
        await el.setValue(password);
    },

    async clickLogin() {
        const el = $(LoginScreen.selectors.loginButton);
        await el.waitForDisplayed();
        await el.click();
    },

    async getErrorMsg() { 
        const el = $(LoginScreen.selectors.errMsg);
        return await el.getAttribute("text");
    },

    async getEmailText() { 
        const el = $(LoginScreen.selectors.inputEmail);
        return await el.getAttribute("text");
    },

    async isLoginBtnEnabled() { 
        const el = $(LoginScreen.selectors.loginButton);
        return await el.isEnabled();
    },

    async mailLoginFlow({ email, password }) { 
        await LoginScreen.clickSignin();
        await LoginScreen.clickMailMethod();
        await LoginScreen.clickLogin();
        await LoginScreen.enterEmail(email);
        await LoginScreen.enterPassword(password);
        await LoginScreen.clickLogin();
    },

    async navMailLoginScreen() { 
        await LoginScreen.clickSignin();
        await LoginScreen.clickMailMethod();
        await LoginScreen.clickLogin();
    },

    async isPermissionDisplay() { 
        const el = $(LoginScreen.selectors.permissionDialog);
        await el.waitForDisplayed();
        return await el.isDisplayed();
    }
}