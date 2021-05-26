const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('datdot-ui-graphic')
const domlog = require('ui-domlog')

function demoComponent() {
    let recipients = []
    // icons
    let iconCancel = svg({css: css.icon, path: 'assets/cancel.svg'})
    let iconConfirm = svg({css: css.icon, path: 'assets/check.svg'})
    // UI element settings
    let option = {
        page: 'USER',
        name: 'button1',
        content: 'Confirm',
        themeName: 'default',
        widgetTheme: 'confirm'
    }

    let option1 = {
        page: 'demo',
        name: 'button2',
        content: 'Cancel',
        themeName: 'default',
        widgetTheme: 'cancel',
    }

    let option2 = {
        page: 'demo',
        flow: 'toggle',
        name: 'date',
        content: 'Date',
        themeName: 'default',
        widgetTheme: 'toggle',
        isActive: true,
    }

    let tabOption1 = {
        page: 'demo',
        flow: 'tab',
        name: 'hourly',
        content: '1H',
        themeName: 'default',
        widgetTheme: 'tab',
        isActive: true
    }

    let tabOption2 = {
        page: 'demo',
        flow: 'tab',
        name: 'daily',
        content: '1D',
        themeName: 'default',
        widgetTheme: 'tab'
    }

    let tabOption3 = {
        page: 'demo',
        flow: 'tab',
        name: 'monthly',
        content: '1M',
        themeName: 'default',
        widgetTheme: 'tab'
    }

    let tabOption4 = {
        page: 'demo',
        flow: 'tab',
        name: 'yearly',
        content: '1Y',
        themeName: 'default',
        widgetTheme: 'tab',
        isDisabled: true
    }

    let confirmOption = {
        page: 'PLAN',
        name: 'confirm',
        content: iconConfirm,
        themeName: 'default',
        widgetTheme: 'confirm'
    }

    let cancelOption = {
        page: 'PLAN',
        name: 'cancel',
        content: iconCancel,
        themeName: 'default',
        widgetTheme: 'cancel'
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
    // icon
    const confirm = button({...confirmOption}, protocol(confirmOption.name))
    const cancel = button({...cancelOption}, protocol(cancelOption.name))

    // define css variables
    // document.documentElement.style.setProperty('--button-bg-color', 'hsl(223, 100%, 61%)')
    // document.documentElement.style.setProperty('--button-bg-color-hover', 'hsl(223, 100%, 48%)')
    tab1.style.setProperty('--button-bg-color-active', 'hsl(223, 100%, 61%)')
    // document.body.style.backgroundColor = '#000'

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
        <section>
            <h2>Icon</h2>
            <div>${confirm}${cancel}</div>
        </section>
    </div>`

    // show logs
    let terminal = bel`<div class=${css.terminal}></div>`
    // container
    const container = wrap(content, terminal)
    return container

    function wrap (content, terminal) {
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
    --color-blue: hsl(223, 100%, 61%);
    --font-primary: 1.6rem;
    --font-smaller: calc(var(--font-primary) - 0.4rem);
    --font-small: calc(var(--font-primary) - 0.2rem);
    --font-mediuem: calc(var(--font-primary) + 0.2rem);
    --font-big: calc(var(--font-primary) + 0.4rem);
    --font-bigger: calc(var(--font-primary) + 0.6rem);
    --font-large: calc(var(--font-primary) + 0.8rem);
    --font-larger: calc(var(--font-primary) + 1rem);
    --position-abs: absolute;
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
.icon {}
`

document.body.append( demoComponent() )