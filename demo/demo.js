// const head = require('head')()
const bel = require('bel')
const csjs = require('csjs-inject')
const i_link = require('..')
// custom element
const img_btn = require('img-btn')
// datdot-ui dependences
const terminal = require('datdot-terminal')
const icon = require('datdot-ui-icon')
const message_maker = require('message-maker')
const make_grid = require('../src/node_modules/make-grid')

var id = 0

function demo () {
//------------------------------------------
    const myaddress = `${__filename}-${id++}`
    const inbox = {}
    const outbox = {}
    const recipients = {}
    const names = {}
    const message_id = to => (outbox[to] = 1 + (outbox[to]||0))

    function make_protocol (name) {
        return function protocol (address, notify) {
            names[address] = recipients[name] = { name, address, notify, make: message_maker(myaddress) }
            return { notify: listen, address: myaddress }
        }
    }
    function listen (msg) {
        console.log('New message', { msg })
        const { head, refs, type, data, meta } = msg // receive msg
        inbox[head.join('/')] = msg                  // store msg
        const [from] = head
        // send back ack
        const { notify, make, address } = names[from]
        notify(make({ to: address, type: 'ack', refs: { 'cause': head } }))
        // handle
        if (type.match(/ready/)) return recipients['logs'](msg)
        if (type === 'click') return handle_click_event(msg)
        if (type === 'changed') return handle_changed_event(type, data)
        if (type.match(/current/)) return 
        recipients['logs'](msg)
    }
//------------------------------------------
    // logs must be initialized first before components
    const logs = terminal(
    {
        mode: 'compact', 
        expanded: false
    }, make_protocol('logs'))

    // links
    const link1 = i_link(
    {
        name: 'link-datdot',
        role: 'link',
        body: 'datdot.org',
        // cover: 'https://cdn.pixabay.com/photo/2018/01/17/20/22/analytics-3088958_960_720.jpg',
        // icons: {
        //     icon: {
        //         name: 'plan-list'
        //     }
        // },
        // classlist: 'icon-col-2',
        link: {
            url: 'http://datdot.org',
            target: '#frame'
        },
        theme: {
            props: {
                color: 'var(--color-black)',
                icon_fill: 'var(--color-black)',
                color_hover: 'var(--color-grey88)',
                icon_fill_hover: 'var(--color-grey88)',
                // avatar_radius: '50%'
            }
        }
    }, make_protocol('link-datdot'))
    const link2 = i_link(
    {
        name: 'link-playproject',
        role: 'link',
        body: 'Playproject.io',
        // icon: {name: 'datdot-black', classlist: 'col2-right'},
        cover: 'https://avatars.githubusercontent.com/u/51347431?s=200&v=4',
        disabled: false,
        link: {
            url: 'https://playproject.io/',
            target: '#frame'
        },
        theme: {
            props: {
                // avatar_width: '44px'
            }
        }
    }, make_protocol('link-playproject'))
    const link3 = i_link(
    {
        name: 'link3',
        role: 'link',
        body: 'Google',
        // disabled: true
        theme: {
            props: {
                color: 'var(--color-deep-green)',
                color_hover: 'var(--color-electric-violet)'
            }
        }
    }, make_protocol('link3'))
    
    const link4 = i_link(
    {
        name: 'datdot-ui-issues',
        role: 'link',
        body: 'DatDot UI issues',
        link: {
            url: 'https://github.com/playproject-io/datdot-ui/issues',
            target: '_new'
        }
    }, make_protocol('datdot-ui-issues'))
    const link5 = i_link(
    {
        name: 'go-top',
        role: 'link',
        body: '↑Top',
        link: {
            url: '#top'
        },
    }, make_protocol('go-top'))
    // menu items
    const item1 = i_link(
    {
        name: 'item1',
        role: 'menuitem',
        body: `Datdot-UI issues`,
        icons: {
            icon: {
                name: 'datdot-white'
            }
        },
        // cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png',
        cover : 'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445__340.jpg',
        link: {
            url: 'https://github.com/playproject-io/datdot-ui/issues',
            target: '_new'
        },
        theme: {
            props: {
                avatar_radius: '50%',
                avatar_width: '80px',
                avatar_height: '80px',
                avatar_width_hover: '100px',
                avatar_height_hover: '100px'
                // icon_size: '30px'
            },
            grid: {
                avatar: {
                    column: '3'
                },
                // icon: {
                //     column: '1'
                // }
            }
            // grid: {
            //     link: {
            //         areas: "icon text",
            //         align: 'items-center',
            //         gap: '5px'
            //     },
            //     text: {
            //         area: 'text'
            //     },
            //     icon: {
            //         area: 'icon'
            //     }
            // }
        }
    }, make_protocol('item1'))
    const item2 = i_link(
    {
        name: 'item2',
        role: 'menuitem',
        body: 'Playproject.io',
        cover: 'https://avatars.githubusercontent.com/u/51347431?s=200&v=4',
        link: {
            url: 'https://github.com/playproject-io',
        },
        theme: {
            props: {
                // avatar_width: '40px',
            }
        }
    }, make_protocol('item2'))
    const item3 = i_link(
    {
        name: 'item3',
        role: 'menuitem',
        body: 'twitter',
        icons: {
            icon: {name: 'icon-svg.168b89d5', path: 'https://abs.twimg.com/responsive-web/client-web'}
        },
        link: {
            url: 'https://twitter.com/home',
            target: '_blank'
        },
        theme: {
            props: {
                size: 'var(--size16)',
                size_hover: 'var(--size28)',
                color: 'var(--color-heavy-blue)',
                color_hover: 'var(--color-dodger-blue)',
                // icon_size: 'var(--size20)',
                // icon_size_hover: 'var(--size28)',
                icon_fill: 'var(--color-blue)',
                icon_fill_hover: 'var(--color-dodger-blue)'
            }
        }
    }, make_protocol('item3'))
    /*
        if image's width is not equal to height, must be calculated resize to be small or big, 
        to avoid the image is cutting by border-radius, it won't look like a round button,
        it would look like a cut half image.
    */
    // content
    const content = bel`
    <div class=${css.content}>
        <section>
            <h2>Link</h2>
            <nav class=${css.links}>
                ${link1}${link2}${link3}${link4}${link5}
            </nav>
            <iframe id="frame" title="frame" src="https://datdot.org"></iframe>
        </section>   
    </div>`
    const container = bel`<div class="${css.container}">${content}</div>`
    const app = bel`<div class="${css.wrap}">${container}${logs}</div>`

    return app

    // handle events
    function handle_click_event ({head, type, refs, data}) {
        const [from, to, msg_id] = head
        const name = recipients[from].name
        // check if name ===...
        if (from === 'notice' || from === 'warn' || from === 'search') return handle_tab_icon_event({to, data})
        if (from.match(/button|menuitem/)) return handle_triggered({type, from, data})
        if (from === 'tab') return handle_tab_event({from, to, data})
        if (from === 'switch') return handle_toggle_event(from, data)
        if (from === 'listbox') return handle_dropdown_menu_event(from, data)
        if (from === 'option') return handle_select_event({from, to, data})
    }

    function handle_triggered () {
        const { notify, address, make } = recipients['logs']
        notify(make({ to: address, type: 'triggered' }))
    }

    function handle_panel_change(id) {
        const panels = document.querySelector('.panels')
        const {childNodes} = panels
        childNodes.forEach( item => {
            const index = item.id === id ? 0 : -1
            item.setAttribute('tabindex', index)
            if (item.id === id) item.removeAttribute('hidden')
            else item.setAttribute('hidden', 'true')
        })
    }

    function handle_tab_event ({from, to, data}) {
        const {name, selected} = data
        handle_text_panel_change(to, '.panel1')
        Object.entries(recipients).forEach(([key, value]) => {
            if (key === name) {
                const { address: name_address, notify: name_notify, make: name_make } = recipients[name]
                name_notify(name_make({ to: name_address, type: 'tab-selected', data: { selected } }))
                const { address: logs_address, notify: logs_notify, make: logs_make } = recipients['logs']
                logs_notify(logs_make({ to: logs_address, type: 'tab-selected', data: { name } }) )
                return name_notify(name_make({ to: name_address, type: 'current', data: selected }))
            }
            const { address: key_address, notify: key_notify, make: key_make } = recipients[key]
            key_notify(key_make({ to: key_address, type: 'tab-selected', data: { selected: !selected } }))
            return key_notify(key_make({ to: key_address, type: 'current', data: !selected }))
        }) 
    }

    function handle_tab_icon_event ({to, data}) {
        const {name, selected} = data
        // change contante in panel
        handle_text_panel_change(to, '.panel2')
        // if not target is from, then make tab current and selected changed to false
        Object.entries(recipients).forEach(([key, value]) => {
            if (key === name) {
                const { address: name_address, notify: name_notify, make: name_make } = recipients[name]
                name_notify(name_make({ to: name_address, type: 'tab-selected', data: { selected } }))
                const { address: logs_address, notify: logs_notify, make: logs_make } = recipients['logs']
                logs_notify(logs_make({ to: logs_address, type: 'tab-selected', data: { name } }) )
                return name_notify(name_make({ to: name_address, type: 'current', data: selected }))
            }
            const { address: key_address, notify: key_notify, make: key_make } = recipients[key]
            key_notify(key_make({ to: key_address, type: 'tab-selected', data: { selected: !selected } }))
            return key_notify(key_make({ to: key_address, type: 'current', data: !selected }))
        }) 
    }

    function handle_text_panel_change(id, items) {
        const panels = document.querySelectorAll(items)
        panels.forEach( item => {
            const check = item.id === id
            const index = check ? 0 : -1
            item.setAttribute('tabindex', index)
            if (check) item.removeAttribute('hidden')   
            else item.setAttribute('hidden', 'true')
        })
    }

    function handle_toggle_event (from, data) {
        const state = !data.checked
        let body = state ? 'Toggle on' : 'Toggle off'
        if (from === 'thumb-blossom') body = state ? 'Blossom open' : 'Blossom close'
        const cover = state ? 'https://cdn.pixabay.com/photo/2019/05/11/02/33/cherry-blossom-4194997_960_720.jpg' : 'https://cdn.pixabay.com/photo/2016/02/19/11/07/japanese-cherry-blossoms-1209577_960_720.jpg'
        const icon = state ? {name: 'star'} : {name: 'edit'}
        const content =  {text: body, cover: from === 'thumb-blossom' ? cover : undefined, icon, title: undefined}
        const { address, notify, make } = recipients[from]
        notify(make({ to: address, type: 'switched', data: { checked: state } }))
        notify(make({ to: address, type: 'changed', data: content }))
        const { address: logs_address, notify: logs_notify, make: logs_make } = recipients['logs']
        logs_notify(logs_make({to: logs_address, type: 'triggered', data: { checked: state } }) )
        logs_notify(logs_make({to: logs_address, type: 'changed', data: content }) )
    }

    function handle_dropdown_menu_event (from, data) {
        const state = data.expanded
        const type = state ? 'expanded' : 'collapsed'
        const { address, notify, make } = recipients[from]
        notify(make({ to: address, type, data: state }))
        const { address: logs_address, notify: logs_notify, make: logs_make } = recipients['logs']
        logs_notify(logs_make({ to: logs_address, type }) )
    }

    function handle_select_event ({to, data}) {
        const {name, selected, content} = data
        const type = selected ? 'selected' : 'unselected'
        recipients[name]({type, data: selected})
        const { address: logs_address, notify: logs_notify, make: logs_make } = recipients['logs']
        logs_notify(logs_make({to: logs_address, type, data: { content } }))
    }
    function handle_changed_event (type, data) {
        const { notify, make, address } = recipients['single-selector']
        notify(make({ to: address, type, data }))
    }
}

