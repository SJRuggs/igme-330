export class CircleSprite {
    constructor(x, y, radius) {
        Object.assign(this, { x, y, radius });
        this.dx = 1.0;
        this.dy = 1.0;
        this.color = "white";
    }

    update(ctx, data) {
        if (data) {
            this.x += (data / 100)**2;
            this.y += (data / 100)**2;
        }

        this.wrapAround(ctx);
        this.draw(ctx);
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    wrapAround(ctx) {
        if (this.x - this.radius > ctx.canvas.width)    this.x = -1 * this.radius;
        if (this.y - this.radius > ctx.canvas.height)   this.y = -1 * this.radius;
        if (this.x + this.radius < 0) this.x = ctx.canvas.width - this.radius;
        if (this.y + this.radius < 0) this.y = ctx.canvas.height - this.radius;
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
    }

    setRadius(radius)   { this.radius = radius; }
    setColor(color)     { this.color = color; }

}