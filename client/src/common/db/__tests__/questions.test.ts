import { getSurveyQuestions } from "../questions";

describe("questions", () => {
    it("Get survey questions", async () => {
        const questions = await getSurveyQuestions("I9s8JTOau4sIKSvKvlHE");
        expect(questions.length > 0);
    });
});