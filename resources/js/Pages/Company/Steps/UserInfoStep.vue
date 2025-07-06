<template>
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <div
        class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <UserIcon class="w-8 h-8 text-white" />
      </div>
      <h2
        class="text-2xl font-bold"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        {{ $t("userInfo.title") }}
      </h2>
      <p
        class="text-sm mt-2"
        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
      >
        {{ $t("userInfo.subtitle") }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("userInfo.firstName") }} *
          </label>
          <input
            v-model="store.userInfo.firstName"
            type="text"
            :placeholder="$t('userInfo.firstNamePlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              store.errors.firstName ? 'border-red-500' : '',
            ]"
            required
          />
          <p v-if="store.errors.firstName" class="text-red-500 text-sm mt-1">
            {{ store.errors.firstName[0] }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("userInfo.lastName") }} *
          </label>
          <input
            v-model="store.userInfo.lastName"
            type="text"
            :placeholder="$t('userInfo.lastNamePlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              store.errors.lastName ? 'border-red-500' : '',
            ]"
            required
          />
          <p v-if="store.errors.lastName" class="text-red-500 text-sm mt-1">
            {{ store.errors.lastName[0] }}
          </p>
        </div>
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("userInfo.contactEmail") }} *
        </label>
        <input
          v-model="store.userInfo.contactEmail"
          type="email"
          :placeholder="$t('userInfo.contactEmailPlaceholder')"
          class="w-full px-4 py-3 rounded-lg border transition-colors"
          :class="[
            isDark
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
            store.errors.contactEmail ? 'border-red-500' : '',
          ]"
          required
        />
        <p v-if="store.errors.contactEmail" class="text-red-500 text-sm mt-1">
          {{ store.errors.contactEmail[0] }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("userInfo.mobilePhone") }} *
          </label>
          <input
            v-model="store.userInfo.mobilePhone"
            type="tel"
            :placeholder="$t('userInfo.mobilePhonePlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              store.errors.mobilePhone ? 'border-red-500' : '',
            ]"
            required
          />
          <p v-if="store.errors.mobilePhone" class="text-red-500 text-sm mt-1">
            {{ store.errors.mobilePhone[0] }}
          </p>
        </div>

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            {{ $t("userInfo.officePhone") }}
          </label>
          <input
            v-model="store.userInfo.officePhone"
            type="tel"
            :placeholder="$t('userInfo.officePhonePlaceholder')"
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
            {{ $t("userInfo.whatsappPhone") }}
          </label>
          <input
            v-model="store.userInfo.whatsappPhone"
            type="tel"
            :placeholder="$t('userInfo.whatsappPhonePlaceholder')"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
            "
          />
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <input
          v-model="store.userInfo.isLegalRepresentative"
          type="checkbox"
          id="legalRep"
          class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
        />
        <label
          for="legalRep"
          class="text-sm"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("userInfo.isLegalRepresentative") }}
        </label>
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
import { UserIcon, LoaderIcon } from "lucide-vue-next";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();

const handleSubmit = async () => {
  store.clearErrors();
  await store.saveUserInfo();
};
</script>
