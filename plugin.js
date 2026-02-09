(function () {
    'use strict';

    if (!window.Lampa) {
        console.log('Lampa not found');
        return;
    }

    const pluginName = 'netflix_test_plugin';

    function openPage() {
        const page = document.createElement('div');
        page.style.background = '#141414';
        page.style.color = '#fff';
        page.style.padding = '30px';

        page.innerHTML = `
            <h1>🎬 Плагин работает</h1>
            <p>Если ты видишь этот экран — плагин успешно загружен.</p>
            <p>Среда: <b>${Lampa.Platform.tv() ? 'TV' : 'Browser'}</b></p>
            <p>Версия Lampa: <b>${Lampa.Version}</b></p>
        `;

        Lampa.Activity.push({
            title: 'Тест плагина',
            component: 'plugin',
            page: page
        });
    }

    Lampa.Plugin.add(pluginName, {
        name: 'Тест Netflix-плагина',
        description: 'Проверка работы в браузере',
        version: '0.1',

        onStart: function () {
            console.log('[Plugin] started');

            Lampa.Menu.add({
                title: '🧪 Тест плагина',
                onSelect: openPage
            });
        }
    });

})();
