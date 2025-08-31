<template>
  <AuthenticatedLayout
    :page-title="$t('creditApplication.listTitle')"
    :page-description="$t('creditApplication.listDescription')"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center mb-6">
        <h1
          class="text-xl sm:text-2xl font-bold"
          :class="isDark ? 'text-white' : 'text-gray-800'"
        >
        </h1>
        <Link
          href="/application/create"
          class="px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-colors border border-white dark:border-white/20 text-sm sm:text-base"
          :class="
            isDark
              ? 'bg-purple-900/30 hover:bg-purple-800/50 text-purple-50'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
          "
        >
          {{ $t("creditApplication.newApplication") }}
        </Link>
      </div>

      <div
        class="rounded-xl overflow-hidden shadow-sm"
        :class="isDark ? 'bg-gray-800' : 'bg-white'"
      >
        <!-- Desktop Table Header -->
        <div
          class="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b"
          :class="isDark ? 'border-gray-700' : 'border-gray-200'"
        >
          <div
            class="col-span-3 font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("creditApplication.financingType") }}
          </div>

          <div
            class="col-span-2 font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("creditApplication.amount") }}
          </div>

          <div
            class="col-span-2 font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("creditApplication.term") }}
          </div>

          <div
            class="col-span-2 font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("creditApplication.status") }}
          </div>

          <div
            class="col-span-1 text-right font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("creditApplication.offers") }}
          </div>

          <div
            class="col-span-2 text-right font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("creditApplication.actions") }}
          </div>
        </div>

        <!-- Mobile Table Header -->
        <div class="sm:hidden px-4 py-3 border-b" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
          <h3 class="font-medium" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            {{ $t("creditApplication.applications") }}
          </h3>
        </div>

        <!-- Table Rows -->
        <div v-for="(application, index) in applications" :key="index">
          <!-- Desktop Row -->
          <div class="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 items-center"
            :class="{
              'border-b': index !== applications.length - 1,
              'border-gray-200': !isDark && index !== applications.length - 1,
              'border-gray-700': isDark && index !== applications.length - 1,
            }"
          >
            <!-- Desktop Content (same as original) -->
            <div
              class="col-span-3"
              :class="isDark ? 'text-gray-200' : 'text-gray-800'"
            >
              {{ application.financingType }}
            </div>

            <div
              class="col-span-2"
              :class="isDark ? 'text-gray-200' : 'text-gray-800'"
            >
              {{ formatCurrency(application.amount) }}
            </div>

            <div
              class="col-span-2"
              :class="isDark ? 'text-gray-200' : 'text-gray-800'"
            >
              {{ application.term }}
            </div>

            <div class="col-span-2">
              <span :class="statusClasses(application.status)">
                {{ application.status }}
              </span>
            </div>

            <div class="col-span-1 flex justify-end">
              <Link
                href="/application/offers"
                class="p-2 rounded-full transition-colors"
                :class="
                  isDark
                    ? 'hover:bg-gray-700 text-purple-400'
                    : 'hover:bg-gray-100 text-purple-600'
                "
              >
                <BellRing class="w-5 h-5" />
              </Link>
            </div>

            <div class="col-span-2 flex justify-end space-x-2">
              <Link
                href="#"
                class="px-4 py-2 rounded-xl font-medium text-sm transition-colors border border-white dark:border-white/20"
                :class="
                  isDark
                    ? 'bg-purple-900/30 hover:bg-purple-800/50 text-purple-100'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
                "
              >
                {{ $t("view") }}
              </Link>
              <Link
                href="#"
                class="px-4 py-2 rounded-xl font-medium text-sm transition-colors"
                :class="
                  isDark
                    ? 'bg-red-900/30 hover:bg-red-800/50 text-red-100 border border-red-900/50'
                    : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                "
              >
                {{ $t("delete") }}
              </Link>
            </div>
          </div>

          <!-- Mobile Row -->
          <div class="sm:hidden px-4 py-3 border-b" 
            :class="{
              'border-gray-200': !isDark,
              'border-gray-700': isDark,
            }"
          >
            <div class="flex justify-between items-start mb-2">
              <div :class="isDark ? 'text-gray-200' : 'text-gray-800'">
                {{ application.financingType }}
              </div>
              <div>
                <span :class="statusClasses(application.status)">
                  {{ application.status }}
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  {{ $t("creditApplication.amount") }}
                </p>
                <p :class="isDark ? 'text-gray-200' : 'text-gray-800'">
                  {{ formatCurrency(application.amount) }}
                </p>
              </div>
              <div>
                <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  {{ $t("creditApplication.term") }}
                </p>
                <p :class="isDark ? 'text-gray-200' : 'text-gray-800'">
                  {{ application.term }}
                </p>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <Link
                href="/application/offers"
                class="p-2 rounded-full transition-colors"
                :class="
                  isDark
                    ? 'hover:bg-gray-700 text-purple-400'
                    : 'hover:bg-gray-100 text-purple-600'
                "
              >
                <BellRing class="w-5 h-5" />
              </Link>
              
              <div class="flex space-x-2">
                <Link
                  href="#"
                  class="px-3 py-1 rounded-xl font-medium text-xs transition-colors border border-white dark:border-white/20"
                  :class="
                    isDark
                      ? 'bg-purple-900/30 hover:bg-purple-800/50 text-purple-100'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
                  "
                >
                  {{ $t("view") }}
                </Link>
                <Link
                  href="#"
                  class="px-3 py-1 rounded-xl font-medium text-xs transition-colors"
                  :class="
                    isDark
                      ? 'bg-red-900/30 hover:bg-red-800/50 text-red-100 border border-red-900/50'
                      : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                  "
                >
                  {{ $t("delete") }}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="applications.length === 0" class="text-center py-12 px-4">
          <i
            class="fas fa-inbox text-3xl sm:text-4xl mb-4"
            :class="isDark ? 'text-gray-500' : 'text-gray-400'"
          ></i>
          <p class="text-sm sm:text-base" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            {{ $t("creditApplication.noApplications") }}
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 px-4 sm:px-0"
        v-if="applications.length > 0"
      >
        <div class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          {{ $t("pagination.showing") }} 1-{{ applications.length }}
          {{ $t("pagination.of") }} {{ totalItems }}
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            :disabled="currentPage === 1"
            class="px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition-colors border border-white dark:border-white/20 disabled:opacity-50"
            :class="
              isDark
                ? 'bg-purple-900/30 hover:bg-purple-800/50 text-purple-100'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
            "
          >
            {{ $t("pagination.previous") }}
          </button>
          <button
            class="px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition-colors"
            :class="
              isDark
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            "
          >
            1
          </button>
          <button
            class="px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition-colors border border-white dark:border-white/20"
            :class="
              isDark
                ? 'bg-purple-900/30 hover:bg-purple-800/50 text-purple-100'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
            "
          >
            2
          </button>
          <button
            :disabled="currentPage === totalPages"
            class="px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition-colors border border-white dark:border-white/20 disabled:opacity-50"
            :class="
              isDark
                ? 'bg-purple-900/30 hover:bg-purple-800/50 text-purple-100'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
            "
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
import { Link } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { BellRing } from "lucide-vue-next";

const { t } = useI18n();
const isDark = useDark();

// Sample data - replace with real data from API
const applications = ref([
  {
    id: 1,
    financingType: "Línea de crédito",
    amount: 25000,
    term: "12 meses",
    purpose: "Capital de trabajo para expansión",
    status: "Pendiente",
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    financingType: "Préstamo a corto plazo",
    amount: 15000,
    term: "6 meses",
    purpose: "Compra de equipos nuevos",
    status: "Aprobado",
    createdAt: "2023-06-02",
  },
  {
    id: 3,
    financingType: "Leasing",
    amount: 75000,
    term: "36 meses",
    purpose: "Adquisición de vehículos corporativos",
    status: "Rechazado",
    createdAt: "2023-06-20",
  },
]);

const totalItems = ref(15);
const currentPage = ref(1);
const totalPages = ref(5);

const statusClasses = (status) => {
  const base = "px-3 py-1 rounded-full text-xs font-medium";
  if (status === "Aprobado") {
    return `${base} bg-green-100 text-green-800`;
  } else if (status === "Rechazado") {
    return `${base} bg-red-100 text-red-800`;
  }
  return `${base} bg-yellow-100 text-yellow-800`;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
};
</script>