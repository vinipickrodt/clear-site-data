document.getElementById('clear-data-btn').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const currentUrl = new URL(currentTab.url);
    const siteOrigin = currentUrl.origin;

    // Limpar cookies de primeiro e terceiro partido
    chrome.cookies.getAll({}, function (cookies) {
      cookies.forEach(function (cookie) {
        // Filtra os cookies relacionados ao domínio atual
        if (cookie.domain.includes(currentUrl.hostname) || cookie.domain.startsWith(".")) {
          const cookieUrl = `https://${cookie.domain.startsWith(".") ? cookie.domain.substring(1) : cookie.domain}${cookie.path}`;
          chrome.cookies.remove({
            url: cookieUrl,
            name: cookie.name
          }, function (details) {
            if (chrome.runtime.lastError) {
              console.log(chrome.runtime.lastError);
            }
          });
        }
      });
    });

    // Limpar dados de navegação
    chrome.browsingData.remove({
      origins: [siteOrigin]
    }, {
      "cache": true,
      "cookies": true,
      "localStorage": true,
      "indexedDB": true,
      "serviceWorkers": true,
      "webSQL": true
    }, function () {
      console.log('Dados do site e cookies de terceiros limpos!');
    });
  });
});
