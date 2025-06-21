<script setup>
import { ref } from "vue";
import { useDark } from "@vueuse/core";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { LogInIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-vue-next";

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
          Log in
        </h2>
        <p
          class="text-sm mt-2"
          :class="isDark ? 'text-gray-300' : 'text-gray-600'"
        >
          Enter your credentials to access your account
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
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
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
            Password
          </label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full px-4 py-3 pr-12 rounded-lg border transition-colors"
              :class="[
                isDark
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
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
          <p v-if="form.errors.password" class="text-red-500 text-sm mt-1">
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
              >Remember me</span
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
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          :disabled="form.processing"
          class="w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            isDark
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          "
        >
          <LoaderIcon
            v-if="form.processing"
            class="w-5 h-5 animate-spin mx-auto"
          />
          <span v-else>Log in</span>
        </button>
      </form>
    </div>
  </GuestLayout>
</template>