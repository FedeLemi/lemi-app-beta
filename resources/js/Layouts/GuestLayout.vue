<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
</script>

<template>
  <div
    class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-purple-900 dark: bg-custom-gradient"
  >
    <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
    <!-- 
    <div>
      <h1 class="text-white">Tu empresa de confianza</h1>
    </div> -->

    <div
      class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
      <div class="items-center m-2">
        <Link href="/register" class="flex items-center">
          <span>{{ $t("login.signUp") }}</span>
        </Link>
      </div>
    </div>
  </div>
</template>
