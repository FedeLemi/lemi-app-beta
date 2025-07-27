<template>
  <AuthenticatedLayout
    page-title="Ofertas de Crédito"
    page-description="Compara y selecciona las mejores ofertas de crédito"
  >
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1
          class="text-2xl font-bold"
          :class="isDark ? 'text-white' : 'text-gray-800'"
        >
          {{ $t("creditOffers.title") }}
        </h1>
        <PrimaryButton>
          <i class="fas fa-filter mr-2"></i> {{ $t("filter") }}
        </PrimaryButton>
      </div>

      <div class="space-y-4">
        <!-- Offer Card -->
        <div
          v-for="(offer, index) in offers"
          :key="index"
          class="rounded-lg overflow-hidden shadow-sm transition-all duration-300"
          :class="[
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
            expandedOffer === index ? 'border-2 border-purple-500' : 'border',
          ]"
        >
          <!-- Offer Header -->
          <div
            class="grid grid-cols-12 gap-4 px-6 py-4 cursor-pointer"
            @click="toggleOffer(index)"
          >
            <!-- Bank & Offer Type -->
            <div class="col-span-12 md:col-span-4 flex items-center">
              <div
                class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16"
              />
              <div class="ml-4">
                <h3
                  class="font-bold"
                  :class="isDark ? 'text-white' : 'text-gray-900'"
                >
                  {{ offer.bank }}
                </h3>
                <p :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                  {{ offer.type }}
                </p>
              </div>
            </div>

            <!-- Offer Details -->
            <div class="col-span-6 md:col-span-2">
              <p
                class="text-sm"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                {{ $t("creditOffers.maxAmount") }}
              </p>
              <p :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ formatCurrency(offer.maxAmount) }}
              </p>
            </div>

            <div class="col-span-6 md:col-span-2">
              <p
                class="text-sm"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                {{ $t("creditOffers.minScore") }}
              </p>
              <p :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ offer.minScore }}
              </p>
            </div>

            <div class="col-span-6 md:col-span-2">
              <p
                class="text-sm"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                {{ $t("creditOffers.annualFee") }}
              </p>
              <p :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ offer.annualFee }}
              </p>
            </div>

            <div class="col-span-6 md:col-span-2 flex items-center justify-end">
              <div class="text-right">
                <div
                  class="text-lg font-bold"
                  :class="isDark ? 'text-purple-400' : 'text-purple-600'"
                >
                  {{ offer.apr }}% APR
                </div>
                <div :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                  {{ offer.term }} meses
                </div>
              </div>
            </div>
          </div>

          <!-- Expandable Content -->
          <div
            v-if="expandedOffer === index"
            class="px-6 py-4 border-t"
            :class="isDark ? 'border-gray-700' : 'border-gray-200'"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
              <!-- Features Column -->
              <div class="md:col-span-8">
                <h4
                  class="font-medium mb-3"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                >
                  {{ $t("creditOffers.features") }}
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="(feature, featureIndex) in offer.features"
                    :key="featureIndex"
                    class="flex items-start"
                  >
                    <i
                      class="fas fa-check-circle mt-1 mr-3"
                      :class="isDark ? 'text-green-400' : 'text-green-600'"
                    ></i>
                    <span :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{
                      feature
                    }}</span>
                  </li>
                </ul>
              </div>

              <!-- Action Column -->
              <div
                class="md:col-span-4 flex flex-col items-end justify-between"
              >
                <div class="w-full md:w-auto">
                  <PrimaryButton class="w-full mb-3">
                    {{ $t("creditOffers.applyNow") }}
                  </PrimaryButton>
                  <SecondaryButton class="w-full">
                    <i class="far fa-file-alt mr-2"></i>
                    {{ $t("creditOffers.viewDetails") }}
                  </SecondaryButton>
                </div>
                <div
                  class="mt-4 text-right text-sm"
                  :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                >
                  {{ $t("creditOffers.lastUpdated") }}: {{ offer.updatedAt }}
                </div>
              </div>
            </div>
          </div>

          <!-- Features Footer -->
          <div
            class="px-6 py-3 flex justify-between items-center border-t"
            :class="
              isDark
                ? 'border-gray-700 bg-gray-750'
                : 'border-gray-200 bg-gray-50'
            "
          >
            <div class="flex items-center">
              <span
                class="mr-2"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                {{
                  $t("creditOffers.benefitsCount", {
                    count: offer.features.length,
                  })
                }}
              </span>
              <span
                class="px-2 py-1 rounded-full text-xs"
                :class="
                  isDark
                    ? 'bg-purple-900 text-purple-200'
                    : 'bg-purple-100 text-purple-800'
                "
              >
                {{ offer.features.length }} {{ $t("creditOffers.benefits") }}
              </span>
            </div>
            <button
              @click="toggleOffer(index)"
              class="text-purple-600 hover:text-purple-800 flex items-center"
              :class="{ 'text-purple-400': isDark }"
            >
              {{ expandedOffer === index ? $t("showLess") : $t("showMore") }}
              <i
                class="ml-1 transition-transform duration-300"
                :class="
                  expandedOffer === index
                    ? 'fas fa-chevron-up'
                    : 'fas fa-chevron-down'
                "
              ></i>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="offers.length === 0"
          class="rounded-lg text-center py-12"
          :class="isDark ? 'bg-gray-800' : 'bg-white'"
        >
          <i
            class="fas fa-inbox text-4xl mb-4"
            :class="isDark ? 'text-gray-500' : 'text-gray-400'"
          ></i>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            {{ $t("creditOffers.noOffers") }}
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="mt-6 flex justify-between items-center"
        v-if="offers.length > 0"
      >
        <div :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          {{ $t("pagination.showing") }} 1-{{ offers.length }}
          {{ $t("pagination.of") }} {{ totalItems }}
        </div>
        <div class="flex space-x-2">
          <button
            :disabled="currentPage === 1"
            :class="[
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700',
              'px-3 py-1 rounded border',
            ]"
          >
            {{ $t("pagination.previous") }}
          </button>
          <button
            :class="[
              isDark ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white',
              'px-3 py-1 rounded border',
            ]"
          >
            1</button
          >a
          <button
            :class="[
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700',
              'px-3 py-1 rounded border',
            ]"
          >
            2
          </button>
          <button
            :disabled="currentPage === totalPages"
            :class="[
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700',
              'px-3 py-1 rounded border',
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
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";

