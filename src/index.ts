import { search } from './api';
import { log } from './logs';
// @ts-ignore
function createInput(parent: HTMLElement): void {
    const container = document.createElement('div');
    const textInput = document.createElement('input');
    textInput.className = "margin-right: 5px;";
    const button = document.createElement('button');
    button.innerHTML = "search";
    button.addEventListener('click', async(e) => {
        const search_word = textInput.value;
        const result = await search(search_word);
        log(result);
    });

    container.appendChild(textInput);
    container.appendChild(button);

    parent.appendChild(container);
}

(window.onload = () => {
    // create a couple of elements in an otherwise empty HTML page
    // const heading = document.createElement("h1");
    // const headingText = document.createTextNode("Big Head!");
    // heading.appendChild(headingText);
    // document.body.appendChild(heading);
    const root = document.getElementById("root");
    const div = document.createElement('div');
    // div.innerHTML = "hello world";
    root?.append(div);
    createInput(div);
})();
