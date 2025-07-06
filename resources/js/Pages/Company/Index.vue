<template>
  <AuthenticatedLayout
    page-title="Información de la Empresa"
    page-description="Complete los detalles de su empresa"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <span
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            Paso 1 de 3
          </span>
          <span
            class="text-sm font-medium"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            33%
          </span>
        </div>
        <div
          class="w-full bg-gray-200 rounded-full h-2"
          :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"
        >
          <div
            class="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            :style="{ width: '33%' }"
          ></div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="min-h-[600px]">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <div
              class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <BuildingIcon class="w-8 h-8 text-white" />
            </div>
            <h2
              class="text-2xl font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'"
            >
              Información de la Empresa
            </h2>
            <p
              class="text-sm mt-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-600'"
            >
              Complete todos los campos requeridos para continuar
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Company Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  Nombre de la empresa *
                </label>
                <input
                  v-model="companyInfo.companyName"
                  type="text"
                  placeholder="Nombre oficial de la empresa"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
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
                  NIF / CIF *
                </label>
                <input
                  v-model="companyInfo.nif"
                  type="text"
                  placeholder="Ej: B12345678"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
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
                  Teléfono de contacto *
                </label>
                <input
                  v-model="companyInfo.contactPhone"
                  type="tel"
                  placeholder="Ej: 612345678"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
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
                  Teléfono alternativo
                </label>
                <input
                  v-model="companyInfo.alternativePhone"
                  type="tel"
                  placeholder="Ej: 934567890"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
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
                Dirección *
              </label>
              <input
                v-model="companyInfo.address"
                type="text"
                placeholder="Dirección completa"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                :class="[
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
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
                  Mes de inicio
                </label>
                <select
                  v-model="companyInfo.activityStartMonth"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500'
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
                  Año de inicio
                </label>
                <input
                  v-model="companyInfo.activityStartYear"
                  type="number"
                  min="1900"
                  :max="new Date().getFullYear()"
                  placeholder="Año"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  "
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  Cantidad de empleados
                </label>
                <input
                  v-model="companyInfo.numberOfEmployees"
                  type="number"
                  min="0"
                  placeholder="Número de empleados"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
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
                Describe brevemente la actividad de tu empresa
              </label>
              <textarea
                v-model="companyInfo.businessDescription"
                rows="4"
                placeholder="Actividad principal de la empresa..."
                class="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
                :class="
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                "
              ></textarea>
            </div>

            <!-- Website and Revenue -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  Página web
                </label>
                <input
                  v-model="companyInfo.website"
                  type="url"
                  placeholder="https://example.com"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  "
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  Facturación anual aproximada *
                </label>
                <select
                  v-model="companyInfo.annualRevenue"
                  class="w-full px-4 py-3 rounded-lg border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                    errors.annualRevenue ? 'border-red-500' : '',
                  ]"
                  required
                >
                  <option value="">Seleccionar rango</option>
                  <option value="0-50000">Menos de 50.000€</option>
                  <option value="50000-100000">50.000€ - 100.000€</option>
                  <option value="100000-250000">100.000€ - 250.000€</option>
                  <option value="250000-500000">250.000€ - 500.000€</option>
                  <option value="500000-1000000">500.000€ - 1.000.000€</option>
                  <option value="1000000+">Más de 1.000.000€</option>
                </select>
                <p
                  v-if="errors.annualRevenue"
                  class="text-red-500 text-sm mt-1"
                >
                  {{ errors.annualRevenue }}
                </p>
              </div>
            </div>

            <!-- Profits Question -->
            <div>
              <label
                class="block text-sm font-medium mb-3"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              >
                ¿Tu empresa ha presentado beneficios en los últimos 2 años? *
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
                    Sí
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
                    No
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

            <div class="flex justify-between pt-6">
              <button
                type="button"
                class="px-6 py-3 rounded-lg font-medium transition-colors"
                :class="
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                "
              >
                Volver
              </button>

              <button
                type="submit"
                :disabled="isLoading"
                class="px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Procesando...
                </span>
                <span v-else>Continuar</span>
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

const isDark = useDark();
const isLoading = ref(false);
const errors = reactive({});

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