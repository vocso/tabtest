const socket=io.connect("http://localhost:5052");


var button=document.getElementById("send");
var username=document.getElementById("username");
var message=document.getElementById("message");
var output=document.getElementById("output");


button.addEventListener("click",function(){

    socket.emit("sendingMessage",{
        message:message.value,
        username:username.value
    });
    console.log(`Sending Message ${message.value}`);

    
});

socket.on("broadcastMessage",function(data){

    console.log("Broadcasting Message",data.value);

    output.innerHTML+="<p><strong>"+data.username+"</strong>"+data.message+"</strong></p>";
});
