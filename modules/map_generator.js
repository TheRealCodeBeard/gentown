const seedrandom = require('seedrandom');
let mod = "Map Generator |";
let rng = null;//Probably need a better way of doing this. Class instance?

const image_data = [
    [3,3,3,3,3,3,3],
    [0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0],
    [0,1,0,1,1,0,2],
    [0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0],
    [3,3,3,3,3,3,3]
];

//could change this for a sprite map?
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

//Need to fill in look up stuff here.
let map_colours =[
    "rgb(0,0,0)",          //00 black
    "rgb(245,222,179)",    //01 ground
    "rgb(225,202,159)",    //02 low ground
    "rgb(255,232,189)",    //03 higher ground
    "rgb(255,252,189)",    //04 hill
    "rgb(rgb(235,235,235)",//05 mountain
    "rgb(rgb(245,245,245)",//06 high mountain
];

//Creates a base map of a single colour specified by index
let initialise_map = function(size,index){
    let base_map = new Array(size);
    for(var y=0;y<size;y++){
        if(!base_map[y])base_map[y]=new Array(size);//init if we haven't already
        for(var x=0;x<size;x++){
            var colour_index = index;
            base_map[y][x] = colour_index;
        }
    }
    return base_map;
};

//We need clones so that the passes don't affect themselves
let make_clone = function(map){
    let clone = new Array(map.length);
    for(var y=0;y<map.length;y++){
        if(!clone[y])clone[y]=new Array(map[y].length);
        for(var x=0;x<map[y].length;x++){
            clone[y][x]=map[y][x];
        }
    }
    return clone;
};

//Generalisation to make each map operations easier to write
let apply = function(map,func){
    let clone = make_clone(map);
    for(var y =0;y<map.length;y++){
        for(var x=0;x<map[y].length;x++){
            map[y][x] = func(clone,x,y);
        }
    }
    return map;
};

//Returns true if x,y is adjecent to val (n,s,e,w)
let adjacent_to = function(map,x,y,val){
    if (
        (y>0             && map[y-1][x]===val)
      ||(y<map.length-1  && map[y+1][x]===val)
      ||(x>0             && map[y][x-1]===val)
      ||(x<map[y].length && map[y][x+1]===val)
        ) return true; 
    else return false;
};

//Returns true if x,y is fully surounded by val (n,s,e,w)
let contained_by = function(map,x,y,val){
    if (
        (y>0             && map[y-1][x]===val)
      &&(y<map.length-1  && map[y+1][x]===val)
      &&(x>0             && map[y][x-1]===val)
      &&(x<map[y].length && map[y][x+1]===val)
        ) return true; 
    else return false;
};

//Abstracting use of rng(). Makes more fluent map operations
let maybe = function(chance,a,b){
    if(rng()<chance) return a;
    else return b;
};

//Abstracting use of proximity functions. Makes more fluent map operations
let if_maybe = function(choice,chance,a,b){
    if(choice) return maybe(chance,a,b);
    else return b;
}

/*
    From here are map operations. They change the map array values and return the array.
    They call 'apply(map,(clone,x,y)=>SOMETHING) to do this. 
    SOMETHING must return a value for x,y.
*/

let seed_low_ground = function(map){
    return apply(map,(clone,x,y)=>maybe(0.01,02,clone[y][x]));
};

let extend_low_ground = function(map){
    return apply(map,(clone,x,y)=>if_maybe(adjacent_to(clone,x,y,02),0.2,02,clone[y][x]));
};

let fill_in_low_ground = function(map){
    return apply(map,(clone,x,y)=>if_maybe(contained_by(clone,x,y,02),1,02,clone[y][x]));
};

/* END OF map operations */

//Utility function to allow easy repeats of operations on the map
let repeat = function(times,map,operation){
    for(var i=0;i<times;i++){ map = operation(map); }
    return map;
};

//This kind of function organises a set of map operations in order
let generated_map = function(size){
    let map = initialise_map(size,1);
    map = seed_low_ground(map);
    map = repeat(10,map,extend_low_ground);
    map = fill_in_low_ground(map);
    return map;
};

//Export the result of the above.
module.exports =  function(name_seed){
    console.log(mod,"Name seed:",name_seed);
    let size = 50;
    rng = seedrandom(name_seed);//Temporal coupling
    return {
        name:name_seed,
        map:generated_map(size),
        colours:map_colours,
    };
};