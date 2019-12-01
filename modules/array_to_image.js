const { createCanvas, loadImage } = require('canvas');
const draw_text = require("./draw_text.js");
let mod = "Image Drawing |"

let get_colour = function(map,index){
    if(index<map.length) return map[index];
    else return map[0];
};

let boarder = function(ctx,size){
    ctx.fillStyle = "rgba(50,50,50,0.5)";
    ctx.fillRect(0,0,size.w,5);
    ctx.fillRect(0,5,5,size.h);
    ctx.fillRect(5,size.h-5,size.w,size.h);
    ctx.fillRect(size.w-5,5,size.w,size.h-10);
};

let generate_canvas = function(size,colour_map,name,data){
    const canvas = createCanvas(size.w, size.h);
    const ctx = canvas.getContext('2d');
    console.log(mod,"Canvas W",size.w,"Canvas H",size.h);

    let data_h = data.length;
    let data_w = data[0].length;
    console.log(mod,"Data W",data_w,"Data H",data_h);

    let block_w = Math.ceil(size.w/data_w);
    let block_h = Math.ceil(size.h/data_h);
    console.log(mod,"Block W",block_w,"Block H",block_h);

    for(var y=0;y<data.length;y++){
        for(var x=0;x<data[y].length;x++){
            ctx.fillStyle = get_colour(colour_map,data[y][x]);
            ctx.fillRect(x*block_w, y*block_h, block_w, block_h);
        }
    }

    boarder(ctx,size);
    draw_text(10,10,name,ctx,size);
    return canvas;
};

let generate_sprite_canvas = function(size,sprite_map,name,data,on_done){
    const canvas = createCanvas(size.w, size.h);
    const ctx = canvas.getContext('2d');
    console.log(mod,"Canvas W",size.w,"Canvas H",size.h);

    let data_h = data.length;
    let data_w = data[0].length;
    console.log(mod,"Data W",data_w,"Data H",data_h);

    let block_w = Math.ceil(size.w/data_w);
    let block_h = Math.ceil(size.h/data_h);
    console.log(mod,"Block W",block_w,"Block H",block_h);

    let images = null;
    
    let image_promises = sprite_map.map((path)=> {
        return loadImage(path);
    });

    Promise.all(image_promises).then(values => {
        images=values;
       // console.log(mod,images);

        for(var y=0;y<data.length;y++){
            for(var x=0;x<data[y].length;x++){
                let image = images[data[y][x]];
                //console.log(mod,image);
                ctx.drawImage(image,x*block_w, y*block_h,block_w,block_h);
                //ctx.strokeStyle = "rgb(255,000,255)";
                //ctx.setLineDash([1, 2]);
                //ctx.strokeRect(x*block_w, y*block_h,block_w,block_h);
            }
        }
    
        //boarder(ctx,size);
        //draw_text(10,10,name,ctx,size);
        on_done(canvas);//Why not return a promise here?
    });
};

let generate_image = function(size,colour_map,name,data,out){
    let canvas = generate_canvas(size,colour_map,name,data);
    const stream = canvas.createPNGStream()
    stream.pipe(out);
};

let generate_buffer = function(size,colour_map,name,data){
    let canvas = generate_canvas(size,colour_map,name,data);
    return canvas.toBuffer();
};

let generate_image_from_sprites = function(size,sprite_map,name,data,out){
    generate_sprite_canvas(size,sprite_map,name,data,(canvas)=>{
        const stream = canvas.createPNGStream()
        stream.pipe(out);
    });
};

module.exports = {
    generate_image: generate_image,
    generate_buffer: generate_buffer,
    generate_image_from_sprites: generate_image_from_sprites
};