const { t } = useI18n();
const isDark = useDark();
const expandedOffer = ref(null);

const toggleOffer = (index) => {
  expandedOffer.value = expandedOffer.value === index ? null : index;
};

// Sample data for credit offers
const offers = ref([
  {
    id: 1,
    bank: "Bank of America",
    type: "Auto Loan",
    maxAmount: 75000,
    minScore: 720,
    annualFee: "No Fee",
    apr: 4.75,
    term: 60,
    features: [
      "No prepayment penalties",
      "Online account management",
      "Fast approval process",
      "Flexible payment options",
      "Competitive interest rates",
    ],
    updatedAt: "2023-07-25",
  },
  {
    id: 2,
    bank: "Chase Bank",
    type: "Home Equity Loan",
    maxAmount: 250000,
    minScore: 680,
    annualFee: "$125",
    apr: 5.25,
    term: 120,
    features: [
      "Fixed interest rates",
      "Tax deductible interest",
      "No closing costs",
      "Loan amounts up to 85% of home value",
    ],
    updatedAt: "2023-07-20",
  },
  {
    id: 3,
    bank: "Wells Fargo",
    type: "Personal Loan",
    maxAmount: 50000,
    minScore: 660,
    annualFee: "No Fee",
    apr: 6.99,
    term: 36,
    features: [
      "No collateral required",
      "Fixed monthly payments",
      "Funds available next business day",
      "No prepayment fees",
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