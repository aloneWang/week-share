//图片灰度 r+g+b = 白色 只有 每个弹道 色值是 255 才是真白色， 都是0 就是黑色
// 所以 0-255 中间地带 就是 灰色，即将每个弹道从0-255依次设置
const grayscale = function(data: ImageData):void{
    let localData = data.data
    for(let i = 0; i < localData.length; i+=4) {
        const avg = (localData[i] + localData[i+1] + localData[i+2] ) / 3
        localData[i] = avg
        localData[i+1] = avg
        localData[i+2] = avg
    }
}

// 反色
const invert = function(data: ImageData):void {
    let localData = data.data
    for(let i = 0; i < localData.length; i+=4) {
        localData[i] = 255 - localData[i]
        localData[i+1] = 255 - localData[i+1]
        localData[i+2] = 255 - localData[i+2]
    }
}
// 正常
const originImg = function(ctx:CanvasRenderingContext2D):void {
    ctx.drawImage(imgDom, 0, 0, canvas.width, canvas.height)
}

const magnifier = function(canvas:HTMLCanvasElement) {
    const magniPanel = document.createElement('canvas')
    const WIDTH = 400
    const HEIGHT = 200
    magniPanel.width = WIDTH
    magniPanel.height = HEIGHT
    document.body.append(magniPanel)
    
    const ctx = magniPanel.getContext('2d')
    ctx.imageSmoothingEnabled = true
    let listener = function(e:MouseEvent) {
        const {offsetX, offsetY} = e

        const
            swidth = WIDTH / 2,
            sheight = HEIGHT / 2,
            sMaxX = this.width - swidth,
            sMaxY = this.height - sheight,

            x = offsetX < swidth/2  ? 0 : offsetX > (sMaxX + swidth/2) ? sMaxX : offsetX - swidth/2 ,
            y = offsetY < sheight/2 ? 0 : offsetY > (sMaxY + sheight/2) ? sMaxY : offsetY - sheight/2

        ctx.drawImage(canvas,x, y, swidth, sheight, 0, 0, WIDTH, HEIGHT)

    }
    canvas.addEventListener('mousemove',listener)
}

const GRAYSCALE = 'grayscale'
const INVERT = 'invert'
const ORIGIN = 'origin'
type  mutationType = typeof GRAYSCALE | typeof INVERT | typeof ORIGIN
const panel = document.createElement('div')
const canvas = document.createElement('canvas')
let imgDom:HTMLImageElement = new Image


const mutationImg = function(type:mutationType):void {
    const ctx = canvas.getContext('2d')
    if(!imgDom.src) return
    ctx.drawImage(imgDom,0,0, canvas.width, canvas.height)
    let OriginImageData = ctx.getImageData(0,0,canvas.width,canvas.height)
    switch(type) {
        case GRAYSCALE:
            grayscale(OriginImageData)
            break;
        case INVERT:
            invert(OriginImageData)
            break;
        default:
            originImg(ctx)    
        ;        
    }
    ctx.putImageData(OriginImageData,0,0)
}
const createInput = function() {
    const input = document.createElement('input')
    input.type = 'file'
    panel.appendChild(input)
    input.onchange = function(e:Event) {
        const files:File = (e.target as HTMLInputElement).files[0]
        if(!files) {
            console.error('no files')
            return
        }
        drawImg(files)
    }
}
const init = function() {
    magnifier(canvas)
    const options = [GRAYSCALE, INVERT, ORIGIN] as const
    const radio = document.createElement('div')
    createInput()
    options.forEach( name => {
        const box = document.createElement('span')
        box.style.paddingRight = '10px' 
        box.innerHTML = `<input type="radio" value=${name} name="box" onchange="mutationImg('${name}')" /> ${name}`
        radio.appendChild(box)
    })
    
    panel.appendChild(radio)
    panel.append(canvas)

    document.body.appendChild(panel)
    
}
const drawImg = function(imgFile:File):HTMLCanvasElement {
    const dataUrl = URL.createObjectURL(imgFile)

    const ctx = canvas.getContext('2d')
    imgDom.onload = function() {
        URL.revokeObjectURL(dataUrl)
        canvas.width = imgDom.width
        canvas.height = imgDom.height
        ctx.drawImage(imgDom, 0,0,canvas.width, canvas.height)
        
    }
    imgDom.src = dataUrl
    return canvas
}
init()
// export default {
//     drawImg,
//     mutationImg,
// }

