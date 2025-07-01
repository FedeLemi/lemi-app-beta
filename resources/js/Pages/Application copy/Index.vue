<template>
  <AuthenticatedLayout
    :page-title="$t('application.title')"
    :page-description="$t('application.description')"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <span
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("application.step") }} {{ store.currentStep }}
            {{ $t("application.of") }} {{ store.totalSteps }}
          </span>
          <span
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ Math.round(store.progressPercentage) }}%
          </span>
        </div>
        <div
          class="w-full bg-gray-200 rounded-full h-2"
          :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"
        >
          <div
            class="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            :style="{ width: `${store.progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="min-h-[600px]">
        <Transition name="step" mode="out-in">
          <CompanyInfoStep v-if="store.currentStep === 1" key="companyInfo" />
          <CreditApplicationStep
            v-else-if="store.currentStep === 2"
            key="creditApplication"
          />
          <FinalStep v-else-if="store.currentStep === 3" key="final" />
        </Transition>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useApplicationStore } from "../stores/applicationStore";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import LoginStep from "./Steps/LoginStep.vue";
import UserInfoStep from "./Steps/UserInfoStep.vue";
import CompanyInfoStep from "./Steps/CompanyInfoStep.vue";
import CreditApplicationStep from "./Steps/CreditApplicationStep.vue";
import FinalStep from "./Steps/FinalStep.vue";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();
</script>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 0.3s ease-in-out;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
