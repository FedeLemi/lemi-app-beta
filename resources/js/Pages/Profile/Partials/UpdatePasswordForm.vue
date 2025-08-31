<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }
            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <section class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
        <header>
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ $t('updatePassword.title') }}</h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ $t('updatePassword.description') }}
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
                <InputLabel for="current_password" value="Current Password" class="text-gray-700 dark:text-gray-300"/>
                
                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition-colors duration-200"
                    autocomplete="current-password"
                />

                <InputError :message="form.errors.current_password" class="mt-2 text-sm"/>
            </div>

            <div>
                <InputLabel for="password" value="New Password" class="text-gray-700 dark:text-gray-300"/>
                
                <TextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition-colors duration-200"
                    autocomplete="new-password"
                />

                <InputError :message="form.errors.password" class="mt-2 text-sm"/>
            </div>

            <div>
                <InputLabel for="password_confirmation" value="Confirm Password" class="text-gray-700 dark:text-gray-300"/>
                
                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition-colors duration-200"
                    autocomplete="new-password"
                />

                <InputError :message="form.errors.password_confirmation" class="mt-2 text-sm"/>
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton 
                    :disabled="form.processing" 
                    class="rounded-xl bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 focus:ring-purple-500 text-white transition-colors duration-200 px-4 py-2 shadow-sm hover:shadow-md"
                >
                    {{ $t('updatePassword.save') }}
                </PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out duration-200"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out duration-200"
                    leave-to-class="opacity-0"
                >
                    <p v-if="form.recentlySuccessful" class="text-sm text-gray-600 dark:text-gray-400">
                        {{ $t('updatePassword.saved') }}
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>

