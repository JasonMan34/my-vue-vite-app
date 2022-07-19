<template>
  <div class="space-y-8 max-w-lg">
    <input type="file" @change="onFileChange" />

    <br />

    <button @click="encode">Encode</button>
    <button @click="decode">Decode</button>
    <button @click="corrupt">Corrupt</button>
    <button v-if="corrupted.length !== 0" @click="decodeCorrupted">
      Decode corrupted file
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { encode_8_4 as hamming_encoder } from '../libs/hamming-encoder/hamming_encoder';
import { decode as hamming_decode } from '../libs/hamming-decoder/hamming_decoder';
import { corrupt as hamming_corrupt } from '../libs/hamming-corruptor/hamming_corruptor';

export default defineComponent({
  name: 'ImJason',
  setup() {
    const file = ref(new Uint8Array());
    const encoded = ref(new Uint8Array());
    const decoded = ref(new Uint8Array());
    const corrupted = ref(new Uint8Array());

    const onFileChange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      // eslint-disable-next-line prefer-destructuring
      file.value = new Uint8Array(await target.files![0].arrayBuffer());
    };

    const encode = () => {
      encoded.value = hamming_encoder(new Uint8Array([...file.value]));
    };

    const decode = () => {
      decoded.value = hamming_decode(new Uint8Array([...encoded.value]), true);
    };

    const decodeCorrupted = () => {
      decoded.value = hamming_decode(
        new Uint8Array([...corrupted.value]),
        true
      );
    };

    const corrupt = () => {
      corrupted.value = hamming_corrupt(new Uint8Array([...encoded.value]));
    };

    return {
      onFileChange,
      encode,
      decode,
      corrupt,
      decodeCorrupted,
      corrupted,
    };
  },
});
</script>

<style scoped>
button {
  @apply bg-blue-600
          hover:bg-blue-800
          font-semibold
          rounded-lg
          p-4
          text-white;
}
</style>

<i18n lang="json"></i18n>
