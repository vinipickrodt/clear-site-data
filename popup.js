document.getElementById('clear-data-btn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTab = tabs[0];
      const currentUrl = new URL(currentTab.url);
      const siteOrigin = currentUrl.origin;
  
      // Limpar cookies
      chrome.cookies.getAll({domain: currentUrl.hostname}, function(cookies) {
        cookies.forEach(function(cookie) {
          chrome.cookies.remove({url: siteOrigin, name: cookie.name});
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
      }, function() {
        console.log('Dados do site limpos!');
      });
    });
  });
  