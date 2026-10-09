import { expect } from "chai";
import { TimelineScreen } from "../screens/timeline.main.js";
import { timelineInput } from "../test-data/data/timeline.js";
import { TimelineWording } from "../test-data/constants/timeline-ui.js";

const timelineScreen = new TimelineScreen();

describe('Timeline Test', () => {
    it('should post timeline', async() => {
        await timelineScreen.postTimelineText(timelineInput.description);
        expect(await timelineScreen.getRecentPostDescription()).to.equal(timelineInput.description);
        expect(await timelineScreen.getRecentPostStatus()).to.be.true;
        expect(await timelineScreen.getInReviewMsg()).to.equal(TimelineWording.inreviewMsg);
    })
})