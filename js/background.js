class Background {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.backPos = { x: posX, y: posY }
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/plato.png'
    }
    draw() {
        this.ctx.drawImage(this.imageInstance, this.backPos.x, this.backPos.y, this.gameSize.w, this.gameSize.h)
    }

}