const file = require('path').basename(__filename)
const style_sheet = require('support-style-sheet')

module.exports = i_button

function i_button (option, protocol) {
    const {page, flow = 'ui-button', name, body, icon, role = 'button', state, is_expanded = false, is_current = false, is_selected, is_checked, is_disabled, theme} = option
    let current = is_current
    let checked = is_checked
    let disabled = is_disabled
    let selected = is_selected
    let expanded = is_expanded

    function widget () {
        const sender = protocol(get)
        sender({page, from: name, flow, type: 'ready', file, fn: 'i_button', line: 16})
        // const button = bel`<button role="${role}" aria-label="${name}" tabindex="0" onclick="${() => handle_click()}">${body} ${icon}</button>`
        const el = document.createElement('i-button')
        el.dataset.name = name
        el.dataset.ui = role
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', 0)
        el.onclick = handle_click
        const shadow = el.attachShadow({mode: 'closed'})
        style_sheet(shadow, style)
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
        if (is_disabled) {
            el.ariaDisabled = disabled
            el.setAttribute('disabled', disabled)
        } else {
            el.removeAttribute('aria-disabled')
            el.removeAttribute('disabled')
        }
        if (is_checked) {
            el.setAttribute('aria-checked', checked)
        }
        if (is_current) {
            el.ariaCurrent = current
            el.ariaSelected = selected
        }
        if (is_selected) {
            el.ariaSelected = selected
        }
        if (is_expanded) {
            el.ariaExpanded = expanded
        }
        return el

        // toggle
        function switched_event (body) {
            checked = body
            if (!checked) return el.removeAttribute('aria-checked')
            el.setAttribute('aria-checked', checked)
        }
        // dropdown menu
        function expanded_event (body) {
            expanded = body
            if (!expanded) return el.removeAttribute('aria-expanded')
            el.ariaExpanded = expanded
        }
        // tab checked
        function checked_event () {
            checked = true
            current = checked
            el.ariaSelected = checked
            el.setAttribute('aria-current', checked)
            el.dataset.current = current
        }
        // tab unchecked
        function unchecked_event() {
            checked = false
            current = checked
            el.ariaSelected = checked
            el.removeAttribute('aria-current')
            el.dataset.current = current
        }
        // button click
        function handle_click() {
            console.log( role );
            if (current) return
            if (role === 'switch') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: checked, fn: 'handle_click', file, line: 98})
            if (role === 'listbox') return sender({page, from: name, flow: `ui-${role}`, type: 'click', body: expanded, fn: 'handle_click', file, line: 99})
            sender({page, from: name, flow: `ui-${role}`, type: 'click', fn: 'handle_click', file, line: 100})
        }
        // protocol get msg
        function get (msg) {
            const { type, body } = msg
            if (type === 'checked') return checked_event()
            if (type === 'unchecked') return unchecked_event()
            if (type === 'expanded') return expanded_event(body)
            if (type === 'switched') return switched_event(body)
        }
    }
   
     // insert CSS style
     const custom_style = theme ? theme.style : ''
     // set CSS variables
     if (theme && theme.props) {
        var {size, size_hover, current_size,
            weight, weight_hover, current_weight,
            color, color_hover, current_color, current_bg_color, 
            bg_color, bg_color_hover, border_color_hover,
            border_width, border_style, border_opacity, border_color, border_radius, 
            padding, width, height, opacity,
            fill, fill_hover, icon_size, current_fill,
            shadow_color, offset_x, offset_y, blur, shadow_opacity,
            shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
        } = theme.props
     }

    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--size14)'};
        --size-hover: ${size_hover ? size_hover : 'var(--size)'};
        --curren-size: ${current_size ? current_size : 'var(--size14)'};
        --bold: ${weight ? weight : 'normal'};
        --color: ${color ? color : 'var(--color-black)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --width: ${width ? width : 'unset'};
        --height: ${height ? height : 'unset'};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --border-width: ${border_width ? border_width : '0px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--color-black)'};
        --border-opacity: ${border_opacity ? border_opacity : '1'};
        --border: var(--border-width) var(--border-style) hsla( var(--border-color), var(--border-opacity) );
        --border-radius: ${border_radius ? border_radius : 'var(--primary-button-radius)'};
        --fill: ${fill ? fill : 'var(--color-black)'};
        --fill-hover: ${fill_hover ? fill_hover : 'var(--color-white)'};
        ---icon-size: ${icon_size ? icon_size : '16px'};
        --offset_x: ${offset_x ? offset_x : '0px'};
        --offset-y: ${offset_y ? offset_y : '6px'};
        --blur: ${blur ? blur : '30px'};
        --shadow-color: ${shadow_color ? shadow_color : 'var(--pimary-color)'};
        --shadow-opacity: ${shadow_opacity ? shadow_opacity : '1'};
        --box-shadow: var(--offset_x) var(--offset-y) var(--blur) hsla( var(--shadow-color), var(--shadow-opacity) );
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
        background-color: hsla( var(--bg-color), var(--opacity) );
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        padding: var(--padding);
        transition: font-size .3s, color .3s, background-color .3s ease-in-out;
        cursor: pointer;
    }
    :host(i-button:hover), :host(i-button[role]:hover) {
        --weight: ${weight_hover ? weight_hover : 'initial'};
        --color: ${color_hover ? color_hover : 'var(--color-white)'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--color-black)'};
        --border-color: ${border_color_hover ? border_color_hover : 'var(-color-black)'};
        --offset-x: ${offset_x_hover ? offset_x_hover : '0'};
        --offset-y: ${offset_y_hover ? offset_y_hover : '0'};
        --blur: ${blur_hover ? blur_hover : '50px'};
        --shadow-color: ${shadow_color_hover ? shadow_color_hover : 'var(--pimary-color)'};
        --shadow-opacity: ${shadow_opacity_hover ? shadow_opacity_hover : '.25'};
        font-size: var(--size-hover);
    }
    :host(i-button) g {
        fill: hsl(var(--fill));
        transition: fill 0.3s ease-in-out;
    }
    :host(i-button:hover) g {
        --fill-hover: ${fill_hover ? fill_hover : 'var(--color-white)'};
        fill: hsl(var(--fill-hover));
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
        width: var(---icon-size);
        height: var(---icon-size);
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
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --border-radius: ${border_radius ? border_radius : '0'};
        --border-width: ${border_width ? border_width : '0'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[role="switch"]) {
        --width: ${width ? width : 'unset'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --border-radius: ${border_radius ? border_radius : '8px'};
        --border-width: ${border_width ? border_width : '0'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[role="listbox"]) {
        --width: ${width ? width : 'unset'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --border-radius: ${border_radius ? border_radius : '8px'};
        --border-width: ${border_width ? border_width : '0'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        width: var(--width);
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
        font-size: var(--current_size);
    }
    :host(i-button[aria-current="true"]) g {
        --fill: ${fill ? fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]), :host(i-button[aria-expanded="true"]),
    :host(i-button[aria-checked="true"]:hover), :host(i-button[aria-expanded="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
    }
    :host(i-button[aria-checked="true"]) g {
        --fill: ${current_fill ? current_fill : 'var(--color-white)' };
    }
    :host(i-button[disabled]), :host(i-button[disabled]:hover) {
        --color: ${color ? color : 'var(--color-dark)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --color-opacity: .6;
        --bg-color-opacity: .3;
        color: hsla(var(--color), var(--color-opacity));
        background-color: hsla(var(--bg-color), var(--bg-color-opacity));
        pointer-events: none;
        cursor: not-allowed;
    }
    ${custom_style}
    `

    return widget()
}