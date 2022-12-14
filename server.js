const express=require("express")
const dotEnv=require("dotenv").config();
const cors=require("cors");
const socket=require("socket.io");
const bodyParser=require("body-parser");

const swaggerUi=require("swagger-ui-express");
const yaml=require("yamljs");
const swaggerDoc=yaml.load("./swagger.yaml");
const  dbConn=require("./database/connection");

dbConn();
//some changes

const PORT=process.env.PORT;

const app=express();
app.use(cors());
//app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.json());



const server = app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
});

// API Routes
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/call",require("./routes/callRoutes"));
app.use("/api/v1/wallet",require("./routes/walletRoutes"));
app.use("/api/v1/category",require("./routes/categoryRoutes"));

// API Documentation
if(process.env.NODE_ENV!="production") {
    app.use("/api/v1/docs",swaggerUi.serve,swaggerUi.setup(swaggerDoc));
}


const socketServer=socket(server);


socketServer.on("connection",function(socket){

    console.log("New user connected...",socket.id);

            socket.on("sendingMessage",function(data){

                socketServer.emit("broadcastMessage",data);
            });


    
            socket.on("join",function(roomname){

                var rooms=socketServer.sockets.adapter.rooms;
                var room=rooms.get(roomname);

                console.log(rooms);
                console.log(room);

                if (room==undefined){
                    socket.join(roomname);
                    socket.emit("created");
                    console.log("Room created - "+ roomname);
                }
                else if (room.size==1)
                {``
                    socket.join(roomname);
                    socket.emit("joined");
                    console.log("Room joined - "+roomname);
                }
                else{
                    socket.emit("full",roomname);
                    console.log("Oops... room is full - "+roomname);
                }

            });

            socket.on("ready",function(roomname){
                console.log("Room ready -  "+roomname);

                socket.broadcast.to(roomname).emit("ready");
            });

            socket.on("candidate",function(candidate,roomname){
                console.log("Candidate sent -  "+roomname);

                socket.broadcast.to(roomname).emit("candidate",candidate);
            });

            socket.on("offer",function(offer,roomname){
                console.log("Offer sent -  "+roomname);
                console.log(offer);

                socket.broadcast.to(roomname).emit("offer",offer);
            });

            socket.on("answer",function(answer,roomname){
                console.log("Answer sent -  "+roomname);

                socket.broadcast.to(roomname).emit("answer",answer);
            });

            
            socket.on("leave",function(roomname){
                socket.leave(roomname);
                socket.broadcast.to(roomname).emit("leave");
            });


    });


