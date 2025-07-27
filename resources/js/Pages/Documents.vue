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
        <!-- Step 1 - Documentos Económicos -->
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
            Económicos
          </div>
        </div>

        <!-- Step 2 - Documentos Fiscales -->
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
            Fiscales
          </div>
        </div>

        <!-- Step 3 - Documentos Legales -->
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
            Legales
          </div>
        </div>

        <!-- Step 3 - Documentos Adicionales -->
        <div
          class="flex flex-col items-center w-full md:w-1/5 cursor-pointer"
          @click="goToStep(4)"
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
            Adicionales
          </div>
        </div>
      </div>

      <div class="py-12">
        <div class="max-w-7xl mx-auto">
          <div
            class="rounded-lg p-6"
            :class="isDark ? 'bg-gray-800' : 'bg-white'"
          >
            <!-- Step 1 - Documentos Económicos -->
            <div v-if="currentStep === 1" class="space-y-8">
              <div class="grid grid-cols-1 gap-8">
                <!-- Balance provisional anual -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Balance provisional anual (Balance provisional del último
                    año)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="
                      handleFileDrop($event, 'balance_provisional_anual')
                    "
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('balance_provisional_anual')"
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
                        (el) => setFileInputRef('balance_provisional_anual', el)
                      "
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="
                        handleFileSelect($event, 'balance_provisional_anual')
                      "
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.balance_provisional_anual.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(
                        file, index
                      ) in fileFields.balance_provisional_anual"
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
                        @click="removeFile('balance_provisional_anual', index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Cuenta de pérdidas y ganancias anual -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Cuenta de pérdidas y ganancias anual (P/G del último año)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="
                      handleFileDrop($event, 'cuenta_perdidas_ganancias_anual')
                    "
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('cuenta_perdidas_ganancias_anual')"
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
                          setFileInputRef('cuenta_perdidas_ganancias_anual', el)
                      "
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="
                        handleFileSelect(
                          $event,
                          'cuenta_perdidas_ganancias_anual'
                        )
                      "
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.cuenta_perdidas_ganancias_anual.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(
                        file, index
                      ) in fileFields.cuenta_perdidas_ganancias_anual"
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
                          removeFile('cuenta_perdidas_ganancias_anual', index)
                        "
                        class="text-red-500 hover:text-red-700"
                      >
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Balance provisional trimestral -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Balance provisional trimestral (Balance provisional de cada
                    trimestre del año en curso)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="
                      handleFileDrop($event, 'balance_provisional_trimestral')
                    "
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('balance_provisional_trimestral')"
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
                          setFileInputRef('balance_provisional_trimestral', el)
                      "
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="
                        handleFileSelect(
                          $event,
                          'balance_provisional_trimestral'
                        )
                      "
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.balance_provisional_trimestral.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(
                        file, index
                      ) in fileFields.balance_provisional_trimestral"
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
                          removeFile('balance_provisional_trimestral', index)
                        "
                        class="text-red-500 hover:text-red-700"
                      >
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Cuenta de pérdidas y ganancias trimestral -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Cuenta de pérdidas y ganancias trimestral (P/G de cada
                    trimestre del año en curso)
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
                        'cuenta_perdidas_ganancias_trimestral'
                      )
                    "
                    @dragover.prevent
                    @dragenter.prevent
                    @click="
                      triggerFileInput('cuenta_perdidas_ganancias_trimestral')
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
                            'cuenta_perdidas_ganancias_trimestral',
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
                          'cuenta_perdidas_ganancias_trimestral'
                        )
                      "
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="
                      fileFields.cuenta_perdidas_ganancias_trimestral.length > 0
                    "
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(
                        file, index
                      ) in fileFields.cuenta_perdidas_ganancias_trimestral"
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
                            'cuenta_perdidas_ganancias_trimestral',
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

                <!-- Pool de deuda / CIRBE -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Pool de deuda / CIRBE (Puedes descargar y completar la
                    plantilla con los datos de deuda bancaria y no bancaria o
                    subir el informe CIRBE)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="handleFileDrop($event, 'pool_deuda_cirbe')"
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('pool_deuda_cirbe')"
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
                      :ref="(el) => setFileInputRef('pool_deuda_cirbe', el)"
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="handleFileSelect($event, 'pool_deuda_cirbe')"
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.pool_deuda_cirbe.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(file, index) in fileFields.pool_deuda_cirbe"
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
                        @click="removeFile('pool_deuda_cirbe', index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Proyecciones de flujo mensual de caja -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Proyecciones de flujo mensual de caja (Proyección de igual
                    plazo a la financiación solicitada)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="
                      handleFileDrop($event, 'proyecciones_flujo_caja')
                    "
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('proyecciones_flujo_caja')"
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
                        (el) => setFileInputRef('proyecciones_flujo_caja', el)
                      "
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="
                        handleFileSelect($event, 'proyecciones_flujo_caja')
                      "
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.proyecciones_flujo_caja.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(
                        file, index
                      ) in fileFields.proyecciones_flujo_caja"
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

            <!-- Step 2 - Documentos Fiscales -->
            <div v-if="currentStep === 2" class="space-y-8">
              <div class="grid grid-cols-1 gap-8">
                <!-- Modelo 200 -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Modelo 200 (Impuesto sobre sociedades del último año)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="handleFileDrop($event, 'modelo_200')"
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('modelo_200')"
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
                      :ref="(el) => setFileInputRef('modelo_200', el)"
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="handleFileSelect($event, 'modelo_200')"
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.modelo_200.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(file, index) in fileFields.modelo_200"
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
                        @click="removeFile('modelo_200', index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Modelo 347 -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Modelo 347 (Declaración informativa. Declaración de
                    operaciones con terceras personas del último año.)
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

                <!-- Modelo 390 -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Modelo 390 (IVA. Declaración Resumen Anual)
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

                <!-- Modelo 303 -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Modelo 303 (IVA. Autoliquidación de cada trimestre del año
                    en curso)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="handleFileDrop($event, 'modelo_303')"
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('modelo_303')"
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
                      :ref="(el) => setFileInputRef('modelo_303', el)"
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="handleFileSelect($event, 'modelo_303')"
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.modelo_303.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(file, index) in fileFields.modelo_303"
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

            <!-- Step 3 - Documentos Legales -->
            <div v-if="currentStep === 3" class="space-y-8">
              <div class="grid grid-cols-1 gap-8">
                <!-- Escritura de constitución -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Escritura de constitución (Escritura de constitución de la
                    empresa)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="
                      handleFileDrop($event, 'escritura_constitucion')
                    "
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('escritura_constitucion')"
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
                        (el) => setFileInputRef('escritura_constitucion', el)
                      "
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="
                        handleFileSelect($event, 'escritura_constitucion')
                      "
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.escritura_constitucion.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(file, index) in fileFields.escritura_constitucion"
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
                        @click="removeFile('escritura_constitucion', index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Poderes -->
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium"
                    :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                  >
                    Poderes (Documentos notariales que facultan a una persona
                    para actuar en nombre de la empresa)
                  </label>
                  <div
                    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                    :class="
                      isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                    "
                    @drop.prevent="handleFileDrop($event, 'poderes')"
                    @dragover.prevent
                    @dragenter.prevent
                    @click="triggerFileInput('poderes')"
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
                      :ref="(el) => setFileInputRef('poderes', el)"
                      type="file"
                      class="hidden"
                      multiple
                      accept=".pdf"
                      @change="handleFileSelect($event, 'poderes')"
                    />
                  </div>

                  <!-- File list -->
                  <div
                    v-if="fileFields.poderes.length > 0"
                    class="mt-4 space-y-2"
                  >
                    <div
                      v-for="(file, index) in fileFields.poderes"
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

            <!-- Add Step 4 content -->
            <div v-if="currentStep === 4" class="space-y-8">
              <div class="grid grid-cols-1 gap-8">
                <div
                  v-for="(doc, index) in additionalDocuments"
                  :key="index"
                  class="space-y-4 bg-gray-900 p-4"
                >
                  <div class="flex items-center justify-between">
                    <h3
                      class="font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Documento Adicional {{ index + 1 }}
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

                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Nombre del documento
                    </label>
                    <input
                      type="text"
                      v-model="doc.name"
                      class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Ej. Contrato de servicios"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium"
                      :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                    >
                      Archivo
                    </label>
                    <div
                      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
                      :class="
                        isDark
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                      "
                      @drop.prevent="
                        handleFileDrop($event, `additional_${index}`)
                      "
                      @dragover.prevent
                      @dragenter.prevent
                      @click="triggerFileInput(`additional_${index}`)"
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
                          (el) => setFileInputRef(`additional_${index}`, el)
                        "
                        type="file"
                        class="hidden"
                        accept=".pdf"
                        @change="handleAdditionalFileSelect($event, index)"
                      />
                    </div>

                    <!-- File list -->
                    <div v-if="doc.file" class="mt-4">
                      <div
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

                <button
                  type="button"
                  @click="addDocument"
                  class="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors mt-6"
                >
                  <PlusIcon class="w-5 h-5 mr-1" />
                  Agregar Documento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>