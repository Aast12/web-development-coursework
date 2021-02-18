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

function buildUnitsComponent(parent, item) {
    const unitComponent = document.createElement('span');
    const unitButtons = [
        document.createElement('button'),
        document.createElement('button'),
    ];
    unitButtons[0].innerText = '-';
    unitButtons[1].innerText = '+';
    unitButtons[0].className = 'unit-btn sub';
    unitButtons[1].className = 'unit-btn add';

    const unitTag = document.createElement('span');
    unitTag.className = 'unit-tag';
    unitTag.innerText = item.units;

    unitComponent.appendChild(unitButtons[0]);
    unitComponent.appendChild(unitTag);
    unitComponent.appendChild(unitButtons[1]);

    unitButtons[0].addEventListener('click', function (event) {
        const el = this.closest('li');
        const itemId = el.id.split('-')[2];
        const itemIndex = shoppingList.findIndex((item) => item.id == itemId);

        shoppingList[itemIndex] = {
            ...shoppingList[itemIndex],
            units: Math.max(1, parseInt(shoppingList[itemIndex].units) - 1),
        };

        el.getElementsByClassName('unit-tag')[0].innerText =
            shoppingList[itemIndex].units;

        updateTotalLabel();
    });

    unitButtons[1].addEventListener('click', function (event) {
        const el = this.closest('li');
        const itemId = el.id.split('-')[2];
        const itemIndex = shoppingList.findIndex((item) => item.id == itemId);

        shoppingList[itemIndex] = {
            ...shoppingList[itemIndex],
            units: Math.max(1, parseInt(shoppingList[itemIndex].units) + 1),
        };

        el.getElementsByClassName('unit-tag')[0].innerText =
            shoppingList[itemIndex].units;

        updateTotalLabel();
    });

    parent.appendChild(unitComponent);
}

function renderItem(item) {
    const parent = document.getElementById('shopping-list');

    const container = document.createElement('li');
    container.id = `shopping-item-${item.id}`;
    container.className = 'item';

    const left = document.createElement('div');
    left.className = 'f-1';

    const nameTag = document.createElement('p');
    nameTag.className = 'item-name';
    nameTag.innerText = item.name;

    const priceTag = document.createElement('span');
    priceTag.className = 'price-tag';
    priceTag.innerText = `Price: $${item.price.toFixed(2)}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn danger';
    deleteBtn.innerText = 'Delete';

    const footer = document.createElement('div');
    footer.className = 'item-footer';

    left.appendChild(nameTag);
    left.appendChild(priceTag);

    buildUnitsComponent(footer, item);
    footer.appendChild(deleteBtn);

    container.appendChild(left);
    container.appendChild(footer);

    deleteBtn.addEventListener('click', function (event) {
        const el = this.closest('li');
        const itemId = el.id.split('-')[2];
        const itemIndex = shoppingList.findIndex((item) => item.id == itemId);
        shoppingList.splice(itemIndex, 1);
        document.getElementById(el.id).remove();
        updateTotalLabel();
    });

    parent.appendChild(container);
}

function updateTotalLabel() {
    const total = shoppingList.reduce((prev, curr) => {
        return prev + parseInt(curr.units) * parseFloat(curr.price);
    }, 0);

    document.getElementById('total-label').innerText = `Total: $${total.toFixed(
        2
    )}`;
}

function onload() {
    for (let item of shoppingList) {
        renderItem(item);
    }
    updateTotalLabel();
    document.getElementById('add-item').addEventListener('click', (event) => {
        const item = parseShoppingItem();

        if (item.name.length == 0) {
            alert("Product's name must not be empty");
            return;
        }
        if (parseFloat(item.price) == NaN || parseFloat(item.price) <= 0) {
            alert('Price must be a number greater than 0');
            return;
        }
        if (parseInt(item.units) == NaN || parseInt(item.units) <= 0) {
            alert('Price must be an integer greater than 0');
            return;
        }
        shoppingList.push(item);
        updateTotalLabel();
        renderItem(item);
    });
}

window.addEventListener('load', onload);
