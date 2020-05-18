const body = document.querySelector('body');
var ua = navigator.userAgent.toLowerCase();

if(ua.indexOf('firefox') == -1 && ua.indexOf('edge') == -1 && ua.indexOf('safari') == -1) {
    body.innerHTML = `<h1> Unsupported Browser! </h1>
    <h1>For Now Please Use Either Microsoft Edge or Mozilla Firefox or Safari </h1>`
}

if (ua.indexOf('chrome') > -1) {
    body.innerHTML = `<h1> Unsupported Browser! </h1>
    <h1>For Now Please Use Either Microsoft Edge or Mozilla Firefox or Safari </h1>`
} 

// if(window.innerWidth < 780 || window.innerHeight < 780) {
//     body.innerHTML = `<h1> Unsupported Browser Dimensions! </h1>`
// }