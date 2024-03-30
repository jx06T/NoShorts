// options.js
window.addEventListener('load', () => {
    console.log("op")
    // Instagram 設定
    const igAble = document.getElementById('checkboxi1');
    const igHide = document.getElementById('checkboxi2');
    const igBlur = document.getElementById('checkboxi3');
    const igLock = document.getElementById('checkboxi4');
    const igBlurValue = document.getElementById('inputi1');
    const igLimitValue = document.getElementById('inputi2');

    // YouTube 設定
    const ytAble = document.getElementById('checkboxy1');
    const ytHide = document.getElementById('checkboxy2');
    const ytBlur = document.getElementById('checkboxy3');
    const ytLock = document.getElementById('checkboxy4');
    const ytBlurValue = document.getElementById('inputy1');
    const ytLimitValue = document.getElementById('inputy2');

    // 從 Chrome 儲存空間讀取初始設定
    chrome.storage.sync.get(['instagramSettings', 'youtubeSettings'], function (data) {
        const igSettings = data.instagramSettings || {};
        const ytSettings = data.youtubeSettings || {};
        console.log(igSettings)

        igAble.checked = igSettings.able != null ? igSettings.able : true;
        igHide.checked = igSettings.hide != null ? igSettings.hide : true;
        igBlur.checked = igSettings.blur != null ? igSettings.blur : true;
        igLock.checked = igSettings.lock != null ? igSettings.lock : true;
        igBlurValue.value = igSettings.blurValue != null ? igSettings.blurValue : 10;
        igLimitValue.value = igSettings.limitValue != null ? igSettings.limitValue : 5;

        ytAble.checked = ytSettings.able != null ? ytSettings.able : true;
        ytHide.checked = ytSettings.hide != null ? ytSettings.hide : true;
        ytBlur.checked = ytSettings.blur != null ? ytSettings.blur : true;
        ytLock.checked = ytSettings.lock != null ? ytSettings.lock : true;
        ytBlurValue.value = ytSettings.blurValue != null ? ytSettings.blurValue : 10;
        ytLimitValue.value = ytSettings.limitValue != null ? ytSettings.limitValue : 5;

        if (igSettings.able == null) {
            saveYoutubeSettings()
            saveInstagramSettings()
        }
    });

    // 監聽 Instagram 設定變化
    igAble.addEventListener('change', saveInstagramSettings);
    igHide.addEventListener('change', saveInstagramSettings);
    igBlur.addEventListener('change', saveInstagramSettings);
    igLock.addEventListener('change', saveInstagramSettings);
    igBlurValue.addEventListener('input', saveInstagramSettings);
    igLimitValue.addEventListener('input', saveInstagramSettings);

    // 監聽 YouTube 設定變化
    ytAble.addEventListener('change', saveYoutubeSettings);
    ytHide.addEventListener('change', saveYoutubeSettings);
    ytBlur.addEventListener('change', saveYoutubeSettings);
    ytLock.addEventListener('change', saveYoutubeSettings);
    ytBlurValue.addEventListener('input', saveYoutubeSettings);
    ytLimitValue.addEventListener('input', saveYoutubeSettings);

    function saveInstagramSettings() {
        const igSettings = {
            able: igAble.checked,
            hide: igHide.checked,
            blur: igBlur.checked,
            lock: igLock.checked,
            blurValue: parseInt(igBlurValue.value) || 10,
            limitValue: parseInt(igLimitValue.value) || 10
        };
        chrome.storage.sync.set({ 'instagramSettings': igSettings });
        console.log("st")
    }

    function saveYoutubeSettings() {
        const ytSettings = {
            able: ytAble.checked,
            hide: ytHide.checked,
            blur: ytBlur.checked,
            lock: ytLock.checked,
            blurValue: parseInt(ytBlurValue.value) || 10,
            limitValue: parseInt(ytLimitValue.value) || 10
        };
        chrome.storage.sync.set({ 'youtubeSettings': ytSettings });
        console.log("st")
    }
});