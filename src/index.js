const bel = require('bel')
const file = require('path').basename(__filename)
const styleSheet = require('supportCSSStyleSheet')

module.exports = ibutton

function ibutton (option, protocol) {
    const {page, flow = 'ui-button', name, body, icon, role = 'button', state, controls, isExpanded = false, isCurrent = false, isSelected, isChecked, isDisabled, theme} = option
    let current = isCurrent
    let checked = isChecked
    let disabled = isDisabled
    let selected = isSelected
    let expanded = isExpanded

    function widget () {
        const sender = protocol( get )
        sender({page, from: name, flow, type: 'ready', file, fn: 'ibutton', line: 16})
        const button = bel`<button role="${role}" aria-label="${name}" tabindex="0" onclick="${() => handleClick()}">${body} ${icon}</button>`
        const el = document.createElement('i-button')
        el.dataset.name = name
        el.dataset.ui = role
        const shadow = el.attachShadow({mode: 'closed'})
        styleSheet(shadow, style)
        shadow.append(button)

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
        if (role === 'listbox') {
            button.setAttribute('aria-haspopup', role)
        }
        if (expanded) {
            button.setAttribute('aria-expanded', expanded)
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
        if (isExpanded) {
            button.ariaExpanded = expanded
        }
        return el

        function expandedEvent (body) {
            expanded = body
            if (!expanded) {
                el.removeAttribute('aria-expanded')
                return button.removeAttribute('aria-expanded')
            }
            el.ariaExpanded = expanded
            button.ariaExpanded = expanded
        }
        function checkedEvent () {
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
            if (role === 'switch') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: checked, fn: 'handleClick', file, line: 95})
            if (role === 'listbox') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: expanded, fn: 'handleClick', file, line: 96})
            sender({page, from: name, flow: `ui-${role}`, type: 'click', fn: 'handleClick', file, line: 97})
        }
        function get (msg) {
            const { type, body } = msg
            if (type === 'checked') return checkedEvent()
            if (type === 'unchecked') return uncheckedEvent()
            if (type === 'expanded') return expandedEvent(body)
        }
    }
   
     // insert CSS style
     const customStyle = theme ? theme.style : ''
     // set CSS variables
     if (theme && theme.props) {
        var {size, sizeHover, currentSize,
            weight, weightHover, currentWeight,
            color, colorHover, currentColor, currentBgColor, 
            bgColor, bgColorHover, borderColorHover,
            borderWidth, borderStyle, borderOpacity, borderColor, borderRadius, 
            padding, width, height, opacity,
            fill, fillHover, iconSize, currentFill, currentIconSize
        } = theme.props
     }

    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--size12)'};
        --bold: ${weight ? weight : 'normal'};
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
        --fill: ${fill ? fill : 'var(--color-black)'};
        --fillHover: ${fillHover ? fillHover : 'var(--color-white)'};
        --iconSize: ${iconSize ? iconSize : '16px'};
    }
    :host(i-button) button {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 5px;
        justify-content: center;
        align-items: center;
        ${width && 'width: var(--width)'};
        ${height && 'height: var(--height)'};
        font-size: var(--size);
        font-weight: var(--bold);
        color: hsl( var(--color) );
        background-color: hsla( var(--bgColor), var(--opacity) );
        border: var(--border);
        border-radius: var(--borderRadius);
        padding: var(--padding);
        transition: font-size .3s, color .3s, background-color .3s ease-in-out;
        cursor: pointer;
    }
    :host(i-button) button:hover {
        --size: ${sizeHover ? sizeHover : 'inherit'};
        --weight: ${weightHover ? weightHover : 'inherit'};
        --color: ${colorHover ? colorHover : 'var(--color-white)'};
        --bgColor: ${bgColorHover ? bgColorHover : 'var(--color-black)'};
        --borderColor: ${borderColorHover ? borderColorHover : 'var(-color-black)'};
    }
    :host(i-button) button g {
        fill: hsl(var(--fill));
        transition: fill 0.3s ease-in-out;
    }
    :host(i-button) button:hover g {
        --fillHover: ${fillHover ? fillHover : 'var(--color-white)'};
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
    :host(i-button) [aria-current="true"], :host(i-button) [aria-current="true"]:hover{
        --size: ${currentSize ? currentSize : 'inherit'};
        --bold: ${currentWeight ? currentWeight : 'inherit'};
        --color: ${currentColor ? currentColor : 'var(--color-white)'};
        --bgColor: ${currentBgColor ? currentBgColor : 'var(--primary-color)'};
    }
    :host(i-button) [aria-current="true"] g {
        --fill: ${fill ? fill : 'var(--color-white)'};
    }
    :host(i-button) [aria-checked="true"], :host(i-button) [aria-expanded="true"]  {
        --size: ${currentSize ? currentSize : 'inherit'};
        --bold: ${currentWeight ? currentWeight : 'inherit'};
        --color: ${currentColor ? currentColor : 'var(--color-white)'};
        --bgColor: ${currentBgColor ? currentBgColor : 'var(--primary-color)'};
    }
    :host(i-button) [aria-checked="true"] g {
        --fill: ${currentFill ? currentFill : 'var(--color-white' };
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
    :host(i-button) svg {
        width: 100%;
        height: auto;
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
        width: var(--iconSize);
        height: var(--iconSize);
    }
    :host(i-button) .right .icon {
        grid-column-start: 2;
    }
    :host(i-button) .left .icon {
        grid-column-start: 1;
    }
    ${customStyle}
    `

    return widget()
}