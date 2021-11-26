import { Texture } from 'three'

export const makeTexture = (colors, width=window.innerWidth, height=window.innerHeight) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const rectWidth     = width * 0.6
    const rectHeight    = height * 0.6
    const startPointX   = (width - rectWidth) / 2
    const startPointY   = (height - rectHeight) / 2

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, width, height)

    const grd = ctx.createLinearGradient(startPointX, 0, startPointX + rectWidth, 0)

    const gradientColors = colors

    gradientColors.forEach( grdColor => {
        grd.addColorStop(grdColor.offset, grdColor.color)
    })

    ctx.fillStyle = grd;
    ctx.fillRect(startPointX, startPointY, rectWidth, rectHeight)

    // const dataURL = canvas.toDataURL()
    // console.log(dataURL)

    const txt = new Texture(canvas)
    txt.needsUpdate = true

    return txt
}
