// let canvas = document.getElementById('game')
// let context = canvas.getContext('2d')

// const height = canvas.height
// const width = canvas.width
// const radius = 69

// context.beginPath()
// context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, false)
// context.fillStyle = 'green'
// context.fill()

// // context.moveTo(0,0)
// // context.lineTo(width, height)
// // context.stroke()

// const canvas = document.getElementById('game')
// const context = canvas.getContext('2d')
// const height = canvas.height
// const width = canvas.width
// const radius = 50
// const numCircles = 10

// let dx = 100
// let dy = 100
// let x = width / 2
// let y = height / 2
// let start

// function fillCircle(context, x, y, radius, color) {
//     context.beginPath()
//     context.arc(x, y, radius, 0, 2 * Math.PI, false)
//     context.fillStyle = color
//     context.fill()
// }

// function step(timestamp) {
//     if (start === undefined) {
//         start = timestamp
//     }
//     const elapsed = (timestamp - start) * 0.001
//     start = timestamp
//     context.clearRect(0, 0, canvas.width, canvas.height)
//     if (x + dx * elapsed + radius > canvas.width || x + dx * elapsed - radius < 0) {
//         dx = -dx
//     }
//     if (y + dy * elapsed + radius > canvas.height || y + dy * elapsed - radius < 0) {
//         dy = -dy
//     }

//     for (let i = 0; i < numCircles; i++) {
//         x = Math.random() * (canvas.width - 2 * radius) + radius;
//         y = Math.random() * (canvas.height - 2 * radius) + radius
//         color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
//     }

//     x += dx * elapsed
//     y += dy * elapsed
//     fillCircle(context, x, y, radius, 'red')
//     window.requestAnimationFrame(step)
// }

// window.requestAnimationFrame(step)



const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
let score = 0;

function fillCircle(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}
const width = canvas.width
const height = canvas.height

const numCircles = 10;
const radius = 20;
let minRadius = 5
let maxRadius = 20
// let x = width / 2
// let y = height / 2
const circles = []


for (let i = 0; i < numCircles; i++) {
    const circle = {
        x: Math.random() * (canvas.width - 2 * radius) + radius,
        y: Math.random() * (canvas.height - 2 * radius) + radius,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
        radius: radius,
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    }
    circles.push(circle);
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy

        if (circle.x + radius > canvas.width || circle.x - radius < 0) {
            circle.dx = -circle.dx
        }
        if (circle.y + radius > canvas.height || circle.y - radius < 0) {
            circle.dy = -circle.dy
        }
        
        
        fillCircle(circle.x, circle.y, radius, circle.color)
    });
    requestAnimationFrame(animate)
}

canvas.addEventListener('click', function(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    circles.forEach((circle, index) => {
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2)

        if (distance < radius) {
            circles.splice(index, 1)

            score++

            console.log(score)

    const newCircle = {
                x: Math.random() * (canvas.width - 2 * radius) + radius,
                y: Math.random() * (canvas.height - 2 * radius) + radius,
                dx: (Math.random() - 0.6) * 4,
                dy: (Math.random() - 0.5) * 4,
                radius: Math.random() * (maxRadius - minRadius) + minRadius,
                color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
            };
            circles.push(newCircle);
        }
    });
    deletedCounter.textContent = score
});

animate()