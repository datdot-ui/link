const bel = require('bel')
const file = require('path').basename(__filename)
const styleSheet = require('supportCSSStyleSheet')

module.exports = ibutton

function ibutton (option, protocol) {
    const {page, flow = 'ui-button', name, body, icon, role = 'button', state, isExpanded = false, isCurrent = false, isSelected, isChecked, isDisabled, theme} = option
    let current = isCurrent
    let checked = isChecked
    let disabled = isDisabled
    let selected = isSelected
    let expanded = isExpanded

    function widget () {
        const sender = protocol( get )
        sender({page, from: name, flow, type: 'ready', file, fn: 'ibutton', line: 16})
        // const button = bel`<button role="${role}" aria-label="${name}" tabindex="0" onclick="${() => handleClick()}">${body} ${icon}</button>`
        const el = document.createElement('i-button')
        el.dataset.name = name
        el.dataset.ui = role
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', 0)
        el.onclick = handleClick
        const shadow = el.attachShadow({mode: 'closed'})
        styleSheet(shadow, style)
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
        if (expanded) {
            el.setAttribute('aria-expanded', expanded)
        }
        if (isDisabled) {
            el.ariaDisabled = disabled
            el.setAttribute('disabled', disabled)
        } else {
            el.removeAttribute('aria-disabled')
            el.removeAttribute('disabled')
        }
        if (isChecked) {
            el.setAttribute('aria-checked', checked)
        }
        if (isCurrent) {
            el.ariaCurrent = current
            el.ariaSelected = selected
        }
        if (isSelected) {
            el.ariaSelected = selected
        }
        if (isExpanded) {
            el.ariaExpanded = expanded
        }
        return el

        // toggle
        function switchedEvent (body) {
            checked = body
            if (!checked) return el.removeAttribute('aria-checked')
            el.setAttribute('aria-checked', checked)
        }
        // dropdown menu
        function expandedEvent (body) {
            expanded = body
            if (!expanded) return el.removeAttribute('aria-expanded')
            el.ariaExpanded = expanded
        }
        // tab checked
        function checkedEvent () {
            checked = true
            current = checked
            el.ariaSelected = checked
            el.setAttribute('aria-current', checked)
            el.dataset.current = current
        }
        // tab unchecked
        function uncheckedEvent() {
            checked = false
            current = checked
            el.ariaSelected = checked
            el.removeAttribute('aria-current')
            el.dataset.current = current
        }
        // button click
        function handleClick() {
            if (current) return
            if (role === 'switch') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: checked, fn: 'handleClick', file, line: 102})
            if (role === 'listbox') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: expanded, fn: 'handleClick', file, line: 103})
            sender({page, from: name, flow: `ui-${role}`, type: 'click', fn: 'handleClick', file, line: 104})
        }
        // protocol get msg
        function get (msg) {
            const { type, body } = msg
            if (type === 'checked') return checkedEvent()
            if (type === 'unchecked') return uncheckedEvent()
            if (type === 'expanded') return expandedEvent(body)
            if (type === 'switched') return switchedEvent(body)
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
            fill, fillHover, iconSize, currentFill,
            shadowColor, offsetX, offsetY, blur, shadowOpacity,
            shadowColorHover, offsetXHover, offsetYHover, blurHover, shadowOpacityHover
        } = theme.props
     }

    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--size14)'};
        --sizeHover: ${sizeHover ? sizeHover : 'var(--size)'};
        --currenSize: ${currentSize ? currentSize : 'var(--size14)'};
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
        --borderRadius: ${borderRadius ? borderRadius : 'var(--primary-button-radius)'};
        --fill: ${fill ? fill : 'var(--color-black)'};
        --fillHover: ${fillHover ? fillHover : 'var(--color-white)'};
        --iconSize: ${iconSize ? iconSize : '16px'};
        --offsetX: ${offsetX ? offsetX : '0px'};
        --offsetY: ${offsetY ? offsetY : '6px'};
        --blur: ${blur ? blur : '30px'};
        --boxShadowColor: ${shadowColor ? shadowColor : 'var(--pimary-color)'};
        --shadowOpacity: ${shadowOpacity ? shadowOpacity : '1'};
        --boxShadow: var(--offsetX) var(--offsetY) var(--blur) hsla( var(--boxShadowColor), var(--shadowOpacity) );
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
        background-color: hsla( var(--bgColor), var(--opacity) );
        border: var(--border);
        border-radius: var(--borderRadius);
        box-shadow: var(--boxShadow);
        padding: var(--padding);
        transition: font-size .3s, color .3s, background-color .3s ease-in-out;
        cursor: pointer;
    }
    :host(i-button:hover), :host(i-button[role]:hover) {
        --weight: ${weightHover ? weightHover : 'initial'};
        --color: ${colorHover ? colorHover : 'var(--color-white)'};
        --bgColor: ${bgColorHover ? bgColorHover : 'var(--color-black)'};
        --borderColor: ${borderColorHover ? borderColorHover : 'var(-color-black)'};
        --offset-x: ${offsetXHover ? offsetXHover : '0'};
        --offset-y: ${offsetYHover ? offsetYHover : '0'};
        --blur: ${blurHover ? blurHover : '50px'};
        --boxShadowColor: ${shadowColorHover ? shadowColorHover : 'var(--pimary-color)'};
        --shadowOpacity: ${shadowOpacityHover ? shadowOpacityHover : '.25'};
        font-size: var(--sizeHover);
    }
    :host(i-button) g {
        fill: hsl(var(--fill));
        transition: fill 0.3s ease-in-out;
    }
    :host(i-button:hover) g {
        --fillHover: ${fillHover ? fillHover : 'var(--color-white)'};
        fill: hsl(var(--fillHover));
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
        width: var(--iconSize);
        height: var(--iconSize);
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
        --bgColor: ${bgColor ? bgcolor : 'var(--color-white)'};
        --borderRadius: ${borderRadius ? borderRadius : '0'};
        --borderWidth: ${borderWidth ? borderWidth : '0'};
        --borderStyle: ${borderStyle ? borderStyle : 'solid'};
        --borderColor: ${borderColor ? borderColor : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[role="switch"]) {
        --width: ${width ? width : 'unset'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bgColor: ${bgColor ? bgcolor : 'var(--color-white)'};
        --borderRadius: ${borderRadius ? borderRadius : '8px'};
        --borderWidth: ${borderWidth ? borderWidth : '0'};
        --borderStyle: ${borderStyle ? borderStyle : 'solid'};
        --borderColor: ${borderColor ? borderColor : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[role="listbox"]) {
        --width: ${width ? width : 'unset'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bgColor: ${bgColor ? bgcolor : 'var(--color-white)'};
        --borderRadius: ${borderRadius ? borderRadius : '8px'};
        --borderWidth: ${borderWidth ? borderWidth : '0'};
        --borderStyle: ${borderStyle ? borderStyle : 'solid'};
        --borderColor: ${borderColor ? borderColor : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --bold: ${currentWeight ? currentWeight : 'initial'};
        --color: ${currentColor ? currentColor : 'var(--color-white)'};
        --bgColor: ${currentBgColor ? currentBgColor : 'var(--primary-color)'};
        font-size: var(--currentSize);
    }
    :host(i-button[aria-current="true"]) g {
        --fill: ${fill ? fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]), :host(i-button[aria-expanded="true"]),
    :host(i-button[aria-checked="true"]:hover), :host(i-button[aria-expanded="true"]:hover) {
        --bold: ${currentWeight ? currentWeight : 'initial'};
        --color: ${currentColor ? currentColor : 'var(--color-white)'};
        --bgColor: ${currentBgColor ? currentBgColor : 'var(--primary-color)'};
    }
    :host(i-button[aria-checked="true"]) g {
        --fill: ${currentFill ? currentFill : 'var(--color-white)' };
    }
    :host(i-button[disabled]), :host(i-button[disabled]:hover) {
        --color: ${color ? color : 'var(--color-dark)'};
        --bgColor: ${bgColor ? bgColor : 'var(--color-white)'};
        --colorOpacity: .6;
        --bgColorOpacity: .3;
        color: hsla(var(--color), var(--colorOpacity));
        background-color: hsla(var(--bgColor), var(--bgColorOpacity));
        pointer-events: none;
        cursor: not-allowed;
    }
    ${customStyle}
    `

    return widget()
}