<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import TextAreaInput from "@/Components/TextAreaInput.vue";
import NumericInput from "@/Components/NumericInput.vue";
import Select from "@/Components/Select.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useDark } from "@vueuse/core";
import {
  FileTextIcon,
  XIcon,
  UploadIcon,
  CreditCardIcon,
  FileIcon,
  BriefcaseIcon,
  BuildingIcon,
} from "lucide-vue-next";
import { useI18n } from "vue-i18n"; // Add this import

const { t } = useI18n(); // Initialize i18n
const $t = t; // Expose t as $t for template

const isDark = useDark();

// Track the current step
const currentStep = ref(1);

const employeeCount = ref(0);
const businessExplanation = ref("");
const selectedActivity = ref("");

// Change the step when a step is clicked
const goToStep = (step) => {
  currentStep.value = step;
};

const options = ref([
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

const isTouched = ref({
  employeeCount: false,
  businessExplanation: false,
  selectedActivity: false,
});

const optionsActivities = ref([
  {
    value: "Agricultura, ganadería, silvicultura y pesca",
    label: "Agricultura, ganadería, silvicultura y pesca",
  },
  { value: "Industrias extractivas", label: "Industrias extractivas" },
  { value: "Industria manufacturera", label: "Industria manufacturera" },
  {
    value: "Suministro de energía eléctrica, gas, vapor y aire acondicionado",
    label: "Suministro de energía eléctrica, gas, vapor y aire acondicionado",
  },
  {
    value:
      "Suministro de agua, actividades de saneamiento, gestión de residuos y descontaminación",
    label:
      "Suministro de agua, actividades de saneamiento, gestión de residuos y descontaminación",
  },
  { value: "Construcción", label: "Construcción" },
  {
    value:
      "Comercio al por mayor y al por menor; reparación de vehículos de motor y motocicletas",
    label:
      "Comercio al por mayor y al por menor; reparación de vehículos de motor y motocicletas",
  },
  {
    value: "Transporte y almacenamiento",
    label: "Transporte y almacenamiento",
  },
  {
    value: "Transporte y almacenamiento",
    label: "Transporte y almacenamiento",
  },
  {
    value: "Información y comunicaciones",
    label: "Información y comunicaciones",
  },
  {
    value: "Actividades financieras y de seguros",
    label: "Actividades financieras y de seguros",
  },
  { value: "Actividades inmobiliarias", label: "Actividades inmobiliarias" },
  {
    value: "Actividades profesionales, científicas y técnicas",
    label: "Actividades profesionales, científicas y técnicas",
  },
  {
    value: "Actividades administrativas y servicios auxiliares",
    label: "Actividades administrativas y servicios auxiliares",
  },
  {
    value: "Administración Pública y defensa; Seguridad Social obligatoria",
    label: "Administración Pública y defensa; Seguridad Social obligatoria",
  },
  { value: "Educación", label: "Educación" },
  {
    label: "Actividades sanitarias y de servicios sociales",
    value: "Actividades sanitarias y de servicios sociales",
  },
  {
    label: "Actividades artísticas, recreativas y de entretenimiento",
    value: "Actividades artísticas, recreativas y de entretenimiento",
  },
  { label: "Otros servicios", value: "Otros servicios" },
  {
    label: "Actividades de los hogares como empleadores de personal doméstico",
    value: "Actividades de los hogares como empleadores de personal doméstico",
  },
  {
    label: "Actividades de organizaciones y organismos extraterritoriales",
    value: "Actividades de organizaciones y organismos extraterritoriales",
  },
  { label: "Otras actividades", value: "Otras actividades" },
]);

// File handling
const fileFields = ref({
  corporate_taxes: [],
  balance_sheet_current_year: [],
  bank_debt_summary: [],
  cirbe: [],
  vat_summary: [],
  sociedades_y_auditorias: [],
  balance_resultados_provisional: [],
  liquidaciones_iva: [],
  liquidaciones_irpf: [],
  modelo_390: [],
  modelo_347: [],
  modelo_349: [],
  vat_liquidations_current: [],
  irpf_liquidations_current: [],
  modelo_390_previous: [],
  modelo_347_previous: [],
  social_security_tax_certificates: [],
  company_assets_declaration: [],
});

const fileInputRefs = ref({});

const handleFileDrop = (event, fieldName) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  addFiles(files, fieldName);
};

const handleFileSelect = (event, fieldName) => {
  const files = Array.from(event.target.files);
  addFiles(files, fieldName);
};

const addFiles = (files, fieldName) => {
  const pdfFiles = files.filter((file) => file.type === "application/pdf");
  const currentFiles = fileFields.value[fieldName];

  if (currentFiles.length + pdfFiles.length <= 15) {
    fileFields.value[fieldName] = [...currentFiles, ...pdfFiles];
  } else {
    alert("Máximo 15 archivos permitidos");
  }
};

const removeFile = (fieldName, index) => {
  fileFields.value[fieldName].splice(index, 1);
};

const setFileInputRef = (fieldName, el) => {
  if (el) {
    fileInputRefs.value[fieldName] = el;
  }
};

const triggerFileInput = (fieldName) => {
  if (fileInputRefs.value[fieldName]) {
    fileInputRefs.value[fieldName].click();
  }
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

onMounted(async () => {
  try {
    const response = await axios.get(route("get-company-data"));
    if (response.data) {
      employeeCount.value = response.data.number_of_employees || 0;
      businessExplanation.value = response.data.business_description || "";
      selectedActivity.value = response.data.company_activity || "";
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

// Debounce the saveData function to prevent excessive calls
const saveData = debounce(async () => {
  try {
    const response = await axios.post(route("save-data"), {
      employeeCount: employeeCount.value,
      businessExplanation: businessExplanation.value,
      selectedActivity: selectedActivity.value,
    });

    // Reset touched state after successful save
    Object.keys(isTouched.value).forEach((key) => {
      if (isTouched.value[key]) isTouched.value[key] = false;
    });

    console.log("Data saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}, 500);

// Handle blur for all fields
const handleBlur = (field) => {
  if (isTouched.value[field]) {
    saveData();
  }
};

// Handle input for all fields
const handleInput = (field) => {
  isTouched.value[field] = true;
};
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout
    :page-title="$t('documents.title')"
    :page-description="$t('documents.description')"
  >
    <div
      class="max-w-7xl mx-auto p-8 rounded-lg"
      :class="isDark ? 'bg-gray-900' : 'bg-violet-900'"
    >
      <div
        class="max-w-7xl mx-auto flex flex-wrap justify-between my-4 text-center md:flex-nowrap md:space-x-4 space-y-6 md:space-y-0"
      >
        <!-- Step 1 -->
        <div
          class="flex flex-col items-center w-full md:w-1/5 cursor-pointer"
          @click="goToStep(1)"
        >
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            :class="
              currentStep === 1
                ? isDark
                  ? 'bg-purple-600'
                  : 'bg-purple-500'
                : isDark
                ? 'bg-gray-700'
                : 'bg-violet-700'
            "
          >
            <CreditCardIcon class="w-8 h-8 text-white" />
          </div>
          <div
            class="px-4 py-2 rounded-md font-medium"
            :class="
              currentStep === 1
                ? isDark
                  ? 'text-purple-300'
                  : 'text-purple-100'
                : isDark
                ? 'text-gray-300'
                : 'text-white'
            "
          >
            {{ $t("dashboard.economicInfo") }}
          </div>
        </div>

        <!-- Step 2 -->
        <div
          class="flex flex-col items-center w-full md:w-1/5 cursor-pointer"
          @click="goToStep(2)"
        >
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            :class="
              currentStep === 2
                ? isDark
                  ? 'bg-purple-600'
                  : 'bg-purple-500'
                : isDark
                ? 'bg-gray-700'
                : 'bg-violet-700'
            "
          >
            <FileIcon class="w-8 h-8 text-white" />
          </div>
          <div
            class="px-4 py-2 rounded-md font-medium"
            :class="
              currentStep === 2
                ? isDark
                  ? 'text-purple-300'
                  : 'text-purple-100'
                : isDark
                ? 'text-gray-300'
                : 'text-white'
            "
          >
            {{ $t("dashboard.legalInfo") }}
          </div>
        </div>

        <!-- Step 3 -->
        <div
          class="flex flex-col items-center w-full md:w-1/5 cursor-pointer"
          @click="goToStep(3)"
        >
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            :class="
              currentStep === 3
                ? isDark
                  ? 'bg-purple-600'
                  : 'bg-purple-500'
                : isDark
                ? 'bg-gray-700'
                : 'bg-violet-700'
            "
          >
            <BuildingIcon class="w-8 h-8 text-white" />
          </div>
          <div
            class="px-4 py-2 rounded-md font-medium"
            :class="
              currentStep === 3
                ? isDark
                  ? 'text-purple-300'
                  : 'text-purple-100'
                : isDark
                ? 'text-gray-300'
                : 'text-white'
            "
          >
            {{ $t("dashboard.taxInfo") }}
          </div>
        </div>
      </div>

      <div class="py-12">
        <div class="max-w-7xl mx-auto">
          <div
            class="rounded-lg p-6"
            :class="isDark ? 'bg-gray-800' : 'bg-white'"
          >
            <!-- Step 1 Form -->
            <div v-if="currentStep === 1" class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Left Column -->
                <div class="space-y-6">
                  <!-- Activity -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.companyActivity") }}
                    </label>
                    <Select
                      v-model="selectedActivity"
                      :options="optionsActivities"
                      :class="[
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                      ]"
                      class="w-full px-4 py-3 rounded-lg border transition-colors"
                      @blur="handleBlur('selectedActivity')"
                      @input="handleInput('selectedActivity')"
                    />
                  </div>

                  <!-- Employees -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.employees") }}
                    </label>
                    <NumericInput
                      v-model="employeeCount"
                      :class="[
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                      ]"
                      class="w-full px-4 py-3 rounded-lg border transition-colors"
                      required
                      @blur="handleBlur('employeeCount')"
                      @input="handleInput('employeeCount')"
                    />
                  </div>

                  <!-- Business Explanation -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.businessExplanation") }}
                    </label>
                    <TextAreaInput
                      v-model="businessExplanation"
                      :class="[
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                      ]"
                      class="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
                      required
                      @blur="handleBlur('businessExplanation')"
                      @input="handleInput('businessExplanation')"
                    />
                  </div>
                </div>

                <!-- Right Column - File Uploads -->
                <div class="space-y-6">
                  <!-- Corporate Taxes -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.corporateTaxes") }}
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="handleFileDrop($event, 'corporate_taxes')"
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('corporate_taxes')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        {{ $t("dashboard.dragDrop") }}
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('corporate_taxes', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'corporate_taxes')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.corporate_taxes.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.corporate_taxes"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('corporate_taxes', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Balance Sheet -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.balanceSheet") }}
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'balance_sheet_current_year')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('balance_sheet_current_year')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) =>
                            setFileInputRef('balance_sheet_current_year', el)
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect($event, 'balance_sheet_current_year')
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.balance_sheet_current_year.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(
                          file, index
                        ) in fileFields.balance_sheet_current_year"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="
                            removeFile('balance_sheet_current_year', index)
                          "
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Bank Debt Summary -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.bankDebt") }}
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'bank_debt_summary')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('bank_debt_summary')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('bank_debt_summary', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'bank_debt_summary')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.bank_debt_summary.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.bank_debt_summary"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('bank_debt_summary', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- CIRBE -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.cirbe") }}
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="handleFileDrop($event, 'cirbe')"
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('cirbe')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('cirbe', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'cirbe')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.cirbe.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.cirbe"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('cirbe', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- VAT Summary -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      {{ $t("dashboard.vatSummary") }}
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="handleFileDrop($event, 'vat_summary')"
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('vat_summary')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('vat_summary', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'vat_summary')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.vat_summary.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.vat_summary"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('vat_summary', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2 Form -->
            <div v-if="currentStep === 2" class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Left Column -->
                <div class="space-y-6">
                  <!-- CIF -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      CIF de la empresa
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'sociedades_y_auditorias')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('sociedades_y_auditorias')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) => setFileInputRef('sociedades_y_auditorias', el)
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect($event, 'sociedades_y_auditorias')
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.sociedades_y_auditorias.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(
                          file, index
                        ) in fileFields.sociedades_y_auditorias"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('sociedades_y_auditorias', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Writings -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Escrituras de constitución y apoderamiento
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'balance_resultados_provisional')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="
                        triggerFileInput('balance_resultados_provisional')
                      "
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) =>
                            setFileInputRef(
                              'balance_resultados_provisional',
                              el
                            )
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect(
                            $event,
                            'balance_resultados_provisional'
                          )
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="
                        fileFields.balance_resultados_provisional.length > 0
                      "
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(
                          file, index
                        ) in fileFields.balance_resultados_provisional"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="
                            removeFile('balance_resultados_provisional', index)
                          "
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Ownership Certificate -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Acta de titularidad real
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'liquidaciones_iva')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('liquidaciones_iva')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('liquidaciones_iva', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'liquidaciones_iva')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.liquidaciones_iva.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.liquidaciones_iva"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('liquidaciones_iva', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-6">
                  <!-- Licenses -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Licencias y permisos necesarios para la actividad
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'liquidaciones_irpf')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('liquidaciones_irpf')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('liquidaciones_irpf', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'liquidaciones_irpf')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.liquidaciones_irpf.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.liquidaciones_irpf"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('liquidaciones_irpf', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Mercantile Registry -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Certificación negativa del Registro Mercantil
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="handleFileDrop($event, 'modelo_390')"
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('modelo_390')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('modelo_390', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'modelo_390')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.modelo_390.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.modelo_390"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('modelo_390', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3 Form -->
            <div v-if="currentStep === 3" class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Left Column -->
                <div class="space-y-6">
                  <!-- Model 347 -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Modelo 347
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="handleFileDrop($event, 'modelo_347')"
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('modelo_347')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('modelo_347', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'modelo_347')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.modelo_347.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.modelo_347"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('modelo_347', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Model 349 -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Modelo 349
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="handleFileDrop($event, 'modelo_349')"
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('modelo_349')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="(el) => setFileInputRef('modelo_349', el)"
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="handleFileSelect($event, 'modelo_349')"
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.modelo_349.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.modelo_349"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('modelo_349', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- VAT Liquidations -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Liquidaciones periódicas de IVA del año anterior y el año
                      en curso
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'vat_liquidations_current')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('vat_liquidations_current')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) =>
                            setFileInputRef('vat_liquidations_current', el)
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect($event, 'vat_liquidations_current')
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.vat_liquidations_current.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(
                          file, index
                        ) in fileFields.vat_liquidations_current"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('vat_liquidations_current', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- IRPF Liquidations -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Liquidaciones de IRPF del año anterior y el año en curso
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'irpf_liquidations_current')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('irpf_liquidations_current')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) =>
                            setFileInputRef('irpf_liquidations_current', el)
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect($event, 'irpf_liquidations_current')
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.irpf_liquidations_current.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(
                          file, index
                        ) in fileFields.irpf_liquidations_current"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="
                            removeFile('irpf_liquidations_current', index)
                          "
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-6">
                  <!-- Model 390 Previous Year -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Modelo 390 del año anterior, si existe obligación de
                      presentación
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'modelo_390_previous')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('modelo_390_previous')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) => setFileInputRef('modelo_390_previous', el)
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect($event, 'modelo_390_previous')
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.modelo_390_previous.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.modelo_390_previous"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('modelo_390_previous', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Model 347 Previous Year -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Modelo 347 del año anterior, si existe obligación de
                      presentación
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'modelo_347_previous')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('modelo_347_previous')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) => setFileInputRef('modelo_347_previous', el)
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect($event, 'modelo_347_previous')
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.modelo_347_previous.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(file, index) in fileFields.modelo_347_previous"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="removeFile('modelo_347_previous', index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Payment Certificates -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Certificados de corriente de pago Seguridad Social y
                      Hacienda
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop(
                          $event,
                          'social_security_tax_certificates'
                        )
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="
                        triggerFileInput('social_security_tax_certificates')
                      "
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) =>
                            setFileInputRef(
                              'social_security_tax_certificates',
                              el
                            )
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect(
                            $event,
                            'social_security_tax_certificates'
                          )
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="
                        fileFields.social_security_tax_certificates.length > 0
                      "
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(
                          file, index
                        ) in fileFields.social_security_tax_certificates"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="
                            removeFile(
                              'social_security_tax_certificates',
                              index
                            )
                          "
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Assets Declaration -->
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Declaración de bienes de la empresa, si tiene activos
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, 'company_assets_declaration')
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput('company_assets_declaration')"
                    >
                      <UploadIcon
                        class="w-12 h-12 mx-auto mb-4"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      />
                      <p
                        class="text-sm mb-2"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        Arrastra y suelta archivos aquí o haz clic para
                        seleccionar
                      </p>
                      <input
                        :ref="
                          (el) =>
                            setFileInputRef('company_assets_declaration', el)
                        "
                        type="file"
                        class="hidden"
                        multiple
                        accept=".pdf"
                        @change="
                          handleFileSelect($event, 'company_assets_declaration')
                        "
                      />
                    </div>

                    <!-- File list -->
                    <div
                      v-if="fileFields.company_assets_declaration.length > 0"
                      class="mt-4 space-y-2"
                    >
                      <div
                        v-for="(
                          file, index
                        ) in fileFields.company_assets_declaration"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg"
                        :class="isDark ? 'bg-gray-700' : 'bg-gray-50'"
                      >
                        <div class="flex items-center space-x-3">
                          <FileTextIcon
                            class="w-5 h-5"
                            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                          />
                          <span
                            class="text-sm"
                            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                          >
                            {{ file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="
                            removeFile('company_assets_declaration', index)
                          "
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>