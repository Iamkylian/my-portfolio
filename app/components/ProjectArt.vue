<script setup lang="ts">
const { t } = useLanguage()
import type { ProjectVisual } from '~/types/content'
defineProps<{ variant: ProjectVisual }>()
</script>

<template>
  <div
    class="project-art"
    :class="`art-${variant}`"
    aria-hidden="true"
  >
    <svg
      v-if="variant === 'orbit'"
      viewBox="0 0 640 330"
      fill="none"
    >
      <g stroke="currentColor">
        <circle
          cx="325"
          cy="330"
          r="205"
          opacity=".35"
        />
        <circle
          cx="325"
          cy="330"
          r="230"
          opacity=".16"
        />
        <ellipse
          cx="325"
          cy="330"
          rx="120"
          ry="205"
          opacity=".16"
        />
        <path
          d="M126 278h398m-371-50h343M192 180h265M325 125v205"
          opacity=".16"
        />
        <ellipse
          cx="325"
          cy="223"
          rx="270"
          ry="70"
          transform="rotate(-22 325 223)"
          opacity=".5"
          stroke-dasharray="4 6"
        />
      </g>
      <g
        transform="translate(425 105) rotate(-22)"
        stroke="currentColor"
      >
        <rect
          x="-13"
          y="-12"
          width="26"
          height="24"
          rx="3"
          class="svg-surface"
        />
        <path
          d="M-44-18h24v36h-24zm64 0h24v36H20zM-32-18v36m64-36v36M-44 0h24m40 0h24M0-12v-12m-7 0h14M-20 0h7m26 0h7"
        />
        <circle
          cy="24"
          r="4"
        />
      </g>
      <circle
        cx="183"
        cy="287"
        r="5"
        fill="currentColor"
      />
      <path
        d="m188 282 228-163"
        stroke="currentColor"
        opacity=".4"
        stroke-dasharray="4 7"
      />
      <text
        x="32"
        y="40"
        fill="currentColor"
      >
        {{ t('BASTION / SPACE COMMUNICATIONS') }}
      </text>
    </svg>
    <svg
      v-else-if="variant === 'documents'"
      viewBox="0 0 640 330"
      fill="none"
    >
      <g stroke="currentColor">
        <path
          d="M168 109h112v143H168z"
          opacity=".2"
        />
        <rect
          x="184"
          y="94"
          width="112"
          height="143"
          rx="5"
          class="svg-surface"
        />
        <path
          d="M206 129h67m-67 17h67m-67 17h48m-48 35h67m-67 17h40"
          opacity=".55"
        />
        <path d="M296 165h60m-8-7 8 7-8 7" />
        <rect
          x="374"
          y="124"
          width="105"
          height="82"
          rx="7"
          class="svg-surface"
        />
        <path
          d="M395 146h62m-62 14h44m-44 14h54m-54 14h30"
          opacity=".55"
        />
      </g>
      <text
        x="32"
        y="40"
        fill="currentColor"
      >
        {{ t('DOCUMENTS → CONTEXTE → RÉPONSE') }}
      </text>
      <text
        x="205"
        y="273"
        fill="currentColor"
      >
        {{ t('PDF') }}
      </text>
      <text
        x="396"
        y="241"
        fill="currentColor"
      >
        {{ t('RAG') }}
      </text>
    </svg>
    <svg
      v-else
      viewBox="0 0 640 330"
      fill="none"
    >
      <g stroke="currentColor">
        <path
          d="M174 102h105v128H174z"
          opacity=".3"
        />
        <path
          d="M279 165h100M326 165V93h83m-83 72v81h83"
          stroke-dasharray="4 5"
          opacity=".55"
        />
        <rect
          x="192"
          y="120"
          width="72"
          height="92"
          rx="5"
          class="svg-surface"
        />
        <path
          d="M208 140h39m-39 16h39m-39 16h24"
          opacity=".6"
        />
        <rect
          x="409"
          y="71"
          width="67"
          height="43"
          rx="5"
          class="svg-surface"
        />
        <rect
          x="409"
          y="144"
          width="67"
          height="43"
          rx="5"
          class="svg-surface"
        />
        <rect
          x="409"
          y="224"
          width="67"
          height="43"
          rx="5"
          class="svg-surface"
        />
        <path d="M426 92h33m-33 73h33m-33 80h33" />
        <circle
          cx="326"
          cy="165"
          r="7"
          class="svg-surface"
        />
      </g>
      <text
        x="32"
        y="40"
        fill="currentColor"
      >
        {{
          t(
            variant === 'network'
              ? 'ÉCHANGER / TRANSMETTRE / VISUALISER'
              : variant === 'pipeline'
                ? 'BUILD → TEST → DEPLOY'
                : variant === 'system'
                  ? 'CONFIGURER / AUTOMATISER'
                  : variant === 'map'
                    ? 'DONNÉES / PARCOURS / RECHERCHE'
                    : 'MODÉLISER / STRUCTURER',
          )
        }}
      </text>
    </svg>
  </div>
</template>
