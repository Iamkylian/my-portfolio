<script setup lang="ts">
const { t } = useLanguage()
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <div
    class="network-art"
    :class="{ compact }"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 520 520"
      fill="none"
    >
      <defs>
        <pattern
          id="network-dots"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="1"
            cy="1"
            r="1"
            fill="currentColor"
            opacity=".18"
          />
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width="520"
        height="520"
        fill="url(#network-dots)"
      />
      <g stroke="currentColor">
        <circle
          cx="260"
          cy="260"
          r="203"
          opacity=".12"
        />
        <circle
          cx="260"
          cy="260"
          r="157"
          opacity=".19"
        />
        <circle
          cx="260"
          cy="260"
          r="112"
          opacity=".13"
          stroke-dasharray="3 7"
        />
        <path
          d="M260 28v31m0 403v30M28 260h31m403 0h30"
          opacity=".4"
        />
        <ellipse
          cx="260"
          cy="260"
          rx="203"
          ry="77"
          transform="rotate(-35 260 260)"
          opacity=".3"
        />
        <ellipse
          cx="260"
          cy="260"
          rx="157"
          ry="63"
          transform="rotate(55 260 260)"
          opacity=".23"
        />
        <path
          d="m94 143 166 117 148-64M260 260l-91 130m91-130 91 127M260 260V103"
          stroke-dasharray="4 7"
          opacity=".34"
        />
      </g>
      <g class="art-node">
        <circle
          cx="94"
          cy="143"
          r="8"
        />
        <circle
          cx="408"
          cy="196"
          r="6"
        />
        <circle
          cx="169"
          cy="390"
          r="6"
        />
        <circle
          cx="351"
          cy="387"
          r="8"
        />
        <circle
          cx="260"
          cy="103"
          r="5"
        />
      </g>
      <g class="art-core">
        <path d="m260 210 43 25v50l-43 25-43-25v-50z" />
        <path
          d="m260 224 31 18v36l-31 18-31-18v-36z"
          fill="none"
          stroke="currentColor"
          opacity=".4"
        />
        <path
          d="M247 260h26m-13-13v26"
          stroke="currentColor"
          stroke-width="2"
        />
      </g>
      <g
        class="art-label"
        fill="currentColor"
      >
        <text
          x="107"
          y="137"
        >
          {{ t('RÉSEAUX') }}
        </text>
        <text
          x="350"
          y="183"
        >
          {{ t('SÉCURITÉ') }}
        </text>
        <text
          x="181"
          y="410"
        >
          {{ t('SYSTÈMES') }}
        </text>
      </g>
      <path
        d="M61 72V61h11m376 0h11v11M61 448v11h11m376 0h11v-11"
        stroke="currentColor"
        opacity=".45"
      />
    </svg>
    <div
      v-if="!compact"
      class="art-caption"
    >
      <span>{{ t('01 / CONNEXIONS') }}</span>
      <span>{{ t('RÉSEAUX & CYBERSÉCURITÉ') }}</span>
    </div>
  </div>
</template>
