<script setup lang="ts">
const onClick = () => {
  alert('What did you think would happen?');
};
</script>

<template>
  <div class="space-y-8 max-w-lg">
    <p class="text-6xl font-bold">
      I'm <span class="text-blue-500">Jason</span>, and this is my website
    </p>
    <p class="text-lg dark:text-gray-400">
      Hello there, dear visitor. You might be asking yourself, what is this
      text? Well, this text is nothing but filler of course. In fact, the
      purpose of this text isn't even known to <span class="italic">me.</span>
    </p>
    <div class="flex flex-row justify-start space-x-16">
      <button
        @click="onClick"
        class="bg-blue-600 font-semibold p-4 rounded-lg text-white"
      >
        Click Me! <span class="ml-2">></span>
      </button>

      <button
        @click="onClick"
        class="bg-blue-600 font-semibold p-4 rounded-lg text-white flex-1"
      >
        Or Me!!!!
      </button>
    </div>
  </div>
</template>
