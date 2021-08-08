const head = require('head')()
const bel = require('bel')
const csjs = require('csjs-inject')
const button = require('..')
// datdot-ui dependences
const logs = require('datdot-ui-logs')
const icon = require('datdot-ui-icon')
const list = require('list')
const message_maker = require('../src/node_modules/message-maker')

function demo () {
    // save protocol callbacks
    let recipients = []
    let filter_options = [{
        text: 'Available',
        icon: icon({name: 'check', path: 'assets'}),
        selected: true
    },
    {
        text: 'Not Available',
        icon: icon({name: 'check', path: 'assets'}),
        selected: true
    },
    {
        text: 'Core',
        icon: icon({name: 'check', path: 'assets'}),
        selected: true
    },
    {
        text: 'Drive',
        icon: icon({name: 'check', path: 'assets'}),
        selected: true
    },
    {
        text: 'Cabal',
        icon: icon({name: 'check', path: 'assets'}),
        selected: true
    }]
     // logs must be initialized first before components
    const log_list = logs(protocol('logs'))
    // buttons
    const primary = button({name: 'primary', body: 'Primary', theme: { 
        style: ` `, 
        props: {
            // border_width: '2px',
            // border_style: 'dashed',
            // border_color: 'var(--color-yellow)',
            // color_hover: 'var(--color-white)',
            size_hover: 'var(--size16)',
            bg_color_hover: 'var(--color-black)',
        }

    }}, protocol('primary'))

    const disabled = button({name: 'disable', body: 'Disable', disabled: true, theme: {
        // style: `
        // :host(i-button) button[disabled] {
        //     --color-opacity: 1;
        //     --bg-color-opacity: 0.2;
        // }
        // `,
        props: {
            // bg_color: 'var(--color-slimy-green)'
        }
    }}, protocol('disable'))

    const toggle = button({name: 'toggle', body: 'Toggle', role: 'switch', checked: false, theme : {
        style: ``,
        props: {
            current_bg_color: 'var(--color-green)'
        }
    }}, protocol('toggle'))

    // Tab element
    const tab_theme = {
        props: {
            color_hover: 'var(--color-white)',
            bg_color_hover: 'var(--color-red)',
            current_bg_color: 'var(--color-yellow)',
            current_color: 'var(--primary-color)'
        }
    }
    const tab1 = button({page: 'PLAN', name: 'tab1', body: 'Tab1', role: 'tab', current: true, theme: tab_theme }, protocol('tab1'))
    const tab2 = button({page: 'PLAN', name: 'tab2', body: 'Tab2', role: 'tab', theme: tab_theme}, protocol('tab2'))
    const tab3 = button({page: 'PLAN', name: 'tab3', body: 'Tab3', role: 'tab', theme: tab_theme}, protocol('tab3'))
    const demo_tab = bel`
    <nav class=${css.tabs}>
        ${tab1}${tab2}${tab3}
    </nav>`

    // Tab & icon_
    const icon_notice = icon({name: 'notice', path: 'assets'})
    const icon_warning = icon({name: 'warning', path: 'assets'})
    const icon_search = icon({name: 'search', path: 'assets'})
    const tab4 = button({page: 'JOBS', name: 'tab4', icon: icon_notice, body: bel`<div class="col2">Tab4 ${icon_notice}</div>`, role: 'tab', current: true, theme: { props: {size: 'var(--szie20)', current_color: 'var(--color-blue)', fill: 'var(--color-blue)', fill_hover:  'var(--color-blue)', icon_Size: '32px' }}}, tab_protocol('tab4'))
    const tab5 = button({page: 'JOBS', name: 'tab5', icon: icon_search, body: bel`<div class="col2">Tab5 ${icon_warning}</div>`, role: 'tab', theme: { props: {size: 'var(--szie20)', current_color:'var(--color-orange)', fill: 'var(--color-orange)', fill_hover: 'var(--color-orange)', icon_Size: '32px' }}}, tab_protocol('tab5'))
    const tab6 = button({page: 'JOBS', name: 'tab6', icon: icon_search, body: bel`<div class="col2">Tab6 ${icon_search}</div>`, role: 'tab', theme: { props: {size: 'var(--szie20)', icon_Size: '32px' }}}, tab_protocol('tab6'))
    const demo_icon_tab = bel`
    <nav class=${css.tabs}>
        ${tab4}${tab5}${tab6}
    </nav>`

    // Use icon_
    // icon_s
    let icon_cancel = icon({name: 'cross', path: 'assets'})
    let icon_confirm = icon({name: 'check', path: 'assets'})
    let icon_previous = icon({name: 'arrow-left', path: 'assets'})
    let icon_next = icon({name: 'arrow-right', path: 'assets'})
    // buttons
    const cancel = button({name: 'cancel', body: icon_cancel, theme: {
        style: ``,
        props: {
            fill: 'var(--color-red)',
            bg_color_hover: 'var(--color-flame)'
        }
    }}, protocol('cancel'))
    const confirm = button({name: 'confirm', body: icon_confirm, theme: {
        props: {
            fill: 'var(--color-green)',
            bg_color_hover: 'var(--color-lincoln-green)',
            fill_hover: 'var(--color-light-green)'
        }
    }}, protocol('confirm'))
    const previous = button({name: 'previous', body: bel`<div class="col2 left"><span>Previous</span>${icon_previous}</div>`, theme: {
        style: ``,
        props: {
            bg_color_hover: 'var(--color-green-yellow-crayola)',
            color_hover: 'var(--color-purple)',
            fill_hover: 'var(--color-purple)'
        }
    }}, protocol('previous'))
    const next = button({name: 'next', body: bel`<div class="col2 right"><span>Next</span>${icon_next}</div>`, theme: {
        // props: {
        //     fill: 'var(--color-green)',
        //     fill_hover: 'var(--color-bright-yellow-crayola)'
        // }
    }}, protocol('next'))

    const icon_option = icon({name: 'option', path: 'assets'})
    const option = button({name: 'filter-option', role: 'listbox', icon: icon_option, body: 'Filter', theme: {
        props: {
            width: '100px',
            color: 'var(--color-blue)',
            current_color: 'var(--color-blue)',
            fill: 'var(--color-blue)',
            current_fill: 'var(--color-white)'
        }
    }}, protocol('filter-option'))

    const filter_list = list({
        name: 'filter-list', 
        body: filter_options
    }, protocol('filter-list') )

    // content
    const content = bel`
    <div class=${css.content}>
        <section>
            <h2>Text</h2>
            <div class=${css.text}>
                ${primary}${disabled}${toggle}
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
            ${demo_tab}
        </section>
        <section>
            <h2>Tab & icon</h2>
            ${demo_icon_tab}
        </section>
        <section class=${css.dropdown}>
            <h2>Dropdown</h2>
            ${option}
        </section>
    </div>`
    const container = bel`<div class="${css.container}">${content}</div>`
    const app = bel`<div class="${css.wrap}" data-state="debug">
        ${container}${log_list}
    </div>`

    return app

    // handle events
    function handle_click_event ({head, refs, data}) {
        const to = head[1]
        const id = head[2]
        const role = head[0].split(' / ')[1]
        const from = head[0].split(' / ')[0]
        const make = message_maker(`${from} / ${role} / Demo`)
        if (role === 'button') return recipients['logs']( make({type: 'triggered'}) )
        if (role === 'tab') return handle_tab_event(from, data)
        if (role === 'switch') return handle_toggle_event(make, from, data)
        if (role === 'listbox') return handle_dropdown_menu_event(make, from, data)
    }

    function handle_tab_event (from, data) {
        const tabs = [...demo_tab.children]
        tabs.map( tab => {
            const state = from === tab.dataset.name ? !data : data
            const current = from === tab.dataset.name ? from : tab.dataset.name
            const type = from === tab.dataset.name ? 'checked' : 'unchecked'
            const make = message_maker(`${current} / tab / Demo`)
            recipients[current]( make({type, data: state}) )
            if (from === tab.dataset.name) return recipients['logs']( make({type, data: {selected: state, current: state} }) )
            return recipients['logs']( make({type, data: {selected: state, current: state}}) )
        })
    }

    function handle_tab_icon_event (from, data) {
        const tabs = [...demo_icon_tab.children]
        tabs.map( tab => {
            const state = from === tab.dataset.name ? true : data
            const current = from === tab.dataset.name ? from : tab.dataset.name
            const type = from === tab.dataset.name ? 'checked' : 'unchecked'
            const make = message_maker(`${current} / tab / Demo`)
            recipients[current]( make({type, data: state}) )
            if (from === tab.dataset.name) return recipients['logs']( make({type, data: {selected: state, current: state} }) )
            return recipients['logs']( make({type, data: {selected: state, current: state}}) )
        })
    }

    function handle_toggle_event (make, from, data) {
        const state = !data
        const message = make({type: 'switched', data: state})
        recipients[from](message)
        recipients['logs']( make({to: 'self', type: 'triggered', data: {checked: state}}) )
    }

    function handle_dropdown_menu_event (make, from, data) {
        const state = !data
        const dropdown = document.querySelector(`.${css.dropdown}`)
        dropdown.append(filter_list)
        recipients['filter-list']( make({type: 'expanded', data}) )
        recipients[from]( make({to: 'filter-list / listbox / ui-list', type: 'expanded', data: state}) )
        recipients['logs']( make({to: 'filter-list / listbox / ui-list', type: 'expanded', data: {expanded: state }}) )
    }

    function handle_filter_options (data) {
        const make = message_maker('filter-result')
        filter_options.filter( option => {
            if (option.text === data.option) option.selected = data.selected
        })
        recipients['logs']( make({to: 'search-result', type: 'filter swarm', data: filter_options}) )
    }
    // protocols
    function tab_protocol (name) {
        return send => {
            recipients[name] = send
            return (msg) => {
                const {head, refs, type, data} = msg
                const to = head[1]
                const id = head[2]
                const role = head[0].split(' / ')[1]
                const from = head[0].split(' / ')[0]
                if (type === 'click') return handle_tab_icon_event(from, data)
                recipients['logs'](msg)
            }
        }
    }
    function protocol (name) {
        return send => {
            recipients[name] = send
            return get
        }
    }

    function get (msg) {
        const { type, data } = msg
        recipients['logs'](msg)
        if (type === 'click') return handle_click_event(msg)
        if (type === 'selected') return handle_filter_options(data)
        if (type === 'unselected') return handle_filter_options(data)
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
    --color-green-yellow-crayola: 51, 100%, 83%;
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
    --primary-bg-color: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-size: var(--size16);
    --primary-input-radius: 8px;
    --primary-button-radius: 8px;
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
    font-size: var(--primary-size);
    -webkit-text-size-adjust:100%;
    font-family: var(--primary-font);
    background-color: hsl( var(--primary-bg-color) );
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
.tabs span {
    width: 40px;
}
.dropdown {

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

document.body.append(demo())