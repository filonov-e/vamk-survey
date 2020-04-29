import { getAnswers, getQuestionAnswer, getAnswerById } from "../answers";

describe("answers", () => {
    it("Get answers", async () => {
        const answers = await getAnswers();
        expect(answers.length > 0);
    });

    it("Get answer for question", async () => {
        const answer = await getQuestionAnswer("MFiLxSRPQx4jWlp8usHH");
        expect(answer).not.toEqual(null);
    });

    it("Get answer by id", async () => {
        const answer = await getAnswerById("4oEBDWwloIslSnW3Qqun");
        expect(answer).not.toEqual(null);
    });
});