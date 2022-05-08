export const vertex = /* glsl */ `
#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
varying vec3 vPosition;

uniform vec2 uSize;
uniform float uDelta;
uniform float uProgress;

void main() {
  vUv = uv;
  vPosition = position;

  float big_side = max(uSize.x, uSize.y);
  float small_side = min(uSize.x, uSize.y);

  float ratio = (small_side / big_side) * 0.5;
//   float area = smoothstep(0.6, 0.0, vUv.y);
  
  vec4 newPos = modelViewMatrix * vec4(position, 1.0);
  newPos.z += sin(newPos.y /big_side * PI * 3.0) * -uDelta * ratio;
  
  gl_Position = projectionMatrix * newPos; //modelViewMatrix * vec4(position, 1.0);
}`

export const fragment = /* glsl */ `
varying vec2 vUv;

uniform sampler2D uTexture; 

void main() {
  gl_FragColor = texture2D(uTexture, vUv);
}`