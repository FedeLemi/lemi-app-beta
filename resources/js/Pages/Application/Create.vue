<template>
  <AuthenticatedLayout
    page-title="Solicitud de crédito"
    page-description="Complete los detalles de su solicitud"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Progress Bar -->
      <!-- <div class="mb-8">
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
      </div> -->

      <!-- Step Content -->
      <div class="rounded-lg p-6" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <h2
          class="text-xl font-bold mb-6"
          :class="isDark ? 'text-white' : 'text-gray-800'"
        >
          {{ $t("creditApplication.title") }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <!-- Tipo de financiación -->
            <div class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.financingType')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <Select
                v-model="form.financingType"
                :options="financingTypeOptions"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                required
              />
            </div>

            <!-- Monto -->
            <div class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.amount')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <NumericInput
                v-model="form.amount"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                required
              />
            </div>

            <!-- Plazo -->
            <div class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.term')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <Select
                v-model="form.term"
                :options="termOptions"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                required
              />
            </div>

            <!-- ¿Tu empresa cuenta con garantias o aval de los socios? -->
            <div class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.hasGuarantees')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <Select
                v-model="form.hasGuarantees"
                :options="yesNoOptions"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                required
              />
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Finalidad / Destino de los fondos -->
            <div class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.purpose')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <TextAreaInput
                v-model="form.purpose"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
                required
              />
            </div>

            <!-- ¿Con qué bancos opera actualmente tu empresa? -->
            <div class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.currentBanks')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <MultiSelect
                v-model="form.currentBanks"
                :options="bankOptions"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                multiple
              />
            </div>

            <!-- ¿Has iniciado solicitud con alguno de ellos? -->
            <div class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.hasAppliedWithBanks')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <Select
                v-model="form.hasAppliedWithBanks"
                :options="yesNoOptions"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                required
                @change="handleAppliedWithBanksChange"
              />
            </div>

            <!-- ¿Con cuáles? (only shown if hasAppliedWithBanks is true) -->
            <div v-if="form.hasAppliedWithBanks === 'Sí'" class="space-y-2">
              <InputLabel
                :value="$t('creditApplication.appliedBanks')"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              />
              <MultiSelect
                v-model="form.appliedBanks"
                :options="bankOptions"
                :class="[
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                ]"
                class="w-full px-4 py-3 rounded-lg border transition-colors"
                multiple
              />
            </div>
          </div>
        </div>

        <!-- Full width fields -->
        <div class="mt-6 space-y-6">
          <!-- ¿Cuándo necesitas disponer de la financiación? -->
          <div class="space-y-2">
            <InputLabel
              :value="$t('creditApplication.fundingTiming')"
              :class="isDark ? 'text-gray-200' : 'text-gray-700'"
            />
            <Select
              v-model="form.fundingTiming"
              :options="fundingTimingOptions"
              :class="[
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
              ]"
              class="w-full px-4 py-3 rounded-lg border transition-colors"
              required
            />
          </div>

          <!-- ¿Quieres comentar algo más acerca de tu solicitud? -->
          <div class="space-y-2">
            <InputLabel
              :value="$t('creditApplication.additionalComments')"
              :class="isDark ? 'text-gray-200' : 'text-gray-700'"
            />
            <TextAreaInput
              v-model="form.additionalComments"
              :class="[
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              ]"
              class="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import TextAreaInput from "@/Components/TextAreaInput.vue";
import NumericInput from "@/Components/NumericInput.vue";
import Select from "@/Components/Select.vue";
import MultiSelect from "@/Components/MultiSelect.vue";
import { useApplicationStore } from "../stores/applicationStore";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();

// Form data
const form = ref({
  financingType: "",
  amount: "",
  term: "",
  purpose: "",
  hasGuarantees: "",
  currentBanks: [],
  hasAppliedWithBanks: "",
  appliedBanks: [],
  fundingTiming: "",
  additionalComments: "",
});

// Options for select fields
const financingTypeOptions = ref([
  { value: "Línea de crédito", label: "Línea de crédito" },
  { value: "Anticipo de caja", label: "Anticipo de caja" },
  { value: "Confirming", label: "Confirming" },
  { value: "Descuento comercial", label: "Descuento comercial" },
  { value: "Préstamo a corto plazo", label: "Préstamo a corto plazo" },
  { value: "Financiación export", label: "Financiación export" },
  { value: "Financiación import", label: "Financiación import" },
  { value: "Multilínea", label: "Multilínea" },
  { value: "Préstamo largo plazo", label: "Préstamo largo plazo" },
  { value: "Leasing", label: "Leasing" },
  { value: "Renting", label: "Renting" },
  { value: "Factoring", label: "Factoring" },
  { value: "Anticipo facturas", label: "Anticipo facturas" },
  { value: "Avales", label: "Avales" },
]);

const termOptions = ref([
  { value: "3 meses", label: "3 meses" },
  { value: "6 meses", label: "6 meses" },
  { value: "12 meses", label: "12 meses" },
  { value: "18 meses", label: "18 meses" },
  { value: "24 meses", label: "24 meses" },
  { value: "36 meses", label: "36 meses" },
  { value: "48 meses", label: "48 meses" },
  { value: "60 meses", label: "60 meses" },
]);

const yesNoOptions = ref([
  { value: "Sí", label: "Sí" },
  { value: "No", label: "No" },
]);

const bankOptions = ref([
  { value: "Santander", label: "Santander" },
  { value: "BBVA", label: "BBVA" },
  { value: "CaixaBank", label: "CaixaBank" },
  { value: "Bankia", label: "Bankia" },
  { value: "Sabadell", label: "Sabadell" },
  { value: "Bankinter", label: "Bankinter" },
  { value: "ING", label: "ING" },
  { value: "Deutsche Bank", label: "Deutsche Bank" },
  { value: "BNP Paribas", label: "BNP Paribas" },
  { value: "Otro", label: "Otro" },
]);

const fundingTimingOptions = ref([
  { value: "Inmediato", label: "Inmediato" },
  { value: "1-2 semanas", label: "1-2 semanas" },
  { value: "1 mes", label: "1 mes" },
  { value: "2-3 meses", label: "2-3 meses" },
  { value: "Más de 3 meses", label: "Más de 3 meses" },
]);

// Handle change in hasAppliedWithBanks
const handleAppliedWithBanksChange = () => {
  if (form.value.hasAppliedWithBanks === "No") {
    form.value.appliedBanks = [];
  }
};

// Load saved data when component mounts
onMounted(() => {
  if (store.creditApplicationData) {
    form.value = { ...store.creditApplicationData };
  }
});

// Save form data to store whenever it changes
watch(
  form,
  (newValue) => {
    store.setCreditApplicationData(newValue);
  },
  { deep: true }
);
</script>