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

let adjacent_to = function(map,x,y,val){
    if (
        (y>0             && map[y-1][x]===val)
      ||(y<map.length-1  && map[y+1][x]===val)
      ||(x>0             && map[y][x-1]===val)
      ||(x<map[y].length && map[y][x+1]===val)
        ) return true; 
    else return false;
};

let contained_by = function(map,x,y,val){
    if (
        (y>0             && map[y-1][x]===val)
      &&(y<map.length-1  && map[y+1][x]===val)
      &&(x>0             && map[y][x-1]===val)
      &&(x<map[y].length && map[y][x+1]===val)
        ) return true; 
    else return false;
};

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

let make_clone = function(map){
    let clone = new Array(map.length);
    for(var y=0;y<map.length;y++){
        if(!clone[y])clone[y]=new Array(map[y].length);
        for(var x=0;x<map[y].length;x++){
            clone[y][x]=map[y][x];
        }
    }
    return clone;
}

let apply = function(map,func){
    let clone = make_clone(map);
    for(var y =0;y<map.length;y++){
        for(var x=0;x<map[y].length;x++){
            map[y][x] = func(clone,x,y);
        }
    }
    return map;
};

let seed_low_ground = function(rng,map){
    return apply(map,function(clone,x,y){
        if(rng()>0.99) return 02;
        else return clone[y][x];
    });
};

let extend_low_ground = function(rng,map){
    return apply(map,function(clone,x,y){
        if(adjacent_to(clone,x,y,02) && rng()>0.8) return 02;
        else return clone[y][x];
    });
};

let fill_in_low_ground = function(rng,map){
    return apply(map,function(clone,x,y){
        if(contained_by(clone,x,y,02)) return 02;
        else return clone[y][x];
    });
};

let repeat = function(times,rng,map,operation){
    for(var i=0;i<times;i++){map = operation(rng,map);}
    return map;
};

let generated_map = function(size,rng){
    let map = initialise_map(size,1);
    map = seed_low_ground(rng,map);
    map = repeat(10,rng,map,extend_low_ground);
    map = repeat(10,rng,map,fill_in_low_ground);
    return map;
};

let generate_map = function(name_seed){
    console.log(mod,"Name seed:",name_seed);
    let size = 50;
    return {
        name:name_seed,
        map:generated_map(size,seedrandom(name_seed)),
        colours:map_colours,
    };
};

module.exports = generate_map