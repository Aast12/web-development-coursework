let errorToast = null,
    repeatedErrorToast = null;

const pokemon = new Map();

function updateWeightLabel() {
    const wLabel = document.getElementById('weight-label');

    if (pokemon.size === 0) {
        wLabel.classList.add('text-muted');
        wLabel.textContent = 'There are no pokemon in the deck';
    } else {
        const newWeight = Array.from(pokemon, ([_, value]) => value).reduce(
            (prev, curr) => curr.weight + prev,
            0
        );
        wLabel.classList.remove('text-muted');
        wLabel.textContent = `Deck Weight: ${newWeight} hg`;
    }
}

function deleteCard() {
    const cardRef = this.closest('.card');
    const pokemonId = parseInt(cardRef.id);
    cardRef.remove();
    pokemon.delete(pokemonId);

    updateWeightLabel();
}

function createCard(data) {
    const listRef = document.getElementById('pokemon-list');

    const pokemonEl = document.createElement('div');

    const types = newElement(
        'div',
        {},
        data.types.map(({ src }) =>
            setAttributes(newElement('img'), {
                src,
                class: 'me-2',
            })
        )
    );

    const stats = newElement('table', {}, [
        newElement(
            'tbody',
            {},
            data.stats.map(({ base_stat, name }) => {
                const it = (v) => ({ innerText: v });

                const progressBar = setAttributes(newElement('div'), {
                    role: 'progressbar',
                    'aria-valuenow': '25',
                    'aria-valuemin': '0',
                    'aria-valuemax': '100',
                    class: 'progress-bar',
                    style: `width: ${(base_stat / 256) * 100}%`,
                });

                const progressBarContainer = newElement(
                    'div',
                    {
                        className: 'progress flex-grow-1',
                    },
                    progressBar
                );

                return newElement('tr', {}, [
                    newElement('td', it(name)),
                    setAttributes(newElement('td', {}, progressBarContainer), {
                        width: '95%',
                        class: 'px-3',
                    }),
                    setAttributes(newElement('td', it(base_stat))),
                ]);
            })
        ),
    ]);

    const abilities = newElement(
        'div',
        {},
        data.abilities
            .map(({ ability }, i) => [
                setAttributes(
                    newElement('dt', {
                        innerText: i == 0 ? 'Abilities' : '',
                    }),
                    { class: 'col-sm-4' }
                ),
                setAttributes(
                    newElement('dd', {
                        innerText: ability.name,
                    }),
                    { class: 'col-sm-8' }
                ),
            ])
            .flat()
    );

    pokemonEl.innerHTML = `<div class="card mx-auto my-2" style="max-width: 600px" id="${
        data.id
    }">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <h3 class="card-title d-inline">${
                                data.name
                            } <small class="text-muted">#${data.id}</small></h3>
                            <button class="btn delete"><i class="bi bi-trash-fill text-danger fs-5"></i></button>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-5">
                                <img
                                    class="my-3"
                                    src="${`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`}"
                                    alt="pikachu"
                                    style="width:100%;min-width:100px"
                                />
                                ${types.outerHTML}
                            </div>
                            <div class="col-7" style="min-width:200px;">
                                <dl class="row">
                                    <dt class="col-sm-4">Height</dt>
                                    <dd class="col-sm-8">${data.height} dm</dd>
    
                                    <dt class="col-sm-4">Weight</dt>
                                    <dd class="col-sm-8">${data.weight} hg</dd>
    
                                    ${abilities.innerHTML}
                                </dl>
                            </div>
                        </div>
                        <hr/>
                        <h5>Base Stats</h5>
                        ${stats.outerHTML}
                        <p class="card-text">
                        
                        </p>
                    </div>
                </div>`;

    pokemonEl.getElementsByClassName('delete')[0].onclick = deleteCard;

    listRef.prepend(pokemonEl);

    pokemon.set(data.id, data);

    updateWeightLabel();
}

function fetchPokemonData(dName) {
    document.getElementById('spinner').style.display = 'inline-block';

    const pokemonName =
        typeof dName == 'string'
            ? dName
            : document.getElementById('pokemon-name').value;

    document.getElementById('pokemon-name').value = '';

    if (pokemonName.length == 0) {
        document.getElementById('pokemon-name').classList.add('border-danger');
        document.getElementById('search').classList.add('bg-danger');
        document.getElementById('empty-msg').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
        return;
    } else {
        document
            .getElementById('pokemon-name')
            .classList.remove('border-danger');
        document.getElementById('search').classList.remove('bg-danger');
        document.getElementById('empty-msg').style.display = 'none';
    }

    axios
        .get(`/get-pokemon?name=${pokemonName}`)
        .then(({ status, data }) => {
            if (status == 200) {
                if (!pokemon.has(data.id)) {
                    createCard(data);
                } else {
                    repeatedErrorToast.show();
                }
            } else {
                errorToast.show();
            }

            document.getElementById('spinner').style.display = 'none';
        })
        .catch((err) => {
            errorToast.show();
            document.getElementById('spinner').style.display = 'none';
        });
}

window.onload = () => {
    errorToast = new bootstrap.Toast(document.getElementById('error-toast'));
    repeatedErrorToast = new bootstrap.Toast(
        document.getElementById('repeated-error-toast')
    );

    axios.get(`/recent`).then(({ data }) => {
        const { pokemon } = data;
        if (pokemon && pokemon.length > 0) {
            const recentLstEl = document.getElementById('recent-lst');

            recentLstEl.innerText = 'Recent queries: ';
            for (let p of pokemon) {
                const link = document.createElement('a');
                link.classList = 'link-primary me-2';
                link.text = p;
                link.href = '#';

                link.onclick = function (e) {
                    e.preventDefault();

                    fetchPokemonData(p);
                };

                recentLstEl.appendChild(link);
            }
        }
    });

    document.getElementById('search').onclick = fetchPokemonData;
    document
        .getElementById('pokemon-name')
        .addEventListener('keyup', (event) => {
            if (event.key == 'Enter') {
                document.getElementById('search').click();
            }
        });
};
