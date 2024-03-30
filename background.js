function getInstagramSettings() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get('instagramSettings', (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(data.instagramSettings || {});
        }
      });
    });
  }
  
  function getYoutubeSettings() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get('youtubeSettings', (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(data.youtubeSettings || {});
        }
      });
    });
  }

  function clean() {
    chrome.storage.sync.set({ 'instagramSettings': {} });
    chrome.storage.sync.set({ 'youtubeSettings': {} });
  }