type Point = readonly [number, number]
type Curve = readonly [Point, Point, Point]

export const inkCursorHotspot = { x: 48, y: 28 }

const radius = 13
const handScale = 0.75
const iconScale = 3.6

function handPoint([x, y]: Point): Point {
  return [inkCursorHotspot.x + (x - 8) * iconScale, inkCursorHotspot.y + (y - 2) * iconScale]
}

const handStart = handPoint([6, 14])

function line(from: Point, to: Point): Curve {
  return [
    [from[0] + (to[0] - from[0]) / 3, from[1] + (to[1] - from[1]) / 3],
    [from[0] + ((to[0] - from[0]) * 2) / 3, from[1] + ((to[1] - from[1]) * 2) / 3],
    to
  ]
}

/*!
 * Pointer outline adapted from Lucide (ISC).
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026
 * as part of Feather (MIT). All other copyright (c) for Lucide are held
 * by Lucide Contributors 2026.
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
// Matching cubic segments keep the transition from the droplet continuous.
const iconCurves: Curve[] = [
  line([6, 14], [6, 4]),
  [
    [6, 1.333],
    [10, 1.333],
    [10, 4]
  ],
  line([10, 4], [10, 9]),
  [
    [10, 6.333],
    [14, 6.333],
    [14, 9]
  ],
  line([14, 9], [14, 10]),
  [
    [14, 7.333],
    [18, 7.333],
    [18, 10]
  ],
  line([18, 10], [18, 11]),
  [
    [18, 8.333],
    [22, 8.333],
    [22, 11]
  ],
  line([22, 11], [22, 14]),
  [
    [22, 18.418],
    [18.418, 22],
    [14, 22]
  ],
  line([14, 22], [12, 22]),
  [
    [9.2, 22],
    [7.5, 21.14],
    [6.01, 19.66]
  ],
  line([6.01, 19.66], [2.41, 16.06]),
  [
    [0.524, 14.174],
    [3.354, 11.354],
    [5.24, 13.24]
  ],
  line([5.24, 13.24], [7, 15]),
  line([7, 15], [6, 14])
]
const handCurves: Curve[] = iconCurves.map((curve) => [
  handPoint(curve[0]),
  handPoint(curve[1]),
  handPoint(curve[2])
])

const angleStep = (Math.PI * 2) / handCurves.length
const circleControlLength = (4 / 3) * Math.tan(angleStep / 4) * radius
const circleStart: Point = [inkCursorHotspot.x - radius, inkCursorHotspot.y]
const circleCurves: Curve[] = handCurves.map((_, index) => {
  const startAngle = Math.PI + index * angleStep
  const endAngle = startAngle + angleStep
  const start: Point = [
    inkCursorHotspot.x + Math.cos(startAngle) * radius,
    inkCursorHotspot.y + Math.sin(startAngle) * radius
  ]
  const end: Point = [
    inkCursorHotspot.x + Math.cos(endAngle) * radius,
    inkCursorHotspot.y + Math.sin(endAngle) * radius
  ]

  return [
    [
      start[0] - Math.sin(startAngle) * circleControlLength,
      start[1] + Math.cos(startAngle) * circleControlLength
    ],
    [
      end[0] + Math.sin(endAngle) * circleControlLength,
      end[1] - Math.cos(endAngle) * circleControlLength
    ],
    end
  ]
})

function deformedPoint(circle: Point, hand: Point, progress: number, time: number): string {
  const amplitude = progress * 0.4
  const handX = inkCursorHotspot.x + (hand[0] - inkCursorHotspot.x) * handScale
  const handY = inkCursorHotspot.y + (hand[1] - inkCursorHotspot.y) * handScale
  const x = circle[0] + (handX - circle[0]) * progress
  const y = circle[1] + (handY - circle[1]) * progress
  const waveX = Math.sin(time * 0.003 + y * 0.12) * amplitude
  const waveY = Math.cos(time * 0.0025 + x * 0.1) * amplitude
  return `${(x + waveX).toFixed(2)},${(y + waveY).toFixed(2)}`
}

export function getInkCursorPath(progress: number, time: number): string {
  const point = (circle: Point, hand: Point) => deformedPoint(circle, hand, progress, time)

  const curves = handCurves.map((hand, index) => {
    const circle = circleCurves[index]!
    return `C${point(circle[0], hand[0])} ${point(circle[1], hand[1])} ${point(circle[2], hand[2])}`
  })

  return `M${point(circleStart, handStart)}${curves.join('')}Z`
}

export function getInkCursorCreases(progress: number, time: number): string {
  const point = (position: Point) => deformedPoint(position, position, progress, time)
  return [
    `M${point(handPoint([14, 9.5]))}L${point(handPoint([14, 12]))}`,
    `M${point(handPoint([18, 10.5]))}L${point(handPoint([18, 12.5]))}`
  ].join('')
}
