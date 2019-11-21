module.exports = function(x,y,name,ctx,size){
    name = name.toUpperCase();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillRect(5,5,size.w-10,25);
    ctx.fillStyle = "rgb(0,0,0)";
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
                ctx.lineTo(x,y+h);
                ctx.moveTo(x+w,y);
                ctx.lineTo(x+w,y+h);
                ctx.moveTo(x,y+h/2);
                ctx.lineTo(x+w,y+h/2);
                ctx.stroke();
                break;
            case 'I':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w,y);
                ctx.moveTo(x+w/2,y);
                ctx.lineTo(x+w/2,y+h);
                ctx.moveTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'J':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w,y);
                ctx.moveTo(x+w/2,y);
                ctx.lineTo(x+w/2,y+h);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x,y+h/2);
                ctx.stroke();
                break;
            case 'K':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.moveTo(x,y+h/2);
                ctx.lineTo(x+w,y);
                ctx.moveTo(x,y+h/2);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'L':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'M':
                ctx.beginPath();
                ctx.moveTo(x,y+h);
                ctx.lineTo(x,y);
                ctx.lineTo(x+w/2,y+h/2);
                ctx.lineTo(x+w,y);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'N':
                ctx.beginPath();
                ctx.moveTo(x,y+h);
                ctx.lineTo(x,y);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x+w,y);
                ctx.stroke();
                break;
            case 'O':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w,y);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x,y);
                ctx.stroke();
                break;
            case 'P':
                ctx.beginPath();
                ctx.moveTo(x,y+h);
                ctx.lineTo(x,y);
                ctx.lineTo(x+w,y);
                ctx.lineTo(x+w,y+h/2);
                ctx.lineTo(x,y+h/2);
                ctx.stroke();
                break;
            case 'Q':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w*0.8,y);
                ctx.lineTo(x+w*0.8,y+h);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x,y);
                ctx.moveTo(x+w/2,y+h/2);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'R':
                ctx.beginPath();
                ctx.moveTo(x,y+h);
                ctx.lineTo(x,y);
                ctx.lineTo(x+w,y);
                ctx.lineTo(x+w,y+h/2);
                ctx.lineTo(x,y+h/2);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case 'S':
                ctx.beginPath();
                ctx.moveTo(x+w,y);
                ctx.lineTo(x,y);
                ctx.lineTo(x,y+h/2);
                ctx.lineTo(x+w,y+h/2);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x,y+h);
                ctx.stroke();
                break;
            case 'T':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w,y);
                ctx.moveTo(x+w/2,y);
                ctx.lineTo(x+w/2,y+h);
                ctx.stroke();
                break;
            case 'U':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x+w,y);
                ctx.stroke();
                break;
            case 'V':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w/2,y+h);
                ctx.lineTo(x+w,y);
                ctx.stroke();
                break;
            case 'W':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w/2,y+h/2);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x+w,y);
                ctx.stroke();
                break;
            case 'X':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w,y+h);
                ctx.moveTo(x,y+h);
                ctx.lineTo(x+w,y);
                ctx.stroke();
                break;
            case 'Y':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w/2,y+h/2);
                ctx.lineTo(x+w,y);
                ctx.moveTo(x+w/2,y+h/2);
                ctx.lineTo(x+w/2,y+h);
                ctx.stroke();
                break;
            case 'Z':
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+w,y);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x+w,y+h);
                ctx.stroke();
                break;
            case '-':
                ctx.beginPath();
                ctx.moveTo(x,y+h/2);
                ctx.lineTo(x+w,y+h/2);
                ctx.stroke();
                break;
            case ' ':
                break;
            default:
                ctx.fillRect(x,y,w,h);
        };
        x = x+w+3;
    });
};
