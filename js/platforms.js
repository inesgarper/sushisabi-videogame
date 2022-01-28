class Platform {
    constructor(ctx, posX, posY, width) {
        this.ctx = ctx
        this.platformPos = { x: posX, y: posY }
        this.platformSize = { w: 200, h: 25 }
        this.imagesInstance = undefined

        this.initPlatform()
    }

    initPlatform() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/plataforma.png'
    }

    draw() {

        this.ctx.drawImage(this.imageInstance, this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
}