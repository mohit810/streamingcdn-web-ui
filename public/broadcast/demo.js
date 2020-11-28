let divSelectRoom = document.getElementById("selectRoom")
let inputstreamKey = document.getElementById("streamkey")
let signalingContainer = document.getElementById('signalingContainer')
let createSessionButton = document.getElementsByClassName('createSessionButton')
let videoText = document.getElementById("videoText")

let streamKey, encryptedSdp, remoteSessionDescription

/* eslint-env browser */
var log = msg => {
    document.getElementById('logs').innerHTML += msg + '<br>'
}

const hdConstraints = {
    audio: true,
    video: {
        width: { max: 1920, ideal: 1280 },
        height: { max: 1080, ideal: 720 }
    }
};

let displayVideo = video => {
    var el = document.createElement('video')
    el.srcObject = video
    el.autoplay = true
    el.muted = true
    el.width = 160
    el.height = 120

    document.getElementById('localVideos').appendChild(el)
    return video
}

function postRequest () {
    var data = JSON.stringify({
        "sdp": encryptedSdp,
        "streamKey": streamKey
    })
    console.log(data);
    const url = `http://${window.location.protocol}//${window.location.hostname}:8080/sdp`;
    (async () => {
        const rawResponse = await fetch(url, {
            method : "POST",
            //body: new FormData(document.getElementById("inputform")),
            // -- or --
            body : data,
            headers :{
                'Content-Type': 'application/json'
            }
        });
        const content = await rawResponse.json();
        remoteSessionDescription = content.sdp
        window.startSession()
    })();
}
window.createSession = isPublisher => {
    if (inputstreamKey.value === '') {
        alert("Please enter a something unique.")
    } else{
        streamKey = inputstreamKey.value
        let pc = new RTCPeerConnection({
            iceServers: [
                {'urls': 'stun:stun.services.mozilla.com'},
                {'urls': 'stun:stun.l.google.com.19302'}
            ]
        })
        pc.oniceconnectionstatechange = e => log(pc.iceConnectionState)
        pc.onicecandidate = event => {
            if (event.candidate === null) {
                encryptedSdp = btoa(JSON.stringify(pc.localDescription))
                postRequest();
            }
        }

        if (isPublisher) {
            navigator.mediaDevices.getUserMedia(hdConstraints)
                .then(stream => {
                    videoText.style = "visibility: visible"
                    stream.getTracks().forEach(function(track) {
                        pc.addTrack(track, stream);
                    });
                    displayVideo(stream);
                    pc.createOffer()
                        .then(d => {
                            pc.setLocalDescription(d)
                        }).catch(log)
                }).catch(log)
        }
        window.startSession = () => {
            let sd = remoteSessionDescription
            if (sd === '') {
                return alert('Session Description must not be empty')
            }
            try {
                pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(sd))))
            } catch (e) {
                alert(e)
            }
        }

        let btns = createSessionButton
        for (let i = 0; i < btns.length; i++) {
            btns[i].style = 'display: none'
        }
        divSelectRoom.style = "display: none"
    }
}