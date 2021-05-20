const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)

module.exports = button

// button ({page, flow = null, name, content, style, color, custom, isActive, disabled = false}, protocol
function button (option, protocol) {
    const widget = 'ui-button'
    const {page, flow, name, content = 'Button', theme, isActive, isDisabled} = option

    const ui_element = (css) => {
        let state = 'inactive'
        const send2Parent = protocol( receive )
        send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'init', filename, line: 11})
        // for tab to check isActive is true then set button state to active
        if (isActive) setState('active')
        const element = bel`<button role="button" class="${css.button} ${isActive ? css.active : ''} ${isDisabled ? css.disabled : '' }" data-name="${name}">${content}</button>`
        element.onclick = (e) => click(element)
        return element

        /*************************
        * ------ Actions -------
        *************************/
        function click(target) {
            if (isDisabled) return
            send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'click', state, filename, line: 24})
        }
        function setState(update) {
            return state = update
        }
        /*************************
        * ------ Receivers -------
        *************************/
        function receive(message) {
            const { from, type, state } = message
            console.log('message received from main component:', message)
            if (state === 'inactive') element.classList.remove(css.active)
            if (state === 'active') element.classList.add(css.active)
            return setState(state)
        }
    }

    // if theme is entering as a property then set apply CSS styles
    if (theme) 
        var {width, minWidth, maxWidth, 
            height, minHeight, maxHeight, 
            fontSize, fontWeight, textAlign, 
            borderWidth,  borderColor, borderStyle,
            padding, rounder, 
            color, bgColor, colorHover, bgColorHover, colorActive, bgColorActive,
            shadow } = theme

    const style = csjs`
    .button {
        width: ${width ? width : 'auto'};
        min-width: ${minWidth ? minWidth : 'auto'};
        max-width: ${maxWidth ? maxWidth : 'inherit'};
        height: ${height ? height : 'auto'};
        min-height: ${minHeight ? minHeight : 'auto'};
        max-height: ${maxHeight ? maxHeight : 'inherit'};
        font-size: ${fontSize ? fontSize : 'var(--font-primary)'};
        font-weight: ${fontWeight ? fontWeight : 'var(--font-weight-primary)'};
        color: ${color ? color : 'hsl(0, 0%, 0%)' };
        background-color: ${bgColor ? bgColor : 'hsl(0, 0%, 100%)'};
        border-width: ${borderWidth ? borderWidth : 'var(--border-width)'};
        border-color: ${borderColor ? borderColor : 'var(--border-color)'};
        border-style: ${borderStyle ? borderStyle : 'var(--border-style)'};
        border-radius: ${rounder ? rounder : 'var(--rounder0)'};
        box-shadow: ${shadow ? shadow : 'none'};
        padding: ${padding ? padding : 'var(--button-padding)'};
        text-align: ${textAlign ? textAlign : 'var(--button-text-align)'};
        white-space: nowrap;
        transition: color .5s, background .5s ease-in-out;
        cursor: pointer;
    }
    .button:hover {
        color: ${colorHover ? colorHover : 'hsl(0, 0%, 100%)' };
        background: ${bgColorHover ? bgColorHover : 'hsl(0, 0%, 40%)'};
    }
    .active {
        color: ${colorActive ? colorActive : 'hsl(0, 0%, 100%)' };
        background-color: ${bgColorActive ? bgColorActive : 'hsl(0, 0%, 0%)'};
    }
    .disabled {
        opacity: .2;
        pointer-events: none;
    }
    `
    return ui_element(style)
}