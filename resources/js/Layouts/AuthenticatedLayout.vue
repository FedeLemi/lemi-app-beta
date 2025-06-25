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
              :href="route('dashboard')"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="
                isDark
                  ? 'text-purple-200 hover:bg-purple-800'
                  : 'text-purple-700 hover:bg-purple-200'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link
              :href="route('dashboard')"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-medium"
              :class="
                isDark ? 'bg-purple-800 text-white' : 'bg-purple-600 text-white'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Solicitudes</span>
            </Link>

            <Link
              :href="route('dashboard')"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="
                isDark
                  ? 'text-purple-200 hover:bg-purple-800'
                  : 'text-purple-700 hover:bg-purple-200'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
              <span>Mi Empresa</span>
            </Link>

            <Link
              :href="route('dashboard')"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="
                isDark
                  ? 'text-purple-200 hover:bg-purple-800'
                  : 'text-purple-700 hover:bg-purple-200'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Mi cuenta</span>
            </Link>
          </nav>
        </div>

        <!-- User Profile Dropdown -->
        <div class="absolute bottom-6 left-6">
          <Dropdown align="left">
            <template #trigger>
              <div class="flex items-center space-x-3 cursor-pointer">
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
                    {{ $page.props.auth.user.name }}
                  </p>
                </div>
              </div>
            </template>

            <template #content>
              <DropdownLink :href="route('profile.edit')">
                Profile
              </DropdownLink>
              <DropdownLink :href="route('logout')" method="post" as="button">
                Log Out
              </DropdownLink>
            </template>
          </Dropdown>
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
                <slot name="header" />
              </h1>
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
                <svg
                  v-if="isDark"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  ></path>
                </svg>
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
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";

const { t, locale } = useI18n();

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
const currentLocale = ref(locale.value);

const changeLocale = () => {
  locale.value = currentLocale.value;
};
</script>