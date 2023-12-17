

export function getRandomColor () {
     let color_1 = Math.floor(Math.random() * 256)
     let color_2 = Math.floor(Math.random() * 256)
     let color_3 = Math.floor(Math.random() * 256)

     return `(${color_1}, ${color_1}, ${color_1})`
}