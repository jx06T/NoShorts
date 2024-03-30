console.log("yt")

class html {
    constructor() {
        this.count = 0
    }
    init() {
        this.URL = window.location.href;
        // console.log(this.URL)

        if (this.URL.includes("/shorts") && !this.URL.includes("@")) {
            this.init2()
        } else {
            this.count = 0
        }
        if (this.URL.includes("/watch")) {
            this.init3()
        }
        FUN.WaitST('[title="Shorts"][id = "endpoint"]', (a) => {
            this.SHORTS_B = a
            this.getAllSD()
            if (ST.hide) {
                FUN.RemoveST(this.SHORTS_B)
            }
        })
    }
    getAllSD() {
        let allSD = document.querySelectorAll('span[id="title"]');
        let targetSDs = [];
        allSD.forEach((SD) => {
            if (SD.innerText === "Shorts") {
                targetSDs.push(SD);
            }
        });
        this.SHORTS_Ds = targetSDs
        // console.log(targetSDs)
        if (ST.hide) {
            FUN.HideSHORTS_D()
        }
    }
    init2() {
        FUN.WaitST('[id = "page-manager"]', (a) => {
            let Mpage = a
            this.SHORTS_BD = Mpage.querySelector('[role="main"]')
            this.SHORTS_BDt = this.SHORTS_BD.querySelector('[id="shorts-inner-container"]')
            console.log(this.SHORTS_BD)
            if (ST.blur) {
                FUN.BlurSHORTS()
            }
            if (ST.lock) {
                FUN.LockSHORTS()
            }
        })
    }
    init3() {
        FUN.WaitST('ytd-reel-shelf-renderer', (a) => {
            this.SHORTS_D2 = a
            FUN.RemoveST(this.SHORTS_D2)
        })
    }
}

class fun {
    constructor() {
        this.waits = {}
    }
    RemoveST(e) {
        e.remove()
    }
    HideSHORTS_D() {
        HTML.SHORTS_Ds.forEach((SD) => {
            // console.log(SD.closest('ytd-item-section-renderer'))
            if (SD.closest('ytd-item-section-renderer')) {
                SD.closest('ytd-item-section-renderer').remove()
            }
            if (SD.closest('ytd-rich-section-renderer')) {
                SD.closest('ytd-rich-section-renderer').remove()
            }
            // SD.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
        })
    }
    BlurSHORTS() {
        let t = setInterval(() => {
            HTML.SHORTS_BD.classList.add("JX06_SHORTS_BD1")
            HTML.SHORTS_BDt.classList.add("JX06_SHORTS_BD2")
            if (!window.location.href.includes("/shorts")) {
                HTML.count = 0
                clearInterval(t)
            }
            HTML.SHORTS_BDt.querySelectorAll("video").forEach((a) => {
                a.muted = true
            });
        }, 1000)
    }
    LockSHORTS() {
        if (HTML.count > Number(ST.limitValue)) {
            HTML.SHORTS_BD.classList.add("JX06_SHORTS_BD1")
        }
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 38 || event.keyCode === 40) {
                if (HTML.count > Number(ST.limitValue)) {
                    window.location.href = "https://www.youtube.com/";
                    HTML.count = 0
                }
                // window.history.back()
            }
        });
    }
    WaitST(html, callback, time = 500) {
        this.waits[html] = setInterval(() => {
            let t = document.querySelector(html)
            if (t) {
                // console.log(t)
                callback(t)
                clearInterval([this.waits[html]])
            }
        }, time);
    }
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


let HTML = new html()
let FUN = new fun()
let ST = {}

window.addEventListener("load", () => {
    getYoutubeSettings().then((settings) => {
        ST = settings
        console.log('YouTube Settings:', settings);
        if (!ST.able) {
            return
        }
        HTML.init()
        setInterval(() => {
            if (window.location.href !== HTML.URL) {
                HTML.init()
                HTML.count++
            }
        }, 1000);
    });
})
