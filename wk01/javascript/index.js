class Person {
    constructor(name, age, favoriteColor, friends) {
        this.name = name;
        this.age = age;
        this.favoriteColor = favoriteColor;
        this.friends = friends;
    }
}
const names = ['Andres', 'Juan', 'Luis', 'Jose', 'Mariana', 'Angela', 'Jesus'];
const colors = ['green', 'red', 'blue', 'cyan', 'purple', 'pink', 'black'];

const { floor, random } = Math;

const pickRandom = (arr) => {
    return arr[floor(random() * arr.length)];
};

const addPerson = () => {
    const ref = document.getElementById('people');

    const entry = new Person(
        pickRandom(names),
        floor(random() * 15) + 5,
        pickRandom(colors),
        new Array(floor(random() * 3 + 1)).fill('').map((friend) => pickRandom(names))
    );

    const title = document.createElement('h3');
    title.innerText = entry.name;

    const subtitle = document.createElement('h4');
    subtitle.innerText = `Age: ${entry.age}, Favorite color: ${entry.favoriteColor}`;

    const friends = document.createElement('ul');
    for (let friend of entry.friends) {
        const item = document.createElement('li');
        item.innerText = friend;
        friends.appendChild(item);
    }

    ref.appendChild(title);
    ref.appendChild(subtitle);
    ref.insertAdjacentHTML('beforeend', '<p>Is friend of:</p>')
    ref.appendChild(friends);
};

const onLoad = (e) => {
    for (let i = 0; i < 5; i++) {
        addPerson();
    }
};

window.onload = onLoad
