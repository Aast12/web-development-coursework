function newElement(element, attrs = {}, orderedChildren = []) {
    const el = document.createElement(element);

    for (let attr in attrs) {
        el[attr] = attrs[attr];
    }

    for (let child of orderedChildren) {
        el.appendChild(child);
    }

    return el;
}

function newElement_(element, attrs = {}, keys = {}, orderedChildren = []) {
    const el = document.createElement(element);
    
    
    for (let attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
    }

    for (let key in keys) {
        el[key] = keys[key];
    }

    for (let child of orderedChildren) {
        el.appendChild(child);
    }

    return el;
}
