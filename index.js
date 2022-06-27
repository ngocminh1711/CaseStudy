const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
console.log(canvas)
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0
        this.opacity = 1
        // this.image =
        let image = new Image()
        image.src = 'img/pngwing.com.png'
        image.onload = () => {
            let scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }

    }

    draw() {
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        c.save()
        c.globalAlpha = this.opacity
        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2)
        c.rotate(this.rotation)

        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2)

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)

        c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity

        this.radius = 5
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


class InvaderProjectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity

        this.width = 3
        this.height = 10
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// class Particle {
//     constructor({position, velocity}) {
//         this.position = position
//         this.velocity = velocity
//
//         this.radius = radius
//         this.color  = color
//     }
//
//     draw() {
//         c.beginPath()
//         c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
//         c.fillStyle = this.color
//         c.fill()
//         c.closePath()
//     }
//
//     update() {
//         this.draw()
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y
//     }
// }


class Invader {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }
        // this.image =
        let image = new Image()
        image.src = 'img/favpng_heart-pixel-art.png'
        image.onload = () => {
            let scale = 0.02
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
        }

    }

    draw() {
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)

    }

    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }
    shoot(invaderProjectiles){
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y:  this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }))

    }
    }


class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 3,
            y: 0
        }
        this.invaders = []


        let columns = Math.floor(Math.random() * 10 + 5)
        let rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {

                this.invaders.push(new Invader({
                        position: {
                            x: x * 30,
                            y: y * 30

                        }
                    })
                )
            }
        }
        // console.log(this.invaders)
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0
        // invaders move
        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}


let player = new Player()
let projectiles = []
let grids = []
let invaderProjectiles = []

// let particles = []

let keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)


function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)
    }
        else {
            invaderProjectile.update()
        }
    })

    console.log(invaderProjectiles)
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }

    })

    grids.forEach((grid, gridIndex) => {
        grid.update()
        // spawn projectiles
        if (frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }

        grid.invaders.forEach((invader, i) => {
            invader.update({velocity: grid.velocity})
            // projectile hit enimies
            projectiles.forEach((projectile, j) => {
                    if (projectile.position.y - projectile.radius <= invader.position.y + invader.height
                        && projectile.position.x + projectile.radius >= invader.position.x
                        && projectile.position.x - projectile.radius <= invader.position.x + invader.width
                        && projectile.position.y + projectile.radius >= invader.position.y) {


                        setTimeout(() => {

                            let invaderFound = grid.invaders.find((invader2) => invader2 === invader)
                            let projectileFound = projectiles.find((projectile2) => projectile2 === projectile)

                            // remove projectile and invader
                            if (invaderFound && projectileFound) {
                                grid.invaders.splice(i, 1)
                                projectiles.splice(j, 1)
                            }
                            if (grid.invaders.length > 0) {
                                let fisrtInvader = grid.invaders[0]
                                let lastInvader = grid.invaders[grid.invaders.length - 1]

                                grid.width = lastInvader.position.x - fisrtInvader.position.x + lastInvader.width

                                grid.position.x = fisrtInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }

                        }, 0)
                    }
                }
            )
        })
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
    //spawning enemy
    if (frames % randomInterval === 0) {
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random() * 500 + 500)
        frames = 0
    }

    frames++
}

animate()
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            // console.log('left')
            break
        case 'd':
            keys.d.pressed = true
            break
        case ' ':
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))

            // console.log(projectiles)
            break
    }
})
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case ' ':
            break
    }
})
