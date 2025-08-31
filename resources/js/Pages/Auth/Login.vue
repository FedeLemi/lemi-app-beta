<script setup>
import { ref } from "vue";
import { useDark } from "@vueuse/core";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { LogInIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-vue-next";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";

defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});

const isDark = useDark();
const showPassword = ref(false);
const form = useForm({
  email: "",
  password: "",
  remember: false,
});

const submit = () => {
  form.post(route("login"), {
    onFinish: () => form.reset("password"),
  });
};
</script>

<template>
  <GuestLayout>
    <Head title="Log in" />

    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Left side - Full image -->
      <div class="w-full lg:w-1/2 hidden lg:block">
        <div class="h-full w-full bg-gray-100 dark:bg-gray-100">
          <img
            src="images/left-side-log.svg"
            alt="Login background"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Right side - Login form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div class="max-w-md w-full">
          <div
            class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8"
            :class="isDark ? 'shadow-gray-900' : 'shadow-gray-200'"
          >
            <div class="text-center mb-8 flex justify-center">
              <ApplicationLogo class="w-50 h-20 fill-current text-gray-500" />
            </div>

            <div class="text-center mb-8">
              <h2
                class="text-2xl font-bold"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                {{ $t('login.title') }}
              </h2>
              <p
                class="text-sm mt-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-600'"
              >
                  {{ $t('login.subtitle') }}
              </p>
            </div>

            <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
              {{ status }}
            </div>

            <form @submit.prevent="submit" class="space-y-6">
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('login.email') }}
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full px-4 py-3 rounded-xl border transition-colors"
                  :class="[
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500',
                    form.errors.email ? 'border-red-500' : '',
                  ]"
                  required
                  autofocus
                  autocomplete="username"
                />
                <p v-if="form.errors.email" class="text-red-500 text-sm mt-1">
                  {{ form.errors.email }}
                </p>
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-200' : 'text-gray-700'"
                >
                  {{ $t('login.password') }}
                </label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter your password"
                    class="w-full px-4 py-3 pr-12 rounded-xl border transition-colors"
                    :class="[
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500',
                      form.errors.password ? 'border-red-500' : '',
                    ]"
                    required
                    autocomplete="current-password"
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
                <p
                  v-if="form.errors.password"
                  class="text-red-500 text-sm mt-1"
                >
                  {{ form.errors.password }}
                </p>
              </div>

              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    v-model="form.remember"
                    class="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    :class="
                      isDark
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                    "
                  />
                  <span
                    class="ms-2 text-sm"
                    :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                    > {{ $t('login.rememberMe')}}</span
                  >
                </label>

                <Link
                  v-if="canResetPassword"
                  :href="route('password.request')"
                  class="text-sm transition-colors rounded-md focus:outline-none"
                  :class="
                    isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
                  "
                >
                  {{ $t('login.forgotPassword') }}
                </Link>
              </div>

              <button
                type="submit"
                :disabled="form.processing"
                class="w-full py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2"
                :class="
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 focus:ring-offset-gray-800'
                    : 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 focus:ring-offset-white'
                "
              >
                <LoaderIcon
                  v-if="form.processing"
                  class="w-5 h-5 animate-spin mx-auto"
                />
                <span v-else>{{ $t('login.loginButton') }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </GuestLayout>
</template>