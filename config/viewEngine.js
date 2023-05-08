const express = require('express');
const path = require('path');



const configViewEngine = (app) => {
    //config template engine
    
app.set('views', path.join('./','views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join('./', 'public')));


}

module.exports = configViewEngine;
