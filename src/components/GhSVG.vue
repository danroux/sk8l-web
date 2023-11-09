<template>
  <!-- eslint-disable -->
  <svg width="155" height="30">
    <defs>
      <linearGradient id="gradient-128270909" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stop-color="#9be9a8"></stop>
        <stop offset="10%" stop-color="#40c463"></stop>
        <stop offset="25%" stop-color="#30a14e"></stop>
        <stop offset="50%" stop-color="#216e39"></stop>
      </linearGradient>
      <mask id="sparkline-128270909" x="0" y="0" width="155" height="28">
        <polyline transform="translate(0, 28) scale(1,-1)"
                  points="0,1.0 3,1.0 6,4.609999999999999 9,1.9 12,1.0 15,1.0 18,1.0 21,1.0 24,1.0 27,2.81 30,1.9 33,3.71 36,1.0 39,2.81 42,5.52 45,6.42 48,2.81 51,3.71 54,2.81 57,9.13 60,8.23 63,12.74 66,15.45 69,2.81 72,1.0 75,1.0 78,1.9 81,1.9 84,2.81 87,18.16 90,8.23 93,7.32 96,7.32 99,2.81 102,5.52 105,6.42 108,3.71 111,4.609999999999999 114,28.1 117,4.609999999999999 120,7.32 123,29.0 126,22.68 129,15.45 132,10.94 135,1.9 138,1.0 141,1.9 144,3.71 147,1.0 150,2.81 153,6.42 "
                  fill="transparent"
                  stroke="#8cc665"
                  stroke-width="2">
        </polyline>
      </mask>
    </defs>

    <g transform="translate(0, 2.0)">
      <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-128270909); mask: url(#sparkline-128270909)"></rect>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'GhSVG',
};
</script>
