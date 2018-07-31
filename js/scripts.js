const gallery = document.querySelector('.gallery');
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
        console.log(data);
        data.results.forEach(function(d) {

            let card = `
                <div class='card' data-large-img="${d.picture.large}" data-birthday="${d.dob.date}" data-phone="${d.phone}" data-address="${d.location.street}, ${d.location.state}, ${d.location.postcode}">
                    <img src="${d.picture.medium}" alt="${d.name.first} ${d.name.last}">
                    <div class="info">
                        <h2 class="name">${d.name.first} ${d.name.last}</h2>
                        <p class="email">${d.email}</p>
                        <p class="city">${d.location.city}</p>
                    </div>
                </div>
            `;

            gallery.innerHTML += card;
        });

        $('.card').on('click', function(e) {
            let el = e.target;

            while (el.className !== 'card') {
                el = el.parentNode;
            }
            let $card = $(el);

            let phone = $card.data('phone');
            let bday = $card.data('birthday');
            let address = $card.data('address');
            let largeImg = $card.data('largeImg');
            let html = `
                <img class="modal-image" src="${largeImg}">
                <h3 class="modal-name">${$card.find('.name').text()}</h3>
                <p class="modal-email">${$card.find('.email').text()}</p>
                <p class="modal-city">${$card.find('.city').text()}
                
                <div class="hr"></div>
                <p class="modal-phone">${phone}</p>
                <p class="modal-address">${address}</p>
                <p class="modal-birthday">Birthday: ${bday}</p>
            `;

            $('.modal-inside').html(html);
            $('.modal').show();
            $('.overlay').show();
        });
    }
});

function closeModal() {
    $('.overlay').hide();
    $('.modal').hide();
}

$('.overlay, .close-modal').on('click', function(e) {
    if (e.target.className === 'overlay' || e.target.className === 'close-modal') {
        closeModal();
    }
});




