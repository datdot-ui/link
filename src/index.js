const bel = require('bel')
const file = require('path').basename(__filename)
const styleSheet = require('supportCSSStyleSheet')

module.exports = widget

function widget (option, protocol) {
    const {page, flow = 'ui-button', name, iconLeft, iconRight, content = 'Button', role = 'button', state, isCurrent, isActive, isDisabled = false} = option
    const sender = protocol( get )
    sender({page, from: name, flow, type: 'ready', file, fn: 'widget', line: 10})
    let current = isCurrent
    let active = isActive
    let disabled = isDisabled
    const button = bel`<button role="${role}" aria-label="${name}" tabindex="0" onclick="${() => handleClick(button)}">${iconLeft && iconLeft}${content}${iconRight && iconRight}</button>`
    const ibutton = document.createElement('i-button')
    // define conditions
    if (state) {
        button.dataset.state = state
        button.ariaLive = 'assertive'
    }
    if (role === 'tab') {
        button.ariaSelected = false
        button.ariaCurrent = false
    }
    if (role === 'toggle') {
        button.ariaActive = false
    }
    if (isDisabled) {
        button.ariaDisabled = isDisabled
        button.disabled = true
    }
    const root = ibutton.attachShadow({mode: 'closed'})

    styleSheet(root, style)
    root.append(button)
    
    return ibutton

    function handleClick(target) {
        sender({page, from: name, flow: 'ui-button', type: 'click', fn: 'handleClick', file, line: 40})
    }
    
    function get (msg) {
        const { from, type, state } = msg
    }
    

    // if theme is entering as a property then set apply CSS styles
    // if (theme) 
    //     var {
    //         width, minWidth, maxWidth, 
    //         height, minHeight, maxHeight, 
    //         fontFamily, fontSize, fontWeight, 
    //         textAlign, textTransform,
    //         borderWidth,  borderColor, borderStyle,
    //         padding, borderRadius, 
    //         color, bgColor, colorHover, bgColorHover, colorActive, bgColorActive,
    //         colorDisabled, bgColorDisabled,
    //         bgImage, bgImageHover, bgImageActive,
    //         boxShadow, position, zIndex, top, bottom, left, right, cursor,
    //         iconSize, iconFillColor, iconStrokeColor
    //     } = theme
}

const style = `
:host(i-button) button {
    --size: var(--size12);
    --color: var(--color-black);
    --bgColor: var(--color-white);
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: hsl( var(--color) );
    background-color: hsl( var(--bgColor) );
    border: none;
    border-radius: 8px;
    padding: 12px;
    transition: color .25s, background-color .25s ease-in-out;
    cursor: pointer;
}
:host(i-button) button:hover {
    --color: var(--color-white);
    --bgColor: var(--color-black);
}
:host(i-button) button > span {
}
:host(i-button) button > span svg {
    width: 100%;
    height: auto;
}
:host(i-button) [role="button"] {

}
:host(i-button) [role="tab"] {

}
`