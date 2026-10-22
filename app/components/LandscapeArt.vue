<script setup lang="ts">
// One family of uninterrupted curves: equal offsets, no central knot or joins.
const contours = Array.from({ length: 18 }, (_, index) => {
  const offset = index * 25
  return {
    path: `M-240,${565 + offset} C180,${490 + offset} 525,${795 + offset} 840,${430 + offset} S1170,${-85 + offset} 1620,${-125 + offset}`,
    accent: index === 3 || index === 11,
  }
})
</script>

<template>
  <div
    class="landscape-art"
    aria-hidden="true"
  >
    <svg
      class="flow-desktop"
      viewBox="0 0 1440 760"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        v-for="(contour, index) in contours"
        :key="index"
        :d="contour.path"
        :class="{ 'contour-accent': contour.accent }"
      />
    </svg>
    <svg
      class="flow-mobile"
      viewBox="470 180 960 580"
      fill="none"
    >
      <path
        v-for="(contour, index) in contours"
        :key="index"
        :d="contour.path"
        :class="{ 'contour-accent': contour.accent }"
      />
    </svg>
  </div>
</template>

<style scoped>
.landscape-art {
  align-self: stretch;
  width: 100%;
  min-height: 440px;
  color: var(--accent);
  pointer-events: none;
}
.flow-desktop {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  max-width: none;
  height: 100%;
  transform: translateX(-50%);
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent, #000 9%, #000 76%, transparent);
}
.flow-mobile {
  display: none;
}
.landscape-art path {
  stroke: currentColor;
  stroke-width: 1;
  stroke-opacity: 0.46;
  vector-effect: non-scaling-stroke;
}
.landscape-art .contour-accent {
  stroke-width: 1.5;
  stroke-opacity: 0.75;
}
@media (max-width: 1100px) {
  .landscape-art {
    min-height: 380px;
  }
}
@media (max-width: 600px) {
  .landscape-art {
    min-height: 0;
    margin-top: 32px;
  }
  .flow-desktop {
    display: none;
  }
  .flow-mobile {
    display: block;
    width: calc(100% + 40px);
    max-width: none;
    height: auto;
    margin-left: -20px;
    mask-image: linear-gradient(to bottom, transparent, #000 16%, #000 78%, transparent);
  }
}
@media print {
  .landscape-art {
    display: none;
  }
}
</style>
