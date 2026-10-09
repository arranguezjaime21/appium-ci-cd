export class BasePage {
    async waitAndFind(selector) { 
        const el = $(selector);
        await el.waitForDisplayed();
        return el;
    }

    async waitAndClick(selector)  {
        const el = await this.waitAndFind(selector);
        await el.click();
    }

    async waitAndGetText(selector) { 
        const el = await this.waitAndFind(selector);
        return (await el.getText() || await el.getAttribute("text") || "");
    }

    async setValue(selector, value) {
        const el = await this.waitAndFind(selector);
        await el.clearValue();
        await el.setValue(value);
    }

    async waitAndFindAll(selector) { 
        let elements = [];
        await browser.waitUntil (async() => {
            elements = await $$(selector);
            return elements.length > 0;
        }, {
            timeout: 15000,
            timeoutMsg: `no element found or ${selector} does not exist`,
        });

        for(const element of elements) { 
            await element.waitForDisplayed();
        };
        return elements;
    }

}