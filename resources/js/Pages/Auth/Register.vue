<script setup>
import { ref, reactive, computed } from "vue";
import { useDark } from "@vueuse/core";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { UserPlusIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-vue-next";

const isDark = useDark();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const currentStep = ref(1);
const showSuccessPopup = ref(false);

const form = useForm({
  name: "",
  email: "",
  company_name: "",
  password: "",
  password_confirmation: "",
});

const errors = reactive({});

// Simple client-side validation rules
const validate = () => {
  errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? "A valid email is required."
    : "";
  return !errors.email && !errors.phone && !errors.password;
};

// Handle form submission
const submit = () => {
  if (validate()) {
    form.post(route("register"), {
      onFinish: () => alert("bien pibe"),
    });
  }
};
</script>

<template>
  <GuestLayout>
    <Head title="Register" />

    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UserPlusIcon class="w-8 h-8 text-white" />
        </div>
        <h2
          class="text-2xl font-bold"
          :class="isDark ? 'text-white' : 'text-gray-900'"
        >
          Create Account
        </h2>
        <p
          class="text-sm mt-2"
          :class="isDark ? 'text-gray-300' : 'text-gray-600'"
        >
          Create an account to get started
        </p>
      </div>

      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            Name
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter your name"
            class="w-full px-4 py-3 rounded-lg border transition-colors"
            :class="[
              isDark
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
              form.errors.name ? 'border-red-500' : '',
            ]"
            required
            autofocus
            autocomplete="name"
          />
          <p v-if="form.errors.name" class="text-red-500 text-sm mt-1">
            {{ form.errors.name }}
          </p>
        </div>

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
              autocomplete="new-password"
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

        <div>
          <label
            class="block text-sm font-medium mb-2"
            :class="isDark ? 'text-gray-200' : 'text-gray-700'"
          >
            Confirm Password
          </label>
          <div class="relative">
            <input
              v-model="form.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              class="w-full px-4 py-3 pr-12 rounded-lg border transition-colors"
              :class="[
                isDark
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500',
                form.errors.password_confirmation ? 'border-red-500' : '',
              ]"
              required
              autocomplete="new-password"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
              :class="
                isDark
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
              "
            >
              <EyeIcon v-if="showConfirmPassword" class="w-5 h-5" />
              <EyeOffIcon v-else class="w-5 h-5" />
            </button>
          </div>
          <p
            v-if="form.errors.password_confirmation"
            class="text-red-500 text-sm mt-1"
          >
            {{ form.errors.password_confirmation }}
          </p>
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
          <span v-else>Register</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          Already have an account?
          <Link
            :href="route('login')"
            class="font-medium transition-colors"
            :class="
              isDark
                ? 'text-purple-500 hover:text-purple-400'
                : 'text-purple-600 hover:text-purple-500'
            "
          >
            Log in
          </Link>
        </p>
      </div>
    </div>

    <!-- Success Popup -->
    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 class="text-2xl font-bold mb-4">Registration Successful!</h2>
        <p class="mb-6">
          You have successfully registered. Please log in to continue.
        </p>
        <button
          @click="showSuccessPopup = false"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          OK
        </button>
      </div>
    </div>
  </GuestLayout>
</template>