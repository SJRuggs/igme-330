import * as canvas from "./canvas.js";

const init = e => {
    let ctx = document.querySelector('canvas').getContext('2d');
    let rotation = 0;

    const loop = ctx => {
        setTimeout(loop, 1000/60, ctx); // 60 fps
        rotation += 0.05;
        
        // background
        canvas.rect(ctx, {x: 0, y: 0, w: 640, h: 480, fillStyle: "yellow"})
    
        // do some transformations
        ctx.save(); // open A
        ctx.translate(100,0);
        ctx.rotate(rotation / 2);
        
        // shadowed green rect
        ctx.save();
        ctx.shadowOffsetX   = 15;
        ctx.shadowOffsetY   = 15;
        ctx.shadowBlur      = 5;
        ctx.shadowColor     = "rgba(153,50,204,.6)";
        canvas.rect(ctx, {x: 100, y: 100, w: 100, h: 100, fillStyle: "green"});
        ctx.restore();
    
        canvas.rect(ctx, {x: 300, y: 100, w: 100, h: 100, fillStyle: "blue"});
        
        // draw squares with our helper function
        drawSquare1(ctx,100,0,100,100,"orange");
        drawSquare1(ctx,250,0,100,100,"orange");
        drawSquare1(ctx,400,0,100,100,"orange");
    
        // draw triangle
        canvas.triangle(ctx, {x1: 500, y1: 100, x2: 550, y2: 200, x3: 450, y3: 200, lineWidth: 5, fillStyle: "red", strokeStyle: "red"})
        
        ctx.restore(); // close A
        
        // draw a "better" triangle - why is this better? You'll see!
        ctx.save();
        ctx.translate(500,100);
        ctx.rotate(rotation);
        canvas.triangle(ctx, { x1: 0, y1: -50, x2: 50, y2: 50, x3: -50, y3: 50, lineWidth: 5, strokeStyle: "red" });
        ctx.restore();
        ctx.save();
        ctx.translate(200,300);
        ctx.rotate(rotation);
        canvas.triangle(ctx, { x1: 0, y1: -50, x2: 50, y2: 50, x3: -50, y3: 50, lineWidth: 15, strokeStyle: "green" });
        ctx.translate(0, 100);        
        canvas.arc(ctx, { x: 0, y: 0, r: 50, fillStyle: "purple", strokeStyle: "red" });
        ctx.restore();
    }

    loop(ctx);
}


const drawSquare1 = (ctx,x,y,width,height,fillStyle) => {
    ctx.save();
    ctx.fillStyle=fillStyle;
    ctx.fillRect(x,y,width,height);
    ctx.restore();
}



init();