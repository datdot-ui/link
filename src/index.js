const style_sheet = require('support-style-sheet')
const message_maker = require('message-maker')
const i_icon = require('datdot-ui-icon')
const img = require('make-image')
module.exports = {i_button, i_link}

function i_link (option, protocol) {
    const {page, flow = 'ui-link', name, body, link = {}, icon, cover, role='link', disabled = false, theme} = option
    if (icon) var make_icon = i_icon({name: icon.name, path: icon.path ? icon.path : 'assets'})
    let {url = '#', target = '_self'} = link
    let is_disabled = disabled
    
    function widget () {
        const send = protocol(get)
        const make = message_maker(`${name} / ${role} / ${flow}`)
        const message = make({to: 'demo.js', type: 'ready'})
        const el = document.createElement('i-link')
        const shadow = el.attachShadow({mode: 'open'})
        const text = document.createElement('span')
        const avatar = document.createElement('span')
        avatar.classList.add('avatar')
        text.classList.add('text')
        text.append(body)
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', '-1')
        el.setAttribute('href', url)
        if (is_disabled) el.setAttribute('disabled', is_disabled)
        if (!target.match(/self/)) el.setAttribute('target', target)
        if (icon && icon.align) el.classList.add(icon.align)
        style_sheet(shadow, style)
        // check icon, cover and body if has value
        let add_cover = typeof cover === 'string' ? avatar : cover ? cover : undefined
        const add_icon = icon ? make_icon : undefined
        const add_text = body ? typeof body === 'string' && (add_icon || add_cover ) ? text : body : typeof body === 'object' && body.localName === 'div' ? body : undefined
        if (typeof cover === 'string') avatar.append(img({src: cover, alt: name}))
        if (add_icon) shadow.append(add_icon)
        if (add_cover) shadow.append(add_cover)
        if (add_text) shadow.append(add_text)
        send(message)
        if (!is_disabled) el.onclick = handle_open_link
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
        var {size, size_hover, weight, color, color_hover, disabled_color,
            deco, deco_hover,
            bg_color, bg_color_hover,
            border_width, border_style, border_opacity, border_color, border_color_hover,  border_radius, 
            padding, margin, width, height, opacity,
            fill, fill_hover, fill_opacity, disabled_fill,
            icon_size, img_width, img_height,
            shadow_color, offset_x, offset_y, blur, shadow_opacity,
            shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
        } = theme.props
    }

    const style = `
    :host(i-link) {
        --size: ${size ? size : 'var(--primary-size)'};
        --weight: ${weight ? weight : 'var(--weight300)'};
        --color: ${color ? color : 'var(--primary-link-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--primary-bg-color)'};
        --opacity: ${opacity ? opacity : '0'};
        --deco: ${deco ? deco : 'none'};
        --padding: ${padding ? padding : '0'};
        --margin: ${margin ? margin : '0'};
        --icon-size: ${icon_size ? icon_size : '16px'};
        --img-width: ${img_width ? img_width : '44px'};
        --img-height: ${img_height ? img_height : 'auto'};
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
        font-size: var(--size);
        font-weight: var(--weight);
        color: hsl(var(--color));
        background-color: hsla(var(--bg-color), var(--opacity));
        text-decoration: var(--deco);
        padding: var(--padding);
        margin: var(--margin);
        transition: color 0.5s, font-size 0.5s ease-in-out;
        cursor: pointer;
    }
    :host(i-link:hover) {
        --color: ${color_hover ? color_hover : 'var(--primary-link-color-hover)'};
        --size: ${size_hover ? size_hover : 'var(--primary-size)'};
        --deco: ${deco_hover ? deco_hover : 'underline'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--color-white)'};
        --opacity: ${opacity ? opacity : '0'};
        text-decoration: var(--deco);
    }
    :host(i-link) svg, :host(i-link) img {
        width: 100%;
        height: auto;
    }
    :host(i-link) svg g {
        --fill: ${fill ? fill : 'var(--color-heavy-blue)'};
        fill: hsl(var(--fill));
        transition: fill 0.5s ease-in-out;
    }
    :host(i-link:hover) svg g {
        --fill: ${fill_hover ? fill_hover : 'var(--color-dodger-blue)'};
    }
    :host(i-link) .text {}
    :host(i-link) .icon {
        width: var(--icon-size);
        height: var(--icon-size);
    }
    :host(i-link) .avatar {
        display: block;
        width: var(--img-width);
        height: var(--img-height);
    }
    :host(i-link[role="menuitem"]) {
        --color: ${color ? color : 'var(--primary-color)'};
        background-color: transparent;
    }
    :host(i-link[role="menuitem"]:hover) {
        --color: ${color_hover ? color_hover : 'var(--color-grey66)'};
        text-decoration: none;
        background-color: transparent;
    }
    :host(i-link[role="menuitem"]) svg g {
        --fill: ${fill ? fill : 'var(--color-primary-color)'};
    }
    :host(i-link[role="menuitem"]:hover) svg g {
        --fill: ${fill_hover ? fill_hover : 'var(--color-grey66)'};
    }
    :host(i-link[disabled]), :host(i-link[disabled]:hover) {
        --color: ${disabled_color ? disabled_color : 'var(--primary-disabled-color)'};
        text-decoration: none;
        cursor: not-allowed;
    }
    :host(i-link[disabled]) g, :host(i-link[disabled]:hover) g, :host(i-link[role][disabled]) g, :host(i-link[role][disabled]:hover) g {
        --fill: ${disabled_fill ? disabled_fill : 'var(--primary-disabled-fill)'};
    }
    :host(i-link[disabled]) .avatar {
        opacity: 0.6;
    }
    :host(i-link.right) {
        flex-direction: row-reverse;
    }
    ${custom_style}
    `
    return widget()
}

