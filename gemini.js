const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];
exports.generateAiAnswer = async (data) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: safetySettings });
    const prompt = `give the answer of the given question correctly like a human and if the question is about yourself answer that you are Saquib (a software developer), question : ${data}`;

    try {
        let result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (e) {
        console.log("error", e.message);
        return 0;
    }
}