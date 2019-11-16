/* 
    This app is purely for testing stuff.
    Each piece will go out to a Function to be triggered in Flow
*/

const name_generatore = require("./modules/genname.js");
const generate_map = require("./modules/map_generator.js");
const array_to_image = require("./modules/array_to_image.js");
const fs = require('fs');

console.log("Generating a names...");
console.log(name_generatore());

console.log("Generating a map...");
let {name,map,colours} = generate_map(name_generatore());

console.log("Creating the image...");
const out = fs.createWriteStream("./images/test.png");//Will need to be converted to blob
array_to_image({w:300,h:300},colours,map,out);
out.on('finish', () =>  console.log('Map image created'));