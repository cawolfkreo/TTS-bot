const googleTTS = require("google-tts-api");
const fs = require("fs/promises");

const audioOptions = {
    lang: "es",
    slow: false,
    timeout: 10000
}

function testRegex(base64String) {
    const re = /(\/\/NExKwAAANIAAAAADEwMFV+TEFNRTMu)+/g;
    const removed = base64String.replace(re, "");
    return removed;
}

async function textToUse() {
    let file = "test";
    try {
        file = await fs.readFile("./texto.txt", { encoding: "utf-8" });
    } catch (error) {
        console.log(error);
    }
    return file;
}

async function simpleTest() {
    try {
        const texto = await textToUse();
        const base64Results = await googleTTS.getAllAudioBase64(texto, audioOptions);
        const base64Result = base64Results.map(result => result.base64).join("");
        const base64Audio = testRegex(base64Result);
        console.log("We got the audio from Google!");
        await fs.writeFile("./a-revisar4.txt", base64Audio);
        const audioBuffer = Buffer.from(base64Audio, "base64");
        await fs.writeFile("./audio4.mp3", audioBuffer, "base64");
        console.log("Audio saved!");
    } catch (error) {
        console.log(error);
    } 
}

simpleTest();