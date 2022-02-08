import { ref } from 'vue';

const useStopwatch = () => {
  let timer: number | undefined;
  const time = ref(0);

  const start = () => {
    if (!timer) {
      timer = setInterval(() => time.value++, 1000);
    }
  };

  const stop = () => {
    clearInterval(timer);
  };

  return { start, stop, time };
};

export default useStopwatch;
