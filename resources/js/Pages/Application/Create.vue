<template>
  <AuthenticatedLayout
    :page-title="$t('creditApplication.create.pageTitle')"
    :page-description="$t('creditApplication.create.pageDescription')"
  >
    <div class="max-w-6xl mx-auto">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h2
            class="text-2xl font-bold mb-2 font-serif"
            :class="isDark ? 'text-white' : 'text-gray-900'"
          >
          </h2>
        </div>

        <form class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Amount (with € symbol) -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.amount') }}
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2" :class="isDark ? 'text-gray-400' : 'text-gray-500'">€</span>
                  <input
                    v-model="form.amount"
                    type="text"
                    @input="handleAmountInput"
                    class="w-full px-4 py-3 rounded-xl border transition-colors pl-8"
                    :class="[
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                    ]"
                    required
                  />
                </div>  
              </div>
              
              <!-- Financing Type -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.financingType') }}
                </label>
                <select
                  v-model="form.financingType"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                  ]"
                  required
                >
                  <option value="">{{ $t('creditApplication.create.finTypes') }}</option>
                  <option 
                    v-for="option in financingTypeOptions" 
                    :key="option.value" 
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              
              <!-- Grace Period -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.gracePeriod') }}
                </label>
                <select
                  v-model="form.gracePeriod"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                  ]"
                  required
                >
                  <option value="">{{ $t('creditApplication.create.gPeriod') }}</option>
                  <option 
                    v-for="option in gracePeriodOptions" 
                    :key="option.value" 
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Funding Timing -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.fundingTiming') }}
                </label>
                <select
                  v-model="form.fundingTiming"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                  ]"
                  required
                >
                  <option value="">{{ $t('creditApplication.create.fTiming') }}</option>
                  <option 
                    v-for="option in fundingTimingOptions" 
                    :key="option.value" 
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div> <!-- End Left Column -->

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Term -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.term') }}
                </label>
                <select
                  v-model="form.term"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                  ]"
                  required
                >
                  <option value="">{{ $t('creditApplication.create.termfin') }}</option>
                  <option 
                    v-for="option in termOptions" 
                    :key="option.value" 
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              
              <!-- Has Guarantees -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.hasGuarantees') }}
                </label>
                <select
                  v-model="form.hasGuarantees"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                  ]"
                  required
                >
                  <option value="">{{ $t('creditApplication.create.hasGuarrants') }}</option>
                  <option 
                    v-for="option in yesNoOptions" 
                    :key="option.value" 
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Current Banks -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.currentBanks') }}
                </label>
                <div class="space-y-3">
                  <div
                    class="rounded-xl p-3 cursor-pointer transition-colors border"
                    :class="[
                      isDark
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200',
                    ]"
                    @click="showCurrentBanks = !showCurrentBanks"
                  >
                    <div class="flex items-center justify-between">
                      <span :class="isDark ? 'text-gray-600' : 'text-gray-900'">
                        {{ form.currentBanks.length > 0
                          ? $t('creditApplication.create.banksSelected', { count: form.currentBanks.length })
                          : $t('creditApplication.create.selectBanks') }}
                      </span>
                      <div :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                        {{ showCurrentBanks ? '▲' : '▼' }}
                      </div>
                    </div>
                  </div>

                  <!-- Selected banks display -->
                  <div v-if="form.currentBanks.length > 0" class="flex flex-wrap gap-2">
                    <div
                      v-for="bankId in form.currentBanks"
                      :key="bankId"
                      class="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors"
                      :class="isDark ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'"
                    >
                      {{ getBankName(bankId) }}
                      <button
                        type="button"
                        class="ml-1 transition-colors"
                        :class="isDark ? 'text-white hover:text-red-300' : 'text-purple-800 hover:text-red-500'"
                        @click.stop="removeCurrentBank(bankId)"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Bank options dropdown -->
                  <div
                    v-if="showCurrentBanks"
                    class="rounded-xl p-3 space-y-2 border"
                    :class="isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'"
                  >
                    <div
                      v-for="bank in SPANISH_BANKS"
                      :key="bank.id"
                      class="flex items-center space-x-2"
                    >
                      <div class="relative">
                        <input
                          type="checkbox"
                          :id="'current-bank-' + bank.id"
                          :checked="form.currentBanks.includes(bank.id)"
                          @change="() => toggleCurrentBank(bank.id)"
                          class="sr-only"
                        />
                        <div
                          class="w-4 h-4 border-2 rounded cursor-pointer transition-colors flex items-center justify-center"
                          :class="[
                            form.currentBanks.includes(bank.id)
                              ? isDark
                                ? 'bg-purple-900 border-purple-900'
                                : 'bg-purple-800 border-purple-800'
                              : isDark
                                ? 'border-gray-500 hover:border-gray-400'
                                : 'border-gray-400 hover:border-gray-500',
                          ]"
                          @click="toggleCurrentBank(bank.id)"
                        >
                          <svg
                            v-if="form.currentBanks.includes(bank.id)"
                            class="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        :for="'current-bank-' + bank.id"
                        class="cursor-pointer flex-1"
                        :class="isDark ? 'text-white' : 'text-gray-900'"
                      >
                        {{ bank.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Has Applied With Banks -->
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.hasAppliedWithBanks') }}
                </label>
                <select
                  v-model="form.hasAppliedWithBanks"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-600 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                  ]"
                  required
                  @change="handleAppliedWithBanksChange"
                >
                  <option value="">{{ $t('creditApplication.create.whityourhbanks') }}</option>
                  <option 
                    v-for="option in yesNoOptions" 
                    :key="option.value" 
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Applied Banks (conditional) -->
              <div v-if="form.hasAppliedWithBanks === 'yes'">
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('creditApplication.create.appliedBanks') }}
                </label>
                <div class="space-y-3">
                  <div
                    class="rounded-md p-3 cursor-pointer transition-colors border"
                    :class="[
                      isDark
                        ? 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200',
                    ]"
                    @click="showAppliedBanks = !showAppliedBanks"
                  >
                    <div class="flex items-center justify-between">
                      <span :class="isDark ? 'text-white' : 'text-gray-900'">
                        {{ form.appliedBanks.length > 0
                          ? $t('creditApplication.create.banksSelected', { count: form.appliedBanks.length })
                          : $t('creditApplication.create.selectBanks') }}
                      </span>
                      <div :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                        {{ showAppliedBanks ? '▲' : '▼' }}
                      </div>
                    </div>
                  </div>

                  <!-- Selected banks display -->
                  <div v-if="form.appliedBanks.length > 0" class="flex flex-wrap gap-2">
                    <div
                      v-for="bankId in form.appliedBanks"
                      :key="bankId"
                      class="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors"
                      :class="isDark ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'"
                    >
                      {{ getBankName(bankId) }}
                      <button
                        type="button"
                        class="ml-1 transition-colors"
                        :class="isDark ? 'text-white hover:text-red-300' : 'text-purple-800 hover:text-red-500'"
                        @click.stop="removeAppliedBank(bankId)"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Bank options dropdown -->
                  <div
                    v-if="showAppliedBanks"
                    class="rounded-xl p-3 space-y-2 border"
                    :class="isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'"
                  >
                    <div
                      v-for="bank in SPANISH_BANKS"
                      :key="bank.id"
                      class="flex items-center space-x-2"
                    >
                      <div class="relative">
                        <input
                          type="checkbox"
                          :id="'applied-bank-' + bank.id"
                          :checked="form.appliedBanks.includes(bank.id)"
                          @change="() => toggleAppliedBank(bank.id)"
                          class="sr-only"
                        />
                        <div
                          class="w-4 h-4 border-2 rounded cursor-pointer transition-colors flex items-center justify-center"
                          :class="[
                            form.appliedBanks.includes(bank.id)
                              ? isDark
                                ? 'bg-purple-600 border-purple-600'
                                : 'bg-purple-500 border-purple-500'
                              : isDark
                                ? 'border-gray-500 hover:border-gray-400'
                                : 'border-gray-400 hover:border-gray-500',
                          ]"
                          @click="toggleAppliedBank(bank.id)"
                        >
                          <svg
                            v-if="form.appliedBanks.includes(bank.id)"
                            class="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        :for="'applied-bank-' + bank.id"
                        class="cursor-pointer flex-1"
                        :class="isDark ? 'text-white' : 'text-gray-900'"
                      >
                        {{ bank.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div> <!-- End Right Column -->
          </div> <!-- End Grid -->

          <!-- Additional Comments -->
          <div>
            <label
              class="block text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-200' : 'text-gray-700'"
            >
              {{ $t('creditApplication.create.additionalComments') }}
            </label>
            <textarea
              v-model="form.additionalComments"
              rows="3"
              class="w-full px-4 py-3 rounded-xl border transition-colors resize-none"
              :class="
                isDark
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-600 focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
              "
            ></textarea>
          </div>

          <!-- Send Button -->
          <div class="flex justify-end pt-6">
            <button
              type="button"
              @click="submitForm"
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
                {{ $t('common.loading') }}
              </span>
              <span v-else>{{ $t("creditApplication.create.sendButton") }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useApplicationStore } from "../stores/applicationStore";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();
const isLoading = ref(false);
const showCurrentBanks = ref(false);
const showAppliedBanks = ref(false);

// Spanish banks data
const SPANISH_BANKS = [
  { id: "santander", name: "Santander" },
  { id: "bbva", name: "BBVA" },
  { id: "sabadell", name: "Sabadell" },
  { id: "caixabank", name: "CaixaBank" },
  { id: "bankinter", name: "Bankinter" },
  { id: "unicaja", name: "Unicaja" },
  { id: "ibercaja", name: "Ibercaja" },
  { id: "other", name: t('banks.other') },
];

// Form data
const form = ref({
  financingType: "",
  amount: "",
  gracePeriod: "",
  term: "",
  hasGuarantees: "",
  currentBanks: [],
  hasAppliedWithBanks: "",
  appliedBanks: [],
  fundingTiming: "",
  additionalComments: "",
});

// Get bank name by ID
const getBankName = (bankId) => {
  const bank = SPANISH_BANKS.find(b => b.id === bankId);
  return bank ? bank.name : bankId;
};

// Toggle bank selection for current banks
const toggleCurrentBank = (bankId) => {
  const index = form.value.currentBanks.indexOf(bankId);
  if (index === -1) {
    form.value.currentBanks.push(bankId);
  } else {
    form.value.currentBanks.splice(index, 1);
  }
};

// Remove current bank
const removeCurrentBank = (bankId) => {
  form.value.currentBanks = form.value.currentBanks.filter(id => id !== bankId);
};

// Toggle bank selection for applied banks
const toggleAppliedBank = (bankId) => {
  const index = form.value.appliedBanks.indexOf(bankId);
  if (index === -1) {
    form.value.appliedBanks.push(bankId);
  } else {
    form.value.appliedBanks.splice(index, 1);
  }
};

// Remove applied bank
const removeAppliedBank = (bankId) => {
  form.value.appliedBanks = form.value.appliedBanks.filter(id => id !== bankId);
};

// Reactive options using computed properties
const financingTypeOptions = computed(() => [
  { value: "lineOfCredit", label: t('creditApplication.create.financingTypes.lineOfCredit') },
  { value: "cashAdvance", label: t('creditApplication.create.financingTypes.cashAdvance') },
  { value: "confirming", label: t('creditApplication.create.financingTypes.confirming') },
  { value: "commercialDiscount", label: t('creditApplication.create.financingTypes.commercialDiscount') },
  { value: "shortTermLoan", label: t('creditApplication.create.financingTypes.shortTermLoan') },
  { value: "exportFinancing", label: t('creditApplication.create.financingTypes.exportFinancing') },
  { value: "importFinancing", label: t('creditApplication.create.financingTypes.importFinancing') },
  { value: "multiLine", label: t('creditApplication.create.financingTypes.multiLine') },
  { value: "longTermLoan", label: t('creditApplication.create.financingTypes.longTermLoan') },
  { value: "leasing", label: t('creditApplication.create.financingTypes.leasing') },
  { value: "renting", label: t('creditApplication.create.financingTypes.renting') },
  { value: "factoring", label: t('creditApplication.create.financingTypes.factoring') },
  { value: "invoiceAdvance", label: t('creditApplication.create.financingTypes.invoiceAdvance') },
  { value: "guarantees", label: t('creditApplication.create.financingTypes.guarantees') },
]);

const gracePeriodOptions = computed(() => [
  { value: "3months", label: t('creditApplication.create.termOptions.3months') },
  { value: "6months", label: t('creditApplication.create.termOptions.6months') },
  { value: "12months", label: t('creditApplication.create.termOptions.12months') },
  { value: "18months", label: t('creditApplication.create.termOptions.18months') },
  { value: "24months", label: t('creditApplication.create.termOptions.24months') },
]);

const termOptions = computed(() => [
  { value: "12months", label: t('creditApplication.create.termOptions.12months') },
  { value: "18months", label: t('creditApplication.create.termOptions.18months') },
  { value: "24months", label: t('creditApplication.create.termOptions.24months') },
  { value: "36months", label: t('creditApplication.create.termOptions.36months') },
  { value: "48months", label: t('creditApplication.create.termOptions.48months') },
  { value: "60months", label: t('creditApplication.create.termOptions.60months') },
]);

const yesNoOptions = computed(() => [
  { value: "yes", label: t('common.yes') },
  { value: "no", label: t('common.no') },
]);

const fundingTimingOptions = computed(() => [
  { value: "immediate", label: t('creditApplication.create.fundingTimingOptions.immediate') },
  { value: "oneTwoWeeks", label: t('creditApplication.create.fundingTimingOptions.oneTwoWeeks') },
  { value: "oneMonth", label: t('creditApplication.create.fundingTimingOptions.oneMonth') },
  { value: "twoThreeMonths", label: t('creditApplication.create.fundingTimingOptions.twoThreeMonths') },
  { value: "moreThanThreeMonths", label: t('creditApplication.create.fundingTimingOptions.moreThanThreeMonths') },
]);

// Handle amount input formatting
const handleAmountInput = (event) => {
  let value = event.target.value.replace(/[^\d.]/g, '');
  const decimalCount = value.split('.').length - 1;
  if (decimalCount > 1) {
    value = value.substring(0, value.lastIndexOf('.'));
  }
  form.value.amount = value;
};

// Handle change in hasAppliedWithBanks
const handleAppliedWithBanksChange = () => {
  if (form.value.hasAppliedWithBanks === "no") {
    form.value.appliedBanks = [];
  }
};

// Submit form
const submitForm = async () => {
  if (!form.value.financingType || !form.value.amount || !form.value.gracePeriod || 
      !form.value.term || !form.value.hasGuarantees || !form.value.fundingTiming) {
    alert(t('common.fillRequiredFields'));
    return;
  }

  isLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", form.value);
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isLoading.value = false;
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