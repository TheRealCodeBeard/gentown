/* 
    This app is purely for testing stuff.
    Each piece will go out to a Function to be triggered in Flow
*/

const seedrandom = require('seedrandom');
const name_generatore = require("./modules/genname.js");
const array_to_image = require("./modules/array_to_image.js");
const fs = require('fs');

seedrandom(Date.now().toLocaleString(), { global: true });

console.log("Generating some names...");
for(let i=0;i<10;i++){
    console.log(name_generatore());
}

var image_data = [
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,0,1,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
];

const out = fs.createWriteStream("./images/test.png")

array_to_image(image_data,out);
out.on('finish', () =>  console.log('The PNG file was created.'));