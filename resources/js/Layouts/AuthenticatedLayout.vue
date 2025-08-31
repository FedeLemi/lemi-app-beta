<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex">
      <!-- Sidebar -->
      <div
        class="flex flex-col min-h-screen transition-all duration-300 ease-in-out overflow-hidden bg-white dark:bg-purple-900/30"
        :class="sidebarOpen ? 'w-64' : 'w-0'"
      >
        <!-- Fixed height container for sidebar content -->
        <div class="flex flex-col h-screen">
          <!-- Top section with logo and navigation - scrollable -->
          <div class="flex-1 flex flex-col min-h-0">
            <!-- Logo section -->
            <div class="p-6 flex-shrink-0">
              <div class="flex items-center space-x-3 mb-8">
                <!-- Hamburger menu icon inside sidebar -->
                <button
                  @click="toggleSidebar"
                  class="text-purple-900 dark:text-white"
                  aria-label="Toggle menu"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div class="w-8 h-8 rounded-xl flex items-center justify-center">
                  <ApplicationLogo class="w-20 h-20 fill-current text-gray-500 dark:text-gray-300" />
                </div>
                <span class="text-xl font-bold text-white">Lemi Finance</span>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex-1 overflow-y-auto px-6 pb-4">
              <nav class="space-y-2">
                <Link
                  href="/dashboard"
                  class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium"
                  :class="[
                    route().current('dashboard') 
                      ? 'bg-purple-600 text-white dark:bg-purple-800'
                      : 'text-purple-700 hover:bg-purple-200 dark:text-purple-200 dark:hover:bg-purple-800'
                  ]"
                >
                  <GridIcon class="w-5 h-5" />
                  <span>{{ $t("nav.dashboard") }}</span>
                </Link>

                <Link
                  href="/company"
                  class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium"
                  :class="[
                    route().current('company*') 
                      ? 'bg-purple-600 text-white dark:bg-purple-800'
                      : 'text-purple-700 hover:bg-purple-200 dark:text-purple-200 dark:hover:bg-purple-800'
                  ]"
                >
                  <BuildingIcon class="w-5 h-5" />
                  <span>{{ $t("nav.company") }}</span>
                </Link>

                <Link
                  href="/documents"
                  class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium"
                  :class="[
                    route().current('documents*') 
                      ? 'bg-purple-600 text-white dark:bg-purple-800'
                      : 'text-purple-700 hover:bg-purple-200 dark:text-purple-200 dark:hover:bg-purple-800'
                  ]"
                >
                  <FileTextIcon class="w-5 h-5" />
                  <span>{{ $t("nav.documents") }}</span>
                </Link>

                <Link
                  href="/application"
                  class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium"
                  :class="[
                    route().current('application*') 
                      ? 'bg-purple-600 text-white dark:bg-purple-800'
                      : 'text-purple-700 hover:bg-purple-200 dark:text-purple-200 dark:hover:bg-purple-800'
                  ]"
                >
                  <ClipboardListIcon class="w-5 h-5" />
                  <span>{{ $t("nav.applications") }}</span>
                </Link>
              </nav>
            </div>
          </div>

          <!-- User Profile -->
          <div class="flex-shrink-0 relative">
            <div class="w-full bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div class="px-6 py-4">
                <button
                  @click="userDropdownOpen = !userDropdownOpen"
                  class="flex items-center space-x-3 cursor-pointer w-full hover:bg-gray-50 dark:hover:bg-gray-600 rounded-xl p-2 -m-2 transition-colors"
                >
                  <div class="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-white">
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
                  <div class="text-left flex-1 min-w-0">
                    <p class="text-sm font-medium text-purple-900 dark:text-white truncate">
                      {{ $page.props.auth.user.name }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                     {{ $t("auth.admin") }}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform"
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
                  class="absolute bottom-full left-0 right-0 mx-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 mb-2 z-50 border border-gray-200 dark:border-gray-600 transition-all duration-200"
                  v-click-outside="closeUserDropdown"
                >
                  <a
                    :href="route('profile.edit')"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <UserIcon class="h-4 w-4 mr-3" />
                      {{ $t("auth.profile") }}
                  </a>
                  <div class="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                  <form @submit.prevent="logout">
                    <button
                      type="submit"
                      class="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                      {{ $t("auth.logout") }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1">
        <header class="border-b bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div class="px-6 py-4 flex items-center justify-between">
            <div class="flex items-center">
              <!-- Mobile menu button - Always visible for mobile, hidden on desktop when sidebar is open -->
              <button
                @click="toggleSidebar"
                class="mr-4 text-purple-900 dark:text-white"
                :class="{'md:hidden': sidebarOpen}"
                aria-label="Toggle menu"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ pageTitle }}
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ pageDescription }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <!-- Theme Toggle -->
              <button
                @click="toggleDarkMode"
                class="p-2 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                :class="isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              >
                <SunIcon v-if="isDark" class="w-5 h-5" />
                <MoonIcon v-else class="w-5 h-5" />
              </button>

              <!-- Language Selector -->
              <select
                v-model="currentLocale"
                @change="changeLocale"
                class="px-3 py-2 rounded-xl border text-sm bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
    
    <!-- Overlay for mobile when sidebar is open -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      @click="sidebarOpen = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { useDark, useToggle } from "@vueuse/core";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {
  GridIcon,
  BuildingIcon,
  FileTextIcon,
  ClipboardListIcon,
  SunIcon,
  MoonIcon,
  UserIcon
} from "lucide-vue-next";

// Theme Management
const isDark = useDark({
  storageKey: 'lemi-finance-theme',
  valueDark: 'dark',
  valueLight: 'light'
});
const toggleDarkMode = useToggle(isDark);

// Initialize theme on mount
onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value);
  // Set initial sidebar state based on screen size
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

// Check screen size and adjust sidebar state
const checkScreenSize = () => {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false;
  } else {
    sidebarOpen.value = true;
  }
};

// I18n
const { locale } = useI18n();
const currentLocale = ref(locale.value);
const changeLocale = () => {
  locale.value = currentLocale.value;
};

// UI State
const sidebarOpen = ref(true);
const userDropdownOpen = ref(false);

// Toggle sidebar function
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeUserDropdown = () => {
  userDropdownOpen.value = false;
};

// Auth
const logout = () => {
  router.post(route("logout"));
};

// Props
defineProps({
  pageTitle: String,
  pageDescription: String
});

// Click Outside Directive
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent, true);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent, true);
  }
};
</script>

<style>
/* Smooth transitions for dropdown */
.dropdown-transition {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}

/* Custom transition for sidebar */
.sidebar-transition {
  transition: transform 0.3s ease-in-out;
}
</style>