const css = csjs`
:root {
    /* define colors ---------------------------------------------*/
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 329, 100%, 65%;
    --color-persian-rose: 323, 100%, 50%;
    --color-orange: 32, var(--r);
    --color-light-orange: 36, 100%, 55%;
    --color-safety-orange: 27, 100%, 50%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-viridian-green: 180, 100%, 63%;
    --color-blue: 214, 100%, 49%;
    --color-heavy-blue: 233, var(--r);
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-light-green: 97, 86%, 77%;
    --color-lime-green: 127, 100%, 40%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-deep-green: 136, 79%, 22%;
    --color-green: 136, 82%, 38%;
    --color-lincoln-green: 97, 100%, 18%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-green-yellow-crayola: 51, 100%, 83%;
    --color-purple: 283, var(--r);
    --color-heliotrope: 288, 100%, 73%;
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
    /* define font ---------------------------------------------*/
    --snippet-font: Segoe UI Mono, Monospace, Cascadia Mono, Courier New, ui-monospace, Liberation Mono, Menlo, Monaco, Consolas;
    --size12: 1.2rem;
    --size13: 1.3rem;
    --size14: 1.4rem;
    --size15: 1.5rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size34: 3.4rem;
    --size36: 3.6rem;
    --size38: 3.8rem;
    --size40: 4rem;
    --size42: 4.2rem;
    --size44: 4.4rem;
    --size46: 4.6rem;
    --size48: 4.8rem;
    --size50: 5rem;
    --size52: 5.2rem;
    --size54: 5.4rem;
    --size56: 5.6rem;
    --size58: 5.8rem;
    --size60: 6rem;
    --weight100: 100;
    --weight300: 300;
    --weight400: 400;
    --weight600: 600;
    --weight800: 800;
    /* define primary ---------------------------------------------*/
    --primary-body-bg-color: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-size: var(--size14);
    --primary-size-hover: var(--primary-size);
    --primary-weight: 300;
    --primary-weight-hover: 300;
    --primary-color: var(--color-black);
    --primary-color-hover: var(--color-white);
    --primary-color-focus: var(--color-orange);
    --primary-bg-color: var(--color-white);
    --primary-bg-color-hover: var(--color-black);
    --primary-bg-color-focus: var(--color-greyA2), 0.5;
    --primary-border-width: 1px;
    --primary-border-style: solid;
    --primary-border-color: var(--color-black);
    --primary-border-opacity: 1;
    --primary-radius: 8px;
    --primary-avatar-width: 100%;
    --primary-avatar-height: auto;
    --primary-avatar-radius: 0;
    --primary-disabled-size: var(--primary-size);
    --primary-disabled-color: var(--color-greyA2);
    --primary-disabled-bg-color: var(--color-greyEB);
    --primary-disabled-icon-size: var(--primary-icon-size);
    --primary-disabled-icon-fill: var(--color-greyA2);
    --primary-listbox-option-icon-size: 20px;
    --primary-listbox-option-avatar-width: 40px;
    --primary-listbox-option-avatar-height: auto;
    --primary-listbox-option-avatar-radius: var(--primary-avatar-radius);
    --primary-option-avatar-width: 30px;
    --primary-option-avatar-height: auto;
    --primary-list-avatar-width: 30px;
    --primary-list-avatar-height: auto;
    --primary-list-avatar-radius: var(--primary-avatar-radius);
    /* define icon settings ---------------------------------------------*/
    --primary-icon-size: var(--size16);
    --primary-icon-size-hover: var(--size16);
    --primary-icon-fill: var(--primary-color);
    --primary-icon-fill-hover: var(--primary-color-hover);
    /* define current ---------------------------------------------*/
    --current-size: var(--primary-size);
    --current-weight: var(--primary-weight);
    --current-color: var(--color-white);
    --current-bg-color: var(--color-black);
    --current-icon-size: var(--primary-icon-size);
    --current-icon-fill: var(--color-white);
    --current-list-selected-icon-size: var(--list-selected-icon-size);
    --current-list-selected-icon-fill: var(--color-white);
    --current-list-selected-icon-fill-hover: var(--color-white);
    --current-list-size: var(--current-size);
    --current-list-color: var(--current-color);
    --current-list-bg-color: var(--current-bg-color);
    --current-list-avatar-width: var(--primary-list-avatar-width);
    --current-list-avatar-height: var(--primary-list-avatar-height);
    /* role listbox settings ---------------------------------------------*/
    /*-- collapsed --*/
    --listbox-collapsed-bg-color: var(--primary-bg-color);
    --listbox-collapsed-bg-color-hover: var(--primary-bg-color-hover);
    --listbox-collapsed-icon-size: var(--size14);
    --listbox-collapsed-icon-size-hover: var(--size14);
    --listbox-collapsed-icon-fill: var(--primary-icon-fill);
    --listbox-collapsed-icon-fill-hover: var(--primary-icon-fill-hover);
    --listbox-collapsed-listbox-size: var(--primary-size);
    --listbox-collapsed-listbox-size-hover: var(--primary-size-hover);
    --listbox-collapsed-listbox-weight: var(--primary-weight);
    --listbox-collapsed-listbox-weight-hover: var(--primary-weight);
    --listbox-collapsed-listbox-color: var(--primary-color);
    --listbox-collapsed-listbox-color-hover: var(--primary-color-hover);
    --listbox-collapsed-listbox-avatar-width: var(--primary-listbox-option-avatar-width);
    --listbox-collapsed-listbox-avatar-height: var(--primary-listbox-option-avatar-height);
    --listbox-collapsed-listbox-icon-size: var(--primary-listbox-option-icon-size);
    --listbox-collapsed-listbox-icon-size-hover: var(--primary-listbox-option-icon-size);
    --listbox-collapsed-listbox-icon-fill: var(--color-blue);
    --listbox-collapsed-listbox-icon-fill-hover: var(--color-yellow);
    /*-- expanded ---*/
    --listbox-expanded-bg-color: var(--current-bg-color);
    --listbox-expanded-icon-size: var(--size14);
    --listbox-expanded-icon-fill: var(--color-light-green);
    --listbox-expanded-listbox-size: var(--size20);
    --listbox-expanded-listbox-weight: var(--primary-weight);
    --listbox-expanded-listbox-color: var(--current-color);
    --listbox-expanded-listbox-avatar-width: var(--primary-listbox-option-avatar-width);
    --listbox-expanded-listbox-avatar-height: var(--primary-listbox-option-avatar-height);
    --listbox-expanded-listbox-icon-size: var(--primary-listbox-option-icon-size);
    --listbox-expanded-listbox-icon-fill: var(--color-light-green);
    /* role option settings ---------------------------------------------*/
    --list-bg-color: var(--primary-bg-color);
    --list-bg-color-hover: var(--primary-bg-color-hover);
    --list-selected-icon-size: var(--size16);
    --list-selected-icon-size-hover: var(--list-selected-icon-size);
    --list-selected-icon-fill: var(--primary-icon-fill);
    --list-selected-icon-fill-hover: var(--primary-icon-fill-hover);
    /* role link settings ---------------------------------------------*/
    --link-size: var(--size14);
    --link-size-hover: var(--primary-link-size);
    --link-color: var(--color-heavy-blue);
    --link-color-hover: var(--color-dodger-blue);
    --link-color-focus: var(--color-flame);
    --link-bg-color: transparent;
    --link-icon-size: var(--size30);
    --link-icon-fill: var(--primary-link-color);
    --link-icon-fill-hover: var(--primary-link-color-hover);
    --link-avatar-width: 60px;
    --link-avatar-width-hover: var(--link-avatar-width);
    --link-avatar-height: auto;
    --link-avatar-height-hover: auto;
    --link-avatar-radius: 0;
    --link-disabled-size: var(--primary-link-size);
    --link-disabled-color: var(--color-greyA2);
    --link-disabled-bg-color: transparent;
    --link-disabled-icon-fill: var(--color-greyA2);
    /* role menuitem settings ---------------------------------------------*/
    --menu-size: var(--size15);
    --menu-size-hover: var(--menu-size);
    --menu-weight: var(--primary-weight);
    --menu-weigh-hover: var(--primary-weight);
    --menu-color: var(--primary-color);
    --menu-color-hover: var(--color-grey88);
    --menu-icon-size: 20px;
    --menu-icon-size-hover: var(--menu-icon-size);
    --menu-icon-fill: var(--primary-color);
    --menu-icon-fill-hover: var(--color-grey88);
    --menu-avatar-width: 50px;
    --menu-avatar-width-hover: var(--menu-avatar-width);
    --menu-avatar-height: auto;
    --menu-avatar-height-hover: var(--menu-avatar-height);
    --menu-avatar-radius: 0;
    --menu-disabled-color: var(--primary-disabled-color);
    --menu-disabled-size: var(--menu-size);
    --menu-disabled-weight: var(--primary-weight);
}
html {
    font-size: 62.5%;
    height: 100%;
}
*, *:before, *:after {
    box-sizing: border-box;
    position: relative;
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
img {
    width: 100%;
    height: auto;
}
.wrap {
    display: grid;
    ${make_grid({rows: 'minmax(0, 1fr) 200px', areas: ["container", "terminal"]})}
    height: 100%;
}
.container {
    grid-area: container;
    overflow: hidden scroll;
    height: 100%;
}
.content {
    padding: 2% 5%;
}
.text, .icon {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 8px;
    margin-bottom: 20px;
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
/*
.links {
    max-width: 100%;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(auto, 20%));
    grid-auto-flow: column;
    justify-items: center;
    align-items: center;
    gap: 12px;
}
section .links:nth-child(2) {
    grid-template-columns: fit-content(250px) auto;
}
*/
.links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
}
.thumb i-button:first-child {
   margin-bottom: 20px;
}
`

document.body.append(demo())