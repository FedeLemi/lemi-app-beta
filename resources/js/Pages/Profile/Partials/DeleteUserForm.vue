<script setup>
import DangerButton from '@/Components/DangerButton.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { nextTick, ref } from 'vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.reset();
};
</script>

<template>
    <section class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
        <header>
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
                {{ $t('deleteUser.title') }}
            </h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ $t('deleteUser.description') }}
            </p>
        </header>

        <DangerButton 
            @click="confirmUserDeletion"
            class="mt-6 rounded-xl bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 focus:ring-red-500 text-white transition-colors duration-200 px-4 py-2 shadow-sm hover:shadow-md"
        >
            {{ $t('deleteUser.deleteButton') }}
        </DangerButton>
             
        <Modal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6 rounded-xl bg-white dark:bg-gray-800">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
                    {{ $t('deleteUser.confirmationTitle') }}
                </h2>

                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {{ $t('deleteUser.confirmationDescription') }}
                </p>

                <div class="mt-6">
                    <InputLabel for="password" value="Password" class="sr-only" />

                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition-colors duration-200"
                        placeholder="Password"
                        @keyup.enter="deleteUser"
                    />

                    <InputError :message="form.errors.password" class="mt-2 text-sm" />
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                    <SecondaryButton 
                        @click="closeModal"
                        class="rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50 border border-white dark:border-white/20 transition-colors duration-200 px-4 py-2 shadow-sm hover:shadow-md"
                    >
                        {{ $t('deleteUser.cancel') }}
                    </SecondaryButton>
                    <DangerButton
                        class="rounded-xl bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 focus:ring-red-500 text-white transition-colors duration-200 px-4 py-2 shadow-sm hover:shadow-md"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        {{ $t('deleteUser.delete') }}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    </section>
</template>
