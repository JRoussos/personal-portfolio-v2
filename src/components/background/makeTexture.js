import { Texture } from 'three'

export const makeTexture = (width=window.innerWidth, height=window.innerHeight, colors=[]) => {
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

    const gradientColors = colors.length ? colors : [
        {offset: 0.00, color: '#7B80E4'},
        {offset: 0.26, color: '#DB30AA'},
        {offset: 0.60, color: '#F42F1E'},
        {offset: 1.00, color: '#F6B041'},
    ]

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
