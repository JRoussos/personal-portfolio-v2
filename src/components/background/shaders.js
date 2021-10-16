const vertex = `
varying vec2 vUv;

uniform float uTime;
uniform float uProgress;

// uniform sampler2D uRayTexture;

void main() {
  vUv = uv;
  // float rt = texture2D(uRayTexture, vUv).r;
  
  vec3 newPosition = position;

  // newPosition += vec3(rt * 2.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}`

const fragment = `
const float PI = 3.1415926535897932384626433832795;
varying vec2 vUv;

uniform float uTime;
uniform float uProgress;
uniform float uScroll;

uniform sampler2D uColorTexture; 
// uniform sampler2D uInteractiveTexture; 

void main() {
  vec2 newUv = vUv;
  vec2 p = 2.0 * newUv - vec2(0.5); // normalize the uvs to be from 0 to 2
  // vec2 p = 3.0 * newUv - vec2(1.5);
  
  p += 0.3 * sin(uScroll * 1.35 + 1.0 * p.yx + 0.31 * uTime + vec2(1.2, 8.2)) - uScroll * 0.325;
  p += 0.3 * cos(uScroll * 1.35 + 3.0 * p.yx + 0.24 * uTime + vec2(5.8, 1.6)) - uScroll * 0.325;
  p += 0.3 * sin(uScroll * 1.35 + 5.0 * p.yx + 0.57 * uTime + vec2(4.3, 5.4)) - uScroll * 0.325;
  p += 0.3 * cos(uScroll * 1.35 + 7.0 * p.yx + 0.16 * uTime + vec2(9.4, 3.7)) - uScroll * 0.325;

  // float mouseTrail = texture2D(uInteractiveTexture, newUv).r * 0.4;
  // newUv = vec2(length(p) * uProgress + mouseTrail, 0.5);
  newUv = vec2(length(p) * uProgress, 0.5);

  // vec3 text = mix(color, image, sin(uScroll * PI));
  vec3 text = texture2D(uColorTexture, newUv).rgb * 0.75;
  if ( text.r + text.g + text.b <= 0.5 ) discard;  

  gl_FragColor = vec4(text, 1.0);
}
`

export { vertex, fragment }