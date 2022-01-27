class Player {
    constructor(ctx, posX, posY, gameSize, platforms, ingredients) {
        this.ctx = ctx
        this.riceBallPos = { x: posX, y: posY }
        this.riceBallSize = { w: 50, h: 50 }

        this.riceBallVel = { x: 1, y: 0 }
        this.riceBallPhysics = { gravity: 0.1 }
        this.gameSize = gameSize
        this.lives = 3
        // this.imageInstance = undefined
        this.bullets = []
        this.bulletsCounter = 0

        this.image = new Image()
        this.image.src = "./img/bola-de-arroz (1).png"
        this.image.frames = 4
        this.image.framesIndex = 0

        this.isMoving = true

        this.platforms = platforms
        this.ingredients = ingredients

        this.initRiceBall()
    }

    initRiceBall() {
        this.move()
        this.moveLeft()
        this.moveRight()
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.riceBallPos.x,
            this.riceBallPos.y,
            this.riceBallSize.w,
            this.riceBallSize.h
        )
        this.animate(framesCounter)
        this.move()
    }

    animate(framesCounter) {
        if (framesCounter % 4 == 0) {
            this.image.framesIndex++
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0
        }
    }

    move() {
        if (this.isMoving) {
            this.riceBallPos.y += this.riceBallVel.y
            this.riceBallVel.y += this.riceBallPhysics.gravity
        }


        // if (this.isMoving && this.riceBallPos.y + this.riceBallVel.y <= this.gameSize.h) {
        //     this.riceBallPos.y += this.riceBallVel.y
        //     this.riceBallVel.y += this.riceBallPhysics.gravity
        // } else {
        //     this.riceBallVel.y = 0
        // }

        this.checkLateralCollision()
    }

    checkLateralCollision() {
        if (this.riceBallPos.x > this.gameSize.w - this.riceBallSize.w) {
            this.riceBallPos.x -= 15
        }

        if (this.riceBallPos.x <= 0) {
            this.riceBallPos.x += 30
        }
    }

    moveLeft() {
        this.riceBallPos.x -= 15
    }

    moveRight() {
        this.riceBallPos.x += 15
    }

    shoot() {
        this.bullets.push(new Tobiko(this.ctx, this.riceBallPos.x, this.riceBallPos.y, this.riceBallSize.w, this.riceBallSize.h))
    }



}



// gravity() {
//     if (this.augustPos.y >= (this.gameSize.h / 2)) {
//         this.augustVel.y += this.augustPhysics.gravity
//         this.augustPos.y += this.augustVel.y
//     } else {
//         this.platforms.forEach((eachPlatform) => {
//             if (this.augustVel.y < 0) {
//                 eachPlatform.platformPos.y -= this.augustVel.y
//             }
//         })
//         this.enemies.forEach(eachEnemy => {
//             if (this.augustVel.y < 0) {
//                 eachEnemy.enemyPos.y -= this.augustVel.y
//             }
//         })
//         this.augustPos.y = this.gameSize.h / 2
//         this.augustVel.y += this.augustPhysics.gravity
//         this.augustPos.y += this.augustVel.y
//     }
// }
