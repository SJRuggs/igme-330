import randomElement from "./utils.js";

const init = () => {

    // generation function
    const generateTechno = count => {
        let babble = "";
        for (let i = 0; i < count; i++)
        {
            babble += (i > 0) ? "<br>" : "";
            babble += `
            ${randomElement(words[0])}
            ${words[1][Math.floor(Math.random() * words[1].length)]}
            ${words[2][Math.floor(Math.random() * words[2].length)]}
            `;
        }
        return babble;
    };

    // import words
    // const words;

    // find references
    const giveOne = document.querySelector("#give-one");
    const giveFive = document.querySelector("#give-five");
    const output = document.querySelector("#output");

    // assign onclick handlers
    giveOne.onclick = () => output.innerHTML = generateTechno(1);
    giveFive.onclick = () => output.innerHTML = generateTechno(5);

    // initial generation
    output.innerHTML = generateTechno(1);
}

init();