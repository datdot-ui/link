// const head = require('head')()
const bel = require('bel')
const csjs = require('csjs-inject')
const i_link = require('..')
// custom element
const img_btn = require('img-btn')
// datdot-ui dependences
const terminal = require('datdot-terminal')
const icon = require('datdot-ui-icon')
const protocol_maker = require('protocol-maker')
const make_grid = require('../src/node_modules/make-grid')

var id = 0

function demo () {
//------------------------------------------
    const contacts = protocol_maker('demo', listen)
    function listen (msg) {
        console.log('New message', { msg })
        const { head, refs, type, data, meta } = msg // receive msg
        const [from] = head
        // send back ack
        const $from = contacts.by_address[from]
        $from.notify($from.make({ to: $from.address, type: 'ack', refs: { 'cause': head } }))
        // handle
        if (type === 'click') return handle_click_event(msg)
    }
//------------------------------------------

    // links
    const link1 = i_link({
        name: 'link-datdot',
        body: 'datdot.org',
        cover: 'https://raw.githubusercontent.com/playproject-io/datdot/master/packages/datdot/logo-datdot.png',
        icons: {
            icon: {
                name: 'plan-list'
            }
        },
        classlist: 'icon-col-2',
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
    }, contacts.add('link-datdot'))

    const link2 = i_link({
        name: 'link-playproject',
        body: 'playproject.io',
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
    }, contacts.add('link-playproject'))

    const link3 = i_link({
        name: 'link3',
        body: 'google',
        disabled: true,
        theme: {
            props: {
                color: 'var(--color-deep-green)',
                color_hover: 'var(--color-electric-violet)'
            }
        }
    }, contacts.add('link3'))

    const link4 = i_link({
        name: 'datdot-ui-issues',
        body: 'datdot UI issues',
        link: {
            url: 'https://github.com/playproject-io/datdot-ui/issues',
            target: '_new'
        }
    }, contacts.add('datdot-ui-issues'))

    const link5 = i_link({
        name: 'go-top',
        body: '↑Top',
        link: {
            url: '#top'
        },
    }, contacts.add('go-top'))
    
    // menu items
    const item1 = i_link(
    {
        name: 'item1',
        body: `Datdot-UI issues`,
        icons: {
            icon: {
                name: 'datdot-white'
            }
        },
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
    }, contacts.add('item1'))

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
    }, contacts.add('item2'))

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
    }, contacts.add('item3'))
    
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
        <section>${item1}</section>   
        <section>${item2}</section>   
        <section>${item3}</section>   
    </div>`
    const container = bel`<div class="${css.container}">${content}</div>`
    const app = bel`<div class="${css.wrap}">${container}</div>`

    return app

    // handle events
    function handle_click_event ({head, type, refs, data}) {
        const [from, to, msg_id] = head
        const name = contacts.by_address[from].name
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