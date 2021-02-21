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
