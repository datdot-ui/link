const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('datdot-ui-graphic')
const domlog = require('ui-domlog')
const btn = require('./button_css.json')

function demoComponent() {
    let recipients = []
    // UI element settings
    let option = {
        page: 'demo',
        name: 'button1',
        content: 'Click me',
        theme: {...btn}
    }
    // content
    const content = bel`
    <div class=${css.content}>
        ${button({...option}, protocol(option.name))}
    </div>`

    // show logs
    let terminal = bel`<div class=${css.terminal}></div>`
    // container
    const container = wrap(content, terminal)
    return container

    function wrap (content) {
        const container = bel`
        <div class=${css.wrap}>
            <section class=${css.container}>
                ${content}
            </section>
            ${terminal}
        </div>
        `
        return container
    }

    /*************************
    * ------ Receivers -------
    *************************/
    function receive (message) {
        const { page, from, flow, type, action, body } = message
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: 51})
        if (type === 'click') showLog({page: 'demo', from, flow, type: 'active', body, filename, line: 52})
    }

    /*************************
    * ------ Protocols -------
    *************************/
    // original protocol for all use
    function protocol (name) {
        return send => {
            recipients[name] = send
            return receive
        }
    }

    /*********************************
    * ------ Promise() Element -------
    *********************************/
    // keep the scroll on bottom when the log displayed on the terminal
    function showLog (message) { 
        sendMessage(message)
        .then( log => {
            terminal.append(log)
            terminal.scrollTop = terminal.scrollHeight
        }
    )}

    async function sendMessage (message) {
        return await new Promise( (resolve, reject) => {
            if (message === undefined) reject('no message import')
            const log = domlog(message)
            return resolve(log)
        }).catch( err => { throw new Error(err) } )
    }
}

const css = csjs`
:root {
    --h: 0;
    --s: 0%;
    --l: 50%;
    --color: var(--h), var(--s);
    --color-black: hsl(var(--color), calc(var(--l) - 50%));
    --color-white: hsl(var(--color), calc(var(--l) + 50%));
    --color-red: hsl(358, 99%, calc(var(--l) + 3%));
    --font-primary: 1.6rem;
    --font-smaller: calc(var(--font-primary) - 0.4rem);
    --font-small: calc(var(--font-primary) - 0.2rem);
    --font-mediuem: calc(var(--font-primary) + 0.2rem);
    --font-big: calc(var(--font-primary) + 0.4rem);
    --font-bigger: calc(var(--font-primary) + 0.6rem);
    --font-large: calc(var(--font-primary) + 0.8rem);
    --font-larger: calc(var(--font-primary) + 1rem);
    --stroke-width: 0px;
    --border-color: var(--color-black);
    --border-solid: var(--stroke-width) solid var(--border-color);
    --font-weight: 300;
    --button-padding: 0.8rem 1.4rem;
    --shadow: 2px 5px 10px hsla(var(--color), calc(var(--l) - 50%), 0.7);
    --font-weight-primary: 300;
    --font-weight-bold: 800;
    --rounder0: 0;
    --rounder-primary: 4px;
    --rounder8: calc(var(--rounder-primary) * 2);
    --rounder12: calc(var(--rounder-primary) * 3);
    --rounder50: calc(var(--rounder-primary) * 12.5);
}
html {
    box-sizing: border-box;
    height: 100%;
    font-size: 62.5%;
}
*, *:before, *:after {
    box-sizing: inherit;
}
body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.6rem;
    background-color: rgba(0, 0, 0, .1);
    height: 100%;
}
.wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 75vh 25vh;
}
.container {
    padding: 25px;
    overflow-y: auto;
}
.content > div {
    margin-bottom: 20px;
}
.content > div button {
    margin-right: 10px;
}
.terminal {
    background-color: #212121;
    color: #f2f2f2;
    font-size: 13px;
    overflow-y: auto;
}
`

document.body.append( demoComponent() )