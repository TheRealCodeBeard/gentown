const { createCanvas, loadImage } = require('canvas');

let generate_image = function(data,out){
    let data_h = data.length;
    let data_w = data[0].length;

    const canvas = createCanvas(data_w, data_h);
    const ctx = canvas.getContext('2d');
    
    for(var y=0;y<data.length;y++){
        for(var x=0;x<data[y].length;x++){
            if(data[y][x]===0) ctx.fillStyle = "rgb(0,0,0)";
            else ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(x, y, 1, 1);
        }
    }
    console.log("Data W",data_w,"Data H",data_h);
    const stream = canvas.createPNGStream()
    stream.pipe(out);
};

module.exports = generate_image