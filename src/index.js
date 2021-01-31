//import React from "react";
import ReactDom from "react-dom";


let n = 0

function numberFormat(n) {
    return n.toString().padStart(2, "0")
}

function render() {

    const min = <span> {numberFormat(n)} </span>

    ReactDom.render(min, document.querySelector("#hello-example"))
}

render()

window.setInterval(() => {
    n++
    render()
}, 1000)
