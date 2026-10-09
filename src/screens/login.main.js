import { LoginSelectors } from "../selectors/login.js";
import { BasePage } from "./base.main.js";

export class LoginScreen extends BasePage {
    selector = LoginSelectors;

    async navMailLogin() { 
        await this.waitAndClick(this.selector.signinBtn);
        await this.waitAndClick(this.selector.mailMethodBtn);
        await this.waitAndClick(this.selector.loginButton);
    };

    async inputUserCredentials({ email, password }) { 
        await this.setValue(this.selector.inputEmail, email);
        await this.setValue(this.selector.inputPassword, password);
    };

    async getErrorMsg() { 
        return await this.waitAndGetText(this.selector.errMsg);
    };

    async mailLoginFlow({ email, password }) { 
        await this.navMailLogin();
        await this.inputUserCredentials({ email, password});
        await this.waitAndClick(this.selector.loginButton);
    };
    
}
