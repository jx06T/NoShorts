console.log("yt")

class html {
    constructor() {
    }
    init(InitLoop) {
        this.URL = window.location.href;
        // console.log(this.URL)
        if (this.URL.includes("/shorts")) {
            this.init2()
        }
        if (this.URL.includes("/watch")) {
            clearInterval(InitLoop)
            setTimeout(() => {
                this.init3()
            }, 1000);

        }
        this.SHORTS_B = document.querySelector('[title="Shorts"][id = "endpoint"]')
        if (this.SHORTS_B) {
            clearInterval(InitLoop)
            this.getAllSD()
            FUN.HideSHORTS_B()
        }
    }
    init2() {
        let Mpage = document.getElementById("page-manager")
        this.SHORTS_BD = Mpage.querySelector('[role="main"]')
        this.SHORTS_BDt = this.SHORTS_BD.querySelector('[id="shorts-inner-container"]')
        console.log(this.SHORTS_BD)
        FUN.BlurSHORTS()

    }
    init3() {
        this.SHORTS_D2 = document.querySelector('ytd-reel-shelf-renderer')
        console.log(this.SHORTS_D2)
        FUN.HideSHORTS_D2()
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
        FUN.HideSHORTS_D()
    }
}

class fun {
    constructor() {
    }
    HideSHORTS_B() {
        HTML.SHORTS_B.remove()
    }
    HideSHORTS_D2() {
        HTML.SHORTS_D2.remove()
    }
    HideSHORTS_D() {
        HTML.SHORTS_Ds.forEach((SD) => {
            SD.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
        })
    }
    BlurSHORTS() {
        HTML.SHORTS_BD.classList.add("JX06_SHORTS_BD1")
        HTML.SHORTS_BDt.classList.add("JX06_SHORTS_BD2")
        let t = setInterval(() => {
            if (!window.location.href.includes("/shorts")) {
                clearInterval(t)
            }
            HTML.SHORTS_BDt.querySelectorAll("video").forEach((a) => {
                console.log("!!")
                a.muted = true
            });
        }, 1000)
    }
}
let HTML = new html()
let FUN = new fun()

window.addEventListener("load", () => {
    let InitLoop = setInterval(() => {
        HTML.init(InitLoop)
    }, 1000);
})
