<template>
  <div class="space-y-8 max-w-lg">
    <h1>Hi, please download the thing. Thank you</h1>
    <button @click="addToCalendar">Click me to download</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createEvent, EventAttributes } from 'ics';
import { downloadFile } from '../utils/download-file';

export default defineComponent({
  setup() {
    const addToCalendar = () => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const day = new Date().getDay();

      const event: EventAttributes = {
        start: [year, month, day + 1, 21, 30],
        duration: { hours: 1 },
        title: 'לקנות לאיתמר שוקולד',
        description: 'כי מגיע לו, איזה גבר הוא',
        busyStatus: 'FREE',
      };

      createEvent(event, (err, value) => {
        downloadFile(
          `itamar_event_ ${new Date().getTime()}.ics`,
          value,
          'text/calendar'
        );
      });
    };
    return { addToCalendar };
  },
});
</script>
