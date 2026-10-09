import { TimelineSelectors } from "../selectors/timeline.js";
import { BasePage } from "./base.main.js";

export class TimelineScreen extends BasePage {
    selector = TimelineSelectors;

    async navTimeline() { 
        await this.waitAndClick(this.selector.timelineIcon);
    };

    async postTimelineText(description) { 
        await this.navTimeline();
        await this.waitAndClick(this.selector.myPostTab);
        await this.waitAndClick(this.selector.newPostIcon);
        await this.setValue(this.selector.postDescInput, description);
        await this.waitAndClick(this.selector.postButton);
    };

    async getLatestPost() { 
        // await browser.pause(2000);
        await this.waitAndFind(this.selector.timelineList);
        const posts = await this.waitAndFindAll(this.selector.timelinePosts);
        return await posts[0];
    }

    async getRecentPostDescription() { 
        const recentPost = await this.getLatestPost();
        const content = recentPost.$(this.selector.timelinePostContent);
        return await content.getAttribute("text");
    };

    async getRecentPostStatus() {
        const recentPost = await this.getLatestPost();
        const status = await recentPost.$(this.selector.inReviewStatus);
        return await status.isDisplayed();
    };

    async getInReviewMsg() { 
        const recentPost = await this.getLatestPost();
        const status = await recentPost.$(this.selector.inReviewStatus);
        return await status.getAttribute("text");
    }

  
}