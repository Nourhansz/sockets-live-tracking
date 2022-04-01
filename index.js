const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



const port = process.env.PORT || 3000;
// const publicDirectoryPath = path.join(__dirname,"../public");


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on("connection", (socket) => {
    console.log("New WebSocket connection");
  
    socket.on(
      "sendLiveLocation",
      ({ myPositionLatitude, myPositionLongitude, data }) => {
        console.log(
          `Latitude: ${myPositionLatitude}, Longitude: ${myPositionLongitude}, Datas: ${data}`
        );
  
        socket.broadcast.emit("location", {
          driverLatitude: myPositionLatitude,
          driverLongitude: myPositionLongitude,
          driverData: data,
        });
      }
    );
  
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
  
  server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });

// app.use(express.static(publicDirectoryPath));

// io.on('connection',(socket)=>{
//     console.log('new');
// })
// io.use('connection',()=>{
//     console.log('new connection');
// })

// app.listen(port,()=>{
//     console.log(`server is listening on port ${port}`);
// })
