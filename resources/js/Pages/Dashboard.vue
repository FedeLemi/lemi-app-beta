<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";

// Sample data for the dashboard
const messages = ref([
  "Your recent project shows great potential! Keep up the good work.",
  "You have 3 pending tasks that need your attention.",
  "Your team completed 85% of this month's objectives.",
  "New messages received from 5 clients today.",
  "Your performance metrics are 15% above target this quarter.",
]);

const artworks = ref([
  "https://picsum.photos/id/1018/400/300",
  "https://picsum.photos/id/1035/400/300",
  "https://picsum.photos/id/1040/400/300",
  "https://picsum.photos/id/106/400/300",
]);

const currentMessage = ref(messages.value[0]);
const currentArt = ref(artworks.value[0]);

function refreshContent() {
  // Get random message
  const randomMessageIndex = Math.floor(Math.random() * messages.value.length);
  currentMessage.value = messages.value[randomMessageIndex];

  // Get random art
  const randomArtIndex = Math.floor(Math.random() * artworks.value.length);
  currentArt.value = artworks.value[randomArtIndex];
}
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <template #header>
      <h2
        class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
      >
        c-pull Dashboard
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Message Box -->
              <div class="md:col-span-2">
                <div class="p-6 rounded-lg shadow">
                  <h3 class="text-lg font-semibold mb-4">Daily Update</h3>
                  <div class="p-4 rounded min-h-[120px]">
                    " {{ currentMessage }} "
                  </div>
                </div>
              </div>

              <!-- Art Gallery -->
              <div>
                <img
                  :src="currentArt"
                  alt="Featured artwork"
                  class="w-full h-auto rounded"
                />
                <!-- </div> -->
              </div>
            </div>

            <!-- Action Button -->
            <div class="mt-8 flex justify-center">
              <button
                @click="refreshContent"
                class="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-pruple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Gestiona tus créditos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>