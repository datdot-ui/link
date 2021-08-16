const head = require('head')()
const bel = require('bel')
const csjs = require('csjs-inject')
const { i_button, i_link } = require('..')
// datdot-ui dependences
const terminal = require('datdot-terminal')
const icon = require('datdot-ui-icon')
const message_maker = require('../src/node_modules/message-maker')
const button = i_button
const link = i_link

function demo () {
    // save protocol callbacks
    let recipients = []
    // logs must be initialized first before components
    const logs = terminal(
    {
        mode: 'comfortable', 
        expanded: true
    }, protocol('logs'))
    // buttons
    const primary = button(
    {
        name: 'primary', 
        body: 'Primary',
        theme:
        { 
            style: ` `, 
            props: {
                // border_width: '2px',
                // border_style: 'dashed',
                // border_color: 'var(--color-yellow)',
                // color_hover: 'var(--color-white)',
                size_hover: 'var(--size16)',
                // bg_color_hover: 'var(--color-black)',
            }
        }
    }, protocol('primary'))

    const img_btn = button(
    {
        name: 'primary-img', 
        body: 'datdot.org',
        icon: {name: 'datdot-white', path: 'assets'},
        img: 'https://raw.githubusercontent.com/playproject-io/datdot/master/packages/datdot/logo-datdot.png',
        theme:
        { 
            style: ` `, 
            props: {
                // border_width: '2px',
                // border_style: 'dashed',
                // border_color: 'var(--color-yellow)',
                // color_hover: 'var(--color-white)',
                // size_hover: 'var(--size16)',
                // bg_color_hover: 'var(--color-black)',
                img_size: '2.5vw',
            }
        }
    }, protocol('primary-img'))

    const disabled = button(
    {
        name: 'disable', 
        body: 'Disable', 
        disabled: true, 
        theme: {
            // style: `
            // :host(i-button) button[disabled] {
            //     --color-opacity: 1;
            //     --bg-color-opacity: 0.2;
            // }
            // `,
            props: {
                // bg_color: 'var(--color-slimy-green)'
            }
        }
    }, protocol('disable'))

    const toggle = button(
    {
        name: 'toggle', 
        body: 'Toggle', 
        role: 'switch', 
        checked: false, 
        theme : {
            style: ``,
            props: {
                current_bg_color: 'var(--color-green)'
            }
        }
    }, protocol('toggle'))

    // Tab element
    const tab_theme = {
        props: {
            color_hover: 'var(--color-white)',
            bg_color_hover: 'var(--color-red)',
            current_bg_color: 'var(--color-yellow)',
            current_color: 'var(--primary-color)'
        }
    }
    const tab1 = button(
    {
        page: 'PLAN', 
        name: 'tab1', 
        body: 'Tab1', 
        role: 'tab', 
        current: true, 
        theme: tab_theme 
    }, protocol('tab1'))
    const tab2 = button(
    {
        page: 'PLAN', 
        name: 'tab2', 
        body: 'Tab2', 
        role: 'tab',
        theme: tab_theme
    }, protocol('tab2'))
    const tab3 = button(
    {
        page: 'PLAN', 
        name: 'tab3', 
        body: 'Tab3', 
        role: 'tab', 
        theme: tab_theme
    }, protocol('tab3'))
    const demo_tab = bel`
    <nav class=${css.tabs}>
        ${tab1}${tab2}${tab3}
    </nav>`

    // Tab & icon
    const icon_notice = {name: 'notice', path: 'assets'}
    const icon_warning = {name: 'warning', path: 'assets'}
    const icon_search = {name: 'search', path: 'assets'}
    const tab4 = button(
    {
        page: 'JOBS', 
        name: 'tab4', 
        icon: icon_notice, 
        body: bel`<div class="col2">Tab4 ${icon_notice}</div>`, 
        role: 'tab', 
        current: true, 
        theme: { 
            props: {
                    size: 'var(--size14)', 
                    current_color: 'var(--color-maya-blue)', 
                    fill: 'var(--color-maya-blue)', 
                    fill_hover:  'var(--color-maya-blue)', 
                    icon_size: '24px'
                }
            }
    }, tab_protocol('tab4'))
    const tab5 = button(
    {
        page: 'JOBS', 
        name: 'tab5', 
        icon: icon_warning, 
        body: bel`<div class="col2">Tab5 ${icon_warning}</div>`, 
        role: 'tab', 
        theme: { 
            props: {
                    current_color:'var(--color-orange)', 
                    fill: 'var(--color-orange)', 
                    fill_hover: 'var(--color-orange)', 
                    icon_size: '30px'
                }
            }
    }, tab_protocol('tab5'))
    const tab6 = button(
    {
        page: 'JOBS', 
        name: 'tab6', 
        icon: icon_search, 
        body: bel`<div class="col2"><span class="text">Tab6</span> ${icon({name: 'option', path: 'assets'})}</div>`, 
        role: 'tab', 
        theme: { 
            props: {
                color: 'var(--color-green)',
                current_color: 'var(--color-green)',
                fill: 'var(--color-green)',
                fill_hover: 'var(--color-green)',
                icon_size: '24px' 
            }
        }
    }, tab_protocol('tab6'))
    const demo_icon_tab = bel`
    <nav class=${css.tabs}>
        ${tab4}${tab5}${tab6}
    </nav>`

    // icons
    let icon_cancel = {name: 'cross', path: 'assets'}
    let icon_confirm = {name: 'check', path: 'assets'}
    let icon_previous = icon({name: 'arrow-left', path: 'assets'})
    let icon_next = icon({name: 'arrow-right', path: 'assets'})
    // buttons
    const cancel = button(
    {
        name: 'cancel', 
        // icon: icon_cancel,
        body: icon(icon_cancel),
        // img: icon(icon_cancel),
        theme: {
            style: ``,
            props: {
                fill: 'var(--color-red)',
                bg_color_hover: 'var(--color-flame)'
            }
        }
    }, protocol('cancel'))
    const confirm = button(
    {
        name: 'confirm', 
        icon: icon_confirm, 
        theme: {
            props: {
                fill: 'var(--color-green)',
                bg_color_hover: 'var(--color-lincoln-green)',
                fill_hover: 'var(--color-light-green)'
        }
    }}, protocol('confirm'))
    const previous = button(
    {
        name: 'previous', 
        body: bel`<div class="col2">${icon_previous}<span class="text">Previous</span></div>`, 
        theme: {
            style: ``,
            props: {
                bg_color_hover: 'var(--color-green-yellow-crayola)',
                color_hover: 'var(--color-purple)',
                fill_hover: 'var(--color-purple)'
        }
    }}, protocol('previous'))
    const next = button(
    {
        name: 'next', 
        body: bel`<div class="col2"><span class="text">Next</span>${icon_next}</div>`, 
        theme: {
            // props: {
            //     fill: 'var(--color-green)',
            //     fill_hover: 'var(--color-bright-yellow-crayola)'
        // }
    }}, protocol('next'))

    const listbox = button(
    {
        name: 'filter', 
        role: 'listbox',
        body: 'Filter', 
        icon: {name: 'filter', path: 'assets'},
        expanded: false,
        theme : {
            
        }
    }, protocol('filter'))

    const option = button(
    {
        name: 'option', 
        body: 'Option', 
        role: 'option',
        icon: {name: 'check', path: 'assets'},
        theme : {
            props: {
                current_bg_color: 'var(--color-blue)'
            }
        }
    }, protocol('option'))
    const option1 = button(
    {
        name: 'datdot.org', 
        body: bel`<div class="col2">${icon({name: 'datdot-black', path: 'assets'})} datdot.org</div>`, 
        role: 'option',
        icon: {name: 'check'},
        // img: 'https://raw.githubusercontent.com/playproject-io/datdot/master/packages/datdot/logo-datdot.png',
        selected: true,
        theme : {
            style: `
            :host(i-button) .col2 .icon {
                --icon-size: 30px;
            }
            `,
            props: {
                current_bg_color: 'var(--color-blue)',
            }
        }
    }, protocol('datdot.org'))

    // links
    const link1 = link(
    {
        name: 'link-datdot',
        role: 'link',
        body: 'datdot.org',
        icon: {name: 'plan-list', path:'assets'},
        link: {
            url: 'http://datdot.org',
            target: '#frame'
        },
        theme: {
            props: {
                color: 'var(--color-black)',
                fill: 'var(--color-black)',
                color_hover: 'var(--color-grey88)',
                fill_hover: 'var(--color-grey88)'
            }
        }
    }, protocol('link-datdot'))
    const link2 = link(
    {
        name: 'link-playproject',
        role: 'link',
        body: 'playproject.io',
        img: 'https://avatars.githubusercontent.com/u/51347431?s=200&v=4',
        link: {
            url: 'https://playproject.io/',
            target: '#frame'
        },
        theme: {
            props: {
                img_size: '44px'
            }
        }
    }, protocol('link-playproject'))
    const link3 = link(
    {
        name: 'link3',
        role: 'link',
        body: 'Google',
        disabled: true
    }, protocol('link3'))
    
    const link4 = link(
    {
        name: 'datdot-ui-issues',
        role: 'link',
        body: 'DatDot UI issues',
        link: {
            url: 'https://github.com/playproject-io/datdot-ui/issues',
            target: '_new'
        },
    }, protocol('datdot-ui-issues'))
    const link5 = link(
    {
        name: 'go-top',
        role: 'link',
        body: '↑Top',
        link: {
            url: '#top'
        },
    }, protocol('go-top'))
    // menu items
    const item1 = link(
    {
        name: 'item1',
        role: 'menuitem',
        body: 'DatDot UI issues',
        img: 'https://raw.githubusercontent.com/playproject-io/datdot/master/packages/datdot/logo-datdot.png',
        link: {
            url: 'https://github.com/playproject-io/datdot-ui/issues',
            target: '_new'
        },
        theme: {
            props: {
                // img_size: '20px'
            }
        }
    }, protocol('item1'))
    const item2 = link(
    {
        name: 'item2',
        role: 'menuitem',
        body: 'playproject.io',
        img: 'https://avatars.githubusercontent.com/u/51347431?s=200&v=4',
        link: {
            url: 'https://github.com/playproject-io',
        },
        theme: {
            props: {
                img_size: '40px',
            }
        }
    }, protocol('item2'))
    const item3 = link(
    {
        name: 'item3',
        role: 'menuitem',
        body: 'twitter',
        icon: {name: 'icon-svg.168b89d5', path: 'https://abs.twimg.com/responsive-web/client-web'},
        link: {
            url: 'https://twitter.com/home',
            target: '_blank'
        },
        theme: {
            props: {
                color: 'var(--color-blue)',
                fill: 'var(--color-blue)',
                icon_size: '20px'
            }
        }
    }, protocol('item3'))
    // content
    const content = bel`
    <div class=${css.content}>
        <span>test</span>
        <a name="top"></a>
        <section>
            <h2>Text</h2>
            <div class=${css.text}>
                ${primary}${disabled}${toggle}${listbox}${option}${option1}
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
            <h2>Imgage</h2>
            <div class=${css.icon}>
                ${img_btn}
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
        <section>
            <h2>Link</h2>
            <nav class=${css.links}>${link1}${link2}${link3}${link4}${link5}</nav>
            <iframe id="frame" src="https://datdot.org"></iframe>
        </section>
        <section>
            <h2>Menu item</h2>
            <nav class=${css.links}>${item1}${item2}${item3}</nav>
        </section>
    </div>`
    const container = bel`<div class="${css.container}">${content}</div>`
    const app = bel`<div class="${css.wrap}" data-state="debug">${container}${logs}</div>`

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
        if (role === 'option') return handle_select_event(from, data)
    }

    function handle_tab_event (from, data) {
        const tabs = [...demo_tab.children]
        tabs.map( tab => {
            const state = from === tab.dataset.name ? !data : data
            const current = from === tab.dataset.name ? from : tab.dataset.name
            const type = from === tab.dataset.name ? 'checked' : 'unchecked'
            const make = message_maker(`${current} / tab / Demo`)
            recipients[current]( make({type, data: state}) )
            if (from === tab.dataset.name) return recipients['logs']( make({type, data: {selected: state, current: state}}) )
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
            if (from === tab.dataset.name) return recipients['logs']( make({type, data: {selected: state, current: state}}) )
            return recipients['logs']( make({type, data: {selected: state, current: state}}) )
        })
    }

    function handle_toggle_event (make, from, data) {
        const state = !data
        const message = make({type: 'switched', data: state})
        const body = state ? 'Toggle on' : 'Toggle off'
        recipients[from](message)
        recipients[from](make({type: 'changed', data: body}))
        recipients['logs']( make({to: 'self', type: 'triggered', data: {checked: state}}) )
        recipients['logs']( make({to: 'self', type: 'changed', data: body}) )
    }

    function handle_dropdown_menu_event (make, from, data) {
        const state = data.expanded
        const type = state ? 'expanded' : 'unexpanded'
        recipients[from]( make({type, data: state}) )
        recipients['logs']( make({type}) )
    }

    function handle_select_event (from, data) {
        const make = message_maker(from)
        const state = data.selected
        const type = state ? 'selected' : 'unselected'
        recipients[from]({type, data: state})
        recipients['logs']( make({to: `options`, type, data: {selected: state ? from : ''} }) )
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
        if (type.match(/selected|unselected/) ) return handle_filter_options(data)
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
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 331, 86%, 78%;
    --color-persian-rose: 323, 100%, 56%;
    --color-orange: 35, 100%, 58%;
    --color-safety-orange: 27, 100%, 50%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-viridian-green: 180, 100%, 63%;
    --color-blue: 214, var(--r);
    --color-heavy-blue: 233, var(--r);
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
    --color-electric-violet: 276, 98%, 48%;
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
    --primary-body-bg-color: var(--color-greyF2);
    --primary-color: var(--color-black);
    --primary-hover-color: var(--color-white);
    --primary-bg-color: var(--color-white);
    --primary-hover-bg-color: var(--color-black);
    --primary-font: Arial, sens-serif;
    --primary-size: var(--size14);
    --primary-hover-size: var(--primary-size);
    --primary-border-width: 1px;
    --primary-border-style: solid;
    --primary-border-color: var(--color-black);
    --primary-radius: 8px;
    --primary-link-color: var(--color-heavy-blue);
    --primary-link-hover-color: var(--color-dodger-blue);
}
html {
    font-size: 62.5%;
    height: 100%;
}
*, *:before, *:after {
    box-sizing: border-box;
}
body {
    -webkit-text-size-adjust: 100%;
    margin: 0;
    padding: 0;
    font-size: calc(var(--primary-size) + 2px);
    font-family: var(--primary-font);
    color: var(--primary-color);
    background-color: hsl( var(--primary-body-bg-color) );
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
#frame {
    width: 100%;
    height: 480px;
}
.links {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
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