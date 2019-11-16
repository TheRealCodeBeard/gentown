var seedrandom = require('seedrandom');
seedrandom(Date.now().toLocaleString(), { global: true });

let name_generatore = require("./modules/genname.js");

console.log(name_generatore());