console.log(navigator.userAgent);
const body = document.querySelector('body');

if(navigator.userAgent.indexOf('Firefox') == -1 && navigator.userAgent.indexOf('Edge') == -1) {
    body.innerHTML = `<h1> Unsupported Browser! </h1>`
}

if(window.innerWidth < 780 || window.innerHeight < 780) {
    body.innerHTML = `<h1> Unsupported Browser Dimensions! </h1>`
}