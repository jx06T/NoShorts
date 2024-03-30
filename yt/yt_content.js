console.log("yt")

class html {
    constructor() {
    }
    init() {
        this.URL = window.location.href;
        // console.log(this.URL)

        if (this.URL.includes("/shorts") && !this.URL.includes("@")) {
            this.init2()
        }
        if (this.URL.includes("/watch")) {
            this.init3()
        }
        FUN.WaitST('[title="Shorts"][id = "endpoint"]', (a) => {
            this.SHORTS_B = a
            this.getAllSD()
            FUN.RemoveST(this.SHORTS_B)
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
        console.log(targetSDs)
        FUN.HideSHORTS_D()
    }
    init2() {
        let Mpage = document.getElementById("page-manager")
        this.SHORTS_BD = Mpage.querySelector('[role="main"]')
        this.SHORTS_BDt = this.SHORTS_BD.querySelector('[id="shorts-inner-container"]')
        console.log(this.SHORTS_BD)
        FUN.BlurSHORTS()

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
                clearInterval(t)
            }
            HTML.SHORTS_BDt.querySelectorAll("video").forEach((a) => {
                a.muted = true
            });
        }, 1000)

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 38 || event.keyCode === 40) {
                window.location.href = "https://www.youtube.com/";
                // window.history.back()
            }
        });
    }
    WaitST(html, callback, time = 500) {
        this.waits[html] = setInterval(() => {
            let t = document.querySelector(html)
            if (t) {
                console.log(t)
                callback(t)
                clearInterval([this.waits[html]])
            }
        }, time);
    }
}


let HTML = new html()
let FUN = new fun()

window.addEventListener("load", () => {
    HTML.init()
})
setInterval(() => {
    if (window.location.href !== HTML.URL) {
        HTML.init()
    }
}, 3000);
