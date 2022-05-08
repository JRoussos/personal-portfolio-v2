import React, { forwardRef, useMemo } from 'react'
import { Uniform } from 'three'

import { Effect } from 'postprocessing'

const fragmentShader = `
uniform sampler2D uTexture;

void mainUv(inout vec2 uv) {
    vec4 flowmap = texture2D(uTexture, uv);

    float vx = -(flowmap.r * 2.0 - 1.0);
    float vy = -(flowmap.g * 2.0 - 1.0);
    
    float intensity = flowmap.b * 0.5;
    uv.x += vx * intensity;
    uv.y += vy * intensity;
}`

// Effect implementation
class FlowmapImplementation extends Effect {
    constructor(texture) {
        super('Flowmap', fragmentShader, {
            uniforms: new Map([['uTexture', new Uniform(texture)]])
        })
    }
}

// Effect component
export const Flowmap = forwardRef(({ param }, ref) => {
  const effect = useMemo(() => new FlowmapImplementation(param), [param])
  return <primitive ref={ref} object={effect} dispose={null} />
})