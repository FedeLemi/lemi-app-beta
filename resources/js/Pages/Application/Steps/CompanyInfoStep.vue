<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <div
        class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <BuildingIcon class="w-8 h-8 text-white" />
      </div>
      <h2
        class="text-2xl font-bold"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        {{ $t("companyInfo.title") }}
      </h2>
      <p
        class="text-sm mt-2"
        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
      >
        {{ $t("companyInfo.subtitle") }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Company Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("companyInfo.companyName") }} *
          </label>
          <input
            v-model="store.companyInfo.companyName"
            type="text"
            :placeholder="$t('companyInfo.companyNamePlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              store.errors.companyName ? 'border-red-500' : '',
            ]"
            required
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("companyInfo.nif") }} *
          </label>
          <input
            v-model="store.companyInfo.nif"
            type="text"
            :placeholder="$t('companyInfo.nifPlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              store.errors.nif ? 'border-red-500' : '',
            ]"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("companyInfo.companyType") }} *
          </label>
          <select
            v-model="store.companyInfo.companyType"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500',
              store.errors.companyType ? 'border-red-500' : '',
            ]"
            required
          >
            <option value="">{{ $t("companyInfo.selectCompanyType") }}</option>
            <option value="SA">SA</option>
            <option value="SL">SL</option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("companyInfo.yearStarted") }}
          </label>
          <input
            v-model="store.companyInfo.yearStarted"
            type="number"
            min="1900"
            :max="new Date().getFullYear()"
            :placeholder="$t('companyInfo.yearStartedPlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
            "
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("companyInfo.numberOfEmployees") }}
          </label>
          <input
            v-model="store.companyInfo.numberOfEmployees"
            type="number"
            min="0"
            :placeholder="$t('companyInfo.numberOfEmployeesPlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
            "
          />
        </div>
      </div>

      <!-- Radio Button Groups -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label
            class="block text-sm font-medium mb-3"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("companyInfo.isStartup") }}
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="store.companyInfo.isStartup"
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
                v-model="store.companyInfo.isStartup"
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
            class="block text-sm font-medium mb-3"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("companyInfo.hadProfitsLastYear") }}
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="store.companyInfo.hadProfitsLastYear"
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
                v-model="store.companyInfo.hadProfitsLastYear"
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
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-3"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("companyInfo.hasUnpaidDebts") }}
        </label>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              v-model="store.companyInfo.hasUnpaidDebts"
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
              v-model="store.companyInfo.hasUnpaidDebts"
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
          {{ $t("companyInfo.description") }}
        </label>
        <textarea
          v-model="store.companyInfo.description"
          rows="4"
          :placeholder="$t('companyInfo.descriptionPlaceholder')"
          class="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
          :class="
            isDark
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
          "
        ></textarea>
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
          :disabled="store.isLoading || !store.canProceedToNext"
          class="px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            isDark
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          "
        >
          <LoaderIcon
            v-if="store.isLoading"
            class="w-5 h-5 animate-spin mx-auto"
          />
          <span v-else>{{ $t("common.next") }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useApplicationStore } from "../../stores/applicationStore";
import { BuildingIcon, LoaderIcon } from "lucide-vue-next";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();

const handleSubmit = async () => {
  store.clearErrors();
  await store.saveCompanyInfo();
};
</script>
