const Game = {
    title: 'Sushisabi',
    authors: 'Mónica Sánchez Ugena e Inés García Periáñez',
    license: undefined,
    version: '1.0.0',
    ctx: undefined,
    platforms: [],
    enemies: [],
    bonus: [],
    ingredients: [],
    frameIndex: 0,
    level1Passed: false,
    level2Started: false,
    isLevelScreenShowing: false,
    riceBall: undefined,
    background: undefined,
    keyPressed: [],
    gameSize: { w: 700, h: window.innerHeight - 50 },
    music: undefined,

    gameInit() {
        this.setContext()
        this.setCanvasSize()
        this.createPlatform()
        this.createEnemies()
        this.createRiceBall()
        this.createIngredients()
        this.drawAll()
        this.setEventHandlers()
        this.gameOver()
        this.firstLevelPassed()
        this.setEventListener()
        this.createBackground()
        // this.music = new Audio("./sounds/sonido.mp3")
        // this.music.volume = true
        // this.music.play()
    },

    // INITIAL SETUP

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
    },

    setCanvasSize() {
        document.querySelector('#myCanvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#myCanvas').setAttribute('height', this.gameSize.h)
    },

    createBackground() {
        this.background = new Background(this.ctx, 0, 0, this.gameSize)
    },

    // CREATE PLAYER

    createRiceBall() {
        this.riceBall = new Player(this.ctx, 40, 60, this.gameSize, this.platforms, this.ingredients)
    },



    // ----------------------- LEVEL 1

    printLivesCounter() {
        this.ctx.font = '20px Sans-serif'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`LIVES: ${this.riceBall.lives}`, 300, 50)
    },

    createPlatform() {
        this.platforms.push(
            new Platform(this.ctx, 0, 300, 170),
            new Platform(this.ctx, 200, 460, 170),
            new Platform(this.ctx, 70, 650, 170),
            new Platform(this.ctx, 400, 780, 170), // ingrediente aqui?
            new Platform(this.ctx, 150, 1000, 170),
            new Platform(this.ctx, 400, 1270, 170),
            new Platform(this.ctx, 70, 1450, 170), // ingrediente aqui
            new Platform(this.ctx, 280, 1650, 170),
            new Platform(this.ctx, 450, 1900, 170),
        )
    },

    createEnemies() {
        this.enemies.push(new Wasabi(this.ctx))
    },

    createIngredients() {
        this.ingredients.push(
            new Salmon(this.ctx, 480, 755),
            new Avocado(this.ctx, 80, 1420)
        )
    },

    createBonus() {
        this.bonus.push(new Bonus(this.ctx))
    },

    drawAll() {
        intervalId = setInterval(() => {
            this.frameIndex++
            this.frameIndex % 50 === 0 ? this.createEnemies() : null
            this.clearAll()
            this.background.draw()
            this.riceBall.riceBallVel.y > 0 ? this.riceBall.draw(this.frameIndex) : this.riceBall.draw()
            this.platforms.forEach((elm) => {
                elm.draw()
            })
            this.enemies.forEach((elm) => {
                elm.moveDown()
                elm.draw()
            })
            this.riceBall.bullets.forEach((elm) => {
                elm.moveUp()
                elm.draw(this.frameIndex)
            })
            this.ingredients.forEach((elm) => {
                elm.draw()
            })
            if (this.checkPlatformCollision()) {
                this.riceBall.riceBallVel.y = 0
                this.riceBall.isMoving = false
            } else {
                this.riceBall.isMoving = true
            }
            this.checkWasabiCollision()
            this.checkIngredientsCollision()
            this.checkBonusCollision()
            this.checkBulletCollision()
            this.clearWasabi()
            this.clearBullets()
            this.gravity()
            this.printLivesCounter()
            this.clearPlatforms()
            this.gameOver()
            this.movement()

            if (!this.level1Passed) {
                this.firstLevelPassed()
            } else {
                if (!this.level2Started) this.printWinLevel1Screen()
                this.frameIndex % 40 === 0 ? this.createEnemies() : null
                this.frameIndex % 80 === 0 ? this.createLevel2Enemies() : null
                if (this.frameIndex % 300 === 0 && this.frameIndex >= 300 && this.level2Started) {
                    this.createBonus()
                }
                this.bonus.forEach((elm) => {
                    elm.moveDown()
                    elm.draw()
                })
                this.riceBall.bullets.forEach((elm) => {
                    elm.moveUp()
                    elm.draw()
                })
                this.ingredients.forEach((elm) => {
                    elm.draw()
                })
                this.checkBonusCollision()
                this.checkBulletCollision()
                this.secondLevelPassed()
                this.clearBullets()
            }

        }, 1000 / 60)
    },

    firstLevelPassed() {
        if (this.riceBall.riceBallPos.y + this.riceBall.riceBallSize.h >= this.gameSize.h && this.ingredients.length === 0) {
            this.level1Passed = true
        }
    },

    printWinLevel1Screen() {
        //First line
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)

        this.ctx.font = '40px Sans-serif'
        this.ctx.fillStyle = 'rgb(255, 222, 89)'
        this.ctx.fillText('YOU PASSED THE DEMO!', 100, 350)

        // Second line

        this.ctx.font = '20px Sans-serif'
        this.ctx.fillStyle = 'rgb(255, 222, 89)'
        this.ctx.fillText('READY FOR THE REAL GAME?', 200, 380)

        // Third line

        this.ctx.font = '30px Sans-serif'
        this.ctx.fillStyle = 'rgb(255, 222, 89)'
        this.ctx.fillText('START COOKING!', 228, 460)

        this.isLevelScreenShowing = true
    },

    // ------------------- RESET RICE BALL

    resetRiceBall() {
        this.riceBall.riceBallPos.x = 60
        this.riceBall.riceBallPos.y = 40
        this.riceBall.image.src = "./img/bola-de-arroz.png"
    },

    // ----------------------------- LEVEL 2

    setEventListener() {
        const canvas = document.querySelector('#myCanvas')
        canvas.addEventListener("click", (e) => {
            this.level2Started = true;
            this.startLevel2()
            this.isLevelScreenShowing = false;

        })
    },

    startLevel2() {
        this.resetRiceBall();
        this.clearPlatformsArray()
        this.clearEnemiesArray()
        this.createLevel2Platforms()
        this.createLevel2Enemies()
        this.createLevel2Ingredients()
        this.riceBall.lives = 3
    },

    createLevel2Platforms() {
        this.platforms.push(
            new Platform(this.ctx, 0, 300, 170),
            new Platform(this.ctx, 400, 460, 170),
            new Platform(this.ctx, 70, 660, 170),
            new Platform(this.ctx, 300, 880, 170),
            new Platform(this.ctx, 50, 1040, 170),
            new Platform(this.ctx, 350, 1200, 170),
            new Platform(this.ctx, 5, 1360, 170),
            new Platform(this.ctx, 280, 1520, 170),
            new Platform(this.ctx, 410, 1750, 170),
            new Platform(this.ctx, 10, 1940, 170),
            new Platform(this.ctx, 410, 2180, 170),
            new Platform(this.ctx, 200, 2340, 170),
            new Platform(this.ctx, 80, 2500, 170),
            new Platform(this.ctx, 480, 2650, 170),
            new Platform(this.ctx, 150, 2800, 170),
        )
    },

    createLevel2Ingredients() {
        this.ingredients.push(
            new Salmon(this.ctx, 370, 1180),
            new Avocado(this.ctx, 20, 1920),
            new Tamago(this.ctx, 500, 2630)
        )
        console.log(this.ingredients)
    },

    createLevel2Enemies() {
        this.enemies.push(new HotWasabi(this.ctx))
    },

    secondLevelPassed() {
        if (this.level2Started) {
            if (this.riceBall.riceBallPos.y + this.riceBall.riceBallSize.h >= this.gameSize.h && this.ingredients.length === 0) {
                clearInterval(intervalId)

                this.printWinLevel2Screen()
            }
        }
    },

    printWinLevel2Screen() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)

        this.ctx.font = '20px Sans-serif'
        this.ctx.fillStyle = 'rgb(255, 222, 89)'
        this.ctx.fillText('DELICIOUS!', 290, 350)

        this.ctx.font = '40px Sans-serif'
        this.ctx.fillStyle = 'rgb(255, 222, 89)'
        this.ctx.fillText('YOU WIN!', 250, 400)
    },

    // ----------- CLEAR FUNCTIONS

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    clearWasabi() {
        this.enemies = this.enemies.filter(elm => elm.enemyPos.y <= this.gameSize.h)
    },

    clearPlatformsArray() {
        this.platforms = []
    },

    clearEnemiesArray() {
        this.enemies = []
    },

    clearBullets() {
        this.riceBall.bullets = this.riceBall.bullets.filter(elm => elm.bulletPos.y >= 0)
    },

    clearPlatforms() {
        this.platforms = this.platforms.filter(elm => elm.platformPos.y > 0)
        if (this.platforms.length === 0) {
            this.riceBall.isMoving = true;
        }
    },

    // -------------- COLLISIONS

    checkPlatformCollision() {

        return this.platforms.some((elm) => {
            return this.riceBall.riceBallPos.x < elm.platformPos.x + elm.platformSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w >= elm.platformPos.x &&
                this.riceBall.riceBallPos.y < elm.platformPos.y + elm.platformSize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y >= elm.platformPos.y
        })
    },

    checkWasabiCollision() {
        this.enemies.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.enemyPos.x + elm.enemySize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w > elm.enemyPos.x &&
                this.riceBall.riceBallPos.y < elm.enemyPos.y + elm.enemySize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y > elm.enemyPos.y) {

                // elimina el wasabi colisionado
                const indexOfWasabiToRemove = this.enemies.indexOf(elm)
                this.enemies.splice(indexOfWasabiToRemove, 1)

                // las vidas disminuyen
                this.riceBall.lives -= elm.damage
            }
        })
    },

    checkIngredientsCollision() {
        this.ingredients.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.ingredientPos.x + elm.ingredientSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w > elm.ingredientPos.x &&
                this.riceBall.riceBallPos.y < elm.ingredientPos.y + elm.ingredientSize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y > elm.ingredientPos.y) {

                // elimina el ingrediente
                const indexOfIngredientToRemove = this.ingredients.indexOf(elm)
                this.ingredients.splice(indexOfIngredientToRemove, 1)

                if (!this.level2Started) {
                    if (this.ingredients.length === 1) {
                        this.riceBall.image.src = "./img/bola-arroz-salmon.png"
                    } else if (this.ingredients.length === 0) {
                        this.riceBall.image.src = "./img/bola-arroz-aguacate.png"
                    }
                }

                if (this.level2Started) {
                    if (this.ingredients.length === 2) {
                        this.riceBall.image.src = "./img/bola-arroz-salmon.png"
                    } else if (this.ingredients.length === 1) {
                        this.riceBall.image.src = "./img/bola-arroz-aguacate.png"
                    } else if (this.ingredients.length === 0) {
                        this.riceBall.image.src = "./img/bola-arroz-final.png"
                    }
                }
            }
        })
    },

    checkBonusCollision() {
        this.bonus.forEach((elm) => {
            if (this.riceBall.riceBallPos.x < elm.bonusPos.x + elm.bonusSize.w &&
                this.riceBall.riceBallPos.x + this.riceBall.riceBallSize.w > elm.bonusPos.x &&
                this.riceBall.riceBallPos.y < elm.bonusPos.y + elm.bonusSize.h &&
                this.riceBall.riceBallSize.h + this.riceBall.riceBallPos.y > elm.bonusPos.y) {

                this.riceBall.bulletsCounter = 10
                this.riceBall.lives += 3
                console.log(this.riceBall.bullets)

                // elimina el bonus
                const indexOfBonusToRemove = this.bonus.indexOf(elm)
                this.bonus.splice(indexOfBonusToRemove, 1)

            }
        })
    },

    checkBulletCollision() {
        this.riceBall.bullets.forEach((elmBullet) => {
            this.enemies.forEach((elmEnemy) => {
                if (elmEnemy.enemyPos.x < elmBullet.bulletPos.x + elmBullet.bulletSize.w &&
                    elmEnemy.enemyPos.x + elmEnemy.enemySize.w > elmBullet.bulletPos.x &&
                    elmEnemy.enemyPos.y < elmBullet.bulletPos.y + elmBullet.bulletSize.h &&
                    elmEnemy.enemySize.h + elmEnemy.enemyPos.y > elmBullet.bulletPos.y) {

                    console.log('wasabi muerto')
                    const indexOfWasabiToRemove = this.enemies.indexOf(elmEnemy)
                    this.enemies.splice(indexOfWasabiToRemove, 1)

                }
            })
        })
    },


    // CHECK INGREDIENTES 

    updateIngredientesCounter() {
        this.riceBall.ingredients++
        console.log(`tengo ${this.riceBall.ingredients} ingrediente`)
    },


    // GAME OVER

    gameOver() {
        if (this.riceBall.lives <= 0) {
            clearInterval(intervalId)

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
            this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)

            this.ctx.font = '40px Sans-serif'
            this.ctx.fillStyle = 'rgb(255, 222, 89)'
            this.ctx.fillText('TOO SPICY TO BE SERVED!', 85, 350)

            this.ctx.font = '70px Sans-serif'
            this.ctx.fillStyle = 'white'
            this.ctx.fillText('GAME OVER', 125, 450)

            this.ctx.font = '20px Sans-serif'
            this.ctx.fillStyle = 'rgb(255, 222, 89)'
            this.ctx.fillText('TRY AGAIN', 300, 520)
        }

        if (this.riceBall.riceBallPos.y + this.riceBall.riceBallSize.h >= this.gameSize.h && this.ingredients.length > 0) {
            clearInterval(intervalId)

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
            this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)

            this.ctx.font = '30px Sans-serif'
            this.ctx.fillStyle = 'rgb(255, 222, 89)'
            this.ctx.fillText('YOU FORGOT THE INGREDIENTS!', 95, 350)

            this.ctx.font = '70px Sans-serif'
            this.ctx.fillStyle = 'white'
            this.ctx.fillText('GAME OVER', 125, 450)

            this.ctx.font = '20px Sans-serif'
            this.ctx.fillStyle = 'rgb(255, 222, 89)'
            this.ctx.fillText('TRY AGAIN', 300, 520)
        }
    },


    // SCROLL

    gravity() {
        if (this.riceBall.riceBallPos.y <= (this.gameSize.h / 2)) {
            //this.riceBallVel.y += this.riceBallPhysics.gravity
            //this.riceBallPos.y += this.riceBallVel.y
        } else {
            this.platforms.forEach((eachPlatform) => {
                if (this.riceBall.riceBallPos.y > 0 && this.platforms.length > 0) {
                    eachPlatform.platformPos.y -= this.riceBall.riceBallVel.y
                }
            })
            this.ingredients.forEach((eachIngredient) => {
                if (this.riceBall.riceBallPos.y > 0) {
                    eachIngredient.ingredientPos.y -= this.riceBall.riceBallVel.y
                }
            })
            this.enemies.forEach((eachEnemy) => {
                if (this.riceBall.riceBallPos.y > 0) {
                    eachEnemy.enemyPos.y -= this.riceBall.riceBallVel.y
                }
            })
            if (this.platforms.length) {
                this.riceBall.riceBallPos.y = this.gameSize.h / 2
            } else {
                console.log('PROBANDO')
            }
        }
    },


    // CONTROLS

    movement() {
        this.keyPressed.forEach(elm => {
            if (elm.includes('ArrowRight')) this.riceBall.moveRight()
            if (elm.includes('ArrowLeft')) this.riceBall.moveLeft()
        })
    },



    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event

            if (key === 'ArrowRight' && !(this.keyPressed.includes('ArrowRight'))) this.keyPressed.push('ArrowRight')
            else if (key === 'ArrowLeft' && !(this.keyPressed.includes('ArrowLeft'))) this.keyPressed.push('ArrowLeft')

            if (this.riceBall.bulletsCounter > 0)
                if (key === ' ') {
                    this.riceBall.shoot()
                    this.riceBall.bulletsCounter--
                }
        })

        document.addEventListener('keyup', event => {
            const { key } = event
            if (key === 'ArrowRight') this.keyPressed = []
            else if (key === 'ArrowLeft') this.keyPressed = []
            else return null
        })
    },
}