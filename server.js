const googleTTS = require("google-tts-api");
const fs = require("fs/promises");

const audioOptions = {
    lang: "es",
    slow: false,
    timeout: 10000
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
        const base64Audio = base64Results.map(result => result.base64).join("");
        console.log("We got the audio from Google!");
        const audioBuffer = Buffer.from(base64Audio, "base64");
        await fs.writeFile(".audio.mp3", audioBuffer, "base64");
        console.log("Audio saved!");
    } catch (error) {
        console.log(error);
    } 
}

simpleTest();