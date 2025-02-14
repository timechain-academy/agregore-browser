#!/usr/bin/env node

const WHITE = '#FCFCFC'
const BLACK = '#111'
const PURPLE = 'rgb(165, 24, 201)'

const GOLD = 1.61803398874989
const DIAMETER = 2140
const TRUE_RADIUS = DIAMETER / 2
const RADIUS = DIAMETER / (GOLD * 2.5)
const THICKNESS = DIAMETER / (GOLD * 13)
const INNER = THICKNESS * GOLD
const POINT_WIDTH = 360 / 32

console.log(`
<svg
  version="1.1"
  baseProfile="full"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewbox="0 0 666 666"
  width="666"
  height="666"
>
<style>
#outline {
  stroke: ${BLACK};
  stroke-width: ${THICKNESS};
  fill: none;
}
.dot {
  fill: ${BLACK};
}
.point {
  fill: ${BLACK};
}
/*.point:nth-child(odd) {
  fill: ${PURPLE};
}*/
.ray {
  stroke: ${BLACK};
  stroke-width: ${THICKNESS};
}
/*.ray:nth-child(even) {
  stroke: ${PURPLE};
}*/
#background {
  fill: ${WHITE};
  stroke: none;
}
#pupil {
  fill: ${PURPLE};
}
</style>
<!-- <g transform="translate(333, 333)">
     <circle id="background" r="${TRUE_RADIUS.toFixed(6)}"/>
     <circle id="outline" r="${RADIUS.toFixed(6)}"/>
     <circle id="pupil" r="${(INNER / 2).toFixed(6)}"/> -->
<!-- ${makeRays(8, TRUE_RADIUS - INNER - THICKNESS, INNER)}
     ${makePoints(8, TRUE_RADIUS, POINT_WIDTH, THICKNESS * 2)} -->
<g transform="matrix(5.5719656878 0 0 5.5720325762 256 256)" id="EqkIySAhMNSRHzhS6JA9q"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(183,3,209); fill-rule: nonzero; opacity: 1;"  transform=" translate(-45.943, -46.0570525682)" d="M 90.156 41.965 L 50.036 1.848 C 48.92605077607353 0.737338485858809 47.42020899204194 0.11331543156860246 45.85 0.11331543156860246 C 44.27979100795806 0.11331543156860246 42.77394922392647 0.7373384858588097 41.664 1.848000000000001 L 33.336 10.180000000000001 L 43.902 20.746000000000002 C 46.436077801723165 19.885391259239363 49.23899878334951 20.538243117200462 51.132000000000005 22.430000000000003 C 53.03595724314118 24.335914651829743 53.684097142129154 27.161866745859395 52.801 29.707 L 62.988 39.891000000000005 C 65.53391161710591 39.00674494110189 68.3612679474542 39.65628324617778 70.266 41.563 C 71.58654258088876 42.88329415789204 72.32843656494465 44.67414642573931 72.32843656494465 46.5415 C 72.32843656494465 48.4088535742607 71.58654258088876 50.19970584210796 70.266 51.519999999999996 C 67.51340023198337 54.269727658041205 63.05359976801664 54.269727658041205 60.301 51.52 C 58.293011591761314 49.508724073427985 57.69040022936716 46.48777967817981 58.773 43.86 L 49.273 34.363 L 49.273 59.36 C 51.30730688443309 60.36490895936084 52.73257266502666 62.28869845742292 53.10140881173858 64.52749420816353 C 53.47024495845049 66.76628995890414 52.73743248738218 69.0456175923153 51.133 70.65 C 49.81270584210797 71.97054258088876 48.021853574260696 72.71243656494465 46.1545 72.71243656494465 C 44.28714642573931 72.71243656494465 42.49629415789204 71.97054258088876 41.176 70.65 C 39.8551514723464 69.32966525012884 39.11306329073682 67.53859864122944 39.11306329073682 65.671 C 39.11306329073682 63.80340135877057 39.8551514723464 62.01233474987117 41.176 60.69200000000001 C 41.83480844436647 60.031853864369545 42.61788612263525 59.50878244646345 43.480000000000004 59.153000000000006 L 43.480000000000004 33.926 C 41.74590285174226 33.21173010054909 40.367931982077174 31.835866564927592 39.65100893255199 30.102864617462792 C 38.93408588302681 28.369862669998 38.937321573268 26.422609805933572 39.660000000000004 24.692000000000004 L 29.242 14.272 L 1.73 41.777 C -0.5783848884641971 44.08991359913582 -0.5783848884641984 47.835086400864185 1.729999999999999 50.148 L 41.852 90.27 C 44.164798406628286 92.57771960645748 47.909201593371705 92.57771960645748 50.221999999999994 90.27 L 90.15599999999999 50.336 C 92.4643848884642 48.02308640086418 92.4643848884642 44.277913599135815 90.15599999999999 41.964999999999996" stroke-linecap="round" />

</g>
</svg>
`)

function makeRays (n, outer, inner, offset = 0) {
  return makeCorners(n, offset).map((theta) => makeRay(theta, outer, inner)).join('\n')
}

function makeRay (theta, outer, inner) {
  return `\t<line class="ray" ${linePoint(theta, outer, 1)} ${linePoint(theta, inner, 2)} />`
}

function makePoints (n, scale, width, size = THICKNESS, offset = 0) {
  return makeCorners(n, offset).map((theta) => {
    return makePoint(theta, scale, width, size)
  }).join('\n')
}

function makePoint (theta, scale, width, size = THICKNESS) {
  const pointX = (xAt(theta) * scale).toFixed(6)
  const leftX = (xAt(theta - width) * (scale - size)).toFixed(6)
  const rightX = (xAt(theta + width) * (scale - size)).toFixed(6)

  const pointY = (yAt(theta) * scale).toFixed(6)
  const leftY = (yAt(theta - width) * (scale - size)).toFixed(6)
  const rightY = (yAt(theta + width) * (scale - size)).toFixed(6)

  const path = `M ${leftX} ${leftY} L ${pointX} ${pointY} L ${rightX} ${rightY} Z`

  return `\t<path class="point" d="${path}" />`
}

function makeCorners (n, offset = 0) {
  const increment = 360 / n
  const corners = []
  for (let i = 0; i < n; i++) {
    corners.push(i * increment + offset)
  }

  return corners
}

function linePoint (theta, scale = 0, index = '') {
  return `x${index}="${(xAt(theta) * scale).toFixed(6)}" y${index}="${(yAt(theta) * scale).toFixed(6)}"`
}

/*
function makeDots (n, scale, offset = 0) {
  return makeCorners(n, offset).map((theta) => {
    return `\t<circle class="dot" r="${THICKNESS}" ${centerPoint(theta, scale)} />`
  }).join('\n')
}

function centerPoint (theta, scale = 0) {
  return `cx="${xAt(theta) * scale}" cy="${yAt(theta) * scale}"`
}
*/

function xAt (theta) {
  return Math.cos(toRad(theta))
}

function yAt (theta) {
  return Math.sin(toRad(theta))
}

function toRad (theta) {
  return Math.PI / 180 * theta
}
