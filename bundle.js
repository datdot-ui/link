(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (__filename){(function (){
const bel = require('bel')
const csjs = require('csjs-inject')
const file = require('path').basename(__filename)
const button = require('..')
const head = require('head')()
// datdot-ui dependences
const logs = require('datdot-ui-logs')
const icon = require('datdot-ui-icon')
const list = require('list')

function demo () {
    // save protocol callbacks
    let recipients = []
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

    const disabled = button({name: 'disable', body: 'Disable', is_disabled: true, theme: {
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

    const toggle = button({name: 'toggle', body: 'Toggle', role: 'switch', is_checked: false, theme : {
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
    const tab1 = button({page: 'PLAN', name: 'tab1', body: 'Tab1', role: 'tab', is_current: true, theme: tab_theme }, protocol('tab1'))
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
    const tab4 = button({page: 'JOBS', name: 'tab4', icon: icon_notice, body: bel`<div class="col2">Tab4 ${icon_notice}</div>`, role: 'tab', is_current: true, theme: { props: {size: 'var(--szie20)', current_color: 'var(--color-blue)', fill: 'var(--color-blue)', fill_hover:  'var(--color-blue)', icon_Size: '32px' }}}, tab_protocol('tab4'))
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
    const option = button({name: 'option', role: 'listbox', body: icon_option, theme: {
        props: {
            fill: 'var(--color-blue)',
            currentFill: 'var(--color-white)'
        }
    }}, protocol('option'))

    const filter_list = list({name: 'filter-list', body: [
        {
            text: 'Available',
            icon: icon({name: 'check', path: 'assets'})
        },
        {
            text: 'Not Available',
            icon: icon({name: 'check', path: 'assets'})
        },
        {
            text: 'Core',
            icon: icon({name: 'check', path: 'assets'})
        },
        {
            text: 'Drive',
            icon: icon({name: 'check', path: 'assets'})
        },
        {
            text: 'Cabal',
            icon: icon({name: 'check', path: 'assets'})
        },
    ]}, protocol('filter-list') )

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
        <section>
            <h2>Dropdown</h2>
            ${option}${filter_list}
        </section>
    </div>`

    const container = bel`
    <div class="${css.container}">
        ${content}
    </div>
    `

    const app = bel`
    <div class="${css.wrap}" data-state="debug">
        ${container}${log_list}
    </div>`

    return app

    function handle_click_event ({page, from, flow, body}) {
        const role = flow.split('-')[1]
        if (role === 'button') return recipients['logs']({page, from, flow: role, type: 'triggered', body: 'button event', fn: 'handle_click_event', file, line: 165})
        if (role === 'tab') return handle_tab_event(page, from, role)
        if (role === 'switch') return handle_toggle_event(page, from, role, body)
        if (role === 'listbox') return handle_dropdown_menu_event(page, from, role, body)
    }

    function handle_tab_event (page, from, flow) {
        const tabs = [...demo_tab.children]
        tabs.map( tab => {
            let current = from === tab.dataset.name ? from : tab.dataset.name
            let type = from === tab.dataset.name ? 'checked' : 'unchecked'
            recipients[current]({from: current, flow, type})
            recipients['logs']({page, from: current, flow, type, body: 'tab event', fn: 'handle_tab_event', file, line: 183})
        })
    }

    function handle_tab_icon_event ({page, from, flow}) {
        const role = flow.split('-')[1]
        const tabs = [...demo_icon_tab.children]
        tabs.map( tab => {
            let current = from === tab.dataset.name ? from : tab.dataset.name
            let type = from === tab.dataset.name ? 'checked' : 'unchecked'
            recipients[current]({from: current, flow, type})
            recipients['logs']({page, from: current, flow: role, type, body: 'tab event', fn: 'handle_tab_icon_event', file, line: 194})
        })
    }

    function handle_toggle_event (page, from, flow, body) {
        const state = !body
        recipients[from]({page, from, type: 'switched', body: state})
        recipients['logs']({page, from, flow, type: 'triggered', body: `toggle ${body ? 'on' : 'off'}`, fn: 'handle_toggle_event', file, line: 195})
    }

    function handle_dropdown_menu_event (page, from, flow, body) {
        const state = !body 
        recipients[from]({from, flow, type: 'expanded', body: state})
        recipients['logs']({page, from, flow, type: 'triggered', body: `expanded ${state ? 'on' : 'off'}`, fn: 'handle_dropdown_menu_event', line: 201})
    }

    function get (msg) {
        const { type } = msg
        recipients['logs'](msg)
        if (type === 'click') return handle_click_event(msg)
    }

    function tab_protocol (name) {
        return sender => {
            recipients[name] = sender
            return (msg) => {
                const { type } = msg
                recipients['logs'](msg)
                if (type === 'click') return handle_tab_icon_event(msg)
            }
        }
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
    --primary-bg_color: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-font-size: var(--size16);
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
    font-size: var(--primary-font-size);
    -webkit-text-size-adjust:100%;
    font-family: var(--primary-font);
    background-color: hsl( var(--primary-bg_color) );
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
}).call(this)}).call(this,"/demo/demo.js")
},{"..":35,"bel":5,"csjs-inject":8,"datdot-ui-icon":25,"datdot-ui-logs":28,"head":2,"list":3,"path":33}],2:[function(require,module,exports){
module.exports = head

function head (lang = 'utf8', title = 'Button - DatDot UI') {
    document.title = title
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0')
    document.head.appendChild(meta)
}
},{}],3:[function(require,module,exports){
(function (__filename){(function (){
const bel = require('bel')
const csjs = require('csjs-inject')
const file = require('path').basename(__filename)
const style_sheet = require('../../src/node_modules/support-style-sheet')
const button = require('../../src/index')

module.exports = i_list

function i_list ({page = 'Demo', flow = 'ui-list', name, body = [], is_expanded = false, is_hidden }, protocol) {
    const recipients = [] 
    const sender = protocol( get )
    sender({page, from: name, flow, type: 'ready', file, fn: 'i_list', line: 12})
    const list = document.createElement('i-list')
    list.setAttribute('role', 'listbox')
    list.ariaHidden = false
    list.ariaLabel = name
    list.tabIndex = 0

    try {
        body.map( (option, i) => {
            const {text, icon} = option
            const selected = i === 0 ? true : false
            // todo: make button into list
            var item = button({page, name: text, body: text, icon, isSelected: selected, theme: { props: { bg_color: 'transparent', bg_color_hover: 'transparent'}}}, button_protocol(text))
            const li = bel`<li role="option" data-option=${text.toLowerCase()}">${item}</li>`
            list.append(li)
            if (i === 0) list.setAttribute('aria-activedescendant', text)
        })
        if (body.length === 0) sender({from: name, flow, type: 'error', body: 'body no items', fn: 'i_list', file, line: 25})
    } catch(e) {
        sender({from: name, flow, type: 'error', body: 'something went wrong', fn: 'i_list', file, line: 27})
    }
    
    return list

    function button_protocol (name) {
        return (sender) => {
            recipients[name] = sender
            return (msg) => {
                const {page, flow, from: name, type, body, fn} = msg
                console.log( msg );
                sender(msg)
            }
        }
    }

    function get (msg) {
        console.log( msg );
    }
}
}).call(this)}).call(this,"/demo/node_modules/list.js")
},{"../../src/index":35,"../../src/node_modules/support-style-sheet":36,"bel":5,"csjs-inject":8,"path":33}],4:[function(require,module,exports){
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

},{"./appendChild":4,"hyperx":31}],6:[function(require,module,exports){
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
},{"csjs":11,"insert-css":32}],7:[function(require,module,exports){
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
(function (__filename){(function (){
const styleSheet = require('supportCSSStyleSheet')
const bel = require('bel')
const file = require('path').basename(__filename)

module.exports = logs

function logs ( protocol ) {
    const sender = protocol ( get )
    sender({from: 'logs', flow: 'logs-layout', type: 'ready', fn: 'logs', file, line: 8})
    const ilog = document.createElement('i-log')
    const shadow = ilog.attachShadow({mode: 'closed'})
    const title = bel`<h4>Logs</h4>`
    const content = bel`<section class="content">${title}</section>`
    const logList = document.createElement('log-list')
    styleSheet(shadow, style)
    content.append(logList)
    shadow.append(content)

    document.addEventListener('DOMContentLoaded', () => {
        logList.scrollTop = logList.scrollHeight
    })

    return ilog

    function get ({page = 'Demo', from, flow, type, body, fn, file, line}) {
        try {
            const f = flow ? bel`<span class="flow">${flow} :: </span>` : ''
            var log = bel`
            <aside class="list">
                <span aria-label=${page} class="page">${page}</span>
                <div class="log">
                    <span aria-label="info" class="info">${f} ${from}</span>
                    <span aria-type="${type}" class="type">${type}</span>
                    <span aira-label="message" class="message">${typeof body === 'object' ? JSON.stringify(body) : body}</span>
                    ${fn && bel`<span aria-type="${fn}" class="function">Fn: ${fn}</span>`}
                </div>
                <div class="file">${file} : ${line}</div>
            </aside>
            `
            logList.append(log)
            logList.scrollTop = logList.scrollHeight
            
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => {
                logList.append(log)
            })
            return false
        }
    }
}

const style = `
:host(i-log) {}
:host(i-log) .content {
    --bgColor: var(--color-dark);
    --opacity: 1;
    width: 100%;
    height: 100%;
    font-size: var(--size12);
    color: #fff;
    background-color: hsla( var(--bgColor), var(--opacity));
}
:host(i-log) h4 {
    --bgColor: var(--color-deep-black);
    --opacity: 1;
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    background-color: hsl( var(--bgColor), var(--opacity) );
}
:host(i-log) log-list {
    display: block;
    height: calc(100% - 44px);
    overflow-y: auto;
    margin: 8px;
}
:host(i-log) .list {
    --bgColor: 0, 0%, 30%;
    --opacity: 0.25;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: minmax(auto, 60px) auto;
    grid-column-gap: 10px;
    padding: 2px 10px 4px 10px;
    margin-bottom: 4px;
    background-color: hsla( var(--bgColor), var(--opacity) );
    border-radius: 8px;
    transition: background-color 0.6s ease-in-out;
}
:host(i-log) log-list .list:last-child {
    --bgColor: var(--color-verdigris);
    --opacity: 0.5;
}
:host(i-log) .log {
    grid-column-start: 2;
    line-height: 2.2;
    word-break: break-all;
    white-space: pre-wrap;
}
:host(i-log) .log span {
    --size: var(--size12);
    font-size: var(--size);
}
:host(i-log) .info {}
:host(i-log) .type {
    --color: var(--color-greyD9);
    --bgColor: var(--color-greyD9);
    --opacity: .25;
    color: hsl( var(--color) );
    background-color: hsla( var(--bgColor), var(--opacity) );
    padding: 2px 10px;
    border-radius: 8px;
}
:host(i-log) log-list .list:last-child .type {}
:host(i-log) .page {
    --color: var(--color-maximum-blue-green);
    display: grid;
    color: hsl( var(--color) );
    border: 1px solid hsl( var(--color) );
    padding: 2px 4px;
    border-radius: 4px;
    grid-row-start: span 2;
    justify-content: center;
    align-items: center;
}
:host(i-log) .file {
    --color: var(--color-grey70);
    display: grid;
    color: hsl( var(--color) );
    justify-content: right;
}
:host(i-log) log-list .list:last-child .file {
    --color: var(--color-white);
}
:host(i-log) [aria-type="click"] {
    --color: var(--color-dark);
    --bgColor: var(--color-yellow);
    --opacity: 1;
}
:host(i-log) [aria-type="triggered"] {
    --color: var(--color-white);
    --bgColor: var(--color-blue-jeans);
    --opacity: .5;
}
:host(i-log) [aria-type="opened"] {
    --bgColor: var(--color-slate-blue);
    --opacity: 1;
}
:host(i-log) [aria-type="closed"] {
    --bgColor: var(--color-ultra-red);
    --opacity: 1;
}
:host(i-log) [aria-type="error"] {
    --color: var(--color-white);
    --bgColor: var(--color-red);
    --opacity: 1;
}
:host(i-log) [aria-type="warning"] {
    --color: var(--color-white);
    --bgColor: var(--color-deep-saffron);
    --opacity: 1;
}
:host(i-log) [aria-type="checked"] {
    --color: var(--color-dark);
    --bgColor: var(--color-blue-jeans);
    --opacity: 1;
}
:host(i-log) [aria-type="unchecked"] {
    --bgColor: var(--color-blue-jeans);
    --opacity: .3;
}
:host(i-log) [aria-type="selected"] {
    --color: var(--color-dark);
    --bgColor: var(--color-lime-green);
    --opacity: 1;
}
:host(i-log) [aria-type="unselected"] {
    --bgColor: var(--color-lime-green);
    --opacity: .25;
}

:host(i-log) log-list .list:last-child [aria-type="ready"] {
    --bgColor: var(--color-deep-black);
    --opacity: 0.3;
}
:host(i-log) .function {
    --color: 0, 0%, 70%;
    color: var(--color);
}
:host(i-log) log-list .list:last-child .function {
    --color: var(--color-white);
}
:host(i-log) [aria-label="demo"] {}
`
}).call(this)}).call(this,"/node_modules/datdot-ui-logs/src/index.js")
},{"bel":5,"path":33,"supportCSSStyleSheet":29}],29:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"hyperscript-attribute-to-property":30}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
(function (process){(function (){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this)}).call(this,require('_process'))
},{"_process":34}],34:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],35:[function(require,module,exports){
(function (__filename){(function (){
const file = require('path').basename(__filename)
const style_sheet = require('support-style-sheet')

module.exports = i_button

function i_button (option, protocol) {
    const {page, flow = 'ui-button', name, body, icon, role = 'button', state, is_expanded = false, is_current = false, is_selected, is_checked, is_disabled, theme} = option
    let current = is_current
    let checked = is_checked
    let disabled = is_disabled
    let selected = is_selected
    let expanded = is_expanded

    function widget () {
        const sender = protocol(get)
        sender({page, from: name, flow, type: 'ready', file, fn: 'i_button', line: 16})
        // const button = bel`<button role="${role}" aria-label="${name}" tabindex="0" onclick="${() => handle_click()}">${body} ${icon}</button>`
        const el = document.createElement('i-button')
        el.dataset.name = name
        el.dataset.ui = role
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', 0)
        el.onclick = handle_click
        const shadow = el.attachShadow({mode: 'closed'})
        style_sheet(shadow, style)
        shadow.append(body)
        if (icon) shadow.append(icon)

        // define conditions
        if (state) {
            el.dataset.state = state
            el.ariaLive = 'assertive'
        }
        if (role === 'tab') {
            el.ariaSelected = false
            el.dataset.current = current
        }
        if (role === 'switch') {
            el.setAttribute('aria-checked', checked)
        }
        if (role === 'listbox') {
            el.setAttribute('aria-haspopup', role)
        }
        if (is_disabled) {
            el.ariaDisabled = disabled
            el.setAttribute('disabled', disabled)
        } else {
            el.removeAttribute('aria-disabled')
            el.removeAttribute('disabled')
        }
        if (is_checked) {
            el.setAttribute('aria-checked', checked)
        }
        if (is_current) {
            el.ariaCurrent = current
            el.ariaSelected = selected
        }
        if (is_selected) {
            el.ariaSelected = selected
        }
        if (is_expanded) {
            el.ariaExpanded = expanded
        }
        return el

        // toggle
        function switched_event (body) {
            checked = body
            if (!checked) return el.removeAttribute('aria-checked')
            el.setAttribute('aria-checked', checked)
        }
        // dropdown menu
        function expanded_event (body) {
            expanded = body
            if (!expanded) return el.removeAttribute('aria-expanded')
            el.ariaExpanded = expanded
        }
        // tab checked
        function checked_event () {
            checked = true
            current = checked
            el.ariaSelected = checked
            el.setAttribute('aria-current', checked)
            el.dataset.current = current
        }
        // tab unchecked
        function unchecked_event() {
            checked = false
            current = checked
            el.ariaSelected = checked
            el.removeAttribute('aria-current')
            el.dataset.current = current
        }
        // button click
        function handle_click() {
            console.log( role );
            if (current) return
            if (role === 'switch') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: checked, fn: 'handle_click', file, line: 98})
            if (role === 'listbox') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: expanded, fn: 'handle_click', file, line: 99})
            sender({page, from: name, flow: `ui-${role}`, type: 'click', fn: 'handle_click', file, line: 100})
        }
        // protocol get msg
        function get (msg) {
            const { type, body } = msg
            if (type === 'checked') return checked_event()
            if (type === 'unchecked') return unchecked_event()
            if (type === 'expanded') return expanded_event(body)
            if (type === 'switched') return switched_event(body)
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
    :host(i-button) {
        --size: ${size ? size : 'var(--size14)'};
        --size-hover: ${size_hover ? size_hover : 'var(--size)'};
        --curren-size: ${current_size ? current_size : 'var(--size14)'};
        --bold: ${weight ? weight : 'normal'};
        --color: ${color ? color : 'var(--color-black)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --width: ${width ? width : 'unset'};
        --height: ${height ? height : 'unset'};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --border-width: ${border_width ? border_width : '0px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--color-black)'};
        --border-opacity: ${border_opacity ? border_opacity : '1'};
        --border: var(--border-width) var(--border-style) hsla( var(--border-color), var(--border-opacity) );
        --border-radius: ${border_radius ? border_radius : 'var(--primary-button-radius)'};
        --fill: ${fill ? fill : 'var(--color-black)'};
        --fill-hover: ${fill_hover ? fill_hover : 'var(--color-white)'};
        ---icon-size: ${icon_size ? icon_size : '16px'};
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
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--color-black)'};
        --border-color: ${border_color_hover ? border_color_hover : 'var(-color-black)'};
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
        display: block;
        width: var(---icon-size);
        height: var(---icon-size);
    }
    :host(i-button) .right .icon {
        grid-column-start: 2;
    }
    :host(i-button) .left .icon {
        grid-column-start: 1;
    }
    :host(i-button) svg {
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
        width: var(--width);
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
        font-size: var(--current_size);
    }
    :host(i-button[aria-current="true"]) g {
        --fill: ${fill ? fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]), :host(i-button[aria-expanded="true"]),
    :host(i-button[aria-checked="true"]:hover), :host(i-button[aria-expanded="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
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
    ${custom_style}
    `

    return widget()
}
}).call(this)}).call(this,"/src/index.js")
},{"path":33,"support-style-sheet":36}],36:[function(require,module,exports){
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
},{}]},{},[1]);
