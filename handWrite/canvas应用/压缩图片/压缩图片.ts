interface compressImg {
    img: File | HTMLImageElement, // img 对象
    sizeRate: number, // 宽高缩放比例
    quality?: number // 质量
}
/**
 * 压缩图片，原理：比例减少像素点
 * @param options 
 * @returns 
 */
function compressImg(options: compressImg): Promise<Blob> {
    let { img, quality = 0.8, sizeRate = 1 } = options
    let imgDom: HTMLImageElement

    const setStyle = (dom: HTMLImageElement, canvas:HTMLCanvasElement): void => {
        const { width, height } = dom
        canvas.height = height * sizeRate
        canvas.width = width * sizeRate
    }

    return new Promise((res, rej) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const resolveImg = function(ctx,imgDom, canvas, quality, res) {
            ctx.drawImage(imgDom, 0,0,canvas.width, canvas.height)
            canvas.toBlob(blob => {
                res(blob)
            }, 'image/jpeg', quality) 
        }
        //  一般情况下只处理Blob 对象情况
        if (img instanceof Blob) {
            imgDom = new Image
            // URL.createObjectURL 创建 的 URL 对象 及时 清除
            // 返回dataUrl 的生命周期 和窗口关联， 窗口关闭或者刷新 dataUrl 失效
            imgDom.src = URL.createObjectURL(img)
        } else {
            // 图片 跨域 执行 drawImage 会 污染画布， 执行 toBlob 会报错
            // 所以对 本地图片资源 直接 转为 blob 对象 然后再 转为 dataUrl 协议
            imgDom = img
            setStyle(imgDom, canvas) 
            resolveImg(ctx, imgDom, canvas, quality,res)
        }
        
        
        imgDom.onload = function() {
            setStyle(imgDom, canvas)
            //优化内存 主动清除 dataUrl 对象， 生命周期即销毁， 访问失效
            // 所以在 onload (加载完)清除, 不影响 drawImage, 因为image 元素已经 render 完了
            URL.revokeObjectURL(imgDom.src)
            resolveImg(ctx, imgDom, canvas, quality,res)
        }
    })
}

