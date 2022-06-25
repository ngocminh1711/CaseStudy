const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
console.log(canvas)
canvas.width = innerWidth;
canvas.height = innerHeight;
const player = new Player()
const projectiles = [new Projectile({
    position: {
        x: 300,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
    }
})]
const keys = {
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

function animate() {
    requestAnimationFrame(animate)
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    projectiles.forEach((projectile) => {
        projectile.update()
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15;
    } else {
        player.velocity.x = 0
        player.rotation = 0;
    }
}


animate()
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = true
            break;
        case 'd':
            console.log('right')
            keys.d.pressed = true
            break;
        case ' ':
            console.log('space')
            break;
    }
})
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = false
            break;
        case 'd':
            console.log('right')
            keys.d.pressed = false
            break;
        case ' ':
            console.log('space')
            break;
    }
})