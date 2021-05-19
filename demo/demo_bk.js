const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('datdot-ui-graphic')
const domlog = require('ui-domlog')

function demoComponent() {
    let number = 0
    let recipients = []
    const data = ['Available', 'Not available', 'Hypercore', 'Hyperdrive', 'Cabal']
    // icons
    const iconCancel = svg( { css: `${css.icon} ${css['icon-cancel']}`, path: 'assets/cancel.svg' })
    const iconClear = svg( { css: `${css.icon} ${css['icon-clear']}`, path: 'assets/cancel.svg' })
    const iconClear1 = svg( { css: `${css.icon} ${css['icon-clear']}`, path: 'assets/cancel.svg' })
    const iconCheck = svg( { css: `${css.icon} ${css['icon-check']}`, path: 'assets/check.svg' })
    const iconPlus = svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/plus.svg' })
    const iconPlus1 = svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/plus.svg' })
    const iconPlus2 = svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/plus.svg' })
    const iconMinus= svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/minus.svg' })
    const iconMinus1= svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/minus.svg' })
    const iconOption = svg( { css: `${css.icon} ${css['icon-option']}`, path: 'assets/option.svg' })
    const iconFilterOption = svg( { css: `${css.icon} ${css['icon-option']}`, path: 'assets/option.svg' })
    // default buttons
    const confirm = button({page: 'JOBS', name: 'confirm', content: 'Confirm', style: 'solid', color: 'black', custom: [css.customColor, css.customBackgroundColor]}, protocol('confirm'))
    const click = button({page: 'JOBS', name: 'click', content: 'Click', style: 'solid', color: 'white'}, protocol('click'))
    const cancel = button({page: 'JOBS', name: 'cancel', content: 'Cancel', style: 'outlined', color: 'border-grey'}, protocol('cancel'))
    const previous = button({page: 'JOBS', name: 'previous', content: 'Previous', style: 'outlined', color: 'border-white'}, protocol('cancel'))
    const plan1 = button({page: 'JOBS', flow: 'plans', name: 'plan1', content: 'Plan1', style: 'solid', color: 'list', current: true}, plansProtocol('plan1'))
    const plan2 = button({page: 'JOBS', flow: 'plans', name: 'plan2', content: 'Plan2', style: 'solid', color: 'list', current: false}, plansProtocol('plan2'))
    const plan3 = button({page: 'JOBS', flow: 'plans', name: 'plan3', content: 'Plan3', style: 'solid', color: 'list', current: false}, plansProtocol('plan3'))
    // icon buttons
    const cancel1 = button({page: 'JOBS', name: 'icon-cancel', content: iconCancel, style: 'solid', color: 'grey'}, protocol('icon-cancel'))
    const save = button({page: 'JOBS', name: 'icon-save', content: iconCheck, style: 'solid', color: 'black'}, protocol('icon-save'))
    const clear = button({page: 'PLANS', name: 'icon-clear', content: iconClear, style: ['circle-solid', 'small'], color: 'light-grey'}, protocol('icon-cancel'))
    const create = button({page: 'JOBS', name: 'icon-create', content: iconPlus, style: 'solid', color: 'black'}, protocol('cicon-reate'))
    const option = button({page: 'PLANS', name: 'icon-option', content: iconOption, style: 'default', color: 'fill-grey'}, protocol('icon-option'))
    const filterOption = button({page: 'PLANS', flow: 'option', name: 'filter-option', content: iconFilterOption, style: 'default', color: 'grey'}, protocol('filter-option'))
    // increment and decrement buttons
    const minus = button({page: 'JOBS', flow: 'calculate', name: 'icon-decrement', content: iconMinus, style: 'default', color: 'stroke-black'}, protocol('icon-decrement'))
    const minusDisabled = button({page: 'JOBS', flow: 'calculate', name: 'icon-decrement-disabled', content: iconMinus1, style: 'default', color: 'stroke-black', disabled: true}, protocol('icon-decrement-disabled'))
    const plus = button({page: 'JOBS', flow: 'calculate', name: 'icon-increment', content: iconPlus2, style: 'default', color: 'stroke-black'}, protocol('icon-increment'))
    const calNumber = bel`<span class=${css.num}>${number}</span>`
    const calculateElement = bel`<div class=${css.calculate}>${minus}${calNumber}${plus}</div>`
    // link buttons
    const linkCancel = button({page: 'PLANS', name: 'link-cancel', content: 'Cancel', style: 'link', color: 'link-cancel'}, protocol('link-cancel'))
    const link1 = button({page: 'PLANS', name: 'link1', content: 'Link1', style: 'link', color: 'link-blue'}, protocol('link1'))
    // disabled buttons
    const disabled = button({page: 'JOBS', name: 'disabled', content: 'Disabled', style: 'solid', color: 'black', disabled: true}, protocol('disabled'))
    const clearDisabled = button({page: 'PLANS', name: 'icon-clear-disabled', content: iconClear1, style: ['circle-solid', 'small'], color: 'light-grey', disabled: true}, protocol('icon-clear-disabled'))
    const createDisabled = button({page: 'JOBS', name: 'icon-create-disabled', content: iconPlus1, style: 'solid', color: 'black', disabled: true}, protocol('icon-create-disabled'))
    const plansList = bel`<div class=${css.plansList}>${plan1}${plan2}${plan3}</div>`
    const plans = plansList.children
    // location buttons
    const location1 = button({page: 'JOBS', flow: 'location', name: 'central-europe', content: 'Central Europe', style: 'option', color: 'link-grey', current: true}, locationProtocol('central-europe'))
    const location2 = button({page: 'JOBS', flow: 'location', name: 'eastern-europe', content: 'Eastern Europe', style: 'option', color: 'link-grey'}, locationProtocol('eastern-europe'))
    const location3 = button({page: 'JOBS', flow: 'location', name: 'northern-europe', content: 'Northern Europe', style: 'option', color: 'link-grey'}, locationProtocol('northern-europe'))
    const locationList = bel`<div class=${css.locationList}>${location1}${location2}${location3}</div>`
    const locations = locationList.children
    // navigation buttons
    const nav1 = button({page: 'PLANS', flow: 'nav', name: 'user', content: 'USER', style: 'nav', color: 'white'}, navigationProtocol('user'))
    const nav2 = button({page: 'PLANS', flow: 'nav', name: 'plans', content: 'PLANS', style: 'nav', color: 'white', current: true}, navigationProtocol('plans'))
    const nav3 = button({page: 'PLANS', flow: 'nav', name: 'jobs', content: 'JOBS', style: 'nav', color: 'white'}, navigationProtocol('jobs'))
    const nav4 = button({page: 'PLANS', flow: 'nav', name: 'apps', content: 'APPS', style: 'nav', color: 'white'}, navigationProtocol('apps'))
    const navigation = bel`<nav class=${css.nav}>${nav1}${nav2}${nav3}${nav4}</nav>`
    const navs = navigation.children
    // filter option
    const optionList = bel`<ul class="${css['option-list']}" onclick=${(e) => actionOptionList(e)}></ul>`
    const optionAction = bel`<div class="${css.action} ${css.option}">${filterOption}</div>`
    const tabList = bel`<div class=${css['tab-list']}></div>`
    tabs()
    
    
    // get list
    optionListRender(data).then( buttons => {
        buttons.map( item => { 
            const li = bel`<li>${item}</li>`
            optionList.append(li) 
        })
    })

    // content
    const content = bel`
    <div class=${css.content}>
        <div>
            <h3>Text</h3>
            ${confirm}
            ${cancel}
            ${previous}
            ${click}
        </div>
        <div>
            <h3>Icon</h3>
            ${save}
            ${cancel1}
            ${create}
            ${clear}
            ${option}
            ${calculateElement}
        </div>
        <div>
            <h3>Link</h3>
            ${linkCancel}
            ${link1}
        </div>
        <div>
            <h3>Disabeld</h3>
            ${disabled}
            ${clearDisabled}
            ${createDisabled}
            ${minusDisabled}
        </div>
        <div>
            <h3>Plans list</h3>
            ${plansList}
        </div>
        <div>
            <h3>Location list</h3>
            ${locationList}
        </div>
        <div>
            <h3>navigation</h3>
            ${navigation}
        </div>
        <div>
            <h3>Option</h3>
            ${optionAction}
        </div>
        <div>
            <h3>Tab</h3>
            ${tabList}
        </div>
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
    * ------- Elements --------
    *************************/
    // tab list
    function tabs () {
        const obj = {data: [], schedule: '', location: '', peformance: '', swam: { key: '', feeds: [1,2,3,4,5]}}
        Object.keys(obj).map( (item, index) => {
            const name = item.split('').map( (text, i) => {
                if (i === 0) return text.toUpperCase()
                return text
            }).join('')
            const btn = button({page: 'PLANS', flow: 'tab-list', name: item, content: item, style: 'tab', color: 'grey', current: index === 0? true : false}, tabProtocol(item))
            tabList.append(btn)
        })
    }

    /*************************
    * ------- Actions --------
    *************************/
    function actionSwitch(args, message) {
        const { page, from, flow, type, action, body } = message
        const classList = []
        args.forEach( (btn, i) => {
            const target = btn.getAttribute('name')
            classList.push( target )
            const type = target === from ? 'current-active' : 'remove-current'
            const name = target === from ? from : classList[i]
            const log = { page, from: name, flow, type}
            recipients[name](log)
            return showLog({...log, body, filename, line: 159})
        })
    }

    function actionOptionList (event) {
        const target = event.target
        if (!target.classList.contains(css.status)) return
        const icon = target.firstChild
        // for recipients[name] using
        const name = target.innerText
        // if icon is not contained css.hide then do toggling it on unchecked/checked 
        const type = !icon.classList.contains(css.hide) ? 'unchecked' : 'checked'
        icon.classList.toggle(css.hide)
        recipients[name]({page: 'demo', from: target.innerText, flow: 'option-list', type, body: name})
        const message = {page: 'demo', from: target.innerText, flow: 'option-list', type, body: name, filename, line: 197}
        showLog(message)
    }

    function actionFilterOption (message) {
        let log = {}
        const {page, from, flow, type, body, action} = message
        // check button is not active then add active style
        if (recipients[from].state === undefined) {
            recipients[from].state = 'self-active'
            recipients[from]({page, flow, from, type: 'active', body})
            log = {page: 'demo', from, flow, type: 'active', body, filename, line: 208}
            if (optionList.children.length > 0) optionList.classList.remove(css.hide)
            optionAction.append( optionList )
            return showLog(log)
        }
        // check button is active then remove active style
        if (recipients[from].state === 'self-active') {
            recipients[from].state = undefined
            recipients[from]({page, flow, from, type: 'remove-active', body})
            log = {page: 'demo', from, flow, type: 'remove-active', body, filename, line: 217}
            optionList.classList.add(css.hide)
            return showLog(log)
        }
    }

    // addtion and Subtraction
    function actionIncrement (message) {
        let {from, flow} = message
        number++
        calNumber.textContent = number
        const log = {page: 'demo', from, flow, type: 'number', body: number, filename, line: 228}
        showLog(log)
    }

    function actionDecrement (message) {
        let {from, flow} = message
        if (number <= 0 ) return showLog({page: 'demo', from, flow: 'calculate/ui-button', type: 'number', body: '0', filename, line: 234})
        number--
        calNumber.textContent = number
        const log = {page: 'demo', from, flow, type: 'number', body: number, filename, line: 237}
        showLog(log)
    }

    /*************************
    * ------ Receivers -------
    *************************/
    // tab
    function tabReceive (message) {
        let { page, from, flow, type, action, body } = message
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: 247})
        if (type === 'click') actionSwitch([...tabList.children], message)
    }
    // navigation menu
    function navigationReceive (message) {
        let { page, from, flow, type, action, body } = message
        showLog(message)
        
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: 255})
        if (type === 'click') actionSwitch([...navs], message)
    }

    // location list
    function locationReceive (message) {
        let { page, from, flow, type, action, body } = message
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: 263})
        if (type === 'click') actionSwitch([...locations], message)
    }

    // Plans list
    function plansReceive (message) {
        let { page, from, flow, type, action, body } = message 
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: 271})
        if (type === 'click') actionSwitch([...plans], message)
    }

    // Option
    function optionReceive (message) {
        let { page, from, flow, type, action, body } = message 
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: 279})
    } 

    function receive (message) {
        const { page, from, flow, type, action, body } = message
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: 285})
        if (type === 'click') {
            if (from === 'icon-increment') actionIncrement(message)
            if (from === 'icon-decrement') actionDecrement(message)
            if (from === 'filter-option') actionFilterOption(message)
        } 
    }

    /*************************
    * ------ Protocols -------
    *************************/
    function tabProtocol (name) {
        return send => {
            recipients[name] = send
            return tabReceive
        }
    }

    function optionProtocol (name) {
        return send => {
            recipients[name] = send
            return optionReceive
        }
    }

    function navigationProtocol (name) {
        return send => {
            recipients[name] = send
            return navigationReceive
        }
    }

    function locationProtocol (name) {
        return send => {
            recipients[name] = send
            return locationReceive
        }
    }

    function plansProtocol (name) {
        return send => {
            recipients[name] = send
            return plansReceive
        }
    }

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
    async function optionListRender (data) {
        return await new Promise((resolve, reject) => {
            if (data === undefined) reject('not data load')
            const lists = data.map( item => {
                let style
                const check = svg( { css: `${css.icon} ${css['icon-check']}`, path: 'assets/check.svg' })
                const circle = bel`<span class="${css.circle}"></span>`
                if (item === 'Available') style = css.on
                if (item === 'Not available') style = css.off
                if (item === 'Hypercore') style = css.core
                if (item === 'Hyperdrive') style = css.drive
                if (item === 'Cabal') style = css.cabal
                circle.classList.add(style)
                const content = bel`<div class=${css.status}>${check}${circle}${item}</div>`
                const btn = button({page: 'PLANS', flow: 'option' , name: item, content, style: 'link', color: 'link-white'}, optionProtocol(`${item}`))
                return btn
            })
            return resolve(lists)

        }).catch( err => { throw new Error(err) })
    }

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
html {
    box-sizing: border-box;
    height: 100%;
}
*, *:before, *:after {
    box-sizing: inherit;
}
body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
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
.code-line {}
.icon {
    width: 16px;
}
.icon-cancel {}
.icon-clear {}
.icon-check {}
.icon-plus {}
.icon-option {}
.plansList {}
.locationList {}
.customColor {
    color: #e0fbfc;
}
.customBackgroundColor {
    background-color: #457b9d;
}
.nav {
    width: 50%;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.nav button {
    padding:0;
    margin: 0 !important;
}
.calculate {}
.num {
    font-size: 16px;
    font-weight: bold;
    padding: 0 12px;
}
.option {
    position: relative;
    display: grid;
    justify-items: right;
    width: 150px;
}
.option > button[class^="btn"] {
    position: relative;
    z-index: 3;
    margin-right: 0;
}
.option-list {
    position: absolute;
    z-index: 2;
    right: 0;
    width: 100%;
    animation: showup .25s linear forwards;
}
.option-list, .option-list li  { 
    margin: 0; 
    padding: 0;
    list-style: none;
}
.option-list li > button{
    background-color: #000;
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: left;
}
.option-list li:first-child button {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.option-list li:last-child button {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.option-list li button:hover {
    color: #fff;
    background-color: #333;
}
.hide {
    animation: disppear .5s linear forwards;
}
.status {
    display: grid;
    grid-template-rows: 32px;
    grid-template-columns: 18px 27px auto;
    padding: 0 10px;
    align-items: center;
}
.circle {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #000;
    justify-self: center;
    pointer-events: none;
}
.on {
    background-color: #109B36;
}
.off {
    background-color: #D9D9D9;
}
.core {
    background-color: #BCE0FD;
}
.drive {
    background-color: #FFDFA2;
}
.cabal {
    background-color: #E9D3FD;
}
.option-list .icon-check {
    pointer-events: none;
}
.option-list .icon-check svg path {
    stroke: #fff;
}
:root .tab-list button {
    margin-right: 2px;
}
@media screen and (max-width: 812px) {
    .option-list {
        margin-top: 2px;
    }
}
@media screen and (max-width: 812px) {
    .nav {
        width: 100%;
    }
    .option-list {
        margin-top: 2px;
    }
}
@keyframes showup {
    0% {
        opacity: 0;
        top: 45px;
    }
    100% {
        opacity: 1;
        top: 53px;
    }
}
@keyframes disppear {
    0% {
        opacity: 1;
        top: 53px;
    }
    100% {
        opacity: 0;
        top: 45px;
    }
}
`

document.body.append( demoComponent() )