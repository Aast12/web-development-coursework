function newElement(element, attrs = {}, orderedChildren = []) {
    const el = document.createElement(element);

    for (let attr in attrs) {
        el[attr] = attrs[attr];
    }

    if (Array.isArray(orderedChildren)) {
        for (let child of orderedChildren) {
            el.appendChild(child);
        }
    } else {
        el.appendChild(orderedChildren); // assumes if is not array is dom element
    }

    return el;
}

function setAttributes(el, attrs = {}) {
    for (let attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
    }

    return el;
}
