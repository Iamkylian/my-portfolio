<script setup lang="ts">
/**
 * LandscapeArt — Refined Flow
 *
 * Courbes continues, parallèles et sans raccord visible.
 * Composition volontairement décalée vers la droite
 * pour préserver la lisibilité du contenu Hero.
 *
 * Aucun filtre SVG : traits nets, sans artefacts lumineux.
 */

const contours = Array.from({ length: 19 }, (_, index) => {
  const offset = (index - 9) * 18

  return {
    id: index,
    path: `
      M -200 ${810 + offset}
      C 130 ${780 + offset},
        440 ${920 + offset},
        710 ${750 + offset}
      C 910 ${625 + offset},
        995 ${350 + offset},
        1180 ${245 + offset}
      C 1355 ${145 + offset},
        1530 ${130 + offset},
        1690 ${60 + offset}
    `,
    accent: index === 6 || index === 12,
  }
})
</script>

<template>
  <div
    class="landscape-art"
    aria-hidden="true"
  >
    <!-- Desktop -->
    <svg
      class="flow-desktop"
      viewBox="0 0 1440 820"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Lignes principales -->
        <linearGradient
          id="flow-line"
          x1="0"
          y1="750"
          x2="1440"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stop-color="var(--flow-color)"
            stop-opacity="0.28"
          />
          <stop
            offset="35%"
            stop-color="var(--flow-color)"
            stop-opacity="0.48"
          />
          <stop
            offset="70%"
            stop-color="var(--flow-bright)"
            stop-opacity="0.65"
          />
          <stop
            offset="100%"
            stop-color="var(--flow-color)"
            stop-opacity="0.38"
          />
        </linearGradient>

        <!-- Deux accents plus lumineux -->
        <linearGradient
          id="flow-highlight"
          x1="0"
          y1="800"
          x2="1440"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stop-color="var(--flow-color)"
            stop-opacity="0.2"
          />
          <stop
            offset="38%"
            stop-color="var(--flow-color)"
            stop-opacity="0.55"
          />
          <stop
            offset="68%"
            stop-color="var(--flow-bright)"
            stop-opacity="0.9"
          />
          <stop
            offset="100%"
            stop-color="var(--flow-color)"
            stop-opacity="0.55"
          />
        </linearGradient>

        <!-- Lumière atmosphérique sans filtre -->
        <radialGradient id="flow-atmosphere">
          <stop
            offset="0%"
            stop-color="var(--flow-color)"
            stop-opacity="0.085"
          />
          <stop
            offset="55%"
            stop-color="var(--flow-color)"
            stop-opacity="0.025"
          />
          <stop
            offset="100%"
            stop-color="var(--flow-color)"
            stop-opacity="0"
          />
        </radialGradient>
      </defs>

      <!-- Profondeur très subtile -->
      <ellipse
        class="flow-atmosphere"
        cx="1070"
        cy="535"
        rx="460"
        ry="285"
        fill="url(#flow-atmosphere)"
      />

      <!-- Courbes -->
      <g
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          v-for="contour in contours"
          :key="contour.id"
          :d="contour.path"
          :stroke="contour.accent ? 'url(#flow-highlight)' : 'url(#flow-line)'"
          :stroke-width="contour.accent ? 1.35 : 0.9"
          vector-effect="non-scaling-stroke"
          class="flow-path"
        />
      </g>
    </svg>

    <!-- Mobile -->
    <svg
      class="flow-mobile"
      viewBox="630 220 800 560"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="flow-mobile-line"
          x1="630"
          y1="780"
          x2="1430"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stop-color="var(--flow-color)"
            stop-opacity="0.24"
          />
          <stop
            offset="55%"
            stop-color="var(--flow-color)"
            stop-opacity="0.58"
          />
          <stop
            offset="100%"
            stop-color="var(--flow-bright)"
            stop-opacity="0.55"
          />
        </linearGradient>

        <linearGradient
          id="flow-mobile-highlight"
          x1="630"
          y1="780"
          x2="1430"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stop-color="var(--flow-color)"
            stop-opacity="0.25"
          />
          <stop
            offset="60%"
            stop-color="var(--flow-bright)"
            stop-opacity="0.85"
          />
          <stop
            offset="100%"
            stop-color="var(--flow-color)"
            stop-opacity="0.55"
          />
        </linearGradient>
      </defs>

      <g
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          v-for="contour in contours"
          :key="contour.id"
          :d="contour.path"
          :stroke="contour.accent ? 'url(#flow-mobile-highlight)' : 'url(#flow-mobile-line)'"
          :stroke-width="contour.accent ? 1.3 : 0.9"
          vector-effect="non-scaling-stroke"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* ==========================================
   LANDSCAPE ART
   ========================================== */

.landscape-art {
  --flow-color: var(--accent, #518dee);

  --flow-bright: color-mix(in srgb, var(--accent, #518dee) 72%, #c5ddff);

  align-self: stretch;
  width: 100%;
  min-height: 440px;
  color: var(--flow-color);
  pointer-events: none;
  user-select: none;
}

/* ==========================================
   DESKTOP COMPOSITION
   ========================================== */

.flow-desktop {
  position: absolute;
  top: 0;
  left: 50%;

  width: 100vw;
  max-width: none;
  height: 100%;

  transform: translateX(-50%);
  overflow: hidden;

  /*
   * Atténuation douce aux extrémités.
   * La zone centrale reste parfaitement nette.
   */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    #000 11%,
    #000 83%,
    transparent 100%
  );

  mask-image: linear-gradient(to bottom, transparent 0%, #000 11%, #000 83%, transparent 100%);
}

/* ==========================================
   CURVES
   ========================================== */

.flow-path {
  fill: none;
}

/* ==========================================
   ATMOSPHERIC LIGHT
   ========================================== */

.flow-atmosphere {
  opacity: 0.8;
}

/* ==========================================
   MOBILE
   ========================================== */

.flow-mobile {
  display: none;
}

/* ==========================================
   TABLET
   ========================================== */

@media (max-width: 1100px) {
  .landscape-art {
    min-height: 380px;
  }

  .flow-atmosphere {
    opacity: 0.5;
  }
}

/* ==========================================
   MOBILE
   ========================================== */

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

    overflow: hidden;

    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      #000 14%,
      #000 82%,
      transparent 100%
    );

    mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 82%, transparent 100%);
  }
}

/* ==========================================
   PRINT
   ========================================== */

@media print {
  .landscape-art {
    display: none;
  }
}
</style>
