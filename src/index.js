const bel = require('bel')
const file = require('path').basename(__filename)
const styleSheet = require('supportCSSStyleSheet')

module.exports = ibutton

function ibutton (option, protocol) {
    const {page, flow = 'ui-button', name, body, role = 'button', reverse = 'right',  state, isCurrent = false, isSelected, isChecked, isDisabled, theme} = option
    let current = isCurrent
    let checked = isChecked
    let disabled = isDisabled
    let selected = isSelected

    function widget () {
        const sender = protocol( get )
        sender({page, from: name, flow, type: 'ready', file, fn: 'ibutton', line: 10})
        const button = bel`<button role="${role}" aria-label="${name}" tabindex="0" onclick="${() => handleClick()}">${body}</button>`
        const el = document.createElement('i-button')
        el.dataset.name = name
        el.dataset.ui = role
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
            el.dataset.current = isCurrent
        }
        if (role === 'switch') {
            el.dataset.checked = checked
            button.setAttribute('aria-checked', checked)
        }
        if (isDisabled) {
            button.ariaDisabled = disabled
            button.disabled = disabled
        } else {
            button.removeAttribute('aria-disabled')
            button.removeAttribute('disabled')
        }
        if (isChecked) {
            button.setAttribute('aria-checked', checked)
        }
        if (isCurrent) {
            button.ariaCurrent = current
            button.ariaSelected = selected
        }
        if (isSelected) {
            button.ariaSelected = selected
        }
        return el

        function checkedEvent() {
            if (role === 'switch') {
                checked = true
                el.dataset.checked = checked
                return button.setAttribute('aria-checked', checked)
            }
            current = true
            button.ariaSelected = true
            button.setAttribute('aria-current', true)
            el.dataset.current = current
           
        }
        function uncheckedEvent() {
            if (role === 'switch') {
                checked = false
                el.dataset.checked = checked
                return button.setAttribute('aria-checked', checked)
            }
            current = false
            button.ariaSelected = false
            button.removeAttribute('aria-current')
            el.dataset.current = current
        }
        function handleClick() {
            if (current) return
            if (role === 'switch') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: checked, fn: 'handleClick', file, line: 81})
            sender({page, from: name, flow: `ui-${role}`, type: 'click', fn: 'handleClick', file, line: 82})
        }
        function get (msg) {
            const { type } = msg
            if (type === 'checked') return checkedEvent()
            if (type === 'unchecked') return uncheckedEvent()
        }
    }
   
     // insert CSS style
     const customStyle = theme ? theme.style : ''
     // set CSS variables
     if (theme && theme.props) {
        var {size, color, bgColor, currentColor, currentBgColor,
            sizeHover, colorHover, bgColorHover, borderColorHover,
            borderWidth, borderStyle, borderOpacity, borderColor, borderRadius, 
            padding, width, height, opacity,
            iconFill, iconFillHover, 
        } = theme.props
     }

    const style = `
    :host(i-button) {
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
        --fill: ${iconFill ? iconFill : 'var(--color-black)'};
        --fillHover: ${iconFillHover ? iconFillHover : 'var(--color-white)'};
    }
    :host(i-button) button {
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
        transition: color .3s, background-color .3s ease-in-out;
        cursor: pointer;
    }
    :host(i-button) button *  {
        justify-content: center;
        align-items: center;
    }
    :host(i-button) button:hover {
        --size: ${sizeHover ? sizeHover : 'inherit'};
        --color: ${colorHover ? colorHover : 'var(--color-white)'};
        --bgColor: ${bgColorHover ? bgColorHover : 'var(--color-black)'};
        --borderColor: ${borderColorHover ? borderColorHover : 'var(-color-black)'};
    }
    :host(i-button) button * > g {
        fill: hsl(var(--fill));
        transition: fill 0.3s ease-in-out;
    }
    :host(i-button) button:hover * > g {
        --fillHover: ${iconFillHover ? iconFillHover : 'var(--color-white)'};
        fill: hsl(var(--fillHover));
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
    :host(i-button) [role="switch"] {
        --width: ${width ? width : 'unset'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bgColor: ${bgColor ? bgcolor : 'var(--color-white)'};
        --borderRadius: ${borderRadius ? borderRadius : '8px'};
        --borderWidth: ${borderWidth ? borderWidth : '0'};
        --borderStyle: ${borderStyle ? borderStyle : 'solid'};
        --borderColor: ${borderColor ? borderColor : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button) [aria-current="true"] {
        --color: ${currentColor ? currentColor : 'var(--color-white)'};
        --bgColor: ${currentBgColor ? currentBgColor : 'var(--primary-color)'};
    }
    :host(i-button) [aria-checked="true"] {
        --color: ${currentColor ? currentColor : 'var(--color-white)'};
        --bgColor: ${currentBgColor ? currentBgColor : 'var(--primary-color)'};
    }
    :host(i-button) button[disabled]  {
        --color: ${color ? color : 'var(--color-dark)'};
        --bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --colorOpacity: .6;
        --bgColorOpacity: .3;
        color: hsla(var(--color), var(--colorOpacity));
        background-color: hsla(var(--bgColor), var(--bgColorOpacity));
        cursor: not-allowed;
    }
    :host(i-button) span {
        display: grid;
        margin-right: 2px;
    }
    :host(i-button) .col2 {
        display: flex;
    }
    :host(i-button) .icon-right {
        flex-direction: row;
    }
    :host(i-button) .icon-left {
        flex-direction: row-reverse;
    }
    ${customStyle}
    `

    return widget()
}