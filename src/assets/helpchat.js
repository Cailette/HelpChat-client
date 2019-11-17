function ready(callbackFunction){
    if(document.readyState != 'loading')
      callbackFunction()
    else
      document.addEventListener("DOMContentLoaded", callbackFunction)
}

ready(event => {
    initWidget();
});

function appendJs(url) {
    var script1 = document.createElement('script');
    script1.async = false;
    script1.setAttribute('src', url);
    document.body.appendChild(script1);
}

function initWidget() {
    var helpChatBaseLocation = getBaseLocation();

    const chatIframe = document.createElement('iframe');
    chatIframe.id = 'chat-iframe';
    chatIframe.src = helpChatBaseLocation + "/chat";
    document.body.appendChild(chatIframe);

    appendJs(helpChatBaseLocation + '/assets/iframe-style.js');

    window.addEventListener("message", chatListener, false);

    var oldHref = document.location.href;
    window.onload = function() {
        var bodyList = document.querySelector("body");
        var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href) {
                        oldHref = document.location.href;
                        locationChange();
                    }
                });
            });
        var config = {
            childList: true,
            subtree: true
        };
        observer.observe(bodyList, config);
    };
}

function chatListener(event) {
    var helpChatBaseLocation = getBaseLocation();
    if (event.origin !== helpChatBaseLocation) return;

    var iframeHelpChat = document.getElementById("chat-iframe");
    if(event.data === "show") {
        chatIframe.style.height = '400px';
    }

    if(event.data === "hide") {
        chatIframe.style.height = '50px';
    }

    if(event.data === "getLicence") {
        iframeHelpChat.contentWindow.postMessage({
            "res" : "licenceID", 
            "data" : window.__helpchat.license
        }, helpChatBaseLocation);
    }

    if(event.data === "getLocation"){
        locationChange()
    }

    if(event.data === "getVisitorInfo") {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const geoLocation = {
                    lat: lat, 
                    lng: lng
                }
                sentVisitorData(geoLocation)
            },
            error => {
                console.log(error.message)
                const geoLocation = {
                    lat: null, 
                    lng: null
                }
                sentVisitorData(geoLocation)
            },
        );

        function sentVisitorData(geoLocation){
            let visitorInfo = {
                geoLocation: geoLocation,
                browserSoftware: getBrowserSoftware(),
                operatingSoftware: getOperatingSystem(),
            }
            iframeHelpChat.contentWindow.postMessage({
                "res": "visitorInfo", 
                "visitor": visitorInfo, 
                "token": localStorage.getItem("token"), 
                "licence": window.__helpchat.license
            }, helpChatBaseLocation);
        }
    }
}

function locationChange(){
    var helpChatBaseLocation = getBaseLocation();
    var iframeHelpChat = document.getElementById("chat-iframe");
    iframeHelpChat.contentWindow.postMessage({
        "res" : "locationChange", 
        "data" : JSON.stringify(document.location.href)
    }, helpChatBaseLocation);
}

function getBaseLocation() { 
    var helpChatScriptLocation = document.getElementById("help-chat-script").src;
    return helpChatScriptLocation.replace("/assets/helpchat.js", "");
}

function getOperatingSystem() {
    let userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Windows NT 10.0")!= -1) return "Windows 10";
    if (userAgent.indexOf("Windows NT 6.2") != -1) return "Windows 8";
    if (userAgent.indexOf("Windows NT 6.1") != -1) return "Windows 7";
    if (userAgent.indexOf("Windows NT 6.0") != -1) return "Windows Vista";
    if (userAgent.indexOf("Windows NT 5.1") != -1) return "Windows XP";
    if (userAgent.indexOf("Windows NT 5.0") != -1) return "Windows 2000";
    if (userAgent.indexOf("Mac")            != -1) return "Mac/iOS";
    if (userAgent.indexOf("X11")            != -1) return "UNIX";
    if (userAgent.indexOf("Linux")          != -1) return "Linux";
    return "Brak danych";
}

function getBrowserSoftware() { 
    let userAgent = window.navigator.userAgent;
    if(userAgent.indexOf("Opera") != -1 || userAgent.indexOf('OPR') != -1 ) return "Opera";
    if(userAgent.indexOf("Chrome") != -1 ) return "Chrome";
    if(userAgent.indexOf("Safari") != -1) return "Safari";
    if(userAgent.indexOf("Firefox") != -1 )  return "Firefox";
    if((userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) return "IE";
    return "Brak danych";
}
