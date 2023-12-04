function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain attribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
  
includeHTML();

function applyTheme(theme) {
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
    console.log(document.querySelector("#selTheme"));
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "auto";

    applyTheme(savedTheme);

    waitForElm('#selTheme').then((elm) => {
        for (const optionElement of document.querySelectorAll("#selTheme option")) {
            optionElement.selected = savedTheme === optionElement.value;
        }

        console.log(document.querySelector("#selTheme"));


        document.querySelector("#selTheme").addEventListener("change", function() {
            localStorage.setItem("theme", this.value);
            applyTheme(this.value);
        });
    });

});