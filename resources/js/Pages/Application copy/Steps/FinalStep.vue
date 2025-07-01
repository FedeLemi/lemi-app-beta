<template>
  <div class="max-w-2xl mx-auto text-center">
    <div class="mb-8">
      <div
        class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircleIcon class="w-10 h-10 text-white" />
      </div>
      <h2
        class="text-3xl font-bold mb-4"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        {{ $t("final.title") }}
      </h2>
      <p class="text-lg" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
        {{ $t("final.message") }}
      </p>
    </div>

    <div
      class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-8 text-white mb-8"
    >
      <h3 class="text-xl font-semibold mb-4">{{ $t("final.nextSteps") }}</h3>
      <div class="space-y-3 text-left">
        <div class="flex items-start space-x-3">
          <div
            class="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <span class="text-sm font-bold">1</span>
          </div>
          <p class="text-sm">{{ $t("final.step1") }}</p>
        </div>
        <div class="flex items-start space-x-3">
          <div
            class="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <span class="text-sm font-bold">2</span>
          </div>
          <p class="text-sm">{{ $t("final.step2") }}</p>
        </div>
        <div class="flex items-start space-x-3">
          <div
            class="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <span class="text-sm font-bold">3</span>
          </div>
          <p class="text-sm">{{ $t("final.step3") }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        @click="goToDashboard"
        class="px-8 py-3 rounded-lg font-medium transition-colors"
        :class="
          isDark
            ? 'bg-purple-600 hover:bg-purple-700 text-white'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        "
      >
        {{ $t("final.goToDashboard") }}
      </button>

      <button
        @click="startNewApplication"
        class="px-8 py-3 rounded-lg font-medium transition-colors"
        :class="
          isDark
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        "
      >
        {{ $t("final.newApplication") }}
      </button>
    </div>

    <!-- Application Summary -->
    <div class="mt-12 text-left">
      <h4
        class="text-lg font-semibold mb-4"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        {{ $t("final.applicationSummary") }}
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div
          class="p-4 rounded-lg"
          :class="isDark ? 'bg-gray-800' : 'bg-gray-50'"
        >
          <p
            class="font-medium mb-1"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("final.companyName") }}
          </p>
          <p :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            {{ store.companyInfo.companyName }}
          </p>
        </div>

        <div
          class="p-4 rounded-lg"
          :class="isDark ? 'bg-gray-800' : 'bg-gray-50'"
        >
          <p
            class="font-medium mb-1"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("final.requestedAmount") }}
          </p>
          <p :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            €{{ store.creditApplication.requestedAmount?.toLocaleString() }}
          </p>
        </div>

        <div
          class="p-4 rounded-lg"
          :class="isDark ? 'bg-gray-800' : 'bg-gray-50'"
        >
          <p
            class="font-medium mb-1"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("final.financingTypes") }}
          </p>
          <p :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            {{ store.creditApplication.financingTypes?.length }}
            {{ $t("final.typesSelected") }}
          </p>
        </div>

        <div
          class="p-4 rounded-lg"
          :class="isDark ? 'bg-gray-800' : 'bg-gray-50'"
        >
          <p
            class="font-medium mb-1"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("final.term") }}
          </p>
          <p :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            {{ store.creditApplication.termMonths }} {{ $t("final.months") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { router } from "@inertiajs/vue3";
import { useApplicationStore } from "../../stores/applicationStore";
import { CheckCircleIcon } from "lucide-vue-next";
import { useDark } from "@vueuse/core";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();

const goToDashboard = () => {
  router.visit("/dashboard");
};

const startNewApplication = () => {
  // Reset store and start over
  store.$reset();
  router.visit("/application");
};
</script>
