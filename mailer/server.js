const express = require('express');
const appRoute =require('./routes/router.js')

 const app =express();
 const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use('/api',appRoute);

app.listen(PORT ,()=>{
    console.log(`server is running on http://localhost:${PORT} .....!`)
})
