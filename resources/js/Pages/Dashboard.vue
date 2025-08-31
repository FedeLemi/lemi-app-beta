<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Theme management
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('darkMode', isDark.value);
  updateThemeClass();
};

const updateThemeClass = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

onMounted(() => {
  // Check for saved preference or system preference
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    isDark.value = savedMode === 'true';
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true;
  }
  updateThemeClass();
});
</script>

<template>
  <Head :title="t('dashboard.title')" />

  <AuthenticatedLayout
    :page-title="t('dashboard.my_company')"
    :page-description="t('')"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-xl text-gray-800 dark:text-gray-100 leading-tight">
          {{ t('dashboard.financial_dashboard') }}
        </h1>
        <button 
          @click="toggleTheme"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <span v-if="isDark">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <span class="sr-only md:not-sr-only">Light Mode</span>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span class="sr-only md:not-sr-only">Dark Mode</span>
          </span>
        </button>
      </div>
    </template>

    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 lg:p-12">
      <!-- Header Section -->
      <div class="max-w-7xl mx-auto mb-8">
        <!-- Profile Completed Banner -->
        <div class="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <p class="text-gray-800 dark:text-gray-200 font-medium text-center md:text-left mb-4 md:mb-0">
            {{ t('dashboard.profile_complete') }}
          </p>
          <button class="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 transition-colors px-6 py-3 rounded-xl font-medium">
           {{ t('dashboard.request_financing') }}
          </button>
        </div>
      </div>

      <!-- Document Completion Section -->
      <div class="max-w-7xl mx-auto mb-12">
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          <!-- Document Progress Card 1 -->
          <div class="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01] text-center w-full md:w-1/3">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ t('dashboard.economic_info') }}</h3>
            <p class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">100%</p>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ t('dashboard.complete') }}</p>
            <button class="w-full max-w-[120px] bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 border border-gray-200 dark:border-white/20 transition-colors py-2 rounded-xl">
            {{ t('dashboard.review') }}
            </button>
          </div>
          
          <div class="hidden md:flex items-center justify-center w-16 h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700 mx-4" />
          
          <!-- Document Progress Card 2 -->
          <div class="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01] text-center w-full md:w-1/3">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ t('dashboard.tax_info') }}</h3>
            <p class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">100%</p>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ t('dashboard.complete') }}</p>
            <button class="w-full max-w-[120px] bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 border border-gray-200 dark:border-white/20 transition-colors py-2 rounded-xl">
            {{ t('dashboard.review') }}
           </button>
          </div>
          
          <div class="hidden md:flex items-center justify-center w-16 h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700 mx-4" />
          
          <!-- Document Progress Card 3 -->
          <div class="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01] text-center w-full md:w-1/3">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ t('dashboard.legal_info') }}</h3>
            <p class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">100%</p>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ t('dashboard.complete') }}</p>
            <button class="w-full max-w-[120px] bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 border border-gray-200 dark:border-white/20 transition-colors py-2 rounded-xl">
              {{ t('dashboard.review') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Main Bento Grid Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <!-- Bento Grid Item 1 -->
        <div class="relative flex flex-col justify-between p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01]">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ t('dashboard.verify_identity') }}</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
            {{ t('dashboard.verify_identity_desc') }}
          </div>
          <button class="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 border border-gray-200 dark:border-white/20 transition-colors py-2 rounded-xl">
           {{ t('dashboard.start_verification') }}
          </button>
        </div>   
        <!-- Bento Grid Item 2 -->
        <div class="relative flex flex-col justify-between p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01]">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ t('dashboard.sign_agreements') }}</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
            {{ t('dashboard.sign_agreements_desc') }}
          </div>
          <button class="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 border border-gray-200 dark:border-white/20 transition-colors py-2 rounded-xl">
          {{ t('dashboard.sign_now') }}
          </button>
        </div>
        <!-- Bento Grid Item 3 -->
        <div class="relative flex flex-col justify-between p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01]">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd" />
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ t('dashboard.view_offers') }}</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
            {{ t('dashboard.view_offers_desc') }}
          </div>
          <button class="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 border border-gray-200 dark:border-white/20 transition-colors py-2 rounded-xl">
          {{ t('dashboard.view_offers') }}
          </button>
        </div>
        
        <!-- Bento Grid Item 4 -->
        <div class="relative flex flex-col justify-between p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-gray-700/50 hover:scale-[1.01]">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ t('dashboard.open_account') }}</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
            {{ t('dashboard.open_account_desc') }}
          </div>
          <button class="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-800/50 border border-gray-200 dark:border-white/20 transition-colors py-2 rounded-xl">
          {{ t('dashboard.open_account') }}
          </button>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>