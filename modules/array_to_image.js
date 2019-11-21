const { createCanvas, loadImage } = require('canvas');
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

let write_name = function(name,ctx,size){
    name = name.toUpperCase();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillRect(5,5,size.w-10,25);
    ctx.fillStyle = "rgb(0,0,0)";
    let x = 10;
    let y = 10;
    let w = 5;
    let h = 15;
    name.split("").forEach(l=>{
        switch (l){
            case 'A':
                ctx.beginPath();
                ctx.moveTo(x,y+h);
                ctx.lineTo(x+w/2,y);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'B':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x,y+h/2);
                ctx.lineTo(x+w,y);
                ctx.lineTo(x,y);
                ctx.stroke();
                break;
            case 'C':
                ctx.beginPath();
                ctx.moveTo(x+w,y);
                ctx.lineTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'D':
                ctx.beginPath();
                ctx.moveTo(x+(w-w*0.1),y+2);
                ctx.lineTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+(w-w*0.1),y+h-2);
                ctx.lineTo(x+(w-w*-.1),y+2);
                ctx.stroke();
                break;
            case 'E':
                ctx.beginPath();
                ctx.moveTo(x+w,y);
                ctx.lineTo(x,y);
                ctx.lineTo(x,y+h/2);
                ctx.lineTo(x+w/2,y+h/2);
                ctx.moveTo(x,y+h/2);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'F':
                ctx.beginPath();
                ctx.moveTo(x+w,y);
                ctx.lineTo(x,y);
                ctx.lineTo(x,y+h/2);
                ctx.lineTo(x+w/2,y+h/2);
                ctx.moveTo(x,y+h/2);
                ctx.lineTo(x,y+h);
                ctx.stroke();
                break;
            case 'G':
                ctx.beginPath();
                ctx.moveTo(x+w,y);
                ctx.lineTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x+w,y+h/2);
                ctx.stroke();
                break;
            case 'H':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.moveTo(x+w,y);
                ctx.lineTo(x+w,y+h);
                ctx.moveTo(x,y+h/2);
                ctx.lineTo(x+w,y+h/2);
                ctx.stroke();
                break;
            default:
                ctx.fillRect(x,y,w,h);
        };
        x = x+w+3;
    });
    //ctx.font = '20px courier';
    //ctx.fillText(name,10, 22);
};

let generate_image = function(size,colour_map,name,data,out){
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
    write_name(name,ctx,size);
    const stream = canvas.createPNGStream()
    stream.pipe(out);
};

module.exports = generate_image