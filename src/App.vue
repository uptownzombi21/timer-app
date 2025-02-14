/* eslint-disable vue/no-unused-components */
<template>
  <v-app>
    <v-main>
      <TimerComponent />
    </v-main>
  </v-app>
</template>
<script>
import TimerComponent from '@/components/TimerComponent.vue';
export default {
  name: 'App',
  components: {
    TimerComponent
  }
};
</script>