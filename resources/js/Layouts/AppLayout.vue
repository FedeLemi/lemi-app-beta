<template>
  <div class="min-h-screen" :class="isDark ? 'dark bg-gray-900' : 'bg-gray-50'">
    <div class="flex">
      <!-- Sidebar -->
      <div
        class="w-64 min-h-screen"
        :class="isDark ? 'bg-purple-900' : 'bg-purple-100'"
      >
        <div class="p-6">
          <div class="flex items-center space-x-3 mb-8">
            <div
              class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">L</span>
            </div>
            <span
              class="text-xl font-bold"
              :class="isDark ? 'text-white' : 'text-purple-900'"
            >
              LEMI Finance
            </span>
          </div>

          <nav class="space-y-2">
            <Link
              href="/dashboard"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="
                isDark
                  ? 'text-purple-200 hover:bg-purple-800'
                  : 'text-purple-700 hover:bg-purple-200'
              "
            >
              <GridIcon class="w-5 h-5" />
              <span>{{ $t("nav.dashboard") }}</span>
            </Link>

            <Link
              href="/company"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="[
                isDark
                  ? 'bg-purple-800 text-white'
                  : 'bg-purple-600 text-white',
                'font-medium',
              ]"
            >
              <BuildingIcon class="w-5 h-5" />
              <span>{{ $t("nav.company") }}</span>
            </Link>

            <Link
              href="/account"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="
                isDark
                  ? 'text-purple-200 hover:bg-purple-800'
                  : 'text-purple-700 hover:bg-purple-200'
              "
            >
              <UserIcon class="w-5 h-5" />
              <span>{{ $t("nav.documents") }}</span>
            </Link>

            <Link
              href="/applications"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="
                isDark
                  ? 'text-purple-200 hover:bg-purple-800'
                  : 'text-purple-700 hover:bg-purple-200'
              "
            >
              <FileTextIcon class="w-5 h-5" />
              <span>{{ $t("nav.applications") }}</span>
            </Link>

            <!-- <Link
              href="/account"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="
                isDark
                  ? 'text-purple-200 hover:bg-purple-800'
                  : 'text-purple-700 hover:bg-purple-200'
              "
            >
              <UserIcon class="w-5 h-5" />
              <span>{{ $t("nav.account") }}</span>
            </Link> -->
          </nav>
        </div>

        <!-- User Profile -->
        <div class="absolute bottom-6 left-6 flex items-center space-x-3">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="User"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <p
              class="text-sm font-medium"
              :class="isDark ? 'text-white' : 'text-purple-900'"
            >
              Hola Rodri
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1">
        <header
          class="border-b"
          :class="
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          "
        >
          <div class="px-6 py-4 flex items-center justify-between">
            <div>
              <h1
                class="text-2xl font-bold"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                {{ pageTitle }}
              </h1>
              <p
                class="text-sm"
                :class="isDark ? 'text-gray-300' : 'text-gray-600'"
              >
                {{ pageDescription }}
              </p>
            </div>

            <div class="flex items-center space-x-4">
              <button
                @click="toggleDarkMode"
                class="p-2 rounded-lg transition-colors"
                :class="
                  isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                "
              >
                <SunIcon v-if="isDark" class="w-5 h-5" />
                <MoonIcon v-else class="w-5 h-5" />
              </button>

              <select
                v-model="currentLocale"
                @change="changeLocale"
                class="px-3 py-2 rounded-lg border text-sm"
                :class="
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                "
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </header>

        <main class="p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { useDark, useToggle } from "@vueuse/core";
import {
  GridIcon,
  BuildingIcon,
  FileTextIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "lucide-vue-next";

const props = defineProps({
  pageTitle: String,
  pageDescription: String,
});

const { t, locale } = useI18n();

// Ensure useDark and useToggle are called at the top level
const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
// alert(locale.value);
const currentLocale = ref(locale.value);

const changeLocale = () => {
  locale.value = currentLocale.value;
};
</script>
