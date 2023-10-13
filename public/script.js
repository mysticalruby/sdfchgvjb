const socket = io("/");

var peer = new Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443",
});
//Web Real Time Chat is how to avoid the glitches in lag

const user = prompt("Enter your name");
const myVideo=document.createElement("video")
myVideo.muted=true
//when it is closed it creates the element(displays our video)
let myStream;
navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true,
}).then((stream)=>{
    myStream=stream
})

function addVideoStream (video,stream){
video.srcObject=stream
video.addEventListener("loadedmetadata",()=>{
    video.play()
    $("#video_grid").append(video)
})
}
// play continually play
//Event listen continuaslly check
//double parathesis means that parameter
//conatin audio and video stream
//passing an object through it
$(function () {
    $("#show_chat").click(function () {
        $(".left-window").css("display", "none")
        $(".right-window").css("display", "block")
        $(".header_back").css("display", "block")
    })
    $(".header_back").click(function () {
        $(".left-window").css("display", "block")
        $(".right-window").css("display", "none")
        $(".header_back").css("display", "none")
    })

    $("#send").click(function () {
        if ($("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })

    $("#chat_message").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })

})

peer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id, user);
});

socket.on("createMessage", (message, userName) => {
    $(".messages").append(`
        <div class="message">
            <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName
        }</span> </b>
            <span>${message}</span>
        </div>
    `)
});