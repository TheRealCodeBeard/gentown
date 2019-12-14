const seedrandom = require('seedrandom');
const astar = require('./astar.js');
const mod = "Sprite Map | ";
let sprite_map = [
    [08,07,00,00,00,01,01,01,01,01,00,00,00,00,00,00],
    [00,06,00,00,00,01,02,01,01,01,00,00,00,00,00,00],
    [00,06,00,00,00,01,16,01,01,01,00,00,00,00,00,00],
    [00,06,00,00,00,01,17,01,19,01,00,00,00,00,00,00],
    [00,08,04,04,04,04,11,07,02,01,00,00,00,00,00,00],
    [00,00,00,00,00,01,18,06,01,01,00,00,00,00,00,00],
    [00,00,00,00,05,04,11,20,04,07,00,00,00,00,00,00],
    [00,01,01,01,06,01,01,01,01,06,00,00,00,00,00,00],
    [00,01,02,01,10,01,12,13,01,21,04,04,04,04,07,00],
    [00,01,01,01,06,01,14,15,01,06,00,00,00,00,06,00],
    [00,00,00,00,06,01,01,01,01,06,00,00,00,00,06,00],
    [00,00,00,00,08,04,04,23,04,09,00,00,00,00,06,00],
    [00,00,00,00,00,00,00,06,00,00,00,00,00,00,06,00],
    [00,00,00,00,00,00,00,06,00,00,00,00,00,00,06,00],
    [00,00,00,00,00,00,00,06,00,00,00,00,00,00,08,04],
    [00,00,00,00,00,00,00,06,00,00,00,00,00,00,00,00]
];

let sprites = [
    "./sprites/black.png",//00
    "./sprites/grass.png",//01
    "./sprites/house1.png",//02
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
    "./sprites/road3.png",//18
    "./sprites/field.png",//19
    "./sprites/river7.png",//20
    "./sprites/river8.png",//21
    "./sprites/river9.png",//22
    "./sprites/river10.png",//23
    "./sprites/river0.png",//24
    "./sprites/tree.png",//25
    "./sprites/grass2.png",//26
    "./sprites/grass3.png",//27
    "./sprites/grass4.png",//28
    "./sprites/grass5.png",//29
    "./sprites/tree2.png",//30
];

const GRASS = 01;
const ROCKS = 26;
const FLOWERS= 27;
const FLOWERS2= 28;
const SCRUB= 29;
const TREE = 25;
const TREE2 = 30;
const HOUSE = 02;
const RIVER_LR = 04;
const RIVER_UD = 06;
const RIVER_UR = 07;
const RIVER_UL = 05;
const RIVER_BL = 08;
const RIVER_BR = 09;
const RIVER_ALL = 24;
const BRIDGE_UD = 10;
const BRIDGE_LR = 11;
const CASTLE_AL = 12;
const CASTLE_AR = 13;
const CASTLE_BL = 14;
const CASTLE_BR = 15;

let random_map = function(size){
    let random_image = new Array(size);
    for(var y=0;y<size;y++){
        if(!random_image[y])random_image[y]=new Array(size);//init if we haven't already
        for(var x=0;x<size;x++){
            var sprite_index = 1 + Math.round(rng()*(sprites.length-2));
            random_image[y][x] = sprite_index;
        }
    }
    return random_image;
};

