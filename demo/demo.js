const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('datdot-ui-graphic')
const domlog = require('ui-domlog')
const main_button = require('./main_button.json')
const black_button = require('./black_button.json')
const white_button = require('./white_button.json')

function demoComponent() {
    let recipients = []
    // UI element settings
    let option = {
        page: 'USER',
        name: 'button1',
        content: 'Black',
        theme: { ...main_button , ...black_button},
    }

    let option1 = {
        page: 'demo',
        name: 'button2',
        content: 'White',
        theme: {  
            ...main_button,
            ...white_button,
            colorHover: 'hsl(0, 0%, 0%)',
            bgHover: 'hsl(0, 0%, 65%)'
        }
    }

    let option2 = {
        page: 'demo',
        flow: 'toggle',
        name: 'date',
        content: 'Date',
        theme: {
            ...main_button,
            ...white_button,
            width: '100%',
            textAlign: 'right',
            colorHover: 'hsl(0, 0%, 100%)',
            bgColorHover: 'hsl(0, 0%, 65%)'
        }
    }

    let tabOption1 = {
        page: 'demo',
        flow: 'tab',
        name: 'hourly',
        content: '1H',
        theme: {
            ...main_button,
            ...white_button,
        },
        isActive: true,
    }

    let tabOption2 = {
        page: 'demo',
        flow: 'tab',
        name: 'daily',
        content: '1D',
        theme: {
            ...main_button,
            ...white_button,
        }
    }

    let tabOption3 = {
        page: 'demo',
        flow: 'tab',
        name: 'monthly',
        content: '1M',
        theme: {
            ...main_button,
            ...white_button,
        }
    }

    let tabOption4 = {
        page: 'demo',
        flow: 'tab',
        name: 'yearly',
        content: '1Y',
        theme: {
            ...main_button,
            ...white_button,
        },
        isDisabled: true
    }


    // UI elements
    // primary
    const btn1 = button({...option}, protocol(option.name))
    const btn2 = button({...option1}, protocol(option1.name))
    // toggle
    const btn3 = button({...option2}, protocol(option2.name))
    // tab
    const tab1 = button({...tabOption1}, protocol(tabOption1.name))
    const tab2 = button({...tabOption2}, protocol(tabOption2.name))
    const tab3 = button({...tabOption3}, protocol(tabOption3.name))
    const tab4 = button({...tabOption4}, protocol(tabOption4.name))

    // content
    const content = bel`
    <div class=${css.content}>
        <section>
            <h2>Button</h2>
            <div>${btn1}${btn2}</div>
        </section>
        <section>
            <h2>Toggle</h2>
            <div>${btn3}</div>
        </section>
        <section>
            <h2>Tab</h2>
            <div class=${css.tab}>${tab1}${tab2}${tab3}${tab4}</div>
        </section>
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
    * ------ Actions -------
    *************************/
    function toggle(message) {
        const { page, from, flow, type, action, state, body } = message
        let update
        if (state === 'inactive') update = 'active' 
        if (state === 'active') update = 'inactive'
        return recipients[from]({page, from, flow, type: 'clicked', state: update })
    }

    function tab(message) {
        const { page, from, flow, type, action, state, body } = message
        const tab = document.querySelector(`.${css.tab}`)
        const { children } = tab
        const items = [...children]
        // if tab is active then do nothing
        if (state === 'active') return
        items.forEach( item => {
            let name = item.dataset.name
            // make all tabs are inactive, expact current one 
            recipients[name]({page, from, flow, type: 'clicked', state: 'inactive' })
            // make tab active
            if (name === from) recipients[name]({page, from, flow, type: 'clicked', state: 'active' })
            
        })
    }

    /*************************
    * ------ Receivers -------
    *************************/
    function receive (message) {
        const { page, from, flow, type, body } = message
        showLog(message)
        if (type === 'init') return showLog({page, from, flow, type: 'ready', body, filename, line: 51})
        if (type === 'click') { 
            // send log to child module and require to do actions
            if (flow.split('/').includes('toggle')) return toggle(message)
            if (flow.split('/').includes('tab')) return tab(message)
            recipients[from](message)
            showLog({page, from, flow, type: 'clicked', body, filename, line: 52})
        }
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
    --border-width: 0px;
    --border-color: var(--color-black);
    --border-style: solid;
    --font-weight: 300;
    --shadow: 2px 5px 10px hsla(var(--color), calc(var(--l) - 50%), 0.7);
    --font-weight-primary: 300;
    --font-weight-bold: 800;
    --rounder0: 0;
    --rounder-primary: 4px;
    --rounder8: calc(var(--rounder-primary) * 2);
    --rounder12: calc(var(--rounder-primary) * 3);
    --rounder50: calc(var(--rounder-primary) * 12.5);
    --button-padding: 0.8rem 1.4rem;
    --button-color-hover: var(--color-white);
    --button-bg-hover: hsla(var(--color), calc(var(--l) - 50%), .5);
    --button-text-align: center;

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
.terminal {
    background-color: #212121;
    color: #f2f2f2;
    font-size: 13px;
    overflow-y: auto;
}
.tab {}
`

document.body.append( demoComponent() )