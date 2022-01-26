class Ingredient {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.ingredientPos = { x: posX, y: posY }
        this.ingredientSize = { w: 50, h: 30 }

        this.initIngredient()
    }

    initIngredient() {
        this.draw()
    }

    draw() {
        this.ctx.fillStyle = 'pink'
        this.ctx.fillRect(this.ingredientPos.x, this.ingredientPos.y, this.ingredientSize.w, this.ingredientSize.h)
    }
}

class Salmon extends Ingredient {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
    }
}

class Avocado extends Ingredient {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
    }
}

class Shrimp extends Ingredient {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
    }
}

class Nori extends Ingredient {
    constructor(ctx, posX, posY) {
        super(ctx, posX, posY)
    }
}