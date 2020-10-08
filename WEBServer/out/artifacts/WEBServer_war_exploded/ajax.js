function getXMLHttpRequest() {
    var xmlHttpReq = false;
    // to create XMLHttpRequest object in non-Microsoft browsers
    if (window.XMLHttpRequest) {
        xmlHttpReq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            // to create XMLHttpRequest object in later versions
            // of Internet Explorer
            xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (exp1) {
            try {
                // to create XMLHttpRequest object in older versions
                // of Internet Explorer
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (exp2) {
                xmlHttpReq = false;
            }
        }
    }
    return xmlHttpReq;
}
//----------------------------------------------------------------------------------------------------------------------
var state = false;
var timerId;

function checkState(){
    var xmlHttpRequest = getXMLHttpRequest();
    xmlHttpRequest.onreadystatechange = getConnectionStateHandler(xmlHttpRequest);
    xmlHttpRequest.open("POST", "mainServlet.do?action=check", true);
    xmlHttpRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    xmlHttpRequest.send(null);
}

function makeConnectRequest() {
    var xmlHttpRequest = getXMLHttpRequest();
    xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest);
    if(!state){
        xmlHttpRequest.open("POST", "mainServlet.do?action=connect", true);
        document.getElementById("Cbutton").innerHTML = "Disconnect";
        state = true;
        makeupdateauto();
    }
    else{
        xmlHttpRequest.open("POST", "mainServlet.do?action=disconnect", true);
        document.getElementById("Cbutton").innerHTML = "Connect";
        state = false;
        clearInterval(timerId);
    }
    xmlHttpRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    xmlHttpRequest.send(null);
}

function makecommandRequest(mode, id){
    var xmlHttpRequest = getXMLHttpRequest();
    xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest);
    var command;
    if(mode == "custom") command = document.getElementById(id).value;
    else if(mode === "mov") command = "M220 S" + document.getElementById(id).value;
    else if(mode === "ext") command = "M221 S" + document.getElementById(id).value;
    else command = id;
    //alert(command);
    xmlHttpRequest.open("POST", "mainServlet.do?action=command&coom="+command, true);
    xmlHttpRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    xmlHttpRequest.send(null);
}

function makeupdateRequest(){
    var xmlHttpRequest = getXMLHttpRequest();
    xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest);
    xmlHttpRequest.open("POST", "mainServlet.do?action=update", true);
    xmlHttpRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    xmlHttpRequest.send(null);
}

function makeupdateauto(){
    timerId = setInterval(makeupdateRequest, 50);
}

function setTempRequest(id){
    var command;

    if(id == "ext") command = "M109 S"+document.getElementById(id).value;
    else command = "M190 S"+document.getElementById(id).value;

    makecommandRequest('Temperature',command);
}

function moveAxis(step,axis,direction) {
    makecommandRequest('SetCoordinates','G91');
    var command;
    command = "G1 " + axis + direction + document.getElementById(step).value + " F1800";

    makecommandRequest('Moving',command);
}

function enableFan(power){
    var command = "M106 S" + power;
    makecommandRequest('Fan', command);
}
//----------------------------------------------------------------------------------------------------------------------
function getReadyStateHandler(xmlHttpRequest) {

    // an anonymous function returned
    // it listens to the XMLHttpRequest instance
    return function() {
        if (xmlHttpRequest.readyState == 4) {
            if (xmlHttpRequest.status == 200) {
                if(xmlHttpRequest.responseText!="null"){
                    if(xmlHttpRequest.responseText != "HEv - "){
                        document.getElementById("textzone").innerHTML += xmlHttpRequest.responseText + '\n';
                        document.getElementById("textzone").scrollTop = document.getElementById("textzone").scrollHeight;
                    }
                }
            } else {
                alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText + "\n Please connect or reconnect device");
            }
        }
    };
}

function getConnectionStateHandler(xmlHttpRequest){
    return function() {
        if (xmlHttpRequest.readyState == 4) {
            if (xmlHttpRequest.status == 200) {
                if(xmlHttpRequest.responseText!="null"){
                    if(xmlHttpRequest.responseText == "true"){
                        state = true;
                        makeupdateauto();
                        document.getElementById("Cbutton").innerHTML = "Disconnect";
                        document.getElementById("textzone").innerHTML += "Printer connected, waiting for command or request" + '\n';
                    }
                }
            }
        }
    };
}