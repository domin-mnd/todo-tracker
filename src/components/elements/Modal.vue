<template>
  <div
    id="modal-backdrop"
    class="absolute top-0 left-0 h-screen w-screen bg-quaternary-900/20 flex justify-center items-center p-4 transition-all"
    :class="{
      'opacity-0 pointer-events-none': !props.opened,
      'opacity-100 pointer-events-auto': props.opened,
    }"
    @click="(e) => e.target === e.currentTarget && closeModal()"
  >
    <div
      id="modal-container"
      class="flex flex-col bg-black w-full max-w-xl h-full max-h-[30rem] rounded-md p-5 border border-quaternary-800"
    >
      <div id="modal-header" class="flex grow-0 justify-between">
        <h1 class="text-quaternary-300 text-lg font-bold text-gray-800">
          <slot name="header" />
        </h1>
        <button
          id="modal-close-button"
          class="mb-6 text-quaternary-400 hover:text-white focus:outline-none focus:text-red-600 transition-colors"
          @click="closeModal"
        >
          <X />
        </button>
      </div>
      <div id="modal-content" class="text-white grow flex flex-col"><slot /></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import X from "@/components/svg/X.vue";

const emit = defineEmits(["onClose"]);

const closeModal = () => {
  emit("onClose");
};

// Using global type definition won't work
const props = defineProps<{
  opened: boolean;
}>();
</script>
