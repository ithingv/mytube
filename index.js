const express = require('express');// node module을 가져오는것
const app = express();
const PORT = 4000;

function handleListening(){
    console.log(`Listening port : ${PORT}`);
}
app.listen(PORT, handleListening);
/*
const handleListening = () =>{   
app.listen(PORT);
}
handleListening();
*/