(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    let filter_options = 
    [
        {
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
        }
    ]
     // logs must be initialized first before components
    const log_list = logs(protocol('logs'))
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
                bg_color_hover: 'var(--color-black)',
            }
        }
    }, protocol('primary'))

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
                    size: 'var(--szie20)', 
                    current_color: 'var(--color-blue)', 
                    fill: 'var(--color-blue)', 
                    fill_hover:  'var(--color-blue)', 
                    icon_Size: '32px' 
                }
            }
    }, tab_protocol('tab4'))
    const tab5 = button(
    {
        page: 'JOBS', 
        name: 'tab5', 
        icon: icon_search, 
        body: bel`<div class="col2">Tab5 ${icon_warning}</div>`, 
        role: 'tab', 
        theme: { 
            props: {
                    size: 'var(--szie20)', 
                    current_color:'var(--color-orange)', 
                    fill: 'var(--color-orange)', 
                    fill_hover: 'var(--color-orange)', 
                    icon_Size: '32px'
                }
            }
    }, tab_protocol('tab5'))
    const tab6 = button({
        page: 'JOBS', 
        name: 'tab6', 
        icon: icon_search, 
        body: bel`<div class="col2">Tab6 ${icon_search}</div>`, 
        role: 'tab', 
        theme: { 
            props: {
                size: 'var(--szie20)', 
                icon_Size: '32px' 
            }
        }
    }, tab_protocol('tab6'))
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
    const confirm = button({
        name: 'confirm', 
        body: icon_confirm, 
        theme: {
            props: {
                fill: 'var(--color-green)',
                bg_color_hover: 'var(--color-lincoln-green)',
                fill_hover: 'var(--color-light-green)'
        }
    }}, protocol('confirm'))
    const previous = button({
        name: 'previous', 
        body: bel`<div class="col2 left"><span>Previous</span>${icon_previous}</div>`, 
        theme: {
            style: ``,
            props: {
                bg_color_hover: 'var(--color-green-yellow-crayola)',
                color_hover: 'var(--color-purple)',
                fill_hover: 'var(--color-purple)'
        }
    }}, protocol('previous'))
    const next = button({
        name: 'next', 
        body: bel`<div class="col2 right"><span>Next</span>${icon_next}</div>`, 
        theme: {
            // props: {
            //     fill: 'var(--color-green)',
            //     fill_hover: 'var(--color-bright-yellow-crayola)'
        // }
    }}, protocol('next'))

    const icon_option = icon({name: 'option', path: 'assets'})
    const option = button(
    {
        name: 'filter-option', 
        role: 'listbox', 
        icon: icon_option,
        body: 'Filter',
        theme: {
            props: {
                color: 'var(--color-blue)',
                current_color: 'var(--color-blue)',
                fill: 'var(--color-blue)',
                current_fill: 'var(--color-white)'
            }
        }
    }, protocol('filter-option'))

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
    const app = bel`<div class="${css.wrap}" data-state="debug">${container}${log_list}</div>`

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
        recipients['logs']( make({to: 'search-result', type: 'filter-swarm', data: filter_options}) )
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
    --color-blue: 214, var(--r);
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 331, 86%, 78%;
    --color-persian-rose: 323, 100%, 56%;
    --color-orange: 35, 100%, 58%;
    --color-safety-orange: 27, 100%, 50%;
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
    -webkit-text-size-adjust: 100%;
    margin: 0;
    padding: 0;
    font-size: var(--primary-size);
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
},{"..":34,"../src/node_modules/message-maker":35,"bel":5,"csjs-inject":8,"datdot-ui-icon":25,"datdot-ui-logs":28,"head":2,"list":3}],2:[function(require,module,exports){
module.exports = head

function head (lang = 'utf8', title = 'Button - DatDot UI') {
    document.title = title
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0')
    document.head.appendChild(meta)
}
},{}],3:[function(require,module,exports){
const bel = require('bel')
const style_sheet = require('../../src/node_modules/support-style-sheet')
const button = require('../../src/index')
const message_maker = require('../../src/node_modules/message-maker')
module.exports = i_list

function i_list ({page = 'Demo', flow = 'ui-list', name, body = [], expanded = false, hidden = true, theme }, protocol) {
    const recipients = []
    const make = message_maker(`${name} / ${flow} / i_list`)
    const message = make({type: 'ready'})

    function widget () {
        const send = protocol( get )
        send(message)
        const list = document.createElement('i-list')
        const shadow = list.attachShadow({mode: 'closed'})
        list.setAttribute('role', 'listbox')
        list.ariaHidden = hidden
        list.ariaLabel = name
        list.tabIndex = 0
        list.ariaExpanded = expanded
        style_sheet(shadow, style)
        try {
            body.map( (option, i) => {
                const {text, icon, selected} = option
                let item = button({page, name: text, body: text, selected, icon, role: 'option', 
                                    theme: { 
                                        props: {
                                            color_hover: 'var(--color)', 
                                            bg_color: 'transparent', 
                                            bg_color_hover: 'transparent'}
                                        }
                                    }, button_protocol(text))
                const li = bel`<li role="option" data-option=${text}" aria-selected=${selected}>${item}</li>`
                const option_list = text.toLowerCase().split(' ').join('-')
                shadow.append(li)
                const make = message_maker(`${option_list} / option / ${flow} / widget`)
                send( make({type: 'ready'}) )
            })
            if (body.length === 0) send({type: 'error', data: 'body no items'})
        } catch(e) {
            send({type: 'error', data: 'something went wrong'})
        }
        
        return list

        function handle_expanded_event (data) {
            list.ariaHidden = data
        }
        function handle_select_event (from, data) {
            const selected = !data
            const type = selected ? 'selected' : 'unselected'
            const { childNodes } = shadow
            const make = message_maker(`${from} / option / ${flow}`)
            childNodes.forEach( child => child.dataset.option === from ? child.setAttribute('aria-selected', selected) : false)
            recipients[from]( make({type, data: selected}) )
            send( make({type, data: { option: from, selected } }) )
        }
        function button_protocol (name) {
            return (send) => {
                recipients[name] = send
                return get
            }
        }
        function get (msg) {
            const {head, refs, type, data} = msg
            const to = head[1]
            const id = head[2]
            const role = head[0].split(' / ')[1]
            const from = head[0].split(' / ')[0]
            if (type === 'click') return handle_select_event(from, data)
            if (type === 'expanded') return handle_expanded_event(data)
        }
    }

    // insert CSS style
    const custom_style = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
    var {size, size_hover, current_size,
        weight, weight_hover, current_weight,
        color, color_hover, current_color, current_bg_color, 
        bg_color, bg_color_hover, border_color_hover,
        border_width, border_style, border_opacity, border_color, border_radius, 
        padding, width, height, opacity,
        fill, fill_hover, icon_size, current_fill,
        shadow_color, offset_x, offset_y, blur, shadow_opacity,
        shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
    } = theme.props
    }

    const style = `
    :host(i-list) {
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        display: grid;
        margin-top: 5px;
    }
    :host(i-list[aria-hidden="true"]) {
        opacity: 0;
        animation: close 0.3s;
        pointer-events: none;
    }
    :host(i-list[aria-hidden="false"]) {
        animation: open 0.3s;
    }
    li {
        display: grid;
        border: 1px solid hsl(var(--primary-color));
        margin-top: -1px;
        color: hsl(var(--color));
        background-color: hsl(var(--bg-color));
        transition: color 0.3s, background-color 0.3s ease-in-out;
        cursor: pointer;
    }
    li:hover {
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--color-greyEB)'};
    }
    @keyframes close {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes open {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    ${custom_style}
    `

    return widget()
}
},{"../../src/index":34,"../../src/node_modules/message-maker":35,"../../src/node_modules/support-style-sheet":36,"bel":5}],4:[function(require,module,exports){
var trailingNewlineRegex = /\n[\s]+$/
var leadingNewlineRegex = /^\n[\s]+/
var trailingSpaceRegex = /[\s]+$/
var leadingSpaceRegex = /^[\s]+/
var multiSpaceRegex = /[\n\s]+/g

var TEXT_TAGS = [
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'data', 'dfn', 'em', 'i',
  'kbd', 'mark', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'amp', 'small', 'span',
  'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr'
]

var VERBATIM_TAGS = [
  'code', 'pre', 'textarea'
]

module.exports = function appendChild (el, childs) {
  if (!Array.isArray(childs)) return

  var nodeName = el.nodeName.toLowerCase()

  var hadText = false
  var value, leader

  for (var i = 0, len = childs.length; i < len; i++) {
    var node = childs[i]
    if (Array.isArray(node)) {
      appendChild(el, node)
      continue
    }

    if (typeof node === 'number' ||
      typeof node === 'boolean' ||
      typeof node === 'function' ||
      node instanceof Date ||
      node instanceof RegExp) {
      node = node.toString()
    }

    var lastChild = el.childNodes[el.childNodes.length - 1]

    // Iterate over text nodes
    if (typeof node === 'string') {
      hadText = true

      // If we already had text, append to the existing text
      if (lastChild && lastChild.nodeName === '#text') {
        lastChild.nodeValue += node

      // We didn't have a text node yet, create one
      } else {
        node = document.createTextNode(node)
        el.appendChild(node)
        lastChild = node
      }

      // If this is the last of the child nodes, make sure we close it out
      // right
      if (i === len - 1) {
        hadText = false
        // Trim the child text nodes if the current node isn't a
        // node where whitespace matters.
        if (TEXT_TAGS.indexOf(nodeName) === -1 &&
          VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, '')
            .replace(trailingSpaceRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          if (value === '') {
            el.removeChild(lastChild)
          } else {
            lastChild.nodeValue = value
          }
        } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
          // The very first node in the list should not have leading
          // whitespace. Sibling text nodes should have whitespace if there
          // was any.
          leader = i === 0 ? '' : ' '
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, leader)
            .replace(leadingSpaceRegex, ' ')
            .replace(trailingSpaceRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          lastChild.nodeValue = value
        }
      }

    // Iterate over DOM nodes
    } else if (node && node.nodeType) {
      // If the last node was a text node, make sure it is properly closed out
      if (hadText) {
        hadText = false

        // Trim the child text nodes if the current node isn't a
        // text node or a code node
        if (TEXT_TAGS.indexOf(nodeName) === -1 &&
          VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingNewlineRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')

          // Remove empty text nodes, append otherwise
          if (value === '') {
            el.removeChild(lastChild)
          } else {
            lastChild.nodeValue = value
          }
        // Trim the child nodes if the current node is not a node
        // where all whitespace must be preserved
        } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
          value = lastChild.nodeValue
            .replace(leadingSpaceRegex, ' ')
            .replace(leadingNewlineRegex, '')
            .replace(trailingNewlineRegex, '')
            .replace(multiSpaceRegex, ' ')
          lastChild.nodeValue = value
        }
      }

      // Store the last nodename
      var _nodeName = node.nodeName
      if (_nodeName) nodeName = _nodeName.toLowerCase()

      // Append the node to the DOM
      el.appendChild(node)
    }
  }
}

},{}],5:[function(require,module,exports){
var hyperx = require('hyperx')
var appendChild = require('./appendChild')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = [
  'autofocus', 'checked', 'defaultchecked', 'disabled', 'formnovalidate',
  'indeterminate', 'readonly', 'required', 'selected', 'willvalidate'
]

var COMMENT_TAG = '!--'

var SVG_TAGS = [
  'svg', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix',
  'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood',
  'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage',
  'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight',
  'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter',
  'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src',
  'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image',
  'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph',
  'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS.indexOf(key) !== -1) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  appendChild(el, children)
  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"./appendChild":4,"hyperx":32}],6:[function(require,module,exports){
(function (global){(function (){
'use strict';

var csjs = require('csjs');
var insertCss = require('insert-css');

function csjsInserter() {
  var args = Array.prototype.slice.call(arguments);
  var result = csjs.apply(null, args);
  if (global.document) {
    insertCss(csjs.getCss(result));
  }
  return result;
}

module.exports = csjsInserter;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"csjs":11,"insert-css":33}],7:[function(require,module,exports){
'use strict';

module.exports = require('csjs/get-css');

},{"csjs/get-css":10}],8:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs;
module.exports.csjs = csjs;
module.exports.getCss = require('./get-css');

},{"./csjs":6,"./get-css":7}],9:[function(require,module,exports){
'use strict';

module.exports = require('./lib/csjs');

},{"./lib/csjs":15}],10:[function(require,module,exports){
'use strict';

module.exports = require('./lib/get-css');

},{"./lib/get-css":19}],11:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs();
module.exports.csjs = csjs;
module.exports.noScope = csjs({ noscope: true });
module.exports.getCss = require('./get-css');

},{"./csjs":9,"./get-css":10}],12:[function(require,module,exports){
'use strict';

/**
 * base62 encode implementation based on base62 module:
 * https://github.com/andrew/base62.js
 */

var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function encode(integer) {
  if (integer === 0) {
    return '0';
  }
  var str = '';
  while (integer > 0) {
    str = CHARS[integer % 62] + str;
    integer = Math.floor(integer / 62);
  }
  return str;
};

},{}],13:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

module.exports = function createExports(classes, keyframes, compositions) {
  var keyframesObj = Object.keys(keyframes).reduce(function(acc, key) {
    var val = keyframes[key];
    acc[val] = makeComposition([key], [val], true);
    return acc;
  }, {});

  var exports = Object.keys(classes).reduce(function(acc, key) {
    var val = classes[key];
    var composition = compositions[key];
    var extended = composition ? getClassChain(composition) : [];
    var allClasses = [key].concat(extended);
    var unscoped = allClasses.map(function(name) {
      return classes[name] ? classes[name] : name;
    });
    acc[val] = makeComposition(allClasses, unscoped);
    return acc;
  }, keyframesObj);

  return exports;
}

function getClassChain(obj) {
  var visited = {}, acc = [];

  function traverse(obj) {
    return Object.keys(obj).forEach(function(key) {
      if (!visited[key]) {
        visited[key] = true;
        acc.push(key);
        traverse(obj[key]);
      }
    });
  }

  traverse(obj);
  return acc;
}

},{"./composition":14}],14:[function(require,module,exports){
'use strict';

module.exports = {
  makeComposition: makeComposition,
  isComposition: isComposition,
  ignoreComposition: ignoreComposition
};

/**
 * Returns an immutable composition object containing the given class names
 * @param  {array} classNames - The input array of class names
 * @return {Composition}      - An immutable object that holds multiple
 *                              representations of the class composition
 */
function makeComposition(classNames, unscoped, isAnimation) {
  var classString = classNames.join(' ');
  return Object.create(Composition.prototype, {
    classNames: { // the original array of class names
      value: Object.freeze(classNames),
      configurable: false,
      writable: false,
      enumerable: true
    },
    unscoped: { // the original array of class names
      value: Object.freeze(unscoped),
      configurable: false,
      writable: false,
      enumerable: true
    },
    className: { // space-separated class string for use in HTML
      value: classString,
      configurable: false,
      writable: false,
      enumerable: true
    },
    selector: { // comma-separated, period-prefixed string for use in CSS
      value: classNames.map(function(name) {
        return isAnimation ? name : '.' + name;
      }).join(', '),
      configurable: false,
      writable: false,
      enumerable: true
    },
    toString: { // toString() method, returns class string for use in HTML
      value: function() {
        return classString;
      },
      configurable: false,
      writeable: false,
      enumerable: false
    }
  });
}

/**
 * Returns whether the input value is a Composition
 * @param value      - value to check
 * @return {boolean} - whether value is a Composition or not
 */
function isComposition(value) {
  return value instanceof Composition;
}

function ignoreComposition(values) {
  return values.reduce(function(acc, val) {
    if (isComposition(val)) {
      val.classNames.forEach(function(name, i) {
        acc[name] = val.unscoped[i];
      });
    }
    return acc;
  }, {});
}

/**
 * Private constructor for use in `instanceof` checks
 */
function Composition() {}

},{}],15:[function(require,module,exports){
'use strict';

var extractExtends = require('./css-extract-extends');
var composition = require('./composition');
var isComposition = composition.isComposition;
var ignoreComposition = composition.ignoreComposition;
var buildExports = require('./build-exports');
var scopify = require('./scopeify');
var cssKey = require('./css-key');
var extractExports = require('./extract-exports');

module.exports = function csjsTemplate(opts) {
  opts = (typeof opts === 'undefined') ? {} : opts;
  var noscope = (typeof opts.noscope === 'undefined') ? false : opts.noscope;

  return function csjsHandler(strings, values) {
    // Fast path to prevent arguments deopt
    var values = Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
      values[i - 1] = arguments[i];
    }
    var css = joiner(strings, values.map(selectorize));
    var ignores = ignoreComposition(values);

    var scope = noscope ? extractExports(css) : scopify(css, ignores);
    var extracted = extractExtends(scope.css);
    var localClasses = without(scope.classes, ignores);
    var localKeyframes = without(scope.keyframes, ignores);
    var compositions = extracted.compositions;

    var exports = buildExports(localClasses, localKeyframes, compositions);

    return Object.defineProperty(exports, cssKey, {
      enumerable: false,
      configurable: false,
      writeable: false,
      value: extracted.css
    });
  }
}

/**
 * Replaces class compositions with comma seperated class selectors
 * @param  value - the potential class composition
 * @return       - the original value or the selectorized class composition
 */
function selectorize(value) {
  return isComposition(value) ? value.selector : value;
}

/**
 * Joins template string literals and values
 * @param  {array} strings - array of strings
 * @param  {array} values  - array of values
 * @return {string}        - strings and values joined
 */
function joiner(strings, values) {
  return strings.map(function(str, i) {
    return (i !== values.length) ? str + values[i] : str;
  }).join('');
}

/**
 * Returns first object without keys of second
 * @param  {object} obj      - source object
 * @param  {object} unwanted - object with unwanted keys
 * @return {object}          - first object without unwanted keys
 */
function without(obj, unwanted) {
  return Object.keys(obj).reduce(function(acc, key) {
    if (!unwanted[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

},{"./build-exports":13,"./composition":14,"./css-extract-extends":16,"./css-key":17,"./extract-exports":18,"./scopeify":24}],16:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /\.([^\s]+)(\s+)(extends\s+)(\.[^{]+)/g;

module.exports = function extractExtends(css) {
  var found, matches = [];
  while (found = regex.exec(css)) {
    matches.unshift(found);
  }

  function extractCompositions(acc, match) {
    var extendee = getClassName(match[1]);
    var keyword = match[3];
    var extended = match[4];

    // remove from output css
    var index = match.index + match[1].length + match[2].length;
    var len = keyword.length + extended.length;
    acc.css = acc.css.slice(0, index) + " " + acc.css.slice(index + len + 1);

    var extendedClasses = splitter(extended);

    extendedClasses.forEach(function(className) {
      if (!acc.compositions[extendee]) {
        acc.compositions[extendee] = {};
      }
      if (!acc.compositions[className]) {
        acc.compositions[className] = {};
      }
      acc.compositions[extendee][className] = acc.compositions[className];
    });
    return acc;
  }

  return matches.reduce(extractCompositions, {
    css: css,
    compositions: {}
  });

};

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}

},{"./composition":14}],17:[function(require,module,exports){
'use strict';

/**
 * CSS identifiers with whitespace are invalid
 * Hence this key will not cause a collision
 */

module.exports = ' css ';

},{}],18:[function(require,module,exports){
'use strict';

var regex = require('./regex');
var classRegex = regex.classRegex;
var keyframesRegex = regex.keyframesRegex;

module.exports = extractExports;

function extractExports(css) {
  return {
    css: css,
    keyframes: getExport(css, keyframesRegex),
    classes: getExport(css, classRegex)
  };
}

function getExport(css, regex) {
  var prop = {};
  var match;
  while((match = regex.exec(css)) !== null) {
    var name = match[2];
    prop[name] = name;
  }
  return prop;
}

},{"./regex":21}],19:[function(require,module,exports){
'use strict';

var cssKey = require('./css-key');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};

},{"./css-key":17}],20:[function(require,module,exports){
'use strict';

/**
 * djb2 string hash implementation based on string-hash module:
 * https://github.com/darkskyapp/string-hash
 */

module.exports = function hashStr(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0;
};

},{}],21:[function(require,module,exports){
'use strict';

var findClasses = /(\.)(?!\d)([^\s\.,{\[>+~#:)]*)(?![^{]*})/.source;
var findKeyframes = /(@\S*keyframes\s*)([^{\s]*)/.source;
var ignoreComments = /(?!(?:[^*/]|\*[^/]|\/[^*])*\*+\/)/.source;

var classRegex = new RegExp(findClasses + ignoreComments, 'g');
var keyframesRegex = new RegExp(findKeyframes + ignoreComments, 'g');

module.exports = {
  classRegex: classRegex,
  keyframesRegex: keyframesRegex,
  ignoreComments: ignoreComments,
};

},{}],22:[function(require,module,exports){
var ignoreComments = require('./regex').ignoreComments;

module.exports = replaceAnimations;

function replaceAnimations(result) {
  var animations = Object.keys(result.keyframes).reduce(function(acc, key) {
    acc[result.keyframes[key]] = key;
    return acc;
  }, {});
  var unscoped = Object.keys(animations);

  if (unscoped.length) {
    var regexStr = '((?:animation|animation-name)\\s*:[^};]*)('
      + unscoped.join('|') + ')([;\\s])' + ignoreComments;
    var regex = new RegExp(regexStr, 'g');

    var replaced = result.css.replace(regex, function(match, preamble, name, ending) {
      return preamble + animations[name] + ending;
    });

    return {
      css: replaced,
      keyframes: result.keyframes,
      classes: result.classes
    }
  }

  return result;
}

},{"./regex":21}],23:[function(require,module,exports){
'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function fileScoper(fileSrc) {
  var suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return name + '_' + suffix;
  }
};

},{"./base62-encode":12,"./hash-string":20}],24:[function(require,module,exports){
'use strict';

var fileScoper = require('./scoped-name');
var replaceAnimations = require('./replace-animations');
var regex = require('./regex');
var classRegex = regex.classRegex;
var keyframesRegex = regex.keyframesRegex;

module.exports = scopify;

function scopify(css, ignores) {
  var makeScopedName = fileScoper(css);
  var replacers = {
    classes: classRegex,
    keyframes: keyframesRegex
  };

  function scopeCss(result, key) {
    var replacer = replacers[key];
    function replaceFn(fullMatch, prefix, name) {
      var scopedName = ignores[name] ? name : makeScopedName(name);
      result[key][scopedName] = name;
      return prefix + scopedName;
    }
    return {
      css: result.css.replace(replacer, replaceFn),
      keyframes: result.keyframes,
      classes: result.classes
    };
  }

  var result = Object.keys(replacers).reduce(scopeCss, {
    css: css,
    keyframes: {},
    classes: {}
  });

  return replaceAnimations(result);
}

},{"./regex":21,"./replace-animations":22,"./scoped-name":23}],25:[function(require,module,exports){
const styleSheet = require('supportCSSStyleSheet')
const svg = require('svg')

module.exports = ({name, path, isShadow = false, theme}) => {
    const url = path ? path : './src/svg'
    const symbol = svg(`${url}/${name}.svg`)
    if (isShadow) {
        function layout(style) {
            const icon = document.createElement('i-icon')
            const shadow = icon.attachShadow({mode: 'closed'})
            const slot = document.createElement('slot')
            slot.name = 'icon'
            styleSheet(shadow, style)
            slot.append(symbol)
            shadow.append(slot)
            return icon
        }
        // insert CSS style
        const customStyle = theme ? theme.style : ''
        // set CSS variables
        if (theme && theme.props) {
            var { fill, size } = theme.props
        }
        const style = `
        :host(i-icon) {
            --size: ${size ? size : '24px'};
            --fill: ${fill ? fill : 'var(--primary-color)'};
            display: block;
        }
        slot[name='icon'] {
            display: grid;
            justify-content: center;
            align-items: center;
        }
        slot[name='icon'] span {
            display: block;
            width: var(--size);
            height: var(--size);
        }
        slot[name='icon'] svg {
            width: 100%;
            height: auto;
        }
        slot[name='icon'] g {
            fill: hsl(var(--fill));
            transition: fill .3s ease-in-out;
        }
        ${customStyle}
        `
        return layout(style)
    }

    return symbol
}

},{"supportCSSStyleSheet":26,"svg":27}],26:[function(require,module,exports){
module.exports = supportCSSStyleSheet
function supportCSSStyleSheet (root, style) {
    return (() => {
        try {
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(style)
            root.adoptedStyleSheets = [sheet]
            return true 
        } catch (error) { 
            const injectStyle = `<style>${style}</style>`
            root.innerHTML = `${injectStyle}`
            return false
        }
    })()
}
},{}],27:[function(require,module,exports){
module.exports = svg

function svg(path) {
    const el = document.createElement('span')
    el.classList.add('icon')
    async function load(done) {
        const res = await fetch(path)
        const parse = document.createElement('div')

        if (res.status == 200) {
            let data = await res.text()
            parse.innerHTML = data
            return done(null, parse.children[0])
        }
        throw new Error(res.status)
    }
    load((err, svg) => {
        if (err) console.error(err)
        el.append(svg)
    })
    return el
}   
},{}],28:[function(require,module,exports){
const bel = require('bel')
const style_sheet = require('support-style-sheet')
const message_maker = require('message_maker')

module.exports = i_log
function i_log (protocol, to = 'Test for a long component name / demo / demo.js') {
    const send = protocol(get)
    const make = message_maker(`ui-logs / i_log / index.js`)
    const message = make({to, type: 'ready', refs: ['old_logs', 'new_logs']})
    send(message)
    // send({from: 'logs', flow: 'logs-layout', type: 'ready', fn: 'logs', line: 8})
    const i_log = document.createElement('i-log')
    const shadow = i_log.attachShadow({mode: 'closed'})
    const title = bel`<h4>Logs</h4>`
    const content = bel`<section class="content">${title}</section>`
    const log_list = document.createElement('log-list')
    style_sheet(shadow, style)
    content.append(log_list)
    shadow.append(content)
    document.addEventListener('DOMContentLoaded', () => { log_list.scrollTop = log_list.scrollHeight })

    return i_log

    function get (msg) {
        // const {page = 'Demo', from, flow, type, body, fn, file, line} = msg
        const {head, refs, type, data, meta} = msg
        try {
            const from = bel`<span aria-label=${head[0]} class="from">${head[0]}</span>`
            const to = bel`<span aria-label="to" class="to">${head[1]}</span>`
            const data_info = bel`<span aira-label="data" class="data">data: ${typeof data === 'object' ? JSON.stringify(data) : data}</span>`
            const type_info = bel`<span aria-type="${type}" aria-label="${type}"  class="type">${type}</span>`
            const refs_info = bel`<div class="refs">refs: </div>`
            refs.map( (ref, i) => refs_info.append(bel`<span aria-label="${ref}">${ref}${i < refs.length - 1 ? ', ' : ''}</span>`))
            const log = bel`
            <div class="log">
                <div class="head">
                    ${from}
                    ${type_info}
                    ${to}
                </div>
                ${data_info}
                ${refs_info}
            </div>`
            var list = bel`
            <aside class="list">
                ${log}
                <div class="file">
                    <span>${meta.stack[0]}</span>
                    <span>${meta.stack[1]}</span>
                </div>
            </aside>
            `
            log_list.append(list)
            log_list.scrollTop = log_list.scrollHeight
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => log_list.append(list))
            return false
        }
    }
}

const style = `
:host(i-log) {}
.content {
    --bgColor: var(--color-dark);
    --opacity: 1;
    width: 100%;
    height: 100%;
    font-size: var(--size12);
    color: #fff;
    background-color: hsla( var(--bgColor), var(--opacity));
}
h4 {
    --bgColor: var(--color-deep-black);
    --opacity: 1;
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    background-color: hsl( var(--bgColor), var(--opacity) );
}
log-list {
    display: flex;
    flex-direction: column;
    height: calc(100% - 44px);
    overflow-y: auto;
    margin: 8px;
}
.list {
    --bgColor: 0, 0%, 30%;
    --opacity: 0.25;
    padding: 2px 10px 4px 10px;
    margin-bottom: 4px;
    background-color: hsla( var(--bgColor), var(--opacity) );
    border-radius: 8px;
    transition: background-color 0.6s ease-in-out;
}
log-list .list:last-child {
    --bgColor: var(--color-verdigris);
    --opacity: 0.5;
}
.log {
    line-height: 1.8;
    word-break: break-all;
    white-space: pre-wrap;
}
.log span {
    --size: var(--size12);
    font-size: var(--size);
}
.from {
    --color: var(--color-maximum-blue-green);
    color: hsl( var(--color) );
    justify-content: center;
    align-items: center;
}
.to {}
.type {
    --color: var(--color-greyD9);
    --bgColor: var(--color-greyD9);
    --opacity: .25;
    color: hsl( var(--color) );
    background-color: hsla( var(--bgColor), var(--opacity) );
    padding: 2px 10px;
    border-radius: 8px;
    justify-self: center;
    align-self: center;
}
log-list .list:last-child .type {}
.file {
    --color: var(--color-greyA2);
    display: grid;
    justify-content: right;
    color: hsl( var(--color) );
    line-height: 1.6;
}
log-list .list:last-child .file {
    --color: var(--color-white);
}
[aria-type="click"] {
    --color: var(--color-dark);
    --bgColor: var(--color-yellow);
    --opacity: 1;
}
[aria-type="triggered"] {
    --color: var(--color-white);
    --bgColor: var(--color-blue-jeans);
    --opacity: .5;
}
[aria-type="opened"] {
    --bgColor: var(--color-slate-blue);
    --opacity: 1;
}
[aria-type="closed"] {
    --bgColor: var(--color-ultra-red);
    --opacity: 1;
}
[aria-type="error"] {
    --color: var(--color-white);
    --bgColor: var(--color-red);
    --opacity: 1;
}
[aria-type="warning"] {
    --color: var(--color-white);
    --bgColor: var(--color-deep-saffron);
    --opacity: 1;
}
[aria-type="checked"] {
    --color: var(--color-dark);
    --bgColor: var(--color-blue-jeans);
    --opacity: 1;
}
[aria-type="unchecked"] {
    --bgColor: var(--color-blue-jeans);
    --opacity: .3;
}
[aria-type="selected"] {
    --color: var(--color-dark);
    --bgColor: var(--color-lime-green);
    --opacity: 1;
}
[aria-type="unselected"] {
    --bgColor: var(--color-lime-green);
    --opacity: .25;
}

log-list .list:last-child [aria-type="ready"] {
    --bgColor: var(--color-deep-black);
    --opacity: 0.3;
}
.function {
    --color: 0, 0%, 70%;
    color: var(--color);
}
log-list .list:last-child .function {
    --color: var(--color-white);
}
.head {
    display: grid;
    grid-template-columns: 1fr 80px 1fr;
    gap: 12px;
}
.refs {
    display: flex;
    gap: 5px;
    color: white;
}
`
},{"bel":5,"message_maker":29,"support-style-sheet":30}],29:[function(require,module,exports){
module.exports = function message_maker (from) {
    let msg_id = 0
    return function make ({to, type, data = null, refs = []}) {
        const stack = (new Error().stack.split('\n').slice(2).filter(x => x.trim()))
        const message = { head: [from, to, ++msg_id], refs, type, data, meta: { stack }}
        return message
    }
}
},{}],30:[function(require,module,exports){
module.exports = support_style_sheet
function support_style_sheet (root, style) {
    return (() => {
        try {
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(style)
            root.adoptedStyleSheets = [sheet]
            return true 
        } catch (error) { 
            const inject_style = `<style>${style}</style>`
            root.innerHTML = `${inject_style}`
            return false
        }
    })()
}
},{}],31:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],32:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else if (xstate === COMMENT && opts.comments) {
          reg += String(arg)
        } else if (xstate !== COMMENT) {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      if (opts.createFragment) return opts.createFragment(tree[2])
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // no-op, self closing tag without a space <br/>
        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length) {
            res.push([OPEN, reg])
          }
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else if (x === null || x === undefined) return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":31}],33:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],34:[function(require,module,exports){
const style_sheet = require('support-style-sheet')
const message_maker = require('message-maker')
module.exports = i_button

function i_button (option, protocol) {
    const {page, flow = 'ui-button', name, body, icon = '', role = 'button', mode = '', state, expanded = false, current = false, selected = false, checked = false, disabled = false, theme} = option
    let is_current = current
    let is_checked = checked
    let is_disabled = disabled
    let is_selected = selected
    let is_expanded = expanded

    function widget () {
        const send = protocol(get)
        const make = message_maker(`${name} / ${role} / ${flow}`)
        let data = role === 'tab' ?  {selected: is_current ? 'true' : is_selected, current: is_current} : role === 'switch' ? {checked: is_checked} : role === 'listbox' ? {expanded: is_expanded} : disabled ? {disabled} : role === 'option' ? {selected: is_selected, current: is_current} : null
        const message = make({to: 'demo.js', type: 'ready', data})
        send(message)
        const el = document.createElement('i-button')
        const text = document.createElement('span')
        if (body != void 0) {
            text.classList.add('text')
            text.append(body)
        }
        el.dataset.name = name
        el.dataset.ui = role
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', 0)
        el.onclick = handle_click
        const shadow = el.attachShadow({mode: 'open'})
        style_sheet(shadow, style)
        if (icon || role.match(/option|listbox/) ) {
            if (icon === '') shadow.append(body)
            if (body === undefined) shadow.append(icon)
            if (icon !== '' && body) shadow.append(icon, text)
        }else shadow.append(body)

        // define conditions
        if (state) {
            el.dataset.state = state
            el.setAttribute('aria-live', 'assertive')
        }
        if (role === 'tab') {
            el.dataset.current = is_current
            el.setAttribute('aria-selected', false)
        }
        if (role === 'switch') {
            el.setAttribute('aria-checked', is_checked)
        }
        if (role === 'listbox') {
            el.setAttribute('aria-haspopup', role)
        }
        if (disabled) {
            el.setAttribute('aria-disabled', is_disabled)
            el.setAttribute('disabled', is_disabled)
        } else {
            el.removeAttribute('aria-disabled')
            el.removeAttribute('disabled')
        }
        if (is_checked) {
            el.setAttribute('aria-checked', is_checked)
        }
        if (current) {
            is_selected = current
            el.setAttribute('aria-current', is_current)
        }
        if (is_selected || !is_selected && role.match(/option/)) {
            el.setAttribute('aria-selected', is_selected)
        } 
        if (is_expanded) {
            el.setAttribute('aria-expanded', is_expanded)
        }
        return el

        // toggle
        function switched_event (data) {
            is_checked = data
            if (!is_checked) return el.removeAttribute('aria-checked')
            el.setAttribute('aria-checked', is_checked)
        }
        // dropdown menu
        function expanded_event (data) {
            is_expanded = data
            el.setAttribute('aria-expanded', is_expanded)
        }
        // tab checked
        function checked_event (data) {
            is_checked = data
            is_current = is_checked
            el.setAttribute('aria-selected', is_checked)
            el.setAttribute('aria-current', is_checked)
            el.dataset.current = is_current
        }
        function selected_event (body) {
            is_selected = body
            el.setAttribute('aria-selected', is_selected)
            if (mode === 'single-select') {
                is_current = body
                el.setAttribute('aria-current', is_current)
            }
        }
        function changed_event (body) {
            const { childNodes } = shadow
            const lists = shadow.firstChild.tagName === 'LI' ? childNodes : [...childNodes].filter( (child, index) => index !== 0)
            const [icon, text] = lists
            if (text) {
                text.textContent = body
            } else {
                shadow.childNodes[0].textContent = body
                el.ariaLabel = body
            }
        }
        // button click
        function handle_click () {
            if (is_current) return
            const type = 'click'
            if (role === 'tab') return send( make({type, data: is_checked}) )
            if (role === 'switch') return send( make({type, data: is_checked}) )
            if (role === 'listbox') return send( make({type, data: is_expanded}) )
            if (role === 'option') return send( make({type, data: is_selected}) )
            send( make({type}) )
        }
        // protocol get msg
        function get (msg) {
            const { head, refs, type, data } = msg
            // toggle
            if (type === 'switched') return switched_event(data)
            // dropdown
            if (type.match(/expanded|unexpanded/)) return expanded_event(data)
            // tab, checkbox
            if (type.match(/checked|unchecked/)) return checked_event(data)
            // option
            if (type.match(/selected|unselected/)) return selected_event(data)
            if (type === 'changed') return changed_event(data)
        }
    }
   
    // insert CSS style
    const custom_style = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var {size, size_hover, current_size,
            weight, weight_hover, current_weight, current_hover_weight,
            color, color_hover, current_color, current_bg_color, 
            current_hover_color, current_hover_bg_color,
            bg_color, bg_color_hover, border_color_hover,
            border_width, border_style, border_opacity, border_color, border_radius, 
            padding, width, height, opacity,
            fill, fill_hover, icon_size, current_fill, current_hover_fill,
            shadow_color, offset_x, offset_y, blur, shadow_opacity,
            shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
        } = theme.props
    }

    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--size14)'};
        --size-hover: ${size_hover ? size_hover : 'var(--size)'};
        --current-size: ${current_size ? current_size : 'var(--size14)'};
        --bold: ${weight ? weight : 'normal'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --width: ${width ? width : 'unset'};
        --height: ${height ? height : 'unset'};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --border-width: ${border_width ? border_width : '0px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        --border-opacity: ${border_opacity ? border_opacity : '1'};
        --border: var(--border-width) var(--border-style) hsla( var(--border-color), var(--border-opacity) );
        --border-radius: ${border_radius ? border_radius : 'var(--primary-button-radius)'};
        --fill: ${fill ? fill : 'var(--primary-color)'};
        --fill-hover: ${fill_hover ? fill_hover : 'var(--color-white)'};
        --icon-size: ${icon_size ? icon_size : '16px'};
        --offset_x: ${offset_x ? offset_x : '0px'};
        --offset-y: ${offset_y ? offset_y : '6px'};
        --blur: ${blur ? blur : '30px'};
        --shadow-color: ${shadow_color ? shadow_color : 'var(--pimary-color)'};
        --shadow-opacity: ${shadow_opacity ? shadow_opacity : '1'};
        --box-shadow: var(--offset_x) var(--offset-y) var(--blur) hsla( var(--shadow-color), var(--shadow-opacity) );
        display: inline-grid;
        grid-auto-flow: column;
        grid-column-gap: 5px;
        justify-content: center;
        align-items: center;
        ${width && 'width: var(--width)'};
        ${height && 'height: var(--height)'};
        font-size: var(--size);
        font-weight: var(--bold);
        color: hsl( var(--color) );
        background-color: hsla( var(--bg-color), var(--opacity) );
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        padding: var(--padding);
        transition: font-size .3s, color .3s, background-color .3s ease-in-out;
        cursor: pointer;
    }
    :host(i-button:hover), :host(i-button[role]:hover) {
        --weight: ${weight_hover ? weight_hover : 'initial'};
        --color: ${color_hover ? color_hover : 'var(--color-white)'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--primary-color)'};
        --border-color: ${border_color_hover ? border_color_hover : 'var(--primary-color)'};
        --offset-x: ${offset_x_hover ? offset_x_hover : '0'};
        --offset-y: ${offset_y_hover ? offset_y_hover : '0'};
        --blur: ${blur_hover ? blur_hover : '50px'};
        --shadow-color: ${shadow_color_hover ? shadow_color_hover : 'var(--pimary-color)'};
        --shadow-opacity: ${shadow_opacity_hover ? shadow_opacity_hover : '.25'};
        font-size: var(--size-hover);
    }
    :host(i-button) g {
        fill: hsl(var(--fill));
        transition: fill 0.3s ease-in-out;
    }
    :host(i-button:hover) g {
        --fill-hover: ${fill_hover ? fill_hover : 'var(--color-white)'};
        fill: hsl(var(--fill-hover));
    }
    :host(i-button[role="button"])  {

    }
    :host(i-button) .col2 {
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        align-items: center;
        column-gap: 8px;
    }
    :host(i-button) .icon {
        display: grid;
        justify-content: center;
        align-items: center;
        width: var(--icon-size);
        height: var(---con-size);
    }
    :host(i-button) .right .icon {
        grid-column-start: 2;
    }
    :host(i-button) .left .icon {
        grid-column-start: 1;
    }
    :host(i-button) svg {
        max-width: 100%;
        width: 100%;
        height: auto;
    }
    :host(i-button[role="tab"])  {
        --size: ${size ? size : 'initial'};
        --width: ${width ? width : '100%'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --border-radius: ${border_radius ? border_radius : '0'};
        --border-width: ${border_width ? border_width : '0'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[role="switch"]) {
        --width: ${width ? width : 'unset'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --border-radius: ${border_radius ? border_radius : '8px'};
        --border-width: ${border_width ? border_width : '0'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[role="listbox"]) {
        --width: ${width ? width : 'unset'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --border-radius: ${border_radius ? border_radius : '8px'};
        --border-width: ${border_width ? border_width : '0'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        display: grid;
        grid-template-columns: ${body && icon !== '' ? '1fr auto' : 'auto'};
        width: var(--width);
    }
    :host(i-button[role="listbox"]) .text {
        grid-column-start: 1;
        text-align: left;
    }
    :host(i-button[role="listbox"]) .icon {
        ${body && icon !== '' ? 'grid-column-start: 2;' : ''}
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
        font-size: var(--current-size);
    }
    :host(i-button[aria-current="true"]) g {
        --fill: ${fill ? fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]), :host(i-button[aria-expanded="true"]),
    :host(i-button[aria-checked="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
    }
    :host(i-button[aria-expanded="true"]:hover) {
        --bold: ${current_hover_weight ? current_hover_weight : 'initial'};
        --color: ${current_hover_color ? current_hover_color : 'var(--color-white)'};
        --bg-color: ${current_hover_bg_color ? current_hover_bg_color : 'var(--primary-color)'};
    }
    :host(i-button[aria-expanded="true"]) g {
        --fill: ${current_fill ? current_fill : 'var(--color-white)'};
    }
    :host(i-button[aria-expanded="true"]:hover) g {
        --fill: ${current_hover_fill ? current_hover_fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]) g {
        --fill: ${current_fill ? current_fill : 'var(--color-white)' };
    }
    :host(i-button[disabled]), :host(i-button[disabled]:hover) {
        --color: ${color ? color : 'var(--color-dark)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --color-opacity: .6;
        --bg-color-opacity: .3;
        color: hsla(var(--color), var(--color-opacity));
        background-color: hsla(var(--bg-color), var(--bg-color-opacity));
        pointer-events: none;
        cursor: not-allowed;
    }
    :host(i-button[role="option"]) {
        display: grid;
        grid-template-rows: 24px;
        grid-template-columns: 20px auto;
        justify-content: left;
    }
    :host(i-button[role="option"]) .text {
        display: block;
        grid-column-start: 2;
    }
    :host(i-button[role="option"]:hover) g {
        --fill-hover: ${fill_hover ? fill_hover : 'var(--primary-color)'};
    }
    :host(i-button[aria-current="true"]:hover) g {
        --fill-hover: ${fill_hover ? fill_hover : 'var(--color-white)'};
    }
    :host(i-button[role="option"][aria-selected="false"]) .icon {
        display: none;
    }
    ${custom_style}
    `

    return widget()
}
},{"message-maker":35,"support-style-sheet":36}],35:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],36:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}]},{},[1]);
