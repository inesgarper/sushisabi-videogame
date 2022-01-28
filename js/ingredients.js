class Ingredient {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.ingredientPos = { x: posX, y: posY }
        this.ingredientSize = { w: 50, h: 30 }
        this.imageInstance = new Image()

        this.initIngredient()
    }

    initIngredient() {
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.ingredientPos.x, this.ingredientPos.y, this.ingredientSize.w, this.ingredientSize.h)
    }


}

class Salmon extends Ingredient {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
        this.ctx = ctx
        this.ingredientPos = { x: posX, y: posY }
        this.ingredientSize = { w: 70, h: 30 }
        this.imageInstance.src = 'img/salmon.png'

    }

}

class Avocado extends Ingredient {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
        this.ctx = ctx
        this.ingredientPos = { x: posX, y: posY }
        this.ingredientSize = { w: 80, h: 30 }
        this.imageInstance.src = 'img/avocado.png'
    }

}

class Tamago extends Ingredient {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
        this.ctx = ctx
        this.ingredientPos = { x: posX, y: posY }
        this.ingredientSize = { w: 50, h: 30 }
        this.imageInstance.src = 'img/cosa-amarilla.png'
    }
}