<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <div
        class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CreditCardIcon class="w-8 h-8 text-white" />
      </div>
      <h2
        class="text-2xl font-bold"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        {{ $t("creditApplication.title") }}
      </h2>
      <p
        class="text-sm mt-2"
        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
      >
        {{ $t("creditApplication.subtitle") }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Financing Types -->
      <div>
        <label
          class="block text-sm font-medium mb-3"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("creditApplication.financingTypes") }} *
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label
            v-for="type in financingTypeOptions"
            :key="type.value"
            class="flex items-center p-3 rounded-lg border cursor-pointer transition-colors"
            :class="[
              store.creditApplication.financingTypes.includes(type.value)
                ? isDark
                  ? 'bg-purple-900 border-purple-600 text-purple-200'
                  : 'bg-purple-50 border-purple-500 text-purple-700'
                : isDark
                ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
            ]"
          >
            <input
              v-model="store.creditApplication.financingTypes"
              type="checkbox"
              :value="type.value"
              class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 mr-2"
            />
            <span class="text-sm">{{ $t(type.label) }}</span>
          </label>
        </div>
      </div>

      <!-- Amount and Term -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("creditApplication.requestedAmount") }} * ({{
              $t("creditApplication.minAmount")
            }})
          </label>
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >€</span
            >
            <input
              v-model.number="store.creditApplication.requestedAmount"
              type="number"
              min="50000"
              step="1000"
              class="w-full pl-8 pr-4 py-3 rounded-lg border transition-colors"
              :class="[
                isDark
                  ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
                store.errors.requestedAmount ? 'border-red-500' : '',
              ]"
              required
            />
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("creditApplication.termMonths") }} *
          </label>
          <select
            v-model.number="store.creditApplication.termMonths"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="
              isDark
                ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
            "
            required
          >
            <option v-for="months in termOptions" :key="months" :value="months">
              {{ months }} {{ $t("creditApplication.months") }}
            </option>
          </select>
        </div>
      </div>

      <!-- Use of Funds -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("creditApplication.useOfFunds") }}
        </label>
        <textarea
          v-model="store.creditApplication.useOfFunds"
          rows="4"
          :placeholder="$t('creditApplication.useOfFundsPlaceholder')"
          class="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
          :class="
            isDark
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
          "
        ></textarea>
      </div>

      <!-- File Upload -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("creditApplication.uploadDocuments") }} ({{
            $t("creditApplication.maxFiles")
          }})
        </label>
        <div
          class="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
          :class="
            isDark
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-300 hover:border-gray-400'
          "
          @drop="handleFileDrop"
          @dragover.prevent
          @dragenter.prevent
        >
          <UploadIcon
            class="w-12 h-12 mx-auto mb-4"
            :class="isDark ? 'text-gray-400' : 'text-gray-500'"
          />
          <p
            class="text-sm mb-2"
            :class="isDark ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ $t("creditApplication.dragDropFiles") }}
          </p>
          <input
            ref="fileInput"
            type="file"
            multiple
            accept=".pdf"
            @change="handleFileSelect"
            class="hidden"
          />
          <button
            type="button"
            @click="$refs.fileInput.click()"
            class="px-4 py-2 rounded-lg font-medium transition-colors"
            :class="
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            "
          >
            {{ $t("creditApplication.selectFiles") }}
          </button>
        </div>

        <!-- File List -->
        <div
          v-if="store.creditApplication.uploadedFiles.length > 0"
          class="mt-4 space-y-2"
        >
          <div
            v-for="(file, index) in store.creditApplication.uploadedFiles"
            :key="index"
            class="flex items-center justify-between p-3 rounded-lg"
            :class="isDark ? 'bg-gray-800' : 'bg-gray-50'"
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
              @click="removeFile(index)"
              class="text-red-500 hover:text-red-700"
            >
              <XIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Banking Information -->
      <div class="space-y-6">
        <div>
          <label
            class="block text-sm font-medium mb-3"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("creditApplication.partnerGuarantee") }}
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="store.creditApplication.partnerGuarantee"
                type="radio"
                :value="true"
                class="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span
                class="ml-2 text-sm"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              >
                {{ $t("common.yes") }}
              </span>
            </label>
            <label class="flex items-center">
              <input
                v-model="store.creditApplication.partnerGuarantee"
                type="radio"
                :value="false"
                class="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span
                class="ml-2 text-sm"
                :class="isDark ? 'text-gray-200' : 'text-gray-700'"
              >
                {{ $t("common.no") }}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("creditApplication.fundsNeededDate") }}
          </label>
          <input
            v-model="store.creditApplication.fundsNeededDate"
            type="date"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="
              isDark
                ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
            "
          />
        </div>
      </div>

      <div class="flex justify-between pt-6">
        <button
          type="button"
          @click="store.previousStep"
          class="px-6 py-3 rounded-lg font-medium transition-colors"
          :class="
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          "
        >
          {{ $t("common.back") }}
        </button>

        <button
          type="submit"
          :disabled="store.isSubmitting || !store.canProceedToNext"
          class="px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            isDark
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          "
        >
          <LoaderIcon
            v-if="store.isSubmitting"
            class="w-5 h-5 animate-spin mx-auto"
          />
          <span v-else>{{ $t("creditApplication.submitApplication") }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useApplicationStore } from "../../stores/applicationStore";
import {
  CreditCardIcon,
  UploadIcon,
  FileTextIcon,
  XIcon,
  LoaderIcon,
} from "lucide-vue-next";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();

const financingTypeOptions = [
  { value: "credit_line", label: "creditApplication.types.creditLine" },
  { value: "loan", label: "creditApplication.types.loan" },
  { value: "import_export", label: "creditApplication.types.importExport" },
  { value: "confirming", label: "creditApplication.types.confirming" },
  {
    value: "invoice_discounting",
    label: "creditApplication.types.invoiceDiscounting",
  },
  { value: "leasing", label: "creditApplication.types.leasing" },
  { value: "other", label: "creditApplication.types.other" },
];

const termOptions = [6, 12, 18, 24, 36, 48, 60, 72, 84, 96, 108, 120];

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  addFiles(files);
};

const handleFileDrop = (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  addFiles(files);
};

const addFiles = (files) => {
  const pdfFiles = files.filter((file) => file.type === "application/pdf");
  const currentFiles = store.creditApplication.uploadedFiles;
  const totalFiles = currentFiles.length + pdfFiles.length;

  if (totalFiles <= 15) {
    store.creditApplication.uploadedFiles.push(...pdfFiles);
  } else {
    alert(t("creditApplication.maxFilesExceeded"));
  }
};

const removeFile = (index) => {
  store.creditApplication.uploadedFiles.splice(index, 1);
};

const handleSubmit = async () => {
  store.clearErrors();
  await store.submitApplication();
};
</script>
