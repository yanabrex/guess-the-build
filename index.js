let WORDS;

fetch("words.txt")
    .then(res => res.text())
    .then(text => {
        WORDS = text.split("\n");
    })

let inputBox = document.getElementById("hint");
let themes = document.getElementById("themes");

function solveHint(hint) {
    hint = hint.replace(/\d+/g, m => ".".repeat(Number(m)));
    hint = hint.toLowerCase();
    let pattern = "^";

    for (const char of hint) {
        if (char >= "a" && char <= "z") {
            pattern += char;
        } else if (char === " ") {
            pattern += " ";
        } else {
            pattern += "[^ ]";
        }
    }

    pattern += "$";

    const regex = new RegExp(pattern, "i");
    const matches = [];

    for (const word of WORDS) {
        if (regex.test(word)) {
            matches.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
    }

    return matches;
}


inputBox.addEventListener("input", () => {
    hint = inputBox.value;
    matches = solveHint(hint);
    themes.innerText = matches.join("\n");
})