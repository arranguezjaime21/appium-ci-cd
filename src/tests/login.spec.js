import { expect } from "chai";
import { LoginScreen } from "../screens/login.main.js";
import { users } from "../test-data/data/user.js";
import { LoginWording } from "../test-data/constants/login-ui.js";

const loginScreen = new LoginScreen();

describe('Login Screen', () => {
    it('should login fail and display error message', async() => {

        await loginScreen.mailLoginFlow(users.invalid);
        expect(await loginScreen.getErrorMsg()).to.equal(LoginWording.loginErrorMsg);
    })
})