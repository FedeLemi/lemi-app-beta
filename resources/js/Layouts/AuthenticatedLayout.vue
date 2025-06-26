<template>
  <div class="min-h-screen" :class="isDark ? 'dark bg-gray-900' : 'bg-gray-50'">
    <div class="flex">
      <!-- Sidebar -->
      <div
        class="sidebar-transition flex flex-col w-64 min-h-screen"
        :class="isDark ? 'bg-purple-900' : 'bg-purple-900'"
      >
        <div class="p-6 flex-1 overflow-y-auto">
          <div class="flex items-center space-x-3 mb-8">
            <div
              class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">L</span>
            </div>
            <span class="text-xl font-bold text-white"> LEMI Finance </span>
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="ml-auto text-purple-300 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <nav class="space-y-2">
            <a
              href="#"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-purple-200 hover:bg-purple-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>Dashboard</span>
            </a>

            <a
              href="#"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-medium bg-purple-800 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Solicitudes</span>
            </a>

            <a
              href="#"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-purple-200 hover:bg-purple-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>Mi Empresa</span>
            </a>

            <a
              href="#"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-purple-200 hover:bg-purple-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Mi cuenta</span>
            </a>

            <a
              href="#"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-purple-200 hover:bg-purple-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span>Reportes</span>
            </a>

            <a
              href="#"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-purple-200 hover:bg-purple-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Configuración</span>
            </a>
          </nav>
        </div>

        <!-- Fixed Bottom User Profile -->
        <div
          class="sticky bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="pl-6 py-4 relative">
            <button
              @click="userDropdownOpen = !userDropdownOpen"
              class="flex items-center space-x-3 cursor-pointer w-full"
            >
              <div
                class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div class="text-left">
                <p class="text-sm font-medium text-purple-900 dark:text-white">
                  {{ $page.props.auth.user.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Administrador
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="fas fa-chevron-down ml-auto mr-4 text-gray-500 dark:text-gray-400 text-xs h-4 w-4 transition-transform"
                :class="{ 'rotate-180': userDropdownOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="userDropdownOpen"
              class="dropdown-transition absolute bottom-full left-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 mb-2 z-50 border border-gray-200 dark:border-gray-700"
              v-click-outside="closeUserDropdown"
            >
              <a
                :href="route('profile.edit')"
                class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="closeUserDropdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </a>
              <a
                :href="route('profile.edit')"
                class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="closeUserDropdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </a>
              <div
                class="border-t border-gray-200 dark:border-gray-700 my-1"
              ></div>
              <form @submit.prevent="logout">
                <button
                  type="submit"
                  class="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="closeUserDropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log Out
                </button>
              </form>
            </div>
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
import { Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { useDark, useToggle } from "@vueuse/core";

const { t, locale } = useI18n();

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
const currentLocale = ref(locale.value);
const userDropdownOpen = ref(false);
const sidebarOpen = ref(true);

// Click outside directive for dropdown
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      // Check if the click is outside the element and its children
      if (!(el === event.target || el.contains(event.target))) {
        // Call the provided method
        binding.value(event);
      }
    };
    // Use capturing to catch event early
    document.addEventListener("click", el.clickOutsideEvent, true);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent, true);
  },
};

const closeUserDropdown = () => {
  userDropdownOpen.value = false;
};

const logout = () => {
  router.post(route("logout"));
};

const changeLocale = () => {
  locale.value = currentLocale.value;
};
</script>

<style>
.dropdown-transition {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>