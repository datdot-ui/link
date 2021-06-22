const bel = require('bel')
const file = require('path').basename(__filename)
const styleSheet = require('supportCSSStyleSheet')

module.exports = ibutton

function ibutton (option, protocol) {
    const {page, flow = 'ui-button', name, iconLeft, iconRight, body = 'Button', role = 'button', state, isCurrent = false, isSelected = false, isActive = false, isDisabled, theme} = option
    let current = isCurrent
    let active = isActive
    let disabled = isDisabled
    let selected = isSelected
    function widget () {
        const sender = protocol( get )
        sender({page, from: name, flow, type: 'ready', file, fn: 'ibutton', line: 10})
        const button = bel`<button role="${role}" aria-label="${name}" tabindex="0" onclick="${() => handleClick(button)}">${iconLeft && iconLeft}${body}${iconRight && iconRight}</button>`
        const el = document.createElement('i-button')
        el.dataset.name = name
        el.dataset.ui = role
        el.dataset.current = isCurrent
        const root = el.attachShadow({mode: 'closed'})
        styleSheet(root, style)
        root.append(button)

        // define conditions
        if (state) {
            button.dataset.state = state
            button.ariaLive = 'assertive'
        }
        if (role === 'tab') {
            button.ariaSelected = false
        }
        if (role === 'toggle') {
            if (isActive) button.setAttribute('aria-active', isActive)
            else button.setAttribute('aria-active', isActive)
        }
        if (isDisabled) {
            button.ariaDisabled = isDisabled
            button.disabled = true
        } else {
            button.removeAttribute('aria-disabled')
            button.removeAttribute('disabled')
        }
        if (isActive) {
            button.setAttribute('aria-active', isActive)
        }
        if (isCurrent) {
            button.ariaCurrent = isCurrent
            button.ariaSelected = true
        }
        if (isSelected) {
            button.ariaSelected = isSelected
        }
        return el

        function activeEvent() {
            current = true
            button.ariaSelected = true
            button.setAttribute('aria-current', true)
            el.dataset.current = current
        }
        function inactivedEvent() {
            current = false
            button.ariaSelected = false
            button.removeAttribute('aria-current')
            el.dataset.current = current
        }
        function handleClick(target) {
            if (current) return
            sender({page, from: name, flow: `ui-${role}`, type: 'click', fn: 'handleClick', file, line: 68})
        }
        function get (msg) {
            const { type } = msg
            if (type === 'active') return activeEvent()
            if (type === 'inactive') return inactivedEvent()
        }
    }
   
    // insert CSS style
    const customStyle = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var {size, color, bgColor, sizeHover, colorHover, bgColorHover, currentColor, currentBgColor, borderWidth, borderStyle, borderOpacity, borderColor, borderColorHover, borderRadius, padding, width, height, opacity } = theme.props
    }
    
    const style = `
    :host(i-button) button {
        --size: ${size ? size : 'var(--size12)'};
        --color: ${color ? color : 'var(--color-black)'};
        --bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --width: ${width ? width : 'unset'};
        --height: ${height ? height : 'unset'};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --borderWidth: ${borderWidth ? borderWidth : '0px'};
        --borderStyle: ${borderStyle ? borderStyle : 'solid'};
        --borderColor: ${borderColor ? borderColor : 'var(--color-black)'};
        --borderOpacity: ${borderOpacity ? borderOpacity : '1'};
        --border: var(--borderWidth) var(--borderStyle) hsla( var(--borderColor), var(--borderOpacity) );
        --borderRadius: ${borderRadius ? borderRadius : '8px'};
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 5px;
        justify-content: center;
        align-items: center;
        ${width && 'width: var(--width)'};
        ${height && 'height: var(--height)'};
        color: hsl( var(--color) );
        background-color: hsla( var(--bgColor), var(--opacity) );
        border: var(--border);
        border-radius: var(--borderRadius);
        padding: var(--padding);
        transition: color .25s, background-color .25s ease-in-out;
        cursor: pointer;
    }
    :host(i-button) button:hover {
        --size: ${sizeHover ? sizeHover : 'inherit'};
        --color: ${colorHover ? colorHover : 'var(--color-white)'};
        --bgColor: ${bgColorHover ? bgColorHover : 'var(--color-black)'};
        --borderColor: ${borderColorHover ? borderColorHover : 'var(-color-black)'};
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
        --width: ${width ? width : '100%'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bgColor: ${bgColor ? bgcolor : 'var(--color-white)'};
        --borderRadius: ${borderRadius ? borderRadius : '0'};
        --borderWidth: ${borderWidth ? borderWidth : '0'};
        --borderStyle: ${borderStyle ? borderStyle : 'solid'};
        --borderColor: ${borderColor ? borderColor : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button) [aria-current="true"] {
        --color: ${currentColor ? currentColor : 'var(--color-white)'};
        --bgColor: ${currentBgColor ? currentBgColor : 'var(--primary-color)'};
    }
    :host(i-button) button[disabled]  {
        --color: ${color ? color : 'var(--color-dark)'};
        --bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --colorOpacity: .6;
        --bgColorOpacity: .3;
        color: hsla( var(--color), var(--colorOpacity));
        background-color: hsla( var(--bgColor), var(--bgColorOpacity));
        cursor: not-allowed;
    }
    ${customStyle}
    `

    return widget()
}