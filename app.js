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
for(let i=0;i<2;i++){
    console.log(name_generatore());
}

const image_data = [
    [3,3,3,3,3,3,3],
    [0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0],
    [0,1,0,1,1,0,2],
    [0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0],
    [3,3,3,3,3,3,3]
];

//could change this for a sprite map.
const colour_map = [
    "rgb(0,0,0)",// 0 is Default colour
    "rgb(255,255,255)",
    "rgb(255,0,0)",
    "rgb(0,255,0)"
];

let size = 100;
let random_image = new Array(size);
for(var y=0;y<size;y++){
    if(!random_image[y])random_image[y]=new Array(size);//init if we haven't already
    for(var x=0;x<size;x++){
        var colour_index = Math.round(Math.random()*(colour_map.length-1));
        random_image[y][x] = colour_index;
    }
}

const out = fs.createWriteStream("./images/test.png")

array_to_image({w:300,h:300},colour_map,random_image,out);
out.on('finish', () =>  console.log('The PNG file was created.'));