const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)

module.exports = button

// button ({page, flow = null, name, content, style, color, custom, isActive, disabled = false}, protocol
function button (option, protocol) {
    const widget = 'ui-button'
    const {page, flow, name, content = 'Button', custom, theme, isActive, isDisabled} = option

    const ui_element = (css) => {
        let state = 'inactive'
        const send2Parent = protocol( receive )
        send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'init', filename, line: 11})
        // for tab to check isActive is true then set button state to active
        if (isActive) setState('active')
        const element = bel`<button role="button" class="${css.button}${custom ? ` ${custom}` : ''}${isActive ? ` ${css.active}` : ''}${isDisabled ? ` ${css.disabled}` : ''}" data-name="${name}">${content}</button>`
        
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
        var {
            width, minWidth, maxWidth, 
            height, minHeight, maxHeight, 
            fontFamily, fontSize, fontWeight, 
            textAlign, textTransform,
            borderWidth,  borderColor, borderStyle,
            padding, borderRadius, 
            color, bgColor, colorHover, bgColorHover, colorActive, bgColorActive,
            boxShadow, position, zIndex, top, bottom, left, right, cursor
        } = theme

    document.documentElement.style.setProperty('--button-black', 'hsl(0, 0%, 0%')
    document.documentElement.style.setProperty('--button-white', 'hsl(0, 0%, 100%')
    document.documentElement.style.setProperty('--button-grey', 'hsl(0, 0%, 20%')
    document.documentElement.style.setProperty('--button-color', 'var(--button-white)')
    document.documentElement.style.setProperty('--button-color-hover', 'var(--button-white)')
    document.documentElement.style.setProperty('--button-color-active', 'var(--button-white)')
    document.documentElement.style.setProperty('--button-bg-color', 'var(--button-black)')
    document.documentElement.style.setProperty('--button-bg-color-hover', 'var(--button-grey)')
    document.documentElement.style.setProperty('--button-bg-color-active', 'var(--button-black)')
    document.documentElement.style.setProperty('--button-position', 'inherit')
    document.documentElement.style.setProperty('--button-z-index', 'inherit')
    document.documentElement.style.setProperty('--button-position-top', 'unset')
    document.documentElement.style.setProperty('--button-position-bottom', 'unset')
    document.documentElement.style.setProperty('--button-position-left', 'unset')
    document.documentElement.style.setProperty('--button-position-right', 'unset')
    document.documentElement.style.setProperty('--button-width', 'auto')
    document.documentElement.style.setProperty('--button-min-width', 'auto')
    document.documentElement.style.setProperty('--button-max-width', 'inherfit')
    document.documentElement.style.setProperty('--button-height', 'auto')
    document.documentElement.style.setProperty('--button-min-height', 'auto')
    document.documentElement.style.setProperty('--button-max-height', 'inherfit')
    document.documentElement.style.setProperty('--button-font-family', 'initial')
    document.documentElement.style.setProperty('--button-font-size', '1.4rem')
    document.documentElement.style.setProperty('--button-font-weight', '300')
    document.documentElement.style.setProperty('--button-border-width', '0')
    document.documentElement.style.setProperty('--button-border-color', 'unset')
    document.documentElement.style.setProperty('--button-border-style', 'unset')
    document.documentElement.style.setProperty('--button-border-radius', '0')
    document.documentElement.style.setProperty('--button-box-shadow', 'none')
    document.documentElement.style.setProperty('--button-padding', '8px 12px')
    document.documentElement.style.setProperty('--button-text-align', 'center')
    document.documentElement.style.setProperty('--button-text-transform', 'unset')
    document.documentElement.style.setProperty('--button-cursor', 'pointer')

    const style = csjs`
    .button {
        position: ${position ? position : 'var(--button-position)'};
        z-index: ${zIndex ? zIndex : 'var(--button-z-index)'};
        top: ${top ? top : 'var(--button-position-top)'};
        bottom: ${bottom ? bottom : 'var(--button-position-bottom)'};
        left: ${left ? left : 'var(--button-position-left)' };
        right: ${right ? right : 'var(--button-position-right)'};
        width: ${width ? width : 'var(--button-width)'};
        min-width: ${minWidth ? minWidth : 'var(--button-min-width)'};
        max-width: ${maxWidth ? maxWidth : 'var(--button-max-width)'};
        height: ${height ? height : 'var(--button-height)'};
        min-height: ${minHeight ? minHeight : 'var(--button-min-height)'};
        max-height: ${maxHeight ? maxHeight : 'var(--button-max-height)'};
        font-family: ${maxHeight ? maxHeight : 'var(--button-font-family)'};
        font-size: ${fontSize ? fontSize : 'var(--button-font-size)'};
        font-weight: ${fontWeight ? fontWeight : 'var(--button-font-weight)'};
        color: ${color ? color : 'var(--button-color)'};
        background-color: ${bgColor ? bgColor : 'var(--button-bg-color)'};
        border-width: ${borderWidth ? borderWidth : 'var(--button-border-width)'};
        border-color: ${borderColor ? borderColor : 'var(--button-border-color)'};
        border-style: ${borderStyle ? borderStyle : 'var(--button-border-style)'};
        border-radius: ${borderRadius ? borderRadius : 'var(--button-border-radius)'};
        box-shadow: ${boxShadow ? boxShadow : 'var(--button-box-shadow)'};
        padding: ${padding ? padding : 'var(--button-padding)'};
        text-align:  ${textAlign ? textAlign : 'var(--button-text-align)'};
        text-transform: ${textTransform ? textTransform: 'var(--button-text-transform)'};
        white-space: pre-wrap;
        overflow-wrap: break-word;
        transition: color .3s, background-color .3s ease-in-out;
        cursor: ${cursor ? cursor: 'var(--button-cursor)'};
    }
    .button:hover {
        color: ${colorHover ? colorHover : 'var(--button-color-hover)'};
        background-color: ${bgColorHover ? bgColorHover : 'var(--button-bg-color-hover)'};
    }
    .active {
        color: ${colorActive ? colorActive : 'var(--button-color-active)'};
        background-color: ${bgColorActive ? bgColorActive : 'var(--button-bg-color-active)'}
    }
    .disabled {
        opacity: .2;
        pointer-events: none;
    }
    `
    return ui_element(style)
}