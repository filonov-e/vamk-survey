import { getSurveys } from "../surveys";

describe("surveys", () => {
    it("Get surveys", async () => {
        const surveys = await getSurveys();
        expect(surveys.length > 0);
    });
});