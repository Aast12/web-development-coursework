let errorToast = null;

function deleteCard() {
    this.closest('.card').remove();
}

function fetchPokemonData(dName) {
    document.getElementById('spinner').style.display = 'inline-block';

    const pokemonName =
        typeof dName == 'string'
            ? dName
            : document.getElementById('pokemon-name').value;

    if (pokemonName.length == 0) {
        document.getElementById('pokemon-name').classList.add('border-danger');
        document.getElementById('search').classList.add('bg-danger');
        document.getElementById('empty-msg').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
    } else {
        document
            .getElementById('pokemon-name')
            .classList.remove('border-danger');
        document.getElementById('search').classList.remove('bg-danger');
        document.getElementById('empty-msg').style.display = 'none';
    }

    console.log('sheeees', pokemonName);

    let req = new XMLHttpRequest();

    req.open('GET', `https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    req.onreadystatechange = (event) => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const data = JSON.parse(req.response);

                const listRef = document.getElementById('pokemon-list');

                const pokemonEl = document.createElement('div');

                const types = newElement(
                    'div',
                    {},
                    data.types.map((t) =>
                        newElement_(
                            'img',
                            {
                                src: `https://veekun.com/dex/media/types/en/${t.type.name}.png`,
                                class: 'me-2',
                            },
                            {}
                        )
                    )
                );

                const stats = newElement('table', {}, [
                    newElement(
                        'tbody',
                        {},
                        data.stats.map((st) => {
                            const it = (v) => ({ innerText: v });

                            return newElement('tr', {}, [
                                newElement_('td', {}, it(st.stat.name)),
                                newElement_(
                                    'td',
                                    {
                                        width: '95%',
                                        class: 'px-3',
                                    },
                                    {},
                                    [
                                        newElement(
                                            'div',
                                            {
                                                className:
                                                    'progress flex-grow-1',
                                            },
                                            [
                                                newElement_('div', {
                                                    role: 'progressbar',
                                                    'aria-valuenow': '25',
                                                    'aria-valuemin': '0',
                                                    'aria-valuemax': '100',
                                                    class: 'progress-bar',
                                                    style: `width: ${
                                                        (st.base_stat / 256) *
                                                        100
                                                    }%`,
                                                }),
                                            ]
                                        ),
                                    ]
                                ),
                                newElement_('td', {}, it(st.base_stat)),
                            ]);
                        })
                    ),
                ]);

                const abilities = newElement(
                    'div',
                    {},
                    data.abilities
                        .map((ab, i) => {
                            console.log(ab);
                            return [
                                newElement_(
                                    'dt',
                                    { class: 'col-sm-4' },
                                    { innerText: i == 0 ? 'Abilities' : '' }
                                ),
                                newElement_(
                                    'dd',
                                    { class: 'col-sm-8' },
                                    { innerText: ab.ability.name }
                                ),
                            ];
                        })
                        .flat()
                );

                pokemonEl.innerHTML = `<div class="card mx-auto my-2" style="max-width: 600px">
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
                                <dd class="col-sm-8">${data.height}</dd>

                                <dt class="col-sm-4">Weight</dt>
                                <dd class="col-sm-8">${data.weight}</dd>

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

                pokemonEl.getElementsByClassName(
                    'delete'
                )[0].onclick = deleteCard;

                listRef.prepend(pokemonEl);
            } else {
                console.error('ERRROR', req.response);
                errorToast.show();
            }

            document.getElementById('spinner').style.display = 'none';
        }
    };

    req.send();
}

window.onload = () => {
    let toastElList = [].slice.call(document.querySelectorAll('.toast'));
    errorToast = new bootstrap.Toast(toastElList[0]);

    document.getElementById('search').onclick = fetchPokemonData;
};
