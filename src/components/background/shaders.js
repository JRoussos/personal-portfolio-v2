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

uniform sampler2D uColorTexture; 
uniform sampler2D uInteractiveTexture;

// vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
//   vec4 color = vec4(0.0);
//   vec2 off1 = vec2(1.3333333333333333) * direction;

//   color += texture2D(image, uv) * 0.29411764705882354;
//   color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
//   color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
  
//   return color; 
// }

void main() {
  vec2 newUv = vUv;
  vec2 p = 2.0 * newUv - vec2(1.0); // normalize the uvs from 0 to 2

  p += 0.83 * cos(2.8 * p.yx - 0.21 * uTime + vec2(1.2, 8.2)); //3
  p += 0.53 * sin(1.7 * p.yx - 0.14 * uTime + vec2(5.8, 1.6)); //2
  p += 0.23 * cos(3.2 * p.yx - 0.47 * uTime + vec2(4.3, 5.4)); //4
  p += 0.13 * sin(4.5 * p.yx - 0.06 * uTime + vec2(9.4, 3.7)); //5

  // float mouseTrail = blur(uInteractiveTexture, newUv, uResolution, vec2(12.0)).r * 0.2325;
  float mouseTrail = texture2D(uInteractiveTexture, newUv).r * 0.051;
  newUv = vec2(length(p) * uProgress) + mouseTrail;

  // float r = texture2D(uColorTexture, newUv += mouseTrail * 0.2).r;
  // float g = texture2D(uColorTexture, newUv += mouseTrail * 0.2).g;
  // float b = texture2D(uColorTexture, newUv += mouseTrail * 0.2).b;
  
  // vec3 text = vec3(r, g, b) * 0.75;
  // vec3 text = texture2D(uInteractiveTexture, vUv).rgb * 0.75;
  vec3 text = texture2D(uColorTexture, newUv).rgb * 0.75;

  if ( text.r + text.g + text.b <= 0.5 ) discard;  

  gl_FragColor = vec4(text, 1.0);
}`