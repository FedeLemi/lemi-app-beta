<script setup>
import { ref, reactive, computed } from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

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
  // errors.name = form.name.trim() === "" ? "Name is required." : "";
  // errors.last_name =
  //   form.last_name.trim() === "" ? "Last Name is required." : "";
  errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? "A valid email is required."
    : "";
  // errors.phone = !/^\d+$/.test(form.phone) ? "Phone number is invalid." : "";
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
    <form @submit.prevent="submit">
      <div>
        <InputLabel for="name" value="Name" />
        <TextInput
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full"
          required
          autofocus
          autocomplete="name"
        />
        <InputError class="mt-2" :message="form.errors.name" />
      </div>
      <div class="mt-4">
        <InputLabel for="email" value="Email" />
        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="username"
        />
        <InputError
          class="my-2 p-2 bg-primary-400 rounded-md text-center text-white-100"
          :message="form.errors.email"
        />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />

        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />

        <InputError
          class="my-2 p-2 bg-primary-400 rounded-md text-center text-white-100"
          :message="form.errors.password"
        />
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" value="Confirm Password" />
        <TextInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="new-password"
        />
        <InputError class="mt-2" :message="form.errors.password_confirmation" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton
          class="ms-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Register
        </PrimaryButton>
      </div>
    </form>
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
        <PrimaryButton @click="() => (showSuccessPopup.value = false)">
          OK
        </PrimaryButton>
      </div>
    </div>
  </GuestLayout>
</template>
