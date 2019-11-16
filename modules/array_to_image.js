const { createCanvas, loadImage } = require('canvas');
let mod = "Image Drawing |"

let get_colour = function(map,index){
    if(index<map.length) return map[index];
    else return map[0];
};

let generate_image = function(size,colour_map,data,out){
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
    
    const stream = canvas.createPNGStream()
    stream.pipe(out);
};

module.exports = generate_image