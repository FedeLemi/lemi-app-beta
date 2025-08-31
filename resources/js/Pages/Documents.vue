<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import TextAreaInput from "@/Components/TextAreaInput.vue";
import NumericInput from "@/Components/NumericInput.vue";
import Select from "@/Components/Select.vue";
import { PlusIcon, TrashIcon } from "lucide-vue-next";
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $t = t;

const isDark = useDark();

// Track the current step
const currentStep = ref(1);

// Change the step when a step is clicked
const goToStep = (step) => {
  currentStep.value = step;
};

// File handling
const fileFields = ref({
  balance_provisional_anual: [],
  cuenta_perdidas_ganancias_anual: [],
  balance_provisional_trimestral: [],
  cuenta_perdidas_ganancias_trimestral: [],
  pool_deuda_cirbe: [],
  proyecciones_flujo_caja: [],
  modelo_200: [],
  modelo_347: [],
  modelo_390: [],
  modelo_303: [],
  escritura_constitucion: [],
  poderes: [],
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

const additionalDocuments = ref([{ name: "", file: null }]);

const addDocument = () => {
  additionalDocuments.value.push({ name: "", file: null });
};

const removeDocument = (index) => {
  additionalDocuments.value.splice(index, 1);
};

const handleAdditionalFileSelect = (event, index) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    additionalDocuments.value[index].file = files[0];
  }
};
</script>

