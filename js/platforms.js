class Platform {
    constructor(ctx, posX, posY, width) {
        this.ctx = ctx
        this.platformPos = { x: posX, y: posY }
        this.platformSize = { w: width, h: 10 }
        // y si las convertimos en imágenes, tendrán una propiedad this.imagesInstance = undefined

        this.initPlatform()
    }

    initPlatform() {
        this.draw()
    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
}

class Tray extends Platform {
    constructor(ctx, posX, posY, width) {
        super(ctx, posX, posY, width)

        this.platformPos = { x: posX, y: posY }
        this.platformSize = { w: 400, h: 500 }
    }
}