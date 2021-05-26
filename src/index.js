const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
// themes
const mainTheme = require('themes/main-theme')
const whiteTheme = require('themes/dark-theme')

module.exports = button

function button (option, protocol) {
    const widget = 'ui-button'
    const {page, flow, name, content = 'Button', custom, widgetTheme, theme, themeName = 'default', isActive, isDisabled} = option

    const ui_element = (css) => {
        let state = 'inactive'
        const send2Parent = protocol( receive )
        send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'init', filename, line: 11})
        // for tab to check isActive is true then set button state to active
        if (isActive) setState('active')
        const button = bel`<button role="button" class="${css.button}${custom ? ` ${custom}` : ''}${isActive ? ` ${css.active}` : ''}${isDisabled ? ` ${css.disabled}` : ''}${widgetTheme ? ` ${css[widgetTheme]}` : ''}" data-name="${name}">${content}</button>`
        
        setTheme(themeName, button)

        button.onclick = (e) => click(button)
        return button

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
            if (state === 'inactive') button.classList.remove(css.active)
            if (state === 'active') button.classList.add(css.active)
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
            colorDisabled, bgColorDisabled,
            bgImage, bgImageHover, bgImageActive,
            boxShadow, position, zIndex, top, bottom, left, right, cursor,
            iconSize, iconFillColor, iconStrokeColor
        } = theme


    function setTheme(themeName, target) {
        if (themeName === 'default') return mainTheme(document.documentElement)
        if (themeName === 'dark') return whiteTheme(target)
    }

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
        font-family: ${fontFamily ? fontFamily : 'var(--button-font-family)'};
        font-size: ${fontSize ? fontSize : 'var(--button-font-size)'};
        font-weight: ${fontWeight ? fontWeight : 'var(--button-font-weight)'};
        color: ${color ? color : 'var(--button-color)'};
        background-color: ${bgColor ? bgColor : 'var(--button-bg-color)'};
        background-image: ${bgImage ? bgImage : 'var(--button-bg-image)'};
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
        background-image: ${bgImageHover ? bgImageHover : 'var(--button-bg-image-hover)'};
    }
    .button > div {
        width: ${iconSize ? iconSize : 'var(--button-icon-size)'};
    }
    .button > div svg {
        width: 100%;
        height: auto;
    }
    .active, .active:hover {
        color: ${colorActive ? colorActive : 'var(--button-color-active)'};
        background-color: ${bgColorActive ? bgColorActive : 'var(--button-bg-color-active)'};
        background-image: ${bgImageActive ? bgImageActive : 'var(--button-bg-image-active)'};
    }
    .disabled {
        color: ${colorDisabled ? colorDisabled : 'var(--button-color-disabled)'};
        background-color: ${bgColorDisabled ? bgColorDisabled : 'var(--button-bg-color-disabled)'};
        pointer-events: none;
    }
    .cancel {
        color: ${color ? color : 'var(--cancel-color)'};
        background-color: ${bgColor ? bgColor : 'var(--cancel-bg-color)'};
    }
    .cancel:hover {
        color: ${colorHover ? colorHover : 'var(--cancel-color-hover)'};
        background-color: ${bgColorHover ? bgColorHover : 'var(--cancel-bg-color-hover)'};
    }
    .cancel > div svg path {
        fill: none;
        stroke: ${iconStrokeColor ? iconStrokeColor : 'var(--cancel-icon-stroke-color)'};
    }
    .confirm > div svg path {
        fill: none;
        stroke: ${iconStrokeColor ? iconStrokeColor : 'var(--confirm-icon-stroke-color)'};
    }
    .toggle {
        color: ${color ? color : 'var(--toggle-color)'};
        background-color: ${bgColor ? bgColor : 'var(--toggle-bg-color)'};
    }
    .toggle.active, .toggle.active:hover {
        color: ${colorActive ? colorActive : 'var(--button-color-active)'};
        background-color: ${bgColorActive ? bgColorActive : 'var(--button-bg-color-active)'};
    }
    .toggle.active.disabled {
        color: ${colorDisabled ? colorDisabled : 'var(--toggle-color-active-disabled)'};
        background-color: ${bgColorDisabled ? bgColorDisabled : 'var(--toggle-bg-color-active-disabled)'};
    }
    .tab {
        color: ${color ? color : 'var(--tab-color)'};
        background-color: ${bgColor ? bgColor : 'var(--tab-bg-color)'};
    }
    .tab.active {
        color: ${color ? color : 'var(--button-color-active)'};
        background-color: ${bgColor ? bgColor : 'var(--button-bg-color-active)'};
        cursor: default;
    }
    .tab.disabled {
        color: ${colorDisabled ? colorDisabled : 'var(--button-color-disabled)'};
        background-color: ${bgColorDisabled ? bgColorDisabled : 'var(--button-bg-color-disabled)'};
        pointer-events: none;
    }
    `
    return ui_element(style)
}