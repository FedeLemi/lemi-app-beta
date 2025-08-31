<template>
  <AuthenticatedLayout
    :page-title="t('companyInfo.title')"
    :page-description="t('companyInfo.subtitle')"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Step Content -->
      <div class="min-h-[600px]">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <div></div>
            <h2
              class="text-2xl font-ligth"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            ></h2>
            <p
              class="text-sm mt-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-600'"
            ></p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Company Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >   {{ t('companyInfo.companyName') }} 
                </label>
                <input
                  v-model="companyInfo.companyName" 
                  type="text"
                  :placeholder="t('companyInfo.companyNamePlaceholder')"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                    errors.companyName ? 'border-red-500' : '',
                  ]"
                  required
                />
                <p v-if="errors.companyName" class="text-red-500 text-sm mt-1">
                  {{ errors.companyName }}
                </p>
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                {{ t('companyInfo.nif') }}
                </label>
                <input
                  v-model="companyInfo.nif"
                  type="text"
                  placeholder="B12345678"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                    errors.nif ? 'border-red-500' : '',
                  ]"
                  required
                />
                <p v-if="errors.nif" class="text-red-500 text-sm mt-1">
                  {{ errors.nif }}
                </p>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ t('companyInfo.contactPhone') }}
                </label>
                <input
                  v-model="companyInfo.contactPhone"
                  type="tel"
                  placeholder="61114444"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                    errors.contactPhone ? 'border-red-500' : '',
                  ]"
                  required
                />
                <p v-if="errors.contactPhone" class="text-red-500 text-sm mt-1">
                  {{ errors.contactPhone }}
                </p>
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                {{ t('companyInfo.alternativePhone') }}
                </label>
                <input
                  v-model="companyInfo.alternativePhone"
                  type="tel"
                  placeholder="61115555"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  "
                />
              </div>
            </div>

            <!-- Address -->
            <div>
              <label
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              >
                {{ t('companyInfo.address') }}
              </label>
              <input
                v-model="companyInfo.address"
                type="text"
                :placeholder="t('companyInfo.addressPlaceholder')"
                class="w-full px-4 py-3 rounded-xl border transition-colors"
                :class="[
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                  errors.address ? 'border-red-500' : '',
                ]"
                required
              />
              <p v-if="errors.address" class="text-red-500 text-sm mt-1">
                {{ errors.address }}
              </p>
            </div>

            <!-- Activity Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                {{ t('companyInfo.activityStartMonth') }}
                </label>
                <select
                  v-model="companyInfo.activityStartMonth"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                  "
                >
                  <option value="">Seleccionar mes</option>
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ month }}
                  </option>
                </select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                {{ t('companyInfo.activityStartYear') }}
                </label>
                <input
                  v-model="companyInfo.activityStartYear"
                  type="number"
                  min="1900"
                  :max="new Date().getFullYear()"
                  :placeholder="t('companyInfo.activityStartYear')"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  "
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                    {{ t('companyInfo.numberOfEmployees') }}
                </label>
                <input
                  v-model="companyInfo.numberOfEmployees"
                  type="number"
                  min="0"
                 :placeholder="t('companyInfo.numberOfEmployees')"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  "
                />
              </div>
            </div>

            <!-- Business Description -->
            <div>
              <label
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              >
                {{ t('companyInfo.businessDescription') }}
              </label>
              <textarea
                v-model="companyInfo.businessDescription"
                rows="2"
                :placeholder="t('companyInfo.businessDescription')"
                class="w-full px-4 py-3 max-h-32 rounded-xl border transition-colors resize-none"
                :class="
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                "
              ></textarea>
            </div>

            <!-- Profits Question and Annual Revenue -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Annual Revenue - Moved to left -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ t('companyInfo.annualRevenue') }} *
                </label>
                <select
                  v-model="companyInfo.annualRevenue"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                    errors.annualRevenue ? 'border-red-500' : '',
                  ]"
                  required
                >
                  <option value="">{{ t('companyInfo.selectRange') }}</option>
                  <option value="0-50000">{{ t('companyInfo.revenueOptions.0-50000') }}</option>
                  <option value="50000-100000">{{ t('companyInfo.revenueOptions.50000-100000') }}</option>
                  <option value="100000-250000">{{ t('companyInfo.revenueOptions.100000-250000') }}</option>
                  <option value="250000-500000">{{ t('companyInfo.revenueOptions.250000-500000') }}</option>
                  <option value="500000-1000000">{{ t('companyInfo.revenueOptions.500000-1000000') }}</option>
                  <option value="1000000+">{{ t('companyInfo.revenueOptions.1000000+') }}</option>
                </select>
                <p
                  v-if="errors.annualRevenue"
                  class="text-red-500 text-sm mt-1"
                >
                  {{ errors.annualRevenue }}
                </p>
              </div>

              <!-- Profits Question - Moved to right -->
              <div>
                <label
                  class="block text-sm font-medium mb-3"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ t('companyInfo.profitsQuestion') }} *
                </label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      v-model="companyInfo.hadProfitsLastTwoYears"
                      type="radio"
                      :value="true"
                      class="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span
                      class="ml-2 text-sm"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ t('common.yes') }}
                    </span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="companyInfo.hadProfitsLastTwoYears"
                      type="radio"
                      :value="false"
                      class="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span
                      class="ml-2 text-sm"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ t('common.no') }}
                    </span>
                  </label>
                </div>
                <p
                  v-if="errors.hadProfitsLastTwoYears"
                  class="text-red-500 text-sm mt-1"
                >
                  {{ errors.hadProfitsLastTwoYears }}
                </p>
              </div>
            </div>
            <div class="flex justify-end pt-6">
              <button
                type="submit"
                :disabled="isLoading"
                class="px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                "
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ t('common.loading') }}
                </span>
                <span v-else>{{ t('companyInfo.saveButton') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useDark } from "@vueuse/core";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { BuildingIcon } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const isDark = useDark();
const isLoading = ref(false);
const errors = reactive({});
const { t } = useI18n();
const companyInfo = reactive({
  companyName: "",
  nif: "",
  contactPhone: "",
  alternativePhone: "",
  address: "",
  activityStartMonth: "",
  activityStartYear: "",
  numberOfEmployees: "",
  businessDescription: "",
  website: "",
  annualRevenue: "",
  hadProfitsLastTwoYears: null,
});

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const validateForm = () => {
  let valid = true;
  errors.companyName = "";
  errors.nif = "";
  errors.contactPhone = "";
  errors.address = "";
  errors.annualRevenue = "";
  errors.hadProfitsLastTwoYears = "";

  if (!companyInfo.companyName.trim()) {
    errors.companyName = "El nombre de la empresa es obligatorio";
    valid = false;
  }

  if (!companyInfo.nif.trim()) {
    errors.nif = "El NIF/CIF es obligatorio";
    valid = false;
  }

  if (!companyInfo.contactPhone.trim()) {
    errors.contactPhone = "El teléfono de contacto es obligatorio";
    valid = false;
  }

  if (!companyInfo.address.trim()) {
    errors.address = "La dirección es obligatoria";
    valid = false;
  }

  if (!companyInfo.annualRevenue) {
    errors.annualRevenue = "La facturación anual es obligatoria";
    valid = false;
  }

  if (companyInfo.hadProfitsLastTwoYears === null) {
    errors.hadProfitsLastTwoYears = "Esta pregunta es obligatoria";
    valid = false;
  }

  return valid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Company info submitted:", companyInfo);
    // Here you would typically proceed to the next step
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isLoading.value = false;
  }
};
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