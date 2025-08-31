<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Link, useForm, usePage } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n"; // Add this import

const { t } = useI18n(); // Initialize i18n
const $t = t; // Expose t as $t for template

defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});

const user = usePage().props.auth.user;

const form = useForm({
  name: user.name,
  email: user.email,
});
</script>

<template>
  <section class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
    <header>
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ $t("profile.profileInformation") }}
      </h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ $t("profile.updateProfileInformationEmailAddress") }}
      </p>
    </header>

    <form
      @submit.prevent="form.patch(route('profile.update'))"
      class="mt-6 space-y-6"
    >
      <div>
        <InputLabel for="name" value="Name" class="text-gray-700 dark:text-gray-300"/>

        <TextInput
          id="name"
          type="text"
          class="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition-colors duration-200"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />

        <InputError class="mt-2 text-sm" :message="form.errors.name" />
      </div>

      <div>
        <InputLabel for="email" value="Email" class="text-gray-700 dark:text-gray-300"/>

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition-colors duration-200"
          v-model="form.email"
          required
          autocomplete="username"
        />

        <InputError class="mt-2 text-sm" :message="form.errors.email" />
      </div>

      <div v-if="mustVerifyEmail && user.email_verified_at === null" class="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-4">
        <p class="text-sm text-gray-800 dark:text-gray-200">
          {{ $t('profile.emailUnverified') }}
          <Link
            :href="route('verification.send')"
            method="post"
            as="button"
            class="underline text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            {{ $t('profile.resendVerification') }}
          </Link>
        </p>

        <div
          v-show="status === 'verification-link-sent'"
          class="mt-2 font-medium text-sm text-green-600 dark:text-green-400"
        >
          {{ $t('profile.verificationSent') }}
        </div>
      </div>

      <div class="flex items-center gap-4">
        <PrimaryButton 
          :disabled="form.processing"
          class="rounded-xl bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 focus:ring-purple-500 text-white transition-colors duration-200 px-4 py-2 shadow-sm hover:shadow-md"
        >
          {{ $t('profile.save') }}
        </PrimaryButton>

        <Transition
          enter-active-class="transition ease-in-out duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition ease-in-out duration-200"
          leave-to-class="opacity-0"
        >
          <p
            v-if="form.recentlySuccessful"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            {{ $t('profile.saved') }}
          </p>
        </Transition>
      </div>
    </form>
  </section>
</template>
