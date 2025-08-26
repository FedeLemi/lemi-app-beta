<template>
  <AuthenticatedLayout
      :page-title="$t('creditOffers.title')"
  :page-description="$t('creditOffers.pageDescription')"
>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">

        </h1>
        <div class="flex space-x-2">
          <button
            class="hidden sm:flex items-center space-x-2 rounded-xl px-4 py-2 transition-all duration-200"
            :class="isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            <i class="fas fa-filter text-sm"></i>
            <span class="text-sm font-medium">{{ $t("filter") }}</span>
          </button>
          <button
            class="sm:hidden rounded-xl p-2 transition-all duration-200"
            :class="isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            <i class="fas fa-filter text-sm"></i>
          </button>
        </div>
      </div>

      <!-- Offers List -->
      <div class="space-y-6">
        <!-- Offer Card -->
        <div
          v-for="(offer, index) in offers"
          :key="index"
          class="rounded-xl overflow-hidden shadow-sm transition-all duration-300"
          :class="[
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
            expandedOffer === index ? 'border-2 border-purple-500' : 'border',
          ]"
        >
          <!-- Offer Header -->
          <div
            class="grid grid-cols-6 gap-4 px-6 py-5 cursor-pointer"
            @click="toggleOffer(index)"
          >
            <!-- Bank & Offer Type -->
            <div class="col-span-6 sm:col-span-2 flex items-center">
              <div class="bg-gray-200 border-2 border-dashed rounded-xl w-14 h-14 flex-shrink-0" />
              <div class="ml-4">
                <h3 class="font-bold text-base" :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ offer.bank }}
                </h3>
                <p class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                  {{ $t(`creditOffers.offerTypes.${offer.type}`) }}
                </p>
              </div>
            </div>

            <!-- Offer Details -->
            <div class="col-span-3 sm:col-span-1">
              <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                {{ $t("creditOffers.loanPrincipal") }}
              </p>
              <p class="text-base font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ formatCurrency(offer.maxAmount) }}
              </p>
            </div>

            <div class="col-span-3 sm:col-span-1">
              <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                {{ $t("creditOffers.amortizationTerm") }}
              </p>
              <p class="text-base font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ offer.term }} {{ $t("months") }}
              </p>
            </div>

            <div class="col-span-3 sm:col-span-1">
              <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                {{ $t("creditOffers.annualNominalRate") }}
              </p>
              <p class="text-base font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ offer.apr }}%
              </p>
            </div>

            <div class="col-span-3 sm:col-span-1 flex items-center justify-end">
              <div class="text-right">
                <div class="text-lg font-bold" :class="isDark ? 'text-purple-400' : 'text-purple-600'">
                  {{ offer.apr }}% {{ $t("creditOffers.APR") }}
                </div>
              </div>
            </div>
          </div>

          <!-- Expandable Content -->
          <div
            v-if="expandedOffer === index"
            class="px-6 py-5 border-t"
            :class="isDark ? 'border-gray-700' : 'border-gray-200'"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
              <!-- Features Column -->
              <div class="md:col-span-8">
                <h4 class="font-medium mb-4 text-base" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  {{ $t("creditOffers.features") }}
                </h4>
                <ul class="space-y-3">
                  <li 
                    class="flex items-start" 
                    v-for="(feature, fIndex) in offer.features" 
                    :key="fIndex"
                  >
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t(`creditOffers.offerFeatures.${feature}`) }}
                    </span>
                  </li>
                  <li class="flex items-start">
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t('creditOffers.offerFeatures.offerExpiration') }}: 09/30/2025
                    </span>
                  </li>
                  <li class="flex items-start">
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t('creditOffers.offerFeatures.gracePeriod') }}: 6 {{ $t('months') }}
                    </span>
                  </li>
                  <li class="flex items-start">
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t('creditOffers.offerFeatures.amortizationSystem') }}: {{ $t('creditOffers.systemTypes.french') }}
                    </span>
                  </li>
                  <li class="flex items-start">
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t('creditOffers.offerFeatures.openingFee') }}: 0.0% (minimum €0.00)
                    </span>
                  </li>
                  <li class="flex items-start">
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t('creditOffers.offerFeatures.assessmentFee') }}: 0.0% (minimum €0.00)
                    </span>
                  </li>
                  <li class="flex items-start">
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t('creditOffers.offerFeatures.earlyCancellation') }}: 0.0% (minimum €0.00)
                    </span>
                  </li>
                  <li class="flex items-start">
                    <i
                      class="fas fa-check-circle mt-0.5 mr-3 text-sm rounded-xl"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                      {{ $t('creditOffers.offerFeatures.latePaymentInterest') }}: 29.0%
                    </span>
                  </li>
                </ul>
              </div>

              <!-- Action Column -->
              <div class="md:col-span-4 flex flex-col items-stretch justify-between">
                <button
                  class="w-full mb-4 rounded-xl py-3 px-4 transition-all duration-200 font-medium"
                  :class="isDark ? 'bg-purple-900/80 text-gray-300 hover:bg-purple-600' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'"
                >
                  {{ $t("creditOffers.applyNow") }}
                </button>
                <p class="text-xs text-right" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  {{ $t("creditOffers.lastUpdated") }}: {{ offer.updatedAt }}
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="px-6 py-3 flex justify-between items-center border-t"
            :class="isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'"
          >
            <div class="flex-1"></div>
            <button
              @click.stop="toggleOffer(index)"
              class="text-sm font-medium flex items-center rounded-xl px-3 py-1"
              :class="isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'"
            >
              {{ expandedOffer === index ? $t("common.showLess") : $t("common.showMore") }}
              <i
                class="ml-2 transition-transform duration-300 text-xs"
                :class="expandedOffer === index ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
              ></i>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="offers.length === 0"
          class="rounded-xl text-center py-16 px-6"
          :class="isDark ? 'bg-gray-800' : 'bg-white'"
        >
          <i
            class="fas fa-inbox text-4xl mb-4"
            :class="isDark ? 'text-gray-500' : 'text-gray-400'"
          ></i>
          <p class="text-base" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            {{ $t("creditOffers.noOffers") }}
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        v-if="offers.length > 0"
      >
        <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          {{ $t("pagination.showing") }} 1-{{ offers.length }}
          {{ $t("pagination.of") }} {{ totalItems }}
        </p>
        <div class="flex space-x-2">
          <button
            :disabled="currentPage === 1"
            :class="[
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700',
              'px-4 py-2 rounded-xl border text-sm font-medium',
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            ]"
          >
            {{ $t("pagination.previous") }}
          </button>
          <button
            :class="[
              isDark ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white',
              'px-4 py-2 rounded-xl border text-sm font-medium'
            ]"
          >
            1
          </button>
          <button
            :class="[
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700',
              'px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-50'
            ]"
          >
            2
          </button>
          <button
            :disabled="currentPage === totalPages"
            :class="[
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700',
              'px-4 py-2 rounded-xl border text-sm font-medium',
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            ]"
          >
            {{ $t("pagination.next") }}
          </button>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref } from "vue";
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