<template>
  <Head :title="$t('documents.title')" />

  <AuthenticatedLayout
    :page-title="$t('documents.title')"
    :page-description="$t('documents.description')"
  >
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 lg:p-12">
      <!-- Step Navigation -->
      <div class="max-w-7xl mx-auto mb-8">
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          <!-- Step 1 - Economic -->
          <div 
            class="flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01] text-center w-full md:w-1/4 cursor-pointer"
            @click="goToStep(1)"
            :class="currentStep === 1 ? 'ring-2 ring-purple-500' : ''"
          >
            <div class="w-12 h-12 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCardIcon class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {{ $t('documents.economic') }}
            </h3>
          </div>
          
          <div class="hidden md:flex items-center justify-center w-16 h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700 mx-4" />
          
          <!-- Step 2 - Fiscal -->
          <div 
            class="flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01] text-center w-full md:w-1/4 cursor-pointer"
            @click="goToStep(2)"
            :class="currentStep === 2 ? 'ring-2 ring-purple-500' : ''"
          >
            <div class="w-12 h-12 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileIcon class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {{ $t('documents.fiscal') }}
            </h3>
          </div>
          
          <div class="hidden md:flex items-center justify-center w-16 h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700 mx-4" />
          
          <!-- Step 3 - Legal -->
          <div 
            class="flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01] text-center w-full md:w-1/4 cursor-pointer"
            @click="goToStep(3)"
            :class="currentStep === 3 ? 'ring-2 ring-purple-500' : ''"
          >
            <div class="w-12 h-12 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BuildingIcon class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {{ $t('documents.legal') }}
            </h3>
          </div>
          
          <div class="hidden md:flex items-center justify-center w-16 h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700 mx-4" />
          
          <!-- Step 4 - Additional -->
          <div 
            class="flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01] text-center w-full md:w-1/4 cursor-pointer"
            @click="goToStep(4)"
            :class="currentStep === 4 ? 'ring-2 ring-purple-500' : ''"
          >
            <div class="w-12 h-12 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PlusIcon class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {{ $t('documents.additional') }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Document Upload Section -->
      <div class="max-w-7xl mx-auto">
        <div class="rounded-xl p-1 bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-900">
          <!-- Step 1 - Economic Documents -->
          <div v-if="currentStep === 1" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-9">
              <!-- Balance provisional anual -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.economicDocuments.balanceProvisionalAnnual') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'balance_provisional_anual')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('balance_provisional_anual')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('balance_provisional_anual', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'balance_provisional_anual')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.balance_provisional_anual.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.balance_provisional_anual"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('balance_provisional_anual', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Cuenta de pérdidas y ganancias anual -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.economicDocuments.profitLossAnnual') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'cuenta_perdidas_ganancias_anual')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('cuenta_perdidas_ganancias_anual')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('cuenta_perdidas_ganancias_anual', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'cuenta_perdidas_ganancias_anual')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.cuenta_perdidas_ganancias_anual.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.cuenta_perdidas_ganancias_anual"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('cuenta_perdidas_ganancias_anual', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Balance provisional trimestral -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.economicDocuments.balanceProvisionalQuarterly') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'balance_provisional_trimestral')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('balance_provisional_trimestral')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('balance_provisional_trimestral', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'balance_provisional_trimestral')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.balance_provisional_trimestral.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.balance_provisional_trimestral"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('balance_provisional_trimestral', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Cuenta de pérdidas y ganancias trimestral -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.economicDocuments.profitLossQuarterly') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'cuenta_perdidas_ganancias_trimestral')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('cuenta_perdidas_ganancias_trimestral')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('cuenta_perdidas_ganancias_trimestral', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'cuenta_perdidas_ganancias_trimestral')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.cuenta_perdidas_ganancias_trimestral.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.cuenta_perdidas_ganancias_trimestral"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('cuenta_perdidas_ganancias_trimestral', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Pool de deuda / CIRBE -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.economicDocuments.debtPoolCirbe') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'pool_deuda_cirbe')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('pool_deuda_cirbe')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('pool_deuda_cirbe', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'pool_deuda_cirbe')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.pool_deuda_cirbe.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.pool_deuda_cirbe"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('pool_deuda_cirbe', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Proyecciones de flujo mensual de caja -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.economicDocuments.cashFlowProjections') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'proyecciones_flujo_caja')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('proyecciones_flujo_caja')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('proyecciones_flujo_caja', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'proyecciones_flujo_caja')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.proyecciones_flujo_caja.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.proyecciones_flujo_caja"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('proyecciones_flujo_caja', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2 - Fiscal Documents -->
          <div v-if="currentStep === 2" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Modelo 200 -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.fiscalDocuments.model200') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'modelo_200')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('modelo_200')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('modelo_200', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'modelo_200')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.modelo_200.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.modelo_200"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('modelo_200', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Modelo 347 -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.fiscalDocuments.model347') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'modelo_347')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('modelo_347')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
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
                <div v-if="fileFields.modelo_347.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.modelo_347"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
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

              <!-- Modelo 390 -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.fiscalDocuments.model390') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'modelo_390')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('modelo_390')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
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
                <div v-if="fileFields.modelo_390.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.modelo_390"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
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

              <!-- Modelo 303 -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.fiscalDocuments.model303') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'modelo_303')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('modelo_303')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('modelo_303', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'modelo_303')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.modelo_303.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.modelo_303"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('modelo_303', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3 - Legal Documents -->
          <div v-if="currentStep === 3" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Escritura de constitución -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.legalDocuments.incorporationDeed') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'escritura_constitucion')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('escritura_constitucion')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('escritura_constitucion', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'escritura_constitucion')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.escritura_constitucion.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.escritura_constitucion"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('escritura_constitucion', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Poderes -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ $t('documents.legalDocuments.powers') }}
                </label>
                <div
                  class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                  :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                  @drop.prevent="handleFileDrop($event, 'poderes')"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="triggerFileInput('poderes')"
                >
                  <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                  <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                    {{ $t('documents.fileUpload.dragDrop') }}
                  </p>
                  <input
                    :ref="(el) => setFileInputRef('poderes', el)"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".pdf"
                    @change="handleFileSelect($event, 'poderes')"
                  />
                </div>

                <!-- File list -->
                <div v-if="fileFields.poderes.length > 0" class="space-y-2">
                  <div
                    v-for="(file, index) in fileFields.poderes"
                    :key="index"
                    class="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm text-gray-700 dark:text-gray-200">
                        {{ file.name }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('poderes', index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4 - Additional Documents -->
          <div v-if="currentStep === 4" class="space-y-8">
            <div class="grid grid-cols-1 gap-6">
              <div
                v-for="(doc, index) in additionalDocuments"
                :key="index"
                class="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-900"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-medium text-gray-800 dark:text-gray-200">
                    {{ $t('documents.additionalDocuments.additionalDocument') }} {{ index + 1 }}
                  </h3>
                  <button
                    v-if="additionalDocuments.length > 1"
                    type="button"
                    @click="removeDocument(index)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                      {{ $t('documents.additionalDocuments.documentName') }}
                    </label>
                    <input
                      type="text"
                      v-model="doc.name"
                      class="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                      :placeholder="$t('documents.additionalDocuments.documentNamePlaceholder')"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                      
                    </label>
                    <div
                      class="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer"
                      :class="isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'"
                      @drop.prevent="handleFileDrop($event, `additional_${index}`)"
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput(`additional_${index}`)"
                    >
                      <UploadIcon class="w-7 h-7 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                      <p class="text-sm mb-2 text-gray-600 dark:text-gray-500">
                        {{ $t('documents.fileUpload.dragDrop') }}
                      </p>
                      <input
                        :ref="(el) => setFileInputRef(`additional_${index}`, el)"
                        type="file"
                        class="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.png,.zip"
                        @change="handleAdditionalFileSelect($event, index)"
                      />
                    </div>

                    <!-- File list -->
                    <div v-if="doc.file" class="mt-4">
                      <div class="flex items-center justify-between p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                        <div class="flex items-center space-x-3">
                          <FileTextIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <span class="text-sm text-gray-700 dark:text-gray-200">
                            {{ doc.file.name }}
                          </span>
                        </div>
                        <button
                          type="button"
                          @click="doc.file = null"
                          class="text-red-500 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                @click="addDocument"
                class="flex items-center justify-center px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 rounded-xl transition-colors"
              >
                <PlusIcon class="w-5 h-5 mr-2" />
                {{ $t('documents.addDocument') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>