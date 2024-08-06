let interval = null

function startBarryvox() {

    console.log("starting barryvox")

    let el = document.getElementById("barryvox-simulation-background")
    let filter = document.getElementById("barryvox-filter")
    el.style.transform = "translate(-100%,0)"
    el.style.display = "block"
    filter.style.display = "block"
    filter.style.opacity = 0
    setTimeout(() => {
        el.style.transform = "translate(0,0)"
        filter.style.opacity = 1
    }, 0.1)

    let embed = document.getElementById("barryvox-simulation-embed")
    embed.style.display = "none"

    console.log("barryvox start")
    fetch('/api/startbarryvox', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "duration": 60 })
    }).then(() => {
        console.log("waiting for barryvox website")
        fetch('/api/barryvoxReady', {
            method: 'POST',
        }).then(res => {
            console.log("barryvox ready")
            embed.src = window.location.href + "barryvox"
            embed.style.display = "block"
        }).catch(res => { console.log(res) })

        if (interval === null) {
            interval = setInterval(keepAlive, 10000)
        }
    });
}
function keepAlive() {
    fetch('/api/startbarryvox', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "duration": 20 })
    })
}

function terminateBarryvox() {

    let el = document.getElementById("barryvox-simulation-background")
    let embed = document.getElementById("barryvox-simulation-embed")
    let filter = document.getElementById("barryvox-filter")
    el.style.transform = "translate(-100%,0)"
    filter.style.opacity = 0
    el.ontransitionend = () => {
        el.style.display = "none";
        embed.style.display = "none"
        embed.src = ""
        embed.innerHTML = ""
        filter.style.display = "none"
        el.ontransitionend = () => { };
    }

    if (interval !== null) {
        clearInterval(interval)
        interval = null
    }
}
