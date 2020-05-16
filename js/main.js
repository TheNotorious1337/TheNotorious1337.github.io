// Variables \\
const hack_btn = document.getElementById("hack-btn");
const gen_btn = document.getElementById("generate-btn");
const url = document.getElementById("url");
const aCode_input =  document.getElementById("aCode");
const TID_input = document.getElementById("TID");
const q1_input = document.getElementById("Q1");
const q2_input = document.getElementById("Q2");
const sCode_box = document.getElementById("sCode");
const footer = document.getElementById("footer");
var isWorksheet = false; // Used to determine whether more than 2 questions are expected
var counter = 0;


if(!hack_btn || hack_btn == null || !gen_btn || gen_btn == null) 
    throw new Error("Couldn't find Buttons");


// Events \\
hack_btn.addEventListener("click", function(e) {
    startHack(false);
});

gen_btn.addEventListener("click", function(e) {
    startHack(true);
});

footer.addEventListener("click", function(e) {
    if(counter == 1)
        alert("You thought this was some lame Yedi trick?");
    else if(counter == 2)
        alert("This is your final warning!");
    else if(counter > 2)
        sendToWeb("https://www.google.com/");
    else    
        alert("I wouldn't do that if I were you!");

    counter++;
});

aCode_input.addEventListener("keyup", function(e) {
    validate(this, 3);
});

TID_input.addEventListener("keyup", function(e) {
    validate(this, 2);
});

q1_input.addEventListener("keyup", function(e) {
    validate(this);
});

q2_input.addEventListener("keyup", function(e) {
    validate(this);
});


// Functions \\
function isValidNumber(number) {
    return !isNaN(number);
}

function generateSecurityCode(authCode, taskID, q1score, q2score) {
    let sCode = authCode * taskID;
    sCode = sCode + (Number(q1score) * 100 + Number(q2score));
    sCode = sCode * 10000;
    sCode = sCode + taskID * taskID;
    return sCode;
}

function generateURL(sCode, taskID, Q1, Q2) {
    return `http://www.mymaths.co.uk/studentRecords/saveDataOH.asp?sCode=${sCode}&q1score=${Q1}&q2score=${Q2}&taskID=${taskID}`;
} 

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

function startHack(generate) {
    var taskID = document.getElementById("TID").value;
    var authcode = document.getElementById("aCode").value;
    var q1 = document.getElementById("Q1").value;
    var q2 = document.getElementById("Q2").value;
    var sCode;

    sCode_box.value = '';
    url.textContent = '';

    var valid = validateForm(authcode, taskID, q1, q2);

    if(isValidNumber(authcode) && isValidNumber(taskID) && isValidNumber(q1) && isValidNumber(q2))
        sCode = generateSecurityCode(authcode, taskID, q1, q2);
    else {
        //throw new Error("Invalid Input Was Detected!");
    }
        

    if(sCode && sCode != null && valid) {
        sCode_box.value = sCode;
        var urli = generateURL(sCode, taskID, q1, q2);
        url.textContent = urli; 
        if(!generate)
            sendToWeb(urli);
    }
}

function validateRequest(url) {
    var req = sendFakeRequest(url);
    if(req){
        console.log(req);
        alert("Your Score Was Updated Successfully");
        return true;
    }
    else {
        alert("The Request Was Denied And FBI Is Just Outside Your Doors!");
        return false;
    }
}

function sendFakeRequest(url) {
    var xhttp;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
      } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
     }

    xhttp.open('POST', url, false);
    xhttp.setRequestHeader('Host', 'app.mymaths.co.uk');
    xhttp.setRequestHeader('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0');
    xhttp.setRequestHeader('Accept', ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    xhttp.setRequestHeader('Connection', 'keep-alive');
    xhttp.setRequestHeader('Referer', url);
    xhttp.setRequestHeader('Origin','https://static.mymaths.co.uk');
    xhttp.send();
    if(xhttp.readyState == 4 && xhttp.status == 200)
        return xhttp.responseText;
    else if(xhttp.readyState > 2 && xhttp.status == 401)
        throw new Error("This browser is not logged into MyMaths!");
    else if(xhttp.readyState > 2 && xhttp.status == 405)
        throw new Error("You have provided faulty data!");
    else {
        console.log(xhttp.readyState, xhttp.responseText);
        throw new Error(xhttp.status);
    }
}

function sendToWeb(url) {
    openInNewTab(url);
}

function validateForm(authcode, taskID, q1, q2) {
    var valid = true;

    if(authcode.trim().length < 4 || !isValidNumber(authcode)) {
        aCode_input.classList.remove("valid");
        aCode_input.classList.add("invalid");
        valid = false;
    }
    else
        aCode_input.classList.remove("invalid");
    
    if(taskID.trim().length < 3 || !isValidNumber(taskID)) {
        TID_input.classList.remove("valid");
        TID_input.classList.add("invalid");
        valid = false;
    }
    else
        TID_input.classList.remove("invalid");

    if(q1.trim().length < 1 || !isValidNumber(q1)) {
        q1_input.classList.remove("valid");
        q1_input.classList.add("invalid");
        valid = false;
    }
    else
        q1_input.classList.remove("invalid");

    if(q2.trim().length < 1 || !isValidNumber(q2)) {
        q2_input.classList.remove("valid");
        q2_input.classList.add("invalid");
        valid = false;
    }
    else
        q2_input.classList.remove("invalid");

    return valid;
}

function validate(sender, measure = 0) {
    if(sender.value.trim().length > measure && isValidNumber(sender.value.trim())) {
        sender.classList.remove("invalid");
        sender.classList.add("valid");
    }
    else {
        sender.classList.add("invalid");
        sender.classList.remove("valid");
    }
}

