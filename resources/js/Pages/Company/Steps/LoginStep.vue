<template>
  <div class="max-w-md mx-auto">
    <div class="text-center mb-8">
      <div
        class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <LogInIcon class="w-8 h-8 text-white" />
      </div>
      <h2
        class="text-2xl font-bold"
        :class="isDark ? 'text-white' : 'text-gray-900'"
      >
        {{ $t("login.title") }}
      </h2>
      <p
        class="text-sm mt-2"
        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
      >
        {{ $t("login.subtitle") }}
      </p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("login.email") }}
        </label>
        <input
          v-model="store.loginData.email"
          type="email"
          :placeholder="$t('login.emailPlaceholder')"
          class="w-full px-4 py-3 rounded-lg border transition-colors"
          :class="[
            isDark
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
            store.errors.email ? 'border-red-500' : '',
          ]"
          required
        />
        <p v-if="store.errors.email" class="text-red-500 text-sm mt-1">
          {{ store.errors.email[0] }}
        </p>
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ $t("login.password") }}
        </label>
        <div class="relative">
          <input
            v-model="store.loginData.password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('login.passwordPlaceholder')"
            class="w-full px-4 py-3 pr-12 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              store.errors.password ? 'border-red-500' : '',
            ]"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
            :class="
              isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            "
          >
            <EyeIcon v-if="showPassword" class="w-5 h-5" />
            <EyeOffIcon v-else class="w-5 h-5" />
          </button>
        </div>
        <p v-if="store.errors.password" class="text-red-500 text-sm mt-1">
          {{ store.errors.password[0] }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="store.isLoading || !store.canProceedToNext"
        class="w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <span v-else>{{ $t("login.loginButton") }}</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useApplicationStore } from "../../stores/applicationStore";
import { LogInIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-vue-next";

const { t } = useI18n();
const isDark = useDark();
const store = useApplicationStore();
const showPassword = ref(false);

const handleLogin = async () => {
  store.clearErrors();
  await store.login();
};
</script>
