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
    "rgb(000,000,000)",//00 black
    "rgb(225,202,159)",//01 ground
    "rgb(215,192,149)",//02 low ground
    "rgb(245,222,179)",//03 higher ground
    "rgb(245,222,199)",//04 hill
    "rgb(175,175,175)",//05 mountain
    "rgb(195,195,195)",//06 high mountain
    "rgb(170,170,245)",//07 river
    "rgb(160,160,235)",//08 lake
    "rgb(140,140,215)",//09 deep lake
    "rgb(150,225,150)",//10 grass
    "rgb(250,250,200)" //11 sand
];

//handy references to the colours above
const BLACK = 0;
const GROUND = 1;
const LOW_GROUND = 2;
const HIGH_GROUND = 3;
const HILL = 4;
const MOUNTAIN = 5;
const HIGH_MOUNTAIN = 6;
const RIVER = 7;
const LAKE = 8;
const DEEP_LAKE = 9;
const GRASS = 10;
const SAND = 11;

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
let contained_by = function(map,x,y,val,sides){
    sides = sides ? sides : 4;
    let s = 0;
    if(y>0 && map[y-1][x]===val) s+=1;
    if(y<map.length-1 && map[y+1][x]===val) s+=1;
    if(x>0 && map[y][x-1]===val) s+=1;
    if(x<map[y].length && map[y][x+1]===val) s+=1;
    return s===sides;
};

//Abstracting use of rng(). Makes more fluent map operations
let maybe = function(chance,a,b){
    return rng()<chance ? a : b;
};

//Abstracting use of proximity functions. Makes more fluent map operations
let if_maybe = function(choice,chance,a,b){
    return choice ? maybe(chance,a,b) : b;
}

let is = function(val,wanted){
    return val === wanted;      
};

/*
    From here are map operations. They change the map array values and return the array.
    They call 'apply(map,(clone,x,y)=>SOMETHING) to do this. 
    SOMETHING must return a value for x,y.
*/

let distance_between = function(x,y,ax,ay){
    var sq= function(x){return x*x;};
    if(!x && !y) return true;
    var measured = Math.sqrt(sq(ay-y)+sq(ax-x));
    return measured;
};

let seed_element = function(map,el,test,chance){
    chance = chance ? chance : 0.01;
    return apply(map,(clone,x,y)=>if_maybe(
                                        test(clone[y][x]),
                                        chance,el,clone[y][x]
                                )
                );
};

let seed_element_once = function(map,el,test,chance,location_capture){
    chance = chance ? chance : 0.01;
    let seeded = false;
    let seed = (clone,x,y)=>{
        if(!seeded && test(clone[y][x])){
            return maybe(chance,()=>{
                seeded = true;
                if(location_capture)location_capture(x,y);
                return el;
            },()=>clone[y][x])();
        } else return clone[y][x];
    };
    return apply(map,seed);
};

let seed_element_next_to = function(map,el,test,next,chance){
    chance = chance ? chance:0.01;
    return apply(map,(clone,x,y)=>if_maybe(
                                    test(clone[y][x])
                                    && adjacent_to(clone,x,y,next),
                                    chance,el,clone[y][x]
                                )
                );
};

let extend_element = function(map,el,test,chance){
    chance = chance ? chance:0.2;
    return apply(map,(clone,x,y)=>if_maybe(
                                    test(clone[y][x])
                                    && adjacent_to(clone,x,y,el),
                                    chance,el,clone[y][x]
                                )
                );
};

let flood_fill_element = function(map,el,test){
    return extend_element(map,el,test,1.0);
};

let fill_in_element = function(map,el,test,sides){
    return apply(map,(clone,x,y)=>if_maybe(
                                    test(clone[y][x])
                                    && contained_by(clone,x,y,el,sides),
                                    1,el,clone[y][x]
                                )
                );
};

let fill_in_other = function(map,el,test,other){
    return apply(map,(clone,x,y)=>if_maybe(
                                    test(clone[y][x])
                                    && contained_by(clone,x,y,other),
                                    0.5,el,clone[y][x]
                                )
                );
};

//Utility function to allow easy repeats of operations on the map
let repeat = function(times,map,operation,el,base){
    for(var i=0;i<times;i++){ map = operation(map,el,base); }
    return map;
};

let seed_extend_fill = function(map,el,test,r){
    let reps = r ? r : 10;
    map = seed_element(map,el,test);
    map = repeat(reps,map,extend_element,el,test);
    map = fill_in_element(map,el,test);
    return map;
};

let is_any = function(val,a,b,c,d){//need js parameter magic here
     return a && val === a 
            || b && val === b
            || c && val === c
            || d && val === d;
};

/* END OF map operations */

let generate_land = function(map){
    map = seed_extend_fill(map,LOW_GROUND,(v)=>is(v,GROUND),10);
    map = seed_extend_fill(map,HIGH_GROUND,(v)=>is(v,GROUND),20);
    map = seed_extend_fill(map,HILL,(v)=>is_any(v,GROUND,HIGH_GROUND),15);
    map = seed_extend_fill(map,MOUNTAIN,(v)=>is_any(v,HIGH_GROUND,HILL),15);
    return map;
};

let generate_mountain = function(map){
    map = fill_in_other(map,HIGH_MOUNTAIN,(v)=>is_any(v,HILL,MOUNTAIN),MOUNTAIN);
    map = fill_in_element(map,HIGH_MOUNTAIN,(v)=>is(v,MOUNTAIN),3);
    return map;
};

let generate_lake = function(map){
    map = seed_element(map,LAKE,(v)=>is(v,LOW_GROUND),0.005);
    map = repeat(50,map,flood_fill_element,LAKE,(v)=>is(v,LOW_GROUND));
    map = fill_in_other(map,DEEP_LAKE,(v)=>is(v,LAKE),LAKE);
    map = fill_in_element(map,DEEP_LAKE,(v)=>is(v,LAKE),2);
    return map;
};

let generate_river = function(map){
    let seeded = false;
    let ox,oy=null;
    let ex,ey=null;
    map = seed_element_once(map,RIVER,
        (v)=>is(v,MOUNTAIN),0.002,
        (x,y)=>{ox=x;oy=y;});
    console.log(mod,"River origin",ox,oy);
    return map;
};

let generate_grass = function(map){
    map = seed_element_next_to(map,GRASS,(v)=>is_any(v,GROUND,HIGH_GROUND,HILL),LAKE,0.2);
    map = repeat(15,map,extend_element,GRASS,(v)=>is_any(v,GROUND,HIGH_GROUND,HILL));
    map = fill_in_element(map,GRASS,(v)=>is_any(v,GROUND,HIGH_GROUND,HILL),3);
    return map;
};

let generate_sand = function(map){
    map = seed_element_next_to(map,SAND,(v)=>is_any(v,GROUND,LOW_GROUND),LAKE,0.2);
    map = repeat(15,map,extend_element,SAND,(v)=>is_any(v,GROUND,LOW_GROUND));
    return map;
};

//This kind of function organises a set of map operations in order
let generated_map = function(size){
    let map = initialise_map(size,GROUND);
    map = generate_land(map);
    map = generate_mountain(map);
    map = generate_river(map);
    map = generate_lake(map);
    map = generate_grass(map);
    map = generate_sand(map);
    return map;
};

//Export the result of the above.
module.exports =  function(name_seed){
    console.log(mod,"Name seed:",name_seed);
    let size = 100;
    rng = seedrandom(name_seed);//Temporal coupling?
    return {
        name:name_seed,
        map:generated_map(size),
        colours:map_colours,
    };
};