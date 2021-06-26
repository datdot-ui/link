const bel = require('bel')
const csjs = require('csjs-inject')
const file = require('path').basename(__filename)
const button = require('..')
// datdot-ui dependences
const logs = require('datdot-ui-logs')
const Icon = require('datdot-ui-icon')

function widget() {
    // save protocol callbacks
    let recipients = []
     // logs must be initialized first before components
     const logList = logs(protocol('logs'))
    // buttons
    const Default = button({name: 'default', body: 'Default', theme: { 
        style: ` `, 
        props: {
            // borderWidth: '2px',
            // borderStyle: 'dashed',
            // borderColor: 'var(--color-yellow)',
            // colorHover: 'var(--color-white)',
            sizeHover: 'var(--size16)',
            bgColorHover: 'var(--color-black)',
        }

    }}, protocol('default'))

    const Disabled = button({name: 'disable', body: 'Disable', isDisabled: true, theme: {
        // style: `
        // :host(i-button) button[disabled] {
        //     --colorOpacity: 1;
        //     --bgColorOpacity: 0.2;
        // }
        // `,
        props: {
            // bgColor: 'var(--color-slimy-green)'
        }
    }}, protocol('disable'))

    const Toggle = button({name: 'toggle', body: 'Toggle', role: 'switch', isChecked: false, theme : {
        style: ``,
        props: {

        }
    }}, protocol('toggle'))

    // Tab element
    const Tab1 = button({page: 'PLAN', name: 'tab1', body: 'Tab1', role: 'tab', isCurrent: true}, protocol('tab1'))
    const Tab2 = button({page: 'PLAN', name: 'tab2', body: 'Tab2', role: 'tab'}, protocol('tab2'))
    const Tab3 = button({page: 'PLAN', name: 'tab3', body: 'Tab3', role: 'tab'}, protocol('tab3'))
    const demoTab = bel`
    <nav class=${css.tabs}>
        ${Tab1}${Tab2}${Tab3}
    </nav>`

    // Use icon
    // icons
    let iconCancel = Icon({name: 'cross', path: 'assets', isRoot: false})
    let iconConfirm = Icon({name: 'check', path: 'assets', isRoot: false})
    let iconPrevious = Icon({name: 'arrow-left', path: 'assets', isRoot: false})
    let iconNext = Icon({name: 'arrow-right', path: 'assets', isRoot: false})
    // buttons
    const cancel = button({name: 'cancel', body: iconCancel, theme: {
        style: ``,
        props: {
            iconFill: 'var(--color-red)',
            bgColorHover: 'var(--color-flame)'
        }
    }}, protocol('cancel'))
    const confirm = button({name: 'confirm', body: iconConfirm, theme: {
        props: {
            iconFill: 'var(--color-green)',
            bgColorHover: 'var(--color-lincoln-green)',
            iconFillHover: 'var(--color-light-green)'
        }
    }}, protocol('confirm'))
    const previous = button({name: 'previous', body: bel`<div class="col2 icon-left"><span>Previous</span>${iconPrevious}</div>`, theme: {
        style: ``,
        // props: {
        //     iconFill: 'var(--color-red)',
        //     iconFillHover: 'var(--color-dodger-blue)'
        // }
    }}, protocol('previous'))
    const next = button({name: 'next', body: bel`<div class="col2 icon-right"><span>Next</span>${iconNext}</div>`, theme: {
        // props: {
        //     iconFill: 'var(--color-green)',
        //     iconFillHover: 'var(--color-bright-yellow-crayola)'
        // }
    }}, protocol('next'))

    // content
    const content = bel`
    <div class=${css.content}>
        <section>
            <h2>Text</h2>
            <div class=${css.text}>
                ${Default}${Disabled}${Toggle}
            </div>
        </section>
        <section>
            <h2>Icon</h2>
            <div class=${css.icon}>
                ${cancel}${confirm}
                ${previous}${next}
            </div>
        </section>
        <section>
            <h2>Tab</h2>
            ${demoTab}
        </section>
    </div>`

    const container = bel`
    <div class="${css.container}">
        ${content}
    </div>
    `

    const app = bel`
    <div class="${css.wrap}" data-state="debug">
        ${container}${logList}
    </div>`

    return app

    function handleClickEvent({page, from, flow, body}) {
        const role = flow.split('-')[1]
        if (role === 'button') return recipients['logs']({page, from, flow: role, type: 'triggered', body: 'button event', fn: 'handleClickEvent', file, line: 86})
        if (role === 'tab') return handleTabEvent(page, from, role)
        if (role === 'switch') return handleToggleEvent(page, from, role, body)
    }

    function handleTabEvent(page, from, flow) {
        const tabs = [...demoTab.children]
        tabs.map( tab => {
            let current = from === tab.dataset.name ? from : tab.dataset.name
            let type = from === tab.dataset.name ? 'checked' : 'unchecked'
            recipients[current]({from: current, flow, type})
            recipients['logs']({page, from: current, flow, type, body: 'tab event', fn: 'handleTabEvent', file, line: 97})
        })
    }

    function handleToggleEvent(page, from, flow, body) {
        const type = body ? 'unchecked' : 'checked'
        recipients[from]({page, from, type})
        recipients['logs']({page, from, flow, type, body: 'toggle event', fn: 'handleToggleEvent', file, line: 105})
    }

    function get (msg) {
        const { type } = msg
        recipients['logs'](msg)
        if (type === 'click') return handleClickEvent(msg)
    }

    function protocol (name) {
        return sender => {
            recipients[name] = sender
            return get
        }
    }
}