const { t } = useI18n();
const isDark = useDark();
const expandedOffer = ref(null);

const toggleOffer = (index) => {
  expandedOffer.value = expandedOffer.value === index ? null : index;
};

// Sample data for credit offers using translation keys
const offers = ref([
  {
    id: 1,
    bank: "BBVA",
    type: "workingCapital",
    maxAmount: 75000,
    minScore: 720,
    annualFee: "No Fee",
    apr: 4.75,
    term: 60,
    features: [
      "noPrepaymentPenalties",
      "onlineAccountManagement",
      "fastApprovalProcess",
      "flexiblePaymentOptions",
      "competitiveInterestRates"
    ],
    updatedAt: "2023-07-25",
  },
  {
    id: 2,
    bank: "Santander",
    type: "confirming",
    maxAmount: 250000,
    minScore: 680,
    annualFee: "$125",
    apr: 5.25,
    term: 120,
    features: [
      "fixedInterestRates",
      "taxDeductibleInterest",
      "noClosingCosts",
      "loanAmountsUpTo85Percent"
    ],
    updatedAt: "2023-07-20",
  },
  {
    id: 3,
    bank: "Caixa Bank",
    type: "factoring",
    maxAmount: 50000,
    minScore: 660,
    annualFee: "No Fee",
    apr: 6.99,
    term: 36,
    features: [
      "noCollateralRequired",
      "fixedMonthlyPayments",
      "fundsAvailableNextDay",
      "noPrepaymentFees"
    ],
    updatedAt: "2023-07-18",
  },
]);

const totalItems = ref(15);
const currentPage = ref(1);
const totalPages = ref(5);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};
</script>