let initialise = function(size){
    let map = new Array(size);
    for(var y=0;y<size;y++){
        if(!map[y])map[y]=new Array(size);//init if we haven't already
        for(var x=0;x<size;x++){
            var sprite_index = 1;
            map[y][x] = sprite_index;
        }
    }
    return map;
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

let get_river_mask = function(map){
    let mask = new Array(map.length);
    for(var y=0;y<map.length;y++){
        if(!mask[y])mask[y]=new Array(map[y].length);
        for(var x=0;x<map[y].length;x++)
        {
            mask[y][x] = map[y][x]==GRASS||RIVER_ALL? 1 : 0;
        }
    }
    return mask;
};

let first_river = function(map){
    let top = rng()>0.5;
    let rx1 = top?1 + Math.floor(rng()*map[0].length-2):0;
    let ry1 = top?0 : 1 + Math.floor(rng()*map.length-2);
    map[ry1][rx1]=RIVER_ALL;
    let bottom = rng()>0.5;
    let rx2 = bottom?1 + Math.floor(rng()*map[0].length-2):map[map.length-1].length-1;
    let ry2 = bottom?map.length-1:1 + Math.floor(rng()*map.length-2);
    map[ry2][rx2]=RIVER_ALL;
    var graph = new astar.Graph(get_river_mask(map),{ diagonal: false });
    var start = graph.grid[ry1][rx1];
    var end = graph.grid[ry2][rx2];
    console.log(mod,start.toString());
    console.log(mod,end.toString());
    var result = astar.astar.search(graph, start, end);
    result.forEach((p)=>{
        if(map[p.x][p.y]===GRASS){
            map[p.x][p.y]=RIVER_ALL;
        }
    });
    return map;
};

let above = function(map,x,y,el){
    if(y===0||map[y-1][x]===el) return true;
    else return false;
};

let below = function(map,x,y,el){
    if(y===map.length-1||map[y+1][x]===el) return true;
    else return false;
};

let left = function(map,x,y,el){
    if(x===0||map[y][x-1]===el) return true;
    else return false;
};

let right = function(map,x,y,el){
    if(x===map[y].length-1||map[y][x+1]===el) return true;
    else return false;
};

let above_and_below = function(map,x,y,el){
    return above(map,x,y,el) && below(map,x,y,el);
};

let left_and_right = function(map,x,y,el){
    return left(map,x,y,el) && right(map,x,y,el);
};

let above_and_right = function(map,x,y,el){
    return above(map,x,y,el) && right(map,x,y,el);
};

let below_and_left = function(map,x,y,el){
    return below(map,x,y,el) && left(map,x,y,el);
};

let above_and_left = function(map,x,y,el){
    return above(map,x,y,el) && left(map,x,y,el);
};

let below_and_right = function(map,x,y,el){
    return below(map,x,y,el) && right(map,x,y,el);
};

let refine_river = function(map){
    let clone = make_clone(map);
    for(var y=0;y<clone.length;y++){
        for(var x=0;x<clone[y].length;x++){
            if(clone[y][x]===RIVER_ALL){
                if(above_and_below(map,x,y,GRASS)){
                    map[y][x] = RIVER_LR;
                } else if (left_and_right(map,x,y,GRASS)){
                    map[y][x] = RIVER_UD;
                } else if (above_and_right(map,x,y,GRASS)){
                    map[y][x] = RIVER_UR;
                } else if (below_and_left(map,x,y,GRASS)){
                    map[y][x] = RIVER_BL;
                } else if (above_and_left(map,x,y,GRASS)){
                    map[y][x] = RIVER_UL;
                } else if (below_and_right(map,x,y,GRASS)){
                    map[y][x] = RIVER_BR;
                }
            }
        }
    }
    return map;
};

let add_bridge = function(map){
    let clone = make_clone(map);
    let bridge_added =false;
    for(var y=0;y<clone.length;y++){
        for(var x=0;x<clone[y].length;x++){
            if(clone[y][x]===RIVER_LR){
                if(rng()>0.9){
                    map[y][x] = BRIDGE_LR;
                    bridge_added = true;
                }
            } else if (clone[y][x]===RIVER_UD){
                if(rng()>0.9){
                    map[y][x] = BRIDGE_UD;
                    bridge_added = true;
                }
            }
            if(bridge_added) return map;
        }
    }
    return map;
};

let get_a_tree = function(){
    let v = rng();
    if(v>0.5) return TREE;
    else return TREE2;
};

let trees = function(map){
    let clone = make_clone(map);
    for(var y=0;y<clone.length;y++){
        for(var x=0;x<clone[y].length;x++){
            if(clone[y][x]===GRASS){
                map[y][x]=rng()>0.1?GRASS:get_a_tree();
            }
        }
    }
    return map;
};

let get_a_grass = function(){
    let v = rng();
    if(v>0.70) return ROCKS;
    else if (v>0.5) return FLOWERS2;
    else if (v>0.25) return SCRUB;
    else return FLOWERS;
};

let refine_grass = function(map){
    let clone = make_clone(map);
    for(var y=0;y<clone.length;y++){
        for(var x=0;x<clone[y].length;x++){
            if(clone[y][x]===GRASS){
                map[y][x]=rng()>0.03?GRASS:get_a_grass();
            }
        }
    }
    return map;
};

let houses = function(map){
    let clone = make_clone(map);
    for(var y=0;y<clone.length;y++){
        for(var x=0;x<clone[y].length;x++){
            if(clone[y][x]===GRASS){
                map[y][x]=rng()>0.01?GRASS:HOUSE;
            }
        }
    }
    return map;
};

let is_inner_map = function(map,x,y){
    let bY = map.length*0.1;
    let bX = map[0].length*0.1;
    return y>bY 
        && x >bX
        && y<map.length - bY
        && x<map[0].length -bX;
};  

let seed_castle = function(map){
    let castle_added =false;
    let clone = make_clone(map);
    for(var y=0;y<clone.length;y++){
        for(var x=0;x<clone[y].length;x++){
            if(!castle_added && is_inner_map (map,x,y) 
                && clone[y][x]===GRASS && 
                below(clone,x,y,GRASS) && above(clone,x,y,GRASS) &&
                left_and_right(clone,x,y,GRASS)
            ){
                map[y][x] = CASTLE_AL;
                castle_added = true;
            }
            if(castle_added) break;
        }
    }
    return map;
};

let refine_castle = function(map){
    let clone = make_clone(map);
    for(var y=0;y<clone.length;y++){
        for(var x=0;x<clone[y].length;x++){
            if(clone[y][x]===CASTLE_AL){
                map[y][x+1]=CASTLE_AR;
                map[y+1][x]=CASTLE_BL;
                map[y+1][x+1]=CASTLE_BR;
            }
        }
    }
    return map;
}

let map_generator = function(size){
    let map = initialise(size);
    map = first_river(map);
    map = refine_river(map);
    map = add_bridge(map);
    map = refine_grass(map);
    map = trees(map);
    map = houses(map);
    map = seed_castle(map);
    map = refine_castle(map);
    return map;
};

let generated_map = function(size){
    return map_generator(size);
};

module.exports =  function(name_seed){
    let size = 25;
    rng = seedrandom(name_seed);
    return {
        name:name_seed,
        map:generated_map(size),
        sprites:sprites,
    };   
};