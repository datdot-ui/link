const style_sheet = require('support-style-sheet')
const message_maker = require('message-maker')
module.exports = {i_button, i_link}

function i_link (option, protocol) {
    const {page, flow = 'ui-link', name, body, link = {}, icon = undefined, role='link', disabled = false, theme} = option

    let {url = '#', target = '_self'} = link
    
    function widget () {
        const send = protocol(get)
        const make = message_maker(`${name} / ${role} / ${flow}`)
        const message = make({to: 'demo.js', type: 'ready'})
        const el = document.createElement('i-link')
        const shadow = el.attachShadow({mode: 'open'})
        const text = document.createElement('span')
        el.dataset.ui = role
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', '-1')
        el.setAttribute('href', url)
        if (!target.match(/self/)) el.setAttribute('target', target)
        style_sheet(shadow, style)
        if (icon === undefined) shadow.append(body)
        else shadow.append(icon, text)
        send(message)
        el.onclick = handle_open_link
        return el
    }

    function handle_open_link () {
        if (target.match(/_/)) window.open(url, target)
        if (target.match(/#/) && target.length > 1) {
            document.querySelector(target).src = url
        }
    }

    // protocol get msg
    function get (msg) {
        const { head, refs, type, data } = msg
    }

    // insert CSS style
    const custom_style = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var {size, size_hover, weight, color, color_hover, 
            deco, deco_hover,
            bg_color, bg_color_hover,
            border_width, border_style, border_opacity, border_color, border_color_hover,  border_radius, 
            padding, width, height, opacity,
            fill, fill_hover, fill_opacity, icon_size,
            shadow_color, offset_x, offset_y, blur, shadow_opacity,
            shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
        } = theme.props
    }

    const style = `
    :host(i-link) {
        --size: ${size ? size : 'var(--primary-size)'};
        --weight: ${weight ? weight : 'var(--weight300)'};
        --color: ${color ? color : 'var(--color-heavy-blue)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --opacity: ${opacity ? opacity : '0'};
        --deco: ${deco ? deco : 'none'};
        font-size: var(--size);
        font-weight: var(--weight);
        color: hsl(var(--color));
        background-color: hsla(var(--bg-color), var(--opacity));
        text-decoration: var(--deco);
        transition: color 0.5s, font-size 0.5s ease-in-out;
        cursor: pointer;
    }
    :host(i-link:hover) {
        --color: ${color_hover ? color_hover : 'var(--color-blue)'};
        --size: ${size_hover ? size_hover : 'var(--size)'};
        --deco: ${deco_hover ? deco_hover : 'underline'};
        color: hsl(var(--color));
        font-size: var(--size);
        text-decoration: var(--deco);
    }
    ${custom_style}
    `
    return widget()
}

