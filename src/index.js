const style_sheet = require('support-style-sheet')
const message_maker = require('message-maker')
const img = require('make-image')
const make_element = require('make-element')
const {main_icon, select_icon, list_icon} = require('make-icon')
const make_grid = require('make-grid')

module.exports = {i_button, i_link}

function i_link (option, protocol) {
    const {page = '*', flow = 'ui-link', name, role='link', body, link = {}, icons = {}, classlist, cover, disabled = false, theme = {}} = option
    const { icon } = icons
    const make_icon = icons && icon ? main_icon(icon) : undefined
    let {url = '#', target = '_self'} = link
    let is_disabled = disabled

    function widget () {
        const send = protocol(get)
        const make = message_maker(`${name} / ${role} / ${flow} / ${page}`)
        const message = make({to: 'demo.js', type: 'ready'})
        const el = make_element({name: 'i-link', role})
        const shadow = el.attachShadow({mode: 'open'})
        const text = make_element({name: 'span', classlist: 'text'})
        const avatar = make_element({name: 'span', classlist: 'avatar'})
        text.append(body)
        el.setAttribute('aria-label', body)
        el.setAttribute('href', url)
        if (is_disabled) set_attr ({aria: 'disabled', prop: is_disabled})
        if (!target.match(/self/)) el.setAttribute('target', target)
        if (classlist) el.classList.add(classlist)
        style_sheet(shadow, style)
        // check icon, cover and body if has value
        const add_cover = typeof cover === 'string' ? avatar : undefined
        const add_icon = icon ? make_icon : undefined
        const add_text = body ? typeof body === 'string' && (add_icon || add_cover ) ? text : body : typeof body === 'object' && body.localName === 'div' ? body : undefined
        if (typeof cover === 'string') avatar.append(img({src: cover, alt: name}))
        if (typeof cover === 'object') send(make({type: 'error', data: `cover[${typeof cover}] must to be a string`}))
        if (add_icon) shadow.append(add_icon)
        if (add_cover) shadow.append(add_cover)
        if (add_text) shadow.append(add_text)
        send(message)
        if (!is_disabled) el.onclick = handle_open_link
        return el

        function set_attr ({aria, prop}) {
            el.setAttribute(`aria-${aria}`, prop)
        }
    
        function handle_open_link () {
            if (target.match(/_/)) {
                window.open(url, target)
            }
            if (target.match(/#/) && target.length > 1) {
                const el = document.querySelector(target)
                el.src = url
            }
            send(make({type: 'go to', data: {url, window: target}}))
        }

        // protocol get msg
        function get (msg) {
            const { head, refs, type, data } = msg
        }

    }

    // insert CSS style
    const custom_style = theme ? theme.style : ''
    // set CSS variables
    const {props = {}, grid = {}} = theme
    const {size, size_hover, disabled_size, weight, 
        color, color_hover, disabled_color,
        deco, deco_hover,
        bg_color, bg_color_hover,
        border_width, border_style, border_opacity, border_color, border_color_hover, border_radius, 
        padding, margin, width, height, opacity,
        icon_fill, icon_fill_hover, disabled_icon_fill,
        icon_size, icon_size_hover,
        avatar_width, avatar_height, avatar_radius,
        shadow_color, offset_x, offset_y, blur, shadow_opacity,
        shadow_color_hover, offset_x_hover, offset_y_hover, blur_hover, shadow_opacity_hover
    } = props

    const grid_link = grid.link ? grid.link : {auto: {auto_flow: 'column'}, align: 'items-center', gap: '4px'}
    const style = `
    :host(i-link) {
        --size: ${size ? size : 'var(--link-size)'};
        --weight: ${weight ? weight : 'var(--weight300)'};
        --color: ${color ? color : 'var(--link-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--link-bg-color)'};
        --opacity: ${opacity ? opacity : '0'};
        --deco: ${deco ? deco : 'none'};
        --padding: ${padding ? padding : '0'};
        --margin: ${margin ? margin : '0'};
        --icon-size: ${icon_size ? icon_size : 'var(--link-icon-size)'};
        display: inline-grid;
        font-size: var(--size);
        font-weight: var(--weight);
        color: hsl(var(--color));
        background-color: hsla(var(--bg-color), var(--opacity));
        text-decoration: var(--deco);
        padding: var(--padding);
        margin: var(--margin);
        transition: color .5s, background-color .5s, font-size .5s, font-weight .5s, opacity .5s ease-in-out;
        cursor: pointer;
        ${make_grid(grid_link)}
    }
    :host(i-link:hover) {
        --color: ${color_hover ? color_hover : 'var(--link-color-hover)'};
        --size: ${size_hover ? size_hover : 'var(--link-size-hover)'};
        --deco: ${deco_hover ? deco_hover : 'underline'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--color-white)'};
        --opacity: ${opacity ? opacity : '0'};
        text-decoration: var(--deco);
    }
    :host(i-link) svg, :host(i-link) img {
        width: 100%;
        height: auto;
    }
    :host(i-link) g, :host(i-link) path {
        --icon-fill: ${icon_fill ? icon_fill : 'var(--link-icon-fill)'};
        fill: hsl(var(--icon-fill));
        transition: fill 0.05s ease-in-out;
    }
    :host(i-link:hover) g, :host(i-link:hover) path{
        --icon-fill: ${icon_fill_hover ? icon_fill_hover : 'var(--link-icon-fill-hover)'};
    }
    :host(i-link[role="menuitem"]) g, :host(i-link[role="menuitem"]) path {
        --icon-fill: ${icon_fill ? icon_fill : 'var(--menu-icon-fill)'};
    }
    :host(i-link[role="menuitem"]:hover) g, :host(i-link[role="menuitem"]:hover) path {
        --icon-fill: ${icon_fill_hover ? icon_fill_hover : 'var(--menu-icon-fill-hover)'};
    }
    :host(i-link) .text {
        ${make_grid(grid.text)}
    }
    :host(i-link) .icon {
        width: var(--icon-size);
        max-width: 100%;
        ${make_grid(grid.icon)}
    }
    :host(i-link:hover) .icon {
        --icon-size: ${icon_size_hover ? icon_size_hover : 'var(--link-icon-size)'};
    }
    :host(i-link[role="menuitem"]) .icon {
        --icon-size: ${icon_size ? icon_size : 'var(--menu-icon-size)'};
    }
    :host(i-link) .avatar {
        --avatar-width: ${avatar_width ? avatar_width : '100%'};
        --avatar-height: ${avatar_height ? avatar_height : 'auto'};
        --avatar-radius: ${avatar_radius ? avatar_radius : 'var(--primary-avatar-radius)'};
        display: block;
        width: var(--avatar-width);
        height: var(--avatar-height);
        border-radius: var(--avatar-radius);
        max-width: 100%;
        ${make_grid(grid.avatar)}
    }
    :host(i-link[role="menuitem"]) {
        --color: ${color ? color : 'var(--menu-color)'};
        background-color: transparent;
    }
    :host(i-link[role="menuitem"]:hover) {
        --color: ${color_hover ? color_hover : 'var(--menu-color-hover)'};
        text-decoration: none;
        background-color: transparent;
    }
    :host(i-link[aria-disabled="true"]), :host(i-link[aria-disabled="true"]:hover) {
        --size: ${disabled_size ? disabled_size : 'var(--link-disabled-size)'};
        --color: ${disabled_color ? disabled_color : 'var(--link-disabled-color)'};
        text-decoration: none;
        cursor: not-allowed;
    }
    
    :host(i-link[disabled]) g,
    :host(i-link[disabled]) path,
    :host(i-link[disabled]:hover) g,
    :host(i-link[disabled]:hover) path,
    :host(i-link[role][disabled]) g,
    :host(i-link[role][disabled]) path,
    :host(i-link[role][disabled]:hover) g,
    :host(i-link[role][disabled]:hover) path
    {
        --icon-fill: ${disabled_icon_fill ? disabled_icon_fill : 'var(--link-disabled-icon-fill)'};
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
    const {page = "*", flow = 'ui-button', name, role = 'button', body = '', icons = {}, cover, classlist = null, mode = '', state, expanded = false, current = false, selected = false, checked = false, disabled = false, theme = {}} = option
    const {icon, select = {}, list = {}} = icons
    const make_icon = icon ? main_icon(icon) : undefined
    if (role === 'listbox') var make_select_icon = select_icon(select)
    if (role === 'option') var make_list_icon = list_icon(list)
    let is_current = current
    let is_checked = checked
    let is_disabled = disabled
    let is_selected = selected
    let is_expanded = expanded

    document.body.addEventListener("touchstart",function(){ });

    function widget () {
        const send = protocol(get)
        const make = message_maker(`${name} / ${role} / ${flow} / ${page}`)
        const data = role === 'tab' ?  {selected: is_current ? 'true' : is_selected, current: is_current} : role === 'switch' ? {checked: is_checked} : role === 'listbox' ? {expanded: is_expanded} : disabled ? {disabled} : role === 'option' ? {selected: is_selected, current: is_current} : null
        const message = make({to: 'demo.js', type: 'ready', data})
        send(message)
        const el = make_element({name: 'i-button', role, classlist })
        const shadow = el.attachShadow({mode: 'open'})
        const text = make_element({name: 'span', classlist: 'text'})
        const avatar = make_element({name: 'span', classlist: 'avatar'})
        const listbox = make_element({name: 'span', classlist: 'listbox'})
        const option = make_element({name: 'span', classlist: 'option'})
        // check icon, img and body if has value
        const add_cover = typeof cover === 'string' ? avatar : undefined
        const add_text = body && typeof body === 'string' ? text : body
        if (typeof cover === 'string') avatar.append(img({src: cover, alt: name}))
        if (typeof cover === 'object') send(make({type: 'error', data: `cover[${typeof cover}] must to be a string`}))
        if (typeof body === 'object' && body.localName !== 'div') send(make({type: 'error', data: {body: `content is an ${typeof body}`, content: body }}))
        if (!is_disabled) el.onclick = handle_click
        text.append(body)
        style_sheet(shadow, style)
        append_items()
        init_attr()
         
        return el

        function init_attr () {
            // define conditions
            if (state) set_attr({aria: 'aria-live', prop: 'assertive'})
            if (role === 'tab') {
                set_attr({aria: 'selected', prop: is_selected})
                el.dataset.name = name
            }
            if (role === 'switch') set_attr({aria: 'checked', prop: is_checked})
            if (role === 'listbox') set_attr({aria: 'haspopup', prop: role})

            if (disabled) {
                set_attr({aria: 'disabled', prop: is_disabled})
                el.setAttribute('disabled', is_disabled)
            } 
            if (is_checked) set_attr({aria: 'checked', prop: is_checked})
            if (is_current) {
                is_selected = is_current
                set_attr({aria: 'current', prop: is_current})
            }
            if (is_selected || !is_selected && role.match(/option/)) {
                set_attr({aria: 'selected', prop: is_selected})
            } 
            if (is_expanded) {
                set_attr({aria: 'selected', prop: is_expanded})
            }
        }

        function set_attr ({aria, prop}) {
            el.setAttribute(`aria-${aria}`, prop)
        }

        // make element to append into shadowDOM
        function append_items() {
            const items = [make_icon, add_cover, add_text]
            const target = role === 'listbox' ? listbox : role === 'option' ?  option : shadow
            // listbox or dropdown button
            if (role === 'listbox') shadow.append(make_select_icon, target)
            // list of listbox or dropdown menu
            if (role === 'option') shadow.append(make_list_icon, target)
            items.forEach( item => {
                if (item === undefined) return
                target.append(item)
            })
        }

        // toggle
        function switched_event (data) {
            is_checked = data
            if (!is_checked) return el.removeAttribute('aria-checked')
            set_attr({aria: 'checked', prop: is_checked})
        }
        // dropdown menu
        function expanded_event (data) {
            is_expanded = !data
            set_attr({aria: 'expanded', prop: is_expanded})
        }
        // tab checked
        function checked_event (data) {
            is_checked = data
            is_current = is_checked
            set_attr({aria: 'selected', prop: is_checked})
            set_attr({aria: 'current', prop: is_current})
            el.dataset.current = is_current
        }
        function list_selected_event (state) {
            const content = {body: option.cloneNode(true)}
            is_selected = state
            set_attr({aria: 'selected', prop: is_selected})
            if (mode === 'single-select') {
                is_current = is_selected
                set_attr({aria: 'current', prop: is_current})
            }
            // option is selected then send selected items to listbox button
            if (is_selected) send(make({to: 'listbox', type: 'changed', data: content }))
        }

        function changed_event (data) {
            if (role === 'listbox') {
                const { body } = data
                listbox.innerHTML = ''
                listbox.append(body)
                return
            }
            if (role.match(/button|tab|switch/)) text.textContent = data
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
                return send( make({type, data: {selected: is_selected }}) )
            }
            send( make({type}) )
        }
        // protocol get msg
        function get (msg) {
            const { head, refs, type, data } = msg
            // toggle
            if (type.match(/switched/)) return switched_event(data)
            // dropdown
            if (type.match(/expanded|collapse/)) return expanded_event(!data)
            // tab, checkbox
            if (type.match(/checked|unchecked/)) return checked_event(data)
            // option
            if (type.match(/selected|unselected/)) return list_selected_event(data)
            if (type.match(/changed/)) return changed_event(data)
        }
    }
   
    // insert CSS style
    const custom_style = theme ? theme.style : ''
    // set CSS variables
    const {props = {}, grid = {}} = theme
    const {
        // default -----------------------------------------//
        size, size_hover, 
        color, color_hover,
        weight, weight_hover, 
        bg_color, bg_color_hover, 
        border_color, border_color_hover,
        border_width, border_style, border_opacity, border_radius, 
        padding, margin, width, height, opacity, 
        avatar_width, avatar_height, avatar_radius,
        icon_fill, icon_fill_hover, icon_size, icon_size_hover,
        shadow_color, shadow_color_hover, 
        offset_x, offset_x_hover,
        offset_y, offset_y_hover, 
        blur, blur_hover,
        shadow_opacity, shadow_opacity_hover,
        scale, scale_hover,
        // current -----------------------------------------//
        current_size, 
        current_weight, 
        current_color, 
        current_bg_color,
        current_icon_size,
        current_icon_fill,
        current_list_selected_icon_fill,
        current_avatar_width, 
        current_avatar_height,
        // disabled -----------------------------------------//
        disabled_size, disabled_weight, disabled_color, disabled_bg_color, disabled_icon_fill, disabled_icon_size,
        // role === option ----------------------------------//
        list_selected_icon_size, list_selected_icon_size_hover,
        list_selected_icon_fill, list_selected_icon_fill_hover,
        // role === listbox ----------------------------------//
        // collapse settings
        listbox_collapse_color, listbox_collapse_color_hover,
        listbox_collapse_size, listbox_collapse_size_hover,
        listbox_collapse_weight, listbox_collapse_weight_hover,
        listbox_collapse_icon_size, listbox_collapse_icon_size_hover,
        listbox_collapse_icon_fill, listbox_collapse_icon_fill_hover, 
        listbox_collapse_avatar_width, listbox_collapse_avatar_height,
        // expanded settings
        listbox_expanded_color, listbox_expanded_color_hover,
        listbox_expanded_size, listbox_expanded_size_hover,
        listbox_expanded_weight, listbox_expanded_weight_hover,
        listbox_expanded_icon_size, listbox_expanded_icon_size_hover,
        listbox_expanded_icon_fill, listbox_expanded_icon_fill_hover,
        listbox_expanded_option_avatar_width, listbox_expanded_option_avatar_height,
        listbox_expanded_option_icon_fill, listbox_expanded_option_icon_fill_hover
    } = props

    const grid_option = grid.option ? grid.option : {auto: {auto_flow: 'column'}, align: 'items-center', gap: '5px', justify: 'items-center'}

    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--primary-size)'};
        --weight: ${weight ? weight : 'var(--weight300)'};
        --color: ${color ? color : 'var(--primary-color)'};
        --bg-color: ${bg_color ? bg_color : 'var(--primary-bg-color)'};
        ${width && `--width: ${width}`};
        ${height && `--height: ${height}`};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --margin: ${margin ? margin : '0'};
        --border-width: ${border_width ? border_width : '0px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        --border-opacity: ${border_opacity ? border_opacity : '1'};
        --border: var(--border-width) var(--border-style) hsla( var(--border-color), var(--border-opacity) );
        --border-radius: ${border_radius ? border_radius : 'var(--primary-radius)'};
        --offset_x: ${offset_x ? offset_x : '0px'};
        --offset-y: ${offset_y ? offset_y : '6px'};
        --blur: ${blur ? blur : '30px'};
        --shadow-color: ${shadow_color ? shadow_color : 'var(--primary-color)'};
        --shadow-opacity: ${shadow_opacity ? shadow_opacity : '0'};
        --box-shadow: var(--offset_x) var(--offset-y) var(--blur) hsla( var(--shadow-color), var(--shadow-opacity) );
        display: inline-grid;
        ${grid.button ? make_grid(grid.button) : make_grid({auto: {auto_flow: 'column'}, gap: '5px', justify: 'content-center', align: 'items-center'})}
        ${width && 'width: var(--width);'};
        ${height && 'height: var(--height);'};
        max-width: 100%;
        font-size: var(--size);
        font-weight: var(--weight);
        color: hsl( var(--color) );
        background-color: hsla( var(--bg-color), var(--opacity) );
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        padding: var(--padding);
        transition: font-size .3s, font-weight .15s, color .3s, background-color .3s, opacity .3s, border .3s, box-shadow .3s ease-in-out;
        cursor: pointer;
        -webkit-mask-image: -webkit-radial-gradient(white, black);
    }
    :host(i-button:hover) {
        --size: ${size_hover ? size_hover : 'var(--primary-size-hover)'};
        --weight: ${weight_hover ? weight_hover : 'var(--primary-weight-hover)'};
        --color: ${color_hover ? color_hover : 'var(--primary-color-hover)'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--primary-bg-color-hover)'};
        --border-color: ${border_color_hover ? border_color_hover : 'var(--primary-color-hover)'};
        --offset-x: ${offset_x_hover ? offset_x_hover : '0'};
        --offset-y: ${offset_y_hover ? offset_y_hover : '0'};
        --blur: ${blur_hover ? blur_hover : '50px'};
        --shadow-color: ${shadow_color_hover ? shadow_color_hover : 'var(--primary-color-hover)'};
        --shadow-opacity: ${shadow_opacity_hover ? shadow_opacity_hover : '0'};
    }
    :host(i-button:hover:foucs:active) {
        --bg-color: ${bg_color ? bg_color : 'var(--primary-bg-color)'};
    }
    :host(i-button) g, :host(i-button) path {
        --icon-fill: ${icon_fill ? icon_fill : 'var(--primary-icon-fill)'};
        fill: hsl(var(--icon-fill));
        transition: fill 0.05s ease-in-out;
    }
    :host(i-button:hover) g, :host(i-button:hover) path {
        --icon-fill: ${icon_fill_hover ? icon_fill_hover : 'var(--primary-icon-fill-hover)'};
    }
    :host(i-button) .col2 {
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        justify-content: center;
        align-items: center;
    }
    :host(i-button) .avatar {
        --avatar-width: ${avatar_width ? avatar_width : '100%'};
        --avatar-height: ${avatar_height ? avatar_height : 'auto'};
        --avatar-radius: ${avatar_radius ? avatar_radius : 'var(--primary-avatar-radius)'};
        position: relative;
        display: block;
        width: var(--avatar-width);
        height: var(--avatar-height);
        max-width: 100%;
        max-height: 100%;
        text-align: center;
        border-radius: var(--avatar-radius);
        -webkit-mask-image: -webkit-radial-gradient(white, black);
        overflow: hidden;
        transition: width .3s, height .3s ease-in-out;
        ${make_grid(grid.avatar)}
    }
    :host(i-button) img {
        --scale: ${scale ? scale : '1'};
        width: 100%;
        transform: scale(var(--scale));
        transition: transform 0.3s, scale 0.3s linear;
    }
    :host(i-button:hover) .avatar img {
        --scale: ${scale_hover ? scale_hover : '1.3'};
        transform: scale(var(--scale));
    }
    :host(i-button) svg {
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
    :host(i-button[role="switch"]:hover) {
        --size: ${size_hover ? size_hover : 'var(--primary-size-hover)'};
    }
    :host(i-button[role="listbox"]) {
        --color: ${listbox_collapse_color ? listbox_collapse_color : 'var(--listbox-collapse-color)'};
        --size: ${listbox_collapse_size ? listbox_collapse_size : 'var(--listbox-collapse-size)'};
        --weight: ${listbox_collapse_weight ? listbox_collapse_weight : 'var(--listbox-collapse-weight)'};
    }
    :host(i-button[role="listbox"]:hover) {
        --color: ${listbox_collapse_color_hover ? listbox_collapse_color_hover : 'var(--listbox-collapse-color-hover)'};
        --size: ${listbox_collapse_size_hover ? listbox_collapse_size_hover : 'var(--listbox-collapse-size-hover)'};
        --weight: ${listbox_collapse_weight_hover ? listbox_collapse_weight_hover : 'var(--listbox-collapse-weight-hover)'};
    }
    :host(i-button[role="listbox"]) > .icon {
        --icon-size: ${listbox_collapse_icon_size ? listbox_collapse_icon_size : 'var(--listbox-collapse-icon-size)'};
        ${grid.icon ? make_grid(grid.icon) : make_grid({column: '2'})}
    }
    :host(i-button[role="listbox"]) .text {}
    :host(i-button[role="listbox"]) .avatar {
        --avatar-width: ${listbox_collapse_avatar_width ? listbox_collapse_avatar_width : 'var(--listbox-collapse-option-avatar-width)'};
        --avatar-height: ${listbox_collapse_avatar_height ? listbox_collapse_avatar_height : 'var(--listbox-collapse-option-avatar-height)'};
    }
    :host(i-button[role="listbox"][aria-expanded="true"]) .avatar {
        --avatar-width: ${listbox_expanded_option_avatar_width ? listbox_expanded_option_avatar_width : 'var(--listbox-expanded-option-avatar-width)'};
        --avatar-height: ${listbox_expanded_option_avatar_height ? listbox_expanded_option_avatar_height : 'var(--listbox-expanded-option-avatar-height)'};
    }
    :host(i-button[role="option"]) {
        --border-radius: ${border_radius ? border_radius : '0'};
        --opacity: ${opacity ? opacity : '0'};
    }
    :host(i-button[role="option"][aria-current="true"]), :host(i-button[role="option"][aria-current="true"]:hover) {
        --size: ${current_size ? current_size : 'var(--current-list-size)'};
        --color: ${current_color ? current_color : 'var(--current-list-color)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--current-list-bg-color)'};
        --opacity: ${opacity ? opacity : '0'}
    }
    :host(i-button[role="option"][disabled]), :host(i-button[role="option"][disabled]:hover) {
        --size: ${disabled_size ? disabled_size : 'var(--primary-disabled-size)'};
        --color: ${disabled_color ? disabled_color : 'var(--primary-disabled-color)'};
        --bg-color: ${disabled_bg_color ? disabled_bg_color : 'var(--primary-disabled-bg-color)'};
        --opacity: ${opacity ? opacity : '0'}
    }
    
    :host(i-button[aria-disabled="true"]) .icon, 
    :host(i-button[aria-disabled="true"]:hover) .icon,
    :host(i-button[role="option"][aria-disabled="true"]) .icon, 
    :host(i-button[role="option"][aria-disabled="true"]:hover) .icon,
    :host(i-button[role="listbox"][aria-disabled="true"]) .icon, 
    :host(i-button[role="listbox"][aria-disabled="true"]:hover) .icon
    {
        --icon-size: ${disabled_icon_size ? disabled_icon_size : 'var(--primary-disabled-icon-size)'};
    }
    :host(i-button[disabled]:hover) img {
        transform: scale(1);
    }
    :host(i-button[role="option"][aria-selected="true"]) > .icon g {
        --icon-fill: ${list_selected_icon_fill ? list_selected_icon_fill : 'var(--list-selected-icon-fill)'};
    }
    :host(i-button[role="option"][aria-selected="true"]:hover) > .icon g {
        --icon-fill: ${list_selected_icon_fill_hover ? list_selected_icon_fill_hover : 'var(--list-selected-icon-fill-hover)'};
    }
    :host(i-button[role="option"][aria-selected="false"]) > .icon {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    :host(i-button[role="option"][aria-selected="true"]) > .icon {
        opacity: 1;
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --size: ${current_size ? current_size : 'var(--current-size)'};
        --weight: ${current_weight ? current_weight : 'var(--current-weight)'};
        --color: ${current_color ? current_color : 'var(--current-color)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--current-bg-color)'};
    }
    :host(i-button[role="option"][aria-current="true"]) > .icon, 
    :host(i-button[role="option"][aria-current="true"]:hover) > .icon,
    {
        --icon-fill: ${current_icon_size ? current_icon_size : 'var(--current-icon-size)'};
    }
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]) > .icon g, 
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]) > .icon path, 
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]:hover) > .icon g,
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]:hover) > .icon path,
    {
        --icon-fill: ${current_list_selected_icon_fill ? current_list_selected_icon_fill : 'var(--current-list-selected-icon-fill)'};
    }
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]) .option .icon g, 
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]) .option .icon path,
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]:hover) .option .icon g,
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]:hover) .option .icon path
    {
        --icon-fill: ${current_icon_fill ? current_icon_fill : 'var(--current-icon-fill)'};
    }
    :host(i-button[aria-checked="true"]), :host(i-button[aria-expanded="true"]),
    :host(i-button[aria-checked="true"]:hover), :host(i-button[aria-expanded="true"]:hover) {
        --size: ${current_size ? current_size : 'var(--current-size)'};
        --weight: ${current_weight ? current_weight : 'var(--current-weight)'};
        --color: ${current_color ? current_color : 'var(--current-color)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--current-bg-color)'};
    }
    :host(i-button[aria-expanded="true"]) > .icon g, :host(i-button[role="listbox"][aria-expanded="true"]) > .icon g,
    :host(i-button[aria-expanded="true"]) > .icon path, :host(i-button[role="listbox"][aria-expanded="true"]) > .icon path 
    {
        --icon-fill: ${listbox_expanded_icon_fill ? listbox_expanded_icon_fill : 'var(--listbox-expanded-icon-fill)'};
    }
    :host(i-button[aria-expanded="false"]) .option .icon g, 
    :host(i-button[aria-expanded="false"]) .option .icon path, 
    :host(i-button[role="listbox"]) .option .icon g, 
    :host(i-button[role="listbox"]) .option .icon path, 
    :host(i-button[role="listbox"][aria-expanded="false"]) .option .icon g,
    :host(i-button[role="listbox"][aria-expanded="false"]) .option .icon path
    {
        --icon-fill: ${listbox_collapse_icon_fill ? listbox_collapse_icon_fill : 'var(--listbox-collpase-option-icon-fill)'};
    }
    :host(i-button[aria-expanded="false"]:hover) .option .icon g, 
    :host(i-button[aria-expanded="false"]:hover) .option .icon path, 
    :host(i-button[role="listbox"]:hover) .option .icon g, 
    :host(i-button[role="listbox"]:hover) .option .icon path, 
    :host(i-button[role="listbox"][aria-expanded="false"]:hover) .option .icon g,
    :host(i-button[role="listbox"][aria-expanded="false"]:hover) .option .icon path 
    {
        --icon-fill: ${listbox_collapse_icon_fill_hover ? listbox_collapse_icon_fill_hover : 'var(--listbox-collpase-option-icon-fill-hover)'};
    }
    :host(i-button[aria-expanded="true"]) .option .icon g, 
    :host(i-button[aria-expanded="true"]) .option .icon path, 
    :host(i-button[role="listbox"][aria-expanded="true"]) .option .icon g,
    :host(i-button[role="listbox"][aria-expanded="true"]) .option .icon path
    {
        --icon-fill: ${listbox_expanded_option_icon_fill ? listbox_expanded_option_icon_fill : 'var(--listbox-expanded-option-icon-fill)'};
    }
    :host(i-button[aria-expanded="true"]:hover) .option .icon g, 
    :host(i-button[aria-expanded="true"]:hover) .option .icon path,
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) .option .icon g,
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) .option .icon path
    {
        --icon-fill: ${listbox_expanded_option_icon_fill_hover ? listbox_expanded_option_icon_fill_hover : 'var(--listbox-expanded-option-icon-fill-hover)'};
    }
    :host(i-button[aria-expanded="true"]:hover) > .icon g, 
    :host(i-button[aria-expanded="true"]:hover) > .icon path,
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) > .icon g,
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) > .icon path
    {
        --icon-fill: ${listbox_expanded_icon_fill_hover ? listbox_expanded_icon_fill_hover : 'var(--listbox-expanded-icon-fill-hover)'};
    }
    :host(i-button[aria-checked="true"]) > .icon g, :host(i-button[aria-checked="true"]) > .icon path {
        --icon-fill: ${current_icon_fill ? current_icon_fill : 'var(--color-white)' };
    }
    :host(i-button[disabled]), :host(i-button[disabled]:hover) {
        --size: ${disabled_size ? disabled_size : 'var(--primary-disabled-size)'};
        --color: ${disabled_color ? disabled_color : 'var(--primary-disabled-color)'};
        --bg-color: ${disabled_bg_color ? disabled_bg_color : 'var(--primary-disabled-bg-color)'};
        cursor: not-allowed;
    }
    :host(i-button[disabled]) g, 
    :host(i-button[disabled]) path,
    :host(i-button[disabled]:hover) g, 
    :host(i-button[disabled]:hover) path, 
    :host(i-button[role="option"][disabled]) > .icon g, 
    :host(i-button[role="option"][disabled]) > .icon path, 
    :host(i-button[role="option"][disabled]) .option .icon g,
    :host(i-button[role="option"][disabled]) .option .icon path,
    :host(i-button[role="listbox"][disabled]) .option .icon g, 
    :host(i-button[role="listbox"][disabled]) .option .icon path, 
    :host(i-button[role="option"][disabled]:hover) > .icon g,
    :host(i-button[role="option"][disabled]:hover) > .icon path,
    :host(i-button[role="listbox"][disabled]:hover) .option .icon g, 
    :host(i-button[role="listbox"][disabled]:hover) .option .icon path, 
    :host(i-button[role="option"][disabled]:hover) .option .icon g,
    :host(i-button[role="option"][disabled]:hover) .option .icon path 
    {
        --icon-fill: ${disabled_color ? disabled_color : 'var(--primary-disabled-icon-fill)'};
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
    :host(i-button[role="menuitem"][disabled]), :host(i-button[role="menuitem"][disabled]):hover {
        --color: ${disabled_color ? disabled_color : 'var(--primary-disabled-color)'};
    }
    :host(i-button[role="menuitem"][disabled]) g ,
    :host(i-button[role="menuitem"][disabled]) path,
    :host(i-button[role="menuitem"][disabled]:hover) g,
    :host(i-button[role="menuitem"][disabled]:hover) path
    {
        --icon-fill: ${disabled_icon_fill ? disabled_icon_fill : 'var(--primary-disabled-icon-fill)'};
    }
    :host(i-button[role="listbox"]) > .icon {
        --icon-size: ${listbox_collapse_icon_size ? listbox_collapse_icon_size : 'var(--listbox-collapse-icon-size)'};
    }
    :host(i-button[role="listbox"]) > .icon g, 
    :host(i-button[role="listbox"]) > .icon path {
        --icon-fill: ${listbox_collapse_icon_fill ? listbox_collapse_icon_fill : 'var(--listbox-collapse-icon-fill)'};
    }
    :host(i-button[role="listbox"]:hover) > .icon g, 
    :host(i-button[role="listbox"]:hover) > .icon path {
        --icon-fill: ${listbox_collapse_icon_fill_hover ? listbox_collapse_icon_fill_hover : 'var(--listbox-collapse-icon-fill-hover)'};
    }
    :host(i-button[role="option"]) > .icon {
        --icon-size: ${list_selected_icon_size ? list_selected_icon_size : 'var(--list-selected-icon-size)'};
    }
    :host(i-button[role="option"]:hover) > .icon {
        --icon-size: ${list_selected_icon_size_hover ? list_selected_icon_size_hover : 'var(--list-selected-icon-size-hover)'};
    }
    :host(i-button[role="option"]) > .icon g, 
    :host(i-button[role="option"]) > .icon path {
        --icon-fill: ${list_selected_icon_fill ? list_selected_icon_fill : 'var(--list-selected-icon-fill)'};
    }
    :host(i-button[role="option"]:hover) > .icon g, :host(i-button[role="option"]:hover) > .icon path {
        --icon-fill: ${list_selected_icon_fill_hover ? list_selected_icon_fill_hover : 'var(--list-selected-icon-fill-hover)'};
    }
    /* define grid */
    :host(i-button) .text {
        ${make_grid(grid.text)}
    }
    :host(i-button) .icon {
        --icon-size: ${icon_size ? icon_size : 'var(--primary-icon-size)'};
        display: block;
        width: var(--icon-size);
        transition: width 0.25s ease-in-out;
        ${make_grid(grid.icon)}
    }
    :host(i-button:hover) .icon {
        --icon-size: ${icon_size_hover ? icon_size_hover : 'var(--primary-icon-size-hover)'};
    }
    :host(i-button) .listbox {
        display: grid;
        max-width: 100%;
        ${make_grid(grid.listbox)}
    }
    :host(i-button) .option {
        display: grid;
        max-width: 100%;
        ${make_grid(grid_option)}
    }
    :host(i-button) .option > .icon {
        ${make_grid(grid.option_icon)}
    }
    :host(i-button) .option > .avatar {
        ${make_grid(grid.option_avatar)}
    }
    :host(i-button) .option > .text {
        ${make_grid(grid.option_text)}
    }
    ${custom_style}
    `

    return widget()
}