async function deleteProduct() {
    const id = $('#product-view').data('id');

    if (id.length !== 0) {
        await axios
            .delete('/products/delete', { data: { id } })
            .then(console.log)
            .catch(console.error);

        $('#empty-product-view').removeClass('hidden');
        $('#product-view').addClass('hidden');
        $('#product-view').data('id', '');
        $('#edit-toolbar').addClass('hidden');
        $('#create-toolbar').addClass('hidden');

        $('div').find(`[data-id=${id}]`).remove();
    }
}

$(document).ready(function () {
    (function () {
        'use strict';

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
                'submit',
                function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                },
                false
            );
        });
    })();

    // Handles submit of form on create or update
    $('#product-form').on('submit', async function (event) {
        event.preventDefault();
        if ($('#product-view').data('id').length === 0) {
            const values = {
                name: $('#name').val(),
                price: $('#price').val(),
                description: $('#description').val(),
                image: $('#image').prop('files')[0],
            };

            const form = new FormData();
            Object.keys(values).forEach((key) => {
                form.append(key, values[key]);
            });

            await axios
                .post('/products/create', form)
                .then(console.log)
                .catch(console.error);
        } else {
            const values = {
                _id: $('#product-view').data('id'),
                name: $('#name').val(),
                price: $('#price').val(),
                description: $('#description').val(),
                image: $('#image').prop('files')[0],
            };

            const form = new FormData();
            Object.keys(values).forEach((key) => {
                form.append(key, values[key]);
            });

            await axios
                .put('/products/update', form)
                .then(console.log)
                .catch(console.error);
        }
    });

    // Updates product list on search filter
    $('#search-input').on('keyup', function (event) {
        const value = event.target.value?.toLowerCase() ?? '';

        let results = 0;
        $('.product-preview').each(function () {
            const name = this.dataset?.name?.toLowerCase();

            if (name && name.includes(value)) {
                results++;
                this.style.display = 'block';
            } else if (name) {
                this.style.display = 'none';
            }
        });

        if (results == 0) {
            $('#empty-product-list').removeClass('hidden');
        } else {
            $('#empty-product-list').addClass('hidden');
        }
    });

    // Handles product selection on select
    $('#product-select').on('change', function (event) {
        $('.product-list').find(`[data-id=${event.target.value}]`).click();
    });

    // Handles product preview
    $('.product-preview').on('click', function () {
        const product = this;

        const { dataset } = product;

        // Prepares product view
        $('#empty-product-view').addClass('hidden');
        $('#product-view').removeClass('hidden');
        $('#product-view').data('id', dataset.id);
        $('#edit-toolbar').removeClass('hidden');
        $('#create-toolbar').addClass('hidden');

        // Displays product image if any
        if (dataset.image && dataset.image.length > 0) {
            $('.product-image').removeClass('hidden');
            $('.product-image').attr('src', dataset.image);
        } else {
            $('.product-image').addClass('hidden');
        }

        $('#name').val(dataset.name);
        $('#price').val(parseFloat(dataset.price));
        $('#description').val(dataset.description);
    });

    // Handles new product preview
    $('.new-product').on('click', function () {
        $('#empty-product-view').addClass('hidden');
        $('#product-view').removeClass('hidden');
        $('#product-view').data('id', '');
        $('#edit-toolbar').addClass('hidden');
        $('#create-toolbar').removeClass('hidden');

        $('#name').val('');
        $('#price').val('');
        $('#description').val('');
        $('.product-image').addClass('hidden');
        $('.product-image').attr('src', '');
    });
});