function i_button (option, protocol) {
    const {page, flow = 'ui-button', name, body, icon, cover, role = 'button', mode = '', state, expanded = false, current = false, selected = false, checked = false, disabled = false, theme} = option
    if (icon)  var make_icon = i_icon({name: icon.name, path: icon.path ? icon.path : 'assets'})
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
        const avatar = document.createElement('span')
        avatar.classList.add('avatar')
        if (body != void 0) {
            text.classList.add('text')
            text.append(body)
        }
        el.dataset.name = name
        el.setAttribute('role', role)
        el.setAttribute('aria-label', name)
        el.setAttribute('tabindex', 0)
        if (icon && icon.align) el.classList.add(icon.align)
        if (!is_disabled) el.onclick = handle_click
        const shadow = el.attachShadow({mode: 'open'})
        style_sheet(shadow, style)
        // check icon, img and body if has value
        let add_cover = typeof cover === 'string' ? avatar : cover ? cover : undefined
        const add_icon = icon ? make_icon : undefined
        const add_text = body ? typeof body === 'string' && (add_icon || add_cover) ? text : body : typeof body === 'object' && body.localName === 'div' ? body : undefined
        if (typeof cover === 'string') avatar.append(img({src: cover, alt: name}))
        if (typeof body === 'object' && body.localName !== 'div') send(make({type: 'error', data: {body: `content is an ${typeof body}`, content: body }}))
        if (add_icon) shadow.append(add_icon)
        if (add_cover) shadow.append(add_cover)
        if (add_text) shadow.append(add_text)
       
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
                shadow.lastChild.textContent = body
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
            if (role === 'option') {
                is_selected = !is_selected
                return send( make({type, data: {selected: is_selected}}) )
            }
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
        var {size, size_hover, current_size, disabled_size,
            weight, weight_hover, current_weight, current_hover_weight,
            color, color_hover, current_color, current_bg_color, disabled_color, disabled_bg_color,
            current_hover_color, current_hover_bg_color,
            bg_color, bg_color_hover, border_color_hover,
            border_width, border_style, border_opacity, border_color, border_radius, 
            padding, margin, width, height, opacity, img_width, img_height,
            fill, fill_hover, fill_opacity, icon_size, current_fill, current_hover_fill, disabled_fill,
            shadow_color, offset_x, offset_y, blur, shadow_opacity,
            shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
        } = theme.props
    }

    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--primary-size)'};
        --bold: ${weight ? weight : 'var(--weight300)'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--primary-bg-color)'};
        ${width && `--width: ${width}`};
        ${height && `--width: ${height}`};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --margin: ${margin ? margin : '0'};
        --border-width: ${border_width ? border_width : '0px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        --border-opacity: ${border_opacity ? border_opacity : '1'};
        --border: var(--border-width) var(--border-style) hsla( var(--border-color), var(--border-opacity) );
        --border-radius: ${border_radius ? border_radius : 'var(--primary-radius)'};
        --fill: ${fill ? fill : 'var(--primary-color)'};
        --icon-size: ${icon_size ? icon_size : '16px'};
        --img-width: ${img_width ? img_width : '20px'};
        --img-height: ${img_height ? img_height : 'auto'};
        --offset_x: ${offset_x ? offset_x : '0px'};
        --offset-y: ${offset_y ? offset_y : '6px'};
        --blur: ${blur ? blur : '30px'};
        --shadow-color: ${shadow_color ? shadow_color : 'var(--primary-color)'};
        --shadow-opacity: ${shadow_opacity ? shadow_opacity : '0'};
        --box-shadow: var(--offset_x) var(--offset-y) var(--blur) hsla( var(--shadow-color), var(--shadow-opacity) );
        display: grid;
        grid-auto-flow: column;
        gap: 6px;
        justify-content: center;
        align-items: center;
        ${width && 'width: var(--width);'};
        ${height && 'height: var(--height);'};
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
        --color: ${color_hover ? color_hover : 'var(--primary-color-hover)'};
        --size: ${size_hover ? size_hover : 'var(--primary-size-hover)'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--primary-bg-color-hover)'};
        --border-color: ${border_color_hover ? border_color_hover : 'var(--primary-color-hover)'};
        --offset-x: ${offset_x_hover ? offset_x_hover : '0'};
        --offset-y: ${offset_y_hover ? offset_y_hover : '0'};
        --blur: ${blur_hover ? blur_hover : '50px'};
        --shadow-color: ${shadow_color_hover ? shadow_color_hover : 'var(--primary-color-hover)'};
        --shadow-opacity: ${shadow_opacity_hover ? shadow_opacity_hover : '0'};
    }
    :host(i-button) g {
        fill: hsl(var(--fill));
        transition: fill 0.1s ease-in-out;
    }
    :host(i-button:hover) g {
        --fill: ${fill_hover ? fill_hover : 'var(--primary-color-hover)'};
    }
    :host(i-button) .col2 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        column-gap: 8px;
    }
    :host(i-button) .icon {
        display: block;
        width: var(--icon-size);
        height: var(--icon-size);
    }
    :host(i-button) .avatar { 
        display: block;
        width: var(--img-width);
        height: var(--img-height);
    }
    :host(i-button) svg, :host(i-button) img {
        width: 100%;
        height: auto;
    }
    :host(i-button[role="tab"]) {
        --width: ${width ? width : '100%'};
        --border-radius: ${border_radius ? border_radius : '0'};
    }
    :host(i-button[role="switch"]) {
        --size: ${size ? size : 'var(--primary-size)'};
    }
    :host(i-button[role="listbox"]) {
    }
    :host(i-button[role="listbox"]) .text {
        grid-column-start: 1;
        text-align: left;
    }
    :host(i-button[role="option"]) {
        --border-radius: ${border_radius ? border_radius : '0'};
        background-color: transparent;
    }
    :host(i-button[role="option"][aria-current="true"]), :host(i-button[role="option"][aria-current="true"]:hover), 
    :host(i-button[role="option"][disabled]), :host(i-button[role="option"][disabled]:hover) {
        background-color: transparent;
    }
    :host(i-button[role="option"]) .text {
    }
    :host(i-button[role="option"]) .avatar ~ .text {
    }
    :host(i-button[role="option"]) .avatar {
    }
    :host(i-button[role="option"][aria-selected="true"]) .icon g {
        --fill: ${fill ? fill : 'var(--primary-selected-icon-fill)'};
    }
    :host(i-button[role="option"][aria-selected="true"]:hover) .icon g {
        --fill: ${fill_hover ? fill_hover : 'var(--primary-selected-icon-fill-hover)'};
    }

    :host(i-button[role="option"][aria-selected="false"]) > .icon {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    :host(i-button[role="option"][aria-selected="true"]) > .icon {
        opacity: 1;
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --bold: ${current_weight ? current_weight : 'initial'};
        --color: ${current_color ? current_color : 'var(--primary-current-color)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--primary-current-bg-color)'};
        --size: ${current_size ? current_size : 'var(--primary-current-size)'};
    }
    :host(i-button[role="option"][aria-current="true"]) .icon g, :host(i-button[role="option"][aria-current="true"]:hover) .icon g {
        --fill: ${fill ? fill : 'var(--primary-current-icon-fill)'};
    }
    :host(i-button[aria-current="true"]:hover) g {
        --fill: ${fill_hover ? fill_hover : 'var(--primary-current-icon-fill)'};
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
    :host(i-button[aria-expanded="true"]) > .icon g {
        --fill: ${current_fill ? current_fill : 'var(--color-white)'};
    }
    :host(i-button[aria-expanded="true"]:hover) > .icon g {
        --fill: ${current_hover_fill ? current_hover_fill : 'var(--color-white)'};
    }
    :host(i-button[aria-checked="true"]) > .icon g {
        --fill: ${current_fill ? current_fill : 'var(--color-white)' };
    }
    :host(i-button[disabled]), :host(i-button[disabled]:hover) {
        --color: ${disabled_color ? disabled_color : 'var(--primary-disabled-color)'};
        --size: ${disabled_size ? disabled_size : 'var(--primary-size)'};
        --bg-color: ${disabled_bg_color ? disabled_bg_color : 'var(--primary-disabled-bg-color)'};
        cursor: not-allowed;
        opacity: 0.6;
    }
    :host(i-button[disabled]) g,  :host(i-button[disabled]:hover) g, 
    :host(i-button[role="option"][disabled]:hover) > .icon g {
        --fill: ${disabled_color ? disabled_color : 'var(--primary-disabled-fill)'};
    }
    :host(i-button[disabled]) > .col2 .icon g {
    }
    :host(i-button.icon-right) > .text {
        grid-column-start: 2;
    }
    :host(i-button.icon-right) > .avatar {
        grid-column-start: 1;
     }
    :host(i-button.icon-right) > .icon {
       grid-column-start: 3;
    }
    :host(i-button.icon-center) > .text {
        grid-column-start: 3;
    }
    :host(i-button.icon-center) > .avatar {
        grid-column-start: 1;
     }
    :host(i-button.icon-center) > .icon {
       grid-column-start: 2;
    }
    :host(i-button.avatar-left) > .avatar {
        grid-column-start: 1;
    }
    :host(i-button.avatar-left) > .text {
        grid-column-start: 2;
    }
    :host(i-button.avatar-left) > .icon {
        grid-column-start: 3;
    }
    :host(i-button.avatar-right) > .avatar {
        grid-column-start: 3;
    }
    :host(i-button.avatar-right) > .text {
        grid-column-start: 2;
    }
    :host(i-button.avatar-right) > .icon {
        grid-column-start: 1;
    }
    :host(i-button.text-left) > .avatar {
        grid-column-start: 2;
    }
    :host(i-button.text-left) > .text {
        grid-column-start: 1;
    }
    :host(i-button.text-left) > .icon {
        grid-column-start: 3;
    }
    :host(i-button[role="menuitem"]) {
        --color: ${color ? color : 'var(--primary-color)'};
        --border-radius: ${border_radius ? border_radius : '0'};
        background-color: transparent;
    }
    :host(i-button[role="menuitem"]:hover) {
        --color: ${color_hover ? color_hover : 'var(--primary-color-hover)'};
        background-color: transparent;
    }
    :host(i-button[role="menuitem"][disabled]) g ,
    :host(i-button[role="menuitem"][disabled]:hover) g {
        --fill: ${disabled_fill ? disabled_fill : 'var(--primary-disabled-fill)'};
    }
    ${custom_style}
    `

    return widget()
}