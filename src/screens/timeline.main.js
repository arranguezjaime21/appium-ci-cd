export const TimelineScreen = { 
    selectors: { 
        timelineIcon: '//*[@resource-id="com.fdc_machetalk_broadcaster:id/tabMenu"]/android.widget.LinearLayout/android.widget.LinearLayout[4]',
        myPostTab: '//*[@resource-id="com.fdc_machetalk_broadcaster:id/tab_title" and @text="自分の投稿"]',
        newPostIcon: 'id=com.fdc_machetalk_broadcaster:id/fl_new_post',
        postDescInput: 'id=com.fdc_machetalk_broadcaster:id/et_post_text',
        postButton: 'id=com.fdc_machetalk_broadcaster:id/btn_confirm',
        cancelButton: 'id=com.fdc_machetalk_broadcaster:id/tv_cancel',
        
        timelineList: 'id=com.fdc_machetalk_broadcaster:id/rv_timeline',
        timelinePosts: 'id=com.fdc_machetalk_broadcaster:id/timeline_container',
        timelinePostContent: 'id=com.fdc_machetalk_broadcaster:id/tv_content',
        inReviewStatus: 'id=com.fdc_machetalk_broadcaster:id/tv_for_approval_message' //スタッフが内容を確認中です\n承認後、投稿されます。


    },

    async navTimeline() { 
        const el = $(TimelineScreen.selectors.timelineIcon);
        await el.waitForDisplayed();
        await el.click();
    },

    async openMyPost() { 
        const el = $(TimelineScreen.selectors.myPostTab);
        await el.waitForDisplayed();
        await el.click();
    },

    async clickNewPost() { 
        const el = $(TimelineScreen.selectors.newPostIcon);
        await el.waitForDisplayed();
        await el.click();
    },

    async inputPostDescription(description) { 
        const el = $(TimelineScreen.selectors.postDescInput);
        await el.clearValue();
        await el.setValue(description);
    },

    async clickPost() { 
        const el = $(TimelineScreen.selectors.postButton);
        await el.waitForDisplayed();
        await el.click();
    },

    async clickCancelPost() { 
        const el = $(TimelineScreen.selectors.cancelButton);
        await el.waitForDisplayed();
        await el.click();
    },

    async postTimelineText(description) { 
        await TimelineScreen.clickNewPost();
        await TimelineScreen.inputPostDescription(description);
        await TimelineScreen.clickPost();
    },

    async getPosts() { 

        const list = $(this.selectors.timelineList);
        await list.waitForDisplayed();

        return await list.$$(TimelineScreen.selectors.timelinePosts);
       
    },

    async getLatestPosts() {
        await browser.waitUntil(
            async () => {
                const posts = await this.getPosts();
                return posts.length > 0;
            },
        {
            timeout: 10000,
            timeoutMsg: 'No timeline posts appeared within 10 seconds'
        }
    );
        const posts = await this.getPosts();
        return posts[0];
    },

    async getLatestPostDescription() {
       const post = await this.getLatestPosts();
        const content = await post.$(this.selectors.timelinePostContent);
        await content.waitForDisplayed();
        return await content.getAttribute("text");
    },

    async getLatestPostStatus() {
        const list = $(this.selectors.timelineList);
        await list.waitForDisplayed();
        const status = list.$(this.selectors.inReviewStatus);
        await status.waitForDisplayed();
        return await status.getAttribute("text");
    }


}