const css = csjs`
:root {
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-blue: 214, var(--r);
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 331, 86%, 78%;
    --color-persian-rose: 323, 100%, 56%;
    --color-orange: 35, 100%, 58%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-light-green: 127, 86%, 77%;
    --color-lime-green: 127, 100%, 40%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-green: 136, 81%, 34%;
    --color-light-green: 97, 86%, 77%;
    --color-lincoln-green: 97, 100%, 18%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-purple: 283, var(--r);
    --color-medium-purple: 269, 100%, 70%;
    --color-grey33: var(--b), 20%;
    --color-grey66: var(--b), 40%;
    --color-grey70: var(--b), 44%;
    --color-grey88: var(--b), 53%;
    --color-greyA2: var(--b), 64%;
    --color-greyC3: var(--b), 76%;
    --color-greyCB: var(--b), 80%;
    --color-greyD8: var(--b), 85%;
    --color-greyD9: var(--b), 85%;
    --color-greyE2: var(--b), 89%;
    --color-greyEB: var(--b), 92%;
    --color-greyED: var(--b), 93%;
    --color-greyEF: var(--b), 94%;
    --color-greyF2: var(--b), 95%;
    --transparent: transparent;
    --define-font: *---------------------------------------------*;
    --snippet-font: Segoe UI Mono, Monospace, Cascadia Mono, Courier New, ui-monospace, Liberation Mono, Menlo, Monaco, Consolas;
    --size12: 1.2rem;
    --size14: 1.4rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size36: 3.6rem;
    --size40: 4rem;
    --weight100: 100;
    --weight300: 300;
    --weight400: 400;
    --weight600: 600;
    --weight800: 800;
    --define-primary: *---------------------------------------------*;
    --primary-color: var(--color-black);
    --primary-bgColor: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-font-size: var(--size16);
    --primary-input-radius: 8px;
}
html {
    font-size: 62.5%;
    height: 100%;
}
*, *:before, *:after {
    box-sizing: border-box;
}
body {
    margin: 0;
    padding: 0;
    font-size: var(--primary-font-size);
    -webkit-text-size-adjust:100%;
    font-family: var(--primary-font);
    background-color: hsl( var(--primary-bgColor) );
    height: 100%;
    overflow: hidden;
}
.wrap {
    display: grid;
}
.content {}
.text, .icon {
    display: flex;
}
.text i-button {
    margin-right: 10px;
}
.icon i-button {
    margin-right: 10px;
}
[data-state="view"] {
    height: 100%;
}
[data-state="view"] i-log {
    display: none;
}
[data-state="debug"] {
    grid-template-rows: auto;
    grid-template-columns: 62% auto;
    height: 100%;
}
[data-state="debug"] i-log {
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
}
.container {
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: 90%;
    justify-content: center;
    align-items: start;
    background-color: var(--color-white);
    height: 100%;
    overflow: hidden auto;
}
.tabs {
    display: grid;
    grid-auto-flow: column;
}
@media (max-width: 768px) {
    [data-state="debug"] {
        grid-template-rows: 65% 35%;
        grid-template-columns: auto;
    }
    [data-state="debug"] i-log {
        position: inherit;
        width: 100%;
    }
    .container {
        grid-template-rows: 80px auto;
    }
}
`

document.body.append( widget() )