<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" align="center">
        <h1>{{ displayTime }}</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn @click="setTimer(5 * 60)">5 MIN</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="setTimer(10 * 60)">10 MIN</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="setTimer(30 * 60)">30 MIN</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="setTimer(60 * 60)">1 HR</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="showCustomDialog = true">CUSTOM</v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="showCustomDialog" max-width="500px">
      <v-card>
        <v-card-title>Set Custom Time</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field v-model.number="customHours" label="Hours" type="number" :min="0" :max="23"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model.number="customMinutes" label="Minutes" type="number" :min="0" :max="59"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model.number="customSeconds" label="Seconds" type="number" :min="0" :max="59"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showCustomDialog = false">CANCEL</v-btn>
          <v-btn text @click="setCustomTimer">SET</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <audio ref="audioElement" src="/ring.mp3" preload="auto"></audio>

    <!-- Stop Button (Appears when the timer reaches 0 and the sound starts) -->
    <v-row justify="center" v-if="showStopButton">
      <v-col cols="auto">
        <v-btn @click="stopSound">STOP RING</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      timer: null,
      showCustomDialog: false,
      customHours: 0,
      customMinutes: 0,
      customSeconds: 0,
      showStopButton: false, // Control whether the stop button appears
    };
  },
  computed: {
    displayTime() {
      let seconds = this.time % 60;
      let minutes = Math.floor(this.time / 60) % 60;
      let hours = Math.floor(this.time / 3600);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  methods: {
    setTimer(seconds) {
      this.time = seconds;
      this.startTimer();
    },
    startTimer() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          clearInterval(this.timer);
          this.playSound(); // Play sound when time is up
          this.time = 0;
        }
      }, 1000);
    },
    setCustomTimer() {
      this.time = this.customHours * 3600 + this.customMinutes * 60 + this.customSeconds;
      if (this.time > 0) {
        this.startTimer();
      } else {
        alert('Please set a valid time.');
      }
      this.showCustomDialog = false;
    },
    playSound() {
      try {
        if (this.$refs.audioElement) {
          this.$refs.audioElement.play().catch(error => {
            console.error('Failed to play audio:', error);
            alert('Failed to play the sound. Please check your audio settings or try refreshing the page.');
          });
        } else {
          console.error('Audio element not found');
          alert('Audio element not found. Please refresh the page.');
        }
        this.showStopButton = true; // Show the stop button when sound starts
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while trying to play the sound. Please try again or refresh the page.');
      }
    },
    stopSound() {
      if (this.$refs.audioElement) {
        this.$refs.audioElement.pause(); // Stop the sound
        this.$refs.audioElement.currentTime = 0; // Reset the audio to the beginning
        this.showStopButton = false; // Hide the stop button
      }
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
