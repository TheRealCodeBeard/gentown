/* 
    This app is purely for testing stuff.
    Each piece will go out to a Function to be triggered in Flow
*/

const generate_name = require("./modules/name_generator.js");
const generate_map = require("./modules/map_generator.js");
const generate_description = require("./modules/description_generator.js");
const array_to_image = require("./modules/array_to_image.js");
const fs = require('fs');
let mod = "Main |";
console.log(mod,"Generating a names...");
console.log(mod,generate_name());

console.log(mod,"Generating a map...");
let generated_name = generate_name();
//generated_name = "ABCDEFGHIJKLM-NOPQRSTUVWX YZ";//for testing writing
let {name,map,colours} = generate_map(generated_name);
let generated_description = generate_description(generated_name);

console.log(mod,"Creating the image...");
const out = fs.createWriteStream("./images/map.png");//Will need to be converted to blob

array_to_image.generate_image({w:400,h:400},colours,name,map,out);
out.on('finish', () =>  {
    console.log(mod,'Map image created!');
    console.log(mod,"Description:",generated_description);
    console.log("\n");
});

let sprite_map = [
    [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,01,01,01,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,01,02,01,01,01,00,00,00,00,00,00],
    [00,00,00,00,00,01,16,01,18,01,00,00,00,00,00,00],
    [00,00,00,00,00,01,17,01,02,01,00,00,00,00,00,00],
    [00,00,00,00,00,01,01,01,01,01,00,00,00,00,00,00],
    [00,00,00,00,05,04,11,04,04,07,00,00,00,00,00,00],
    [00,01,01,01,06,01,01,01,01,06,00,00,00,00,00,00],
    [00,01,02,01,10,01,12,13,01,06,00,00,00,00,00,00],
    [00,01,01,01,06,01,14,15,01,06,00,00,00,00,00,00],
    [00,00,00,00,06,01,01,01,01,06,00,00,00,00,00,00],
    [00,00,00,00,08,04,04,04,04,09,00,00,00,00,00,00],
    [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00]
];

let sprites = [
    "./sprites/black.png",//00
    "./sprites/grass.png",//01
    "./sprites/house.png",//02
    "./sprites/castle.png",//03
    "./sprites/river1.png",//04
    "./sprites/river2.png",//05
    "./sprites/river3.png",//06
    "./sprites/river4.png",//07
    "./sprites/river5.png",//08
    "./sprites/river6.png",//09
    "./sprites/bridge1.png",//10
    "./sprites/bridge2.png",//11
    "./sprites/castleA.png",//12
    "./sprites/castleB.png",//13
    "./sprites/castleC.png",//14
    "./sprites/castleD.png",//15
    "./sprites/road1.png",//16
    "./sprites/road2.png",//17
    "./sprites/field.png",//18
];

const sprite_out = fs.createWriteStream("./images/sprite_map.png");
array_to_image.generate_image_from_sprites({w:240,h:240},sprites,"Test",sprite_map,sprite_out);
sprite_out.on('finish', () =>  {
    console.log(mod,'Sprite map created!');
    console.log("\n");
});