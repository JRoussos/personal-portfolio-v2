export const vertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uProgress;

void main() {
  vUv = uv;
  vPosition = position;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

export const fragment = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uProgress;
uniform float uTouchHold;

uniform sampler2D uColorTexture; 
uniform sampler2D uInteractiveTexture;

float random(vec2 co, float t) {
  return fract(sin(mod(dot(co.xy, vec2(12.9898, 78.233) + t), 3.14)) * 43758.5453);
}

void main() {
  vec2 newUv = vUv;
  vec2 p = 2.0 * newUv - vec2(1.0); // normalize the uvs from 0 to 2

  p += 0.83 * cos(2.8 * p.yx - 0.21 * uTime + vec2(1.2, 8.2)); //3
  p += 0.53 * sin(1.7 * p.yx - 0.14 * uTime + vec2(5.8, 1.6)); //2
  p += 0.23 * cos(3.2 * p.yx - 0.47 * uTime + vec2(4.3, 5.4)); //4
  p += 0.13 * sin(4.5 * p.yx - 0.06 * uTime + vec2(9.4, 3.7)); //5

  // float mouseTrail = blur(uInteractiveTexture, newUv, uResolution, vec2(12.0)).r * 0.2325;
  float mouseTrail = texture2D(uInteractiveTexture, vUv).r * 0.075;
  newUv = vec2(length(p) * uProgress) + mouseTrail;
  
  vec3 text = texture2D(uColorTexture, newUv).rgb * 0.75;
  vec3 rn = vec3(random(vUv.xy, uTime));

  gl_FragColor = vec4(mix(text, rn, 0.12), 1.0);
}`