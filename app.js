var seedrandom = require('seedrandom');
seedrandom(Date.now().toLocaleString(), { global: true });

let name_generatore = require("./modules/genname.js");
console.log("Generating some names...");
for(let i=0;i<10;i++){
    console.log(name_generatore());
}