function i_button (option, protocol) {
    const {page, flow = 'ui-button', name, body, icon = '', role = 'button', mode = '', state, expanded = false, current = false, selected = false, checked = false, disabled = false, theme} = option
    let is_current = current
    let is_checked = checked
    let is_disabled = disabled
    let is_selected = selected
    let is_expanded = expanded

    function widget () {
        const send = protocol(get)
        const make = message_maker(`${name} / ${role} / ${flow}`)
        const data = role === 'tab' ?  {selected: is_current ? 'true' : is_selected, current: is_current} : role === 'switch' ? {checked: is_checked} : role === 'listbox' ? {expanded: is_expanded} : disabled ? {disabled} : role === 'option' ? {selected: is_selected, current: is_current} : null
        const message = make({to: 'demo.js', type: 'ready', data})
        send(message)
        const el = document.createElement('i-button')
        const text = document.createElement('span')
        if (body != void 0) {
            text.classList.add('text')
            text.append(body)
        }
        el.dataset.name = name
        el.dataset.ui = role
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', 0)
        el.onclick = handle_click
        const shadow = el.attachShadow({mode: 'open'})
        style_sheet(shadow, style)
        if (icon || role.match(/option|listbox/) ) {
            if (icon === '') shadow.append(body)
            if (body === undefined) shadow.append(icon)
            if (icon !== '' && body) shadow.append(icon, text)
        } else shadow.append(body)

        // define conditions
        if (state) {
            el.dataset.state = state
            el.setAttribute('aria-live', 'assertive')
        }
        if (role === 'tab') {
            el.dataset.current = is_current
            el.setAttribute('aria-selected', false)
        }
        if (role === 'switch') {
            el.setAttribute('aria-checked', is_checked)
        }
        if (role === 'listbox') {
            el.setAttribute('aria-haspopup', role)
        }
        if (disabled) {
            el.setAttribute('aria-disabled', is_disabled)
            el.setAttribute('disabled', is_disabled)
        } else {
            el.removeAttribute('aria-disabled')
            el.removeAttribute('disabled')
        }
        if (is_checked) {
            el.setAttribute('aria-checked', is_checked)
        }
        if (current) {
            is_selected = current
            el.setAttribute('aria-current', is_current)
        }
        if (is_selected || !is_selected && role.match(/option/)) {
            el.setAttribute('aria-selected', is_selected)
        } 
        if (is_expanded) {
            el.setAttribute('aria-expanded', is_expanded)
        }
        return el

        // toggle
        function switched_event (data) {
            is_checked = data
            if (!is_checked) return el.removeAttribute('aria-checked')
            el.setAttribute('aria-checked', is_checked)
        }
        // dropdown menu
        function expanded_event (data) {
            is_expanded = !data
            el.setAttribute('aria-expanded', is_expanded)
        }
        // tab checked
        function checked_event (data) {
            is_checked = data
            is_current = is_checked
            el.setAttribute('aria-selected', is_checked)
            el.setAttribute('aria-current', is_checked)
            el.dataset.current = is_current
        }
        function selected_event (body) {
            is_selected = body
            el.setAttribute('aria-selected', is_selected)
            if (mode === 'single-select') {
                is_current = body
                el.setAttribute('aria-current', is_current)
            }
        }
        function changed_event (body) {
            const { childNodes } = shadow
            const lists = shadow.firstChild.tagName !== 'STYLE' ? childNodes : [...childNodes].filter( (child, index) => index !== 0)
            const [icon, text] = lists
            if (text) {
                text.textContent = body
            } else {
                shadow.childNodes[0].textContent = body
                el.ariaLabel = body
            }
        }
        // button click
        function handle_click () {
            if (is_current) return
            const type = 'click'
            if (role === 'tab') return send( make({type, data: is_checked}) )
            if (role === 'switch') return send( make({type, data: is_checked}) )
            if (role === 'listbox') {
                is_expanded = !is_expanded
                return send( make({type, data: {expanded: is_expanded}}) )
            }
            if (role === 'option') return send( make({type, data: is_selected}) )
            send( make({type}) )
        }
        // protocol get msg
        function get (msg) {
            const { head, refs, type, data } = msg
            // toggle
            if (type === 'switched') return switched_event(data)
            // dropdown
            if (type.match(/expanded|unexpanded/)) return expanded_event(!data)
            // tab, checkbox
            if (type.match(/checked|unchecked/)) return checked_event(data)
            // option
            if (type.match(/selected|unselected/)) return selected_event(data)
            if (type === 'changed') return changed_event(data)
        }
    }
   
    // insert CSS style
    const custom_style = theme ? theme.style : ''
    // set CSS variables
    if (theme && theme.props) {
        var {size, size_hover, current_size,
            weight, weight_hover, current_weight, current_hover_weight,
            color, color_hover, current_color, current_bg_color, 
            current_hover_color, current_hover_bg_color,
            bg_color, bg_color_hover, border_color_hover,
            border_width, border_style, border_opacity, border_color, border_radius, 
            padding, width, height, opacity,
            fill, fill_hover, fill_opacity, icon_size, current_fill, current_hover_fill,
            shadow_color, offset_x, offset_y, blur, shadow_opacity,
            shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
        } = theme.props
    }

    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--size14)'};
        --bold: ${weight ? weight : 'normal'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --width: ${width ? width : 'unset'};
        --height: ${height ? height : 'unset'};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --border-width: ${border_width ? border_width : '0px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        --border-opacity: ${border_opacity ? border_opacity : '1'};
        --border: var(--border-width) var(--border-style) hsla( var(--border-color), var(--border-opacity) );
        --border-radius: ${border_radius ? border_radius : '0'};
        --fill: ${fill ? fill : 'var(--primary-color)'};
        --icon-size: ${icon_size ? icon_size : '16px'};
        --offset_x: ${offset_x ? offset_x : '0px'};
        --offset-y: ${offset_y ? offset_y : '6px'};
        --blur: ${blur ? blur : '30px'};
        --shadow-color: ${shadow_color ? shadow_color : 'var(--primary-color)'};
        --shadow-opacity: ${shadow_opacity ? shadow_opacity : '0'};
        --box-shadow: var(--offset_x) var(--offset-y) var(--blur) hsla( var(--shadow-color), var(--shadow-opacity) );
        display: inline-grid;
        grid-auto-flow: column;
        grid-column-gap: 5px;
        justify-content: center;
        align-items: center;
        ${width && 'width: var(--width);'}
        ${height && 'height: var(--height);'}
        font-size: var(--size);
        font-weight: var(--bold);
        color: hsl( var(--color) );
        background-color: hsla( var(--bg-color), var(--opacity) );
        border: var(--border);
        box-shadow: var(--box-shadow);
        padding: var(--padding);
        transition: font-size .3s, color .3s, background-color .3s ease-in-out;
        cursor: pointer;
    }
    :host(i-button:hover), :host(i-button[role]:hover) {
        --weight: ${weight_hover ? weight_hover : 'initial'};
        --color: ${color_hover ? color_hover : 'var(--color-white)'};
        --size: ${size_hover ? size_hover : 'var(--size14)'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--primary-color)'};
        --border-color: ${border_color_hover ? border_color_hover : 'var(--primary-color)'};
        --offset-x: ${offset_x_hover ? offset_x_hover : '0'};
        --offset-y: ${offset_y_hover ? offset_y_hover : '0'};
        --blur: ${blur_hover ? blur_hover : '50px'};
        --shadow-color: ${shadow_color_hover ? shadow_color_hover : 'var(--primary-color)'};
        --shadow-opacity: ${shadow_opacity_hover ? shadow_opacity_hover : '0'};
    }
    :host(i-button) g {
        fill: hsl(var(--fill));
        transition: fill 0.3s ease-in-out;
    }
    :host(i-button:hover) g {
        --fill: ${fill_hover ? fill_hover : 'var(--color-white)'};
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
        display: grid;
        justify-content: center;
        align-items: center;
        width: var(--icon-size);
        height: var(---con-size);
    }
    :host(i-button) .right .icon {
        grid-column-start: 2;
    }
    :host(i-button) .left .icon {
        grid-column-start: 1;
    }
    :host(i-button) svg {
        max-width: 100%;
        width: 100%;
        height: auto;
    }
    :host(i-button[role="tab"]) {
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
        display: grid;
        grid-template-columns: ${body && icon !== '' ? '1fr auto' : 'auto'};
        width: var(--width);
    }
    :host(i-button[role="listbox"]) .text {
        grid-column-start: 1;
        text-align: left;
    }
    :host(i-button[role="listbox"]) .icon {
        ${body && icon !== '' ? 'grid-column-start: 2;' : ''}
    }
    :host(i-button[role="option"]) {
        display: grid;
        grid-template-rows: 24px;
        grid-template-columns: 20px auto;
        justify-content: left;
    }
    :host(i-button[role="option"]) .text {
        display: block;
        grid-column-start: 2;
    }
    :host(i-button[aria-current="true"]:hover) g {
        --fill: ${fill_hover ? fill_hover : 'var(--color-white)'};
    }
    :host(i-button[role="option"][aria-selected="false"]) .icon {
        display: none;
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
        --size: ${current_size ? current_size : 'var(--size14)'};
    }
    :host(i-button[aria-current="true"]) g {
        --fill: ${fill ? fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]), :host(i-button[aria-expanded="true"]),
    :host(i-button[aria-checked="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--color-white)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-color)'};
    }
    :host(i-button[aria-expanded="true"]:hover) {
        --bold: ${current_hover_weight ? current_hover_weight : 'initial'};
        --color: ${current_hover_color ? current_hover_color : 'var(--color-white)'};
        --bg-color: ${current_hover_bg_color ? current_hover_bg_color : 'var(--primary-color)'};
    }
    :host(i-button[aria-expanded="true"]) g {
        --fill: ${current_fill ? current_fill : 'var(--color-white)'};
    }
    :host(i-button[aria-expanded="true"]:hover) g {
        --fill: ${current_hover_fill ? current_hover_fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]) g {
        --fill: ${current_fill ? current_fill : 'var(--color-white)' };
    }
    :host(i-button[disabled]), :host(i-button[disabled]:hover) {
        --color: ${color ? color : 'var(--color-dark)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-white)'};
        --color-opacity: .6;
        --bg-color-opacity: .3;
        --border-width: ${border_width ? border_width : '0'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--color)'};
        --border-opacity: .6;
        --border: var(--border-width) var(--border-style) hsla(var(--border-color), var(--border-opacity)); 
        color: hsla(var(--color), var(--color-opacity));
        background-color: hsla(var(--bg-color), var(--bg-color-opacity));
        border: var(--border);
        pointer-events: none;
        cursor: not-allowed;
    }
    :host(i-button[role="listbox"][disabled]) {
        --color: ${color ? color : 'var(--color-dark)'};
        --bg-color: ${bg_color ? bg_color : 'var(--color-greyCB)'};
        --color-opacity: .6;
        --bg-color-opacity: .4;
        --border-width: ${border_width ? border_width : '1px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--color)'};
        --border-opacity: .4;
        --border: var(--border-width) var(--border-style) hsla(var(--border-color), var(--border-opacity)); 
        color: hsla(var(--color), var(--color-opacity));
        background-color: hsla(var(--bg-color), var(--bg-color-opacity));
        border: var(--border);
    }
    :host(i-button[role="listbox"][disabled]) g {
        --fill: ${fill ? fill : 'var(--color-dark)'};
        --fill-opacity: ${fill_opacity ? fill_opacity : '0.5'};
        fill: hsla(var(--fill), var(--fill-opacity));
    }
    ${custom_style}
    `

    return widget()
}