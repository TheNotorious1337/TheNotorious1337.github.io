const body = document.querySelector('body');
var ua = navigator.userAgent.toLowerCase();
console.log(ua);

if(ua.indexOf('firefox') == -1 && ua.indexOf('edge') == -1 && ua.indexOf('safari') == -1) {
    body.innerHTML = `<h1> Unsupported Browser! </h1>
    <h1>For Now Please Use Either Microsoft Edg, Mozilla Firefox, Safari or Opera</h1>`
}

if (ua.indexOf('chrome') > -1 && ua.indexOf('opr') < 0) {
    body.innerHTML = `<h1> Unsupported Browser! </h1>
    <h1>For Now Please Use Either Microsoft Edge, Mozilla Firefox, Safari or Opera</h1>`
} 


// if(window.innerWidth < 780 || window.innerHeight < 780) {
//     body.innerHTML = `<h1> Unsupported Browser Dimensions! </h1>`
// }