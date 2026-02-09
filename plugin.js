(function () {
    'use strict';

    if (!window.Lampa) return;

    const API_PLAYLIST = 'https://example.com/playlist.json';

    let playlist = [];

    function loadPlaylist() {
        return fetch(API_PLAYLIST)
            .then(r => r.json())
            .then(data => playlist = data)
            .catch(() => Lampa.Noty.show('Ошибка загрузки плейлиста'));
    }

    function render() {
        const page = document.createElement('div');
        page.className = 'netflix-page';

        playlist.forEach(category => {
            const row = document.createElement('div');
            row.className = 'netflix-row';
            row.innerHTML = `<h2>${category.title}</h2>`;

            const items = document.createElement('div');
            items.className = 'netflix-items';

            category.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'netflix-card';
                card.innerHTML = `
                    <img src="${item.poster}">
                    <div class="netflix-card-title">${item.title}</div>
                `;

                card.onclick = () => {
                    Lampa.Player.play({
                        title: item.title,
                        url: item.stream,
                        poster: item.poster
                    });
                };

                items.appendChild(card);
            });

            row.appendChild(items);
            page.appendChild(row);
        });

        Lampa.Activity.push({
            title: 'Онлайн кино',
            component: 'plugin',
            page: page
        });
    }

    function start() {
        loadPlaylist().then(render);
    }

    Lampa.Listener.follow('app', e => {
        if (e.type === 'ready') start();
    });

})();
