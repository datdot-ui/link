const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)

module.exports = button

// button ({page, flow = null, name, content, style, color, custom, current, disabled = false}, protocol
function button (option, protocol) {
    const widget = 'ui-button'
    const {page, flow, name, content = 'Button', theme} = option

    const send2Parent = protocol( receive )
    send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'init', filename, line: 11})

    const ui_element = (css) => {
        const element = bel`<button role="button" class="${css.button}" data-name="${name}">${content}</button>`
        element.onclick = (e) => click(e)
       
        return element

         // Action
        function click(e) {
            const btn = document.querySelector(`.${css.button}`)
            send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'click', filename, line: 40})
        }
    }

    function receive(message) {
        const { type } = message
        console.log( type );
        console.log('received from main component', message )
        // if ( type === 'current-active' ) button.classList.add(css.current)
        // if ( type === 'remove-current' ) button.classList.remove(css.current)
        // if ( type === 'disabled' ) button.setAttribute('disabled', true)
        // if ( type === 'active' ) toggleActive(true, message)
        // if ( type === 'remove-active' ) toggleActive(false, message)
    }

    // if theme is entering as a property then set apply CSS styles
    if (theme) var { fontSize, fontWeight, padding, rounder, border, color, bg, shadow } = theme

    const style = csjs`
    .button {
        font-size: ${fontSize ? fontSize : 'var(--font-primary)'};
        font-weight: ${fontWeight ? fontWeight : 'var(--font-weight-primary)'};
        color: ${color ? color : 'hsl(0, 0%, 0%)' };
        background: ${bg ? bg : 'hsl(0, 0%, 100%)'};
        border: ${border ? border : 'var(--border-solid)'};
        border-radius: ${rounder ? rounder : 'var(--rounder0)'};
        box-shadow: ${shadow ? shadow : 'none'};
        padding: ${padding ? padding : 'var(--button-padding)'};
    }

    .button:hover {
        color: ${color ? color : 'hsl(0, 0%, 0%)' };
        background: ${bg ? bg : 'hsl(0, 0%, 100%)'};
    }
    `

    return ui_element(style)
}