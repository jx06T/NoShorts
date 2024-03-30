console.log("ig")

class html {
    constructor() {
        this.count = 0

    }
    init() {
        this.URL = window.location.href;
        // console.log(this.URL)

        if (this.URL.includes("/reel") && !this.URL.includes("/reels")) {
            this.init1()
        } else if (this.URL.includes(".com/reels")) {
            this.init2()
        } else {
            this.count = 0
        }

        FUN.WaitST('[class="x1iyjqo2 xh8yej3"]', (a) => {
            this.REELS_B = a.childNodes[3]
            console.log(a.childNodes.length)
            if (ST.hide && a.childNodes.length == 8) {
                FUN.RemoveST(this.REELS_B)
            }
        })
    }
    init1() {
        FUN.WaitST('[class="x1cy8zhl x9f619 x78zum5 xl56j7k x2lwn1j xeuugli x47corl"]', (a) => {
            this.REELS_BD2 = a
            // console.log(this.REELS_BD2)
            FUN.BlurREELS2()
        })
    }
    init2() {
        // let Mpage = document.getElementById("page-manager")
        FUN.WaitST('[class="x78zum5 xdt5ytf x1iyjqo2 x6ikm8r xg6iff7"]', (a) => {
            this.REELS_BD = a
            FUN.BlurREELS()
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

    BlurREELS() {
        let t = setInterval(() => {
            if (ST.blur) {
                HTML.REELS_BD.classList.add("JX06_REELS_BD1")
            }
            if (ST.blur || (ST.lock && HTML.count > Number(ST.limitValue))) {
                HTML.REELS_BD.classList.add("JX06_REELS_BD2")
                HTML.REELS_BD.querySelectorAll("video").forEach((a) => {
                    a.muted = true
                });
            }

            if (!window.location.href.includes(".com/reels")) {
                HTML.count = 0
                clearInterval(t)
            }

        }, 1000)

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 38 || event.keyCode === 40) {
                if (HTML.count > Number(ST.limitValue)) {
                    window.location.href = "https://www.instagram.com/";
                    HTML.count = 0
                }
                // window.history.back()
            }
        });
    }
    BlurREELS2() {
        let t = setInterval(() => {
            if (ST.blur) {
                HTML.REELS_BD2.classList.add("JX06_REELS_BD1")
            }
            if (ST.blur || (ST.lock && HTML.count > Number(ST.limitValue))) {
                HTML.REELS_BD2.classList.add("JX06_REELS_BD2")
                HTML.REELS_BD2.querySelectorAll("video").forEach((a) => {
                    a.muted = true
                });
            }
            if (!window.location.href.includes("/reel")) {
                HTML.count = 0
                clearInterval(t)
            }
        }, 1000)

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 37 || event.keyCode === 39) {
                if (HTML.count > Number(ST.limitValue)) {
                    window.location.href = "https://www.instagram.com/";
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

let HTML = new html()
let FUN = new fun()
let ST = {}

window.addEventListener("load", () => {
    getInstagramSettings().then((settings) => {
        console.log('Instagram Settings:', settings);
        ST = settings
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




