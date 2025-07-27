<template>
  <AuthenticatedLayout
    page-title="Solicitudes de crédito"
    page-description="Lista de solicitudes registradas"
  >
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1
          class="text-2xl font-bold"
          :class="isDark ? 'text-white' : 'text-gray-800'"
        >
          {{ $t("creditApplication.listTitle") }}
        </h1>
        <Link
          href="/company"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
        >
          <div class="m-2 bg-purple-900 rounded p-2">
            <!-- <PrimaryButton>
            {{ $t("creditApplication.newApplication") }} </PrimaryButton
          > -->
            <a href="/application/create">Nuevo credito</a>
          </div>
        </Link>
      </div>

      <div
        class="rounded-lg overflow-hidden shadow-sm"
        :class="isDark ? 'bg-gray-800' : 'bg-white'"
      >
        <!-- Table Header -->
        <div
          class="grid grid-cols-12 gap-4 px-6 py-4 border-b"
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
            class="col-span-3 text-right font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            Ofertas
            <!-- {{ $t("actions") }} -->
          </div>

          <div
            class="col-span-3 text-right font-medium"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("actions") }}
          </div>
        </div>

        <!-- Table Rows -->
        <div v-for="(application, index) in applications" :key="index">
          <div
            class="grid grid-cols-12 gap-4 px-6 py-4 items-center"
            :class="{
              'border-b': index !== applications.length - 1,
              'border-gray-200': !isDark && index !== applications.length - 1,
              'border-gray-700': isDark && index !== applications.length - 1,
            }"
          >
            <!-- Financing Type -->
            <div
              class="col-span-3"
              :class="isDark ? 'text-gray-200' : 'text-gray-800'"
            >
              {{ application.financingType }}
            </div>

            <!-- Amount -->
            <div
              class="col-span-2"
              :class="isDark ? 'text-gray-200' : 'text-gray-800'"
            >
              {{ formatCurrency(application.amount) }}
            </div>

            <!-- Term -->
            <div
              class="col-span-2"
              :class="isDark ? 'text-gray-200' : 'text-gray-800'"
            >
              {{ application.term }}
            </div>

            <!-- Status -->
            <div class="">
              <span :class="statusClasses(application.status)">
                {{ application.status }}
              </span>
            </div>

            <!-- Credits offers ring bell-->
            <div class="p-8">
              <a href="/application/offers">
                <BellRing class="w-8 h-8 hover text-white"
              /></a>
            </div>

            <!-- Actions -->
            <div class="col-span-3 flex justify-end space-x-2">
              <SecondaryButton>
                <i class="fas fa-eye mr-1"></i> {{ $t("view") }}
              </SecondaryButton>
              <DangerButton>
                <i class="fas fa-trash mr-1"></i> {{ $t("delete") }}
              </DangerButton>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="applications.length === 0" class="text-center py-12">
          <i
            class="fas fa-inbox text-4xl mb-4"
            :class="isDark ? 'text-gray-500' : 'text-gray-400'"
          ></i>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            {{ $t("creditApplication.noApplications") }}
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="mt-6 flex justify-between items-center"
        v-if="applications.length > 0"
      >
        <div :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          {{ $t("pagination.showing") }} 1-{{ applications.length }}
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
            1
          </button>
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
import DangerButton from "@/Components/DangerButton.vue";
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