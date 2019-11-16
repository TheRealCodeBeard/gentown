const seedrandom = require('seedrandom');
let mod = "Map Generator |";

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
const colours = [
    "rgb(0,0,0)",// 0 is Default colour
    "rgb(255,255,255)",
    "rgb(255,0,0)",
    "rgb(0,255,0)"
];

let random_map = function(size,rng){
    let random_image = new Array(size);
    for(var y=0;y<size;y++){
        if(!random_image[y])random_image[y]=new Array(size);//init if we haven't already
        for(var x=0;x<size;x++){
            var colour_index = Math.round(rng()*(colours.length-1));
            random_image[y][x] = colour_index;
        }
    }
    return random_image;
};

let generate_map = function(name_seed){
    console.log(mod,"Name seed:",name_seed);
    let size = 150;
    return {
        name:name_seed,
        map:random_map(size,seedrandom(name_seed)),
        colours:colours
    };
};

module.exports = generate_map