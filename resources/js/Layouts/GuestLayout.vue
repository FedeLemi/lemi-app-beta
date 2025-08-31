<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
</script>

<template>
  <div
    class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-700 dark: bg-custom-gradient"
  >
    <!-- 
    <div>
      <h1 class="text-white">Tu empresa de confianza</h1>
    </div> -->

    <div
      class="min-h-screen bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />

    </div>
  </div>
</template>
