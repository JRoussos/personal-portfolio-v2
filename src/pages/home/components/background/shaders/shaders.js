export const vertex = /* glsl */ `
#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec2 uSize;
uniform float uDelta;
uniform float uProgress;

void main() {
  vUv = uv;
  vPosition = position;

  float big_side = max(uSize.x, uSize.y);
  float small_side = min(uSize.x, uSize.y);

  float ratio = (small_side / big_side) * 0.5;
  
  vec4 newPos = modelViewMatrix * vec4(position, 1.0);
  newPos.z += sin(newPos.y /big_side * PI * 3.0) * -uDelta * ratio;
  
  gl_Position = projectionMatrix * newPos; //modelViewMatrix * vec4(position, 1.0);
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
  vec2 p = -1.5 * newUv + vec2(0.15); 

  vec3 whey_color = vec3(0.9058823529411765, 0.8823529411764706, 0.8823529411764706);
  float time = uTime * 0.5;

  p += 0.51 * sin(1.2 * p.yx - time + vec2(0.8, 0.2));
  p += 0.45 * cos(3.7 * p.yx - time + vec2(5.6, 1.6));

  newUv = vec2(length(p) * uProgress /3.3334);
  
  vec3 text = texture2D(uColorTexture, newUv).rgb * 0.75;
  // vec3 rn = vec3(random(vUv.xy, 1.0));

  gl_FragColor = vec4(mix(whey_color, text, uProgress), 1.0);//mix(text, rn, 0.12), 1.0);
}`