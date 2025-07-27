<template>
  <div class="min-h-screen" :class="isDark ? 'dark bg-gray-900' : 'bg-gray-50'">
    <div class="flex">
      <!-- Sidebar -->
      <div
        class="flex flex-col min-h-screen transition-all duration-300 ease-in-out overflow-hidden bg-purple-900"
        :class="sidebarOpen ? 'w-64' : 'w-0'"
      >
        <!-- Fixed height container for sidebar content -->
        <div class="flex flex-col h-screen">
          <!-- Top section with logo and navigation - scrollable -->
          <div class="flex-1 flex flex-col min-h-0">
            <!-- Logo section -->
            <div class="p-6 flex-shrink-0">
              <div class="flex items-center space-x-3 mb-8">
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center"
                >
                  <ApplicationLogo
                    class="w-20 h-20 fill-current text-gray-500"
                  />
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
            </div>

            <!-- Navigation - scrollable if content overflows -->
            <div class="flex-1 overflow-y-auto px-6 pb-4">
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
                <!-- 
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
                </Link> -->

                <Link
                  href="/company"
                  class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
                  :class="
                    isDark
                      ? 'text-purple-200 hover:bg-purple-800'
                      : 'text-purple-700 hover:bg-purple-200'
                  "
                >
                  <BuildingIcon class="w-5 h-5" />
                  <span>{{ $t("nav.company") }}</span>
                </Link>

                <Link
                  href="/documents"
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
                  href="/application"
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
              </nav>
            </div>
          </div>

          <!-- Fixed Bottom User Profile -->
          <div class="flex-shrink-0 bottom-0">
            <div
              class="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            >
              <div class="px-6 py-4">
                <button
                  @click="userDropdownOpen = !userDropdownOpen"
                  class="flex items-center space-x-3 cursor-pointer w-full hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors"
                >
                  <div
                    class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0"
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
                  <div class="text-left flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-purple-900 dark:text-white truncate"
                    >
                      {{ $page.props.auth.user.name }}
                    </p>
                    <p
                      class="text-xs text-gray-500 dark:text-gray-400 truncate"
                    >
                      Administrador
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0"
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
                  class="dropdown-transition absolute bottom-full left-0 right-0 mx-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 mb-2 z-50 border border-gray-200 dark:border-gray-700"
                  v-click-outside="closeUserDropdown"
                >
                  <a
                    :href="route('profile.edit')"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                  <!-- <a
                    href="/settings"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                  </a> -->
                  <div
                    class="border-t border-gray-200 dark:border-gray-700 my-1"
                  ></div>
                  <form @submit.prevent="logout">
                    <button
                      type="submit"
                      class="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
            <div class="flex items-center">
              <!-- Hamburger button for mobile -->
              <button
                v-if="!sidebarOpen"
                @click="sidebarOpen = true"
                class="mr-4 text-purple-900 dark:text-white"
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
import { Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { useDark, useToggle } from "@vueuse/core";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {
  GridIcon,
  BuildingIcon,
  FileTextIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "lucide-vue-next";
import { usePage } from "@inertiajs/vue3";

const currentUrl = usePage().url.value;

const routeName = usePage().props.routeName;

// Initialize i18n
const i18n = useI18n();
const { t, locale } = i18n;
// Expose t function as $t for template
const $t = computed(() => t);

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
const currentLocale = ref(locale.value);
const userDropdownOpen = ref(false);
const sidebarOpen = ref(true);

const props = defineProps({
  pageTitle: String,
  pageDescription: String,
});

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