/* 
    This app is purely for testing stuff.
    Each piece will go out to a Function to be triggered in Flow
*/

const generate_name = require("./modules/name_generator.js");
const generate_map = require("./modules/map_generator.js");
const array_to_image = require("./modules/array_to_image.js");
const fs = require('fs');
let mod = "Main |";
console.log(mod,"Generating a names...");
console.log(mod,generate_name());

console.log(mod,"Generating a map...");
let {name,map,colours} = generate_map(generate_name());

console.log(mod,"Creating the image...");
const out = fs.createWriteStream("./images/map.png");//Will need to be converted to blob
array_to_image({w:400,h:400},colours,name,map,out);
out.on('finish', () =>  console.log(mod,'Map image created!\n'));