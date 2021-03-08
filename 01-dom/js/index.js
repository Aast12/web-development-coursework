const shoppingList = [];

let currId = 0;

function parseShoppingItem() {
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const units = document.getElementById('units').value;

    currId++;

    return {
        id: currId,
        name,
        units,
        price,
    };
}

function updateTotalLabel() {
    const total = shoppingList.reduce((prev, curr) => {
        return prev + parseInt(curr.units) * parseFloat(curr.price);
    }, 0);

    document.getElementById('total-label').innerText = `Total: $${total.toFixed(
        2
    )}`;
}

function deleteItem(_) {
    const el = this.closest('li');
    const itemId = el.id.split('-')[2];
    const itemIndex = shoppingList.findIndex((item) => item.id == itemId);
    shoppingList.splice(itemIndex, 1);
    document.getElementById(el.id).remove();
    updateTotalLabel();

    if (shoppingList.length == 0) {
        const emptyMsg = document.getElementById('empty-msg');
        emptyMsg.style.display = 'block';
    }
}

const modifyItemUnits = (modifier = 1) =>
    function (_) {
        const el = this.closest('li');
        const itemId = el.id.split('-')[2];
        const itemIndex = shoppingList.findIndex((item) => item.id == itemId);

        shoppingList[itemIndex] = {
            ...shoppingList[itemIndex],
            units: Math.max(
                1,
                parseInt(shoppingList[itemIndex].units) + modifier
            ),
        };

        el.getElementsByClassName('unit-tag')[0].innerText =
            shoppingList[itemIndex].units;

        updateTotalLabel();
    };

const incrementItemUnits = modifyItemUnits(1);
const decrementItemUnits = modifyItemUnits(-1);

function makeUnitsComponent(item) {
    const children = [
        newElement('button', {
            innerText: '-',
            className: 'unit-btn sub',
            onclick: decrementItemUnits,
        }),
        newElement('span', {
            className: 'unit-tag',
            innerText: item.units,
        }),
        newElement('button', {
            innerText: '+',
            className: 'unit-btn add',
            onclick: incrementItemUnits,
        }),
    ];

    return newElement('span', {}, children);
}

function renderItem(item) {
    const parent = document.getElementById('shopping-list');

    const left = newElement(
        'div',
        {
            className: 'f-1',
        },
        [
            newElement('p', {
                className: 'item-name',
                innerText: item.name,
            }),
            newElement('span', {
                className: 'price-tag',
                innerText: `$${item.price.toFixed(2)}`,
            }),
        ]
    );

    const right = newElement(
        'div',
        {
            className: 'item-actions',
        },
        [
            makeUnitsComponent(item),
            newElement('button', {
                className: 'delete-btn danger',
                innerText: 'Delete',
                onclick: deleteItem,
            }),
        ]
    );

    const container = newElement(
        'li',
        {
            id: `shopping-item-${item.id}`,
            className: 'item',
        },
        [left, right]
    );

    parent.appendChild(container);
}

function onload() {
    updateTotalLabel();
    document.getElementById('add-item').addEventListener('click', (event) => {
        const item = parseShoppingItem();

        if (item.name.length == 0) {
            alert("Product's name must not be empty");

            return;
        }
        if (
            Number.isNaN(parseFloat(item.price)) ||
            parseFloat(item.price) <= 0
        ) {
            alert('Price must be a number greater than 0');

            return;
        }
        if (Number.isNaN(parseInt(item.units)) || parseInt(item.units) <= 0) {
            alert('Units must be an integer greater than 0');
            return;
        }
        shoppingList.push(item);
        updateTotalLabel();
        renderItem(item);

        const emptyMsg = document.getElementById('empty-msg');
        emptyMsg.style.display = 'none';
    });
}

window.addEventListener('load', onload);
