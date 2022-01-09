<template>
  <div>
    <v-card class="mt-10 pa-10">
      <header>
        <h1>My Music</h1>
      </header>
      <section class="player">
        <h2 class="song-title">
          {{ current.artist }} - <span>{{ current.title }}</span>
        </h2>
        <div class="control">
          <v-btn icon class="Prev" @click="prev"><v-icon>mdi-skip-previous</v-icon></v-btn>
          <v-btn icon class="Play" v-if="!isPlaying" @click="play"
            ><v-icon>mdi-play</v-icon></v-btn
          >
          <v-btn icon class="Pause" v-else @click="pause"
            ><v-icon>mdi-pause</v-icon></v-btn
          >
          <v-btn icon class="Next" @click="next"><v-icon>mdi-skip-next</v-icon></v-btn>
        </div>
      </section>
      <section class="playlist pa-2">
        <h3>The playlist</h3>
        <v-btn
          class="mt-2"
          text
          v-for="song in songs"
          :key="song.src"
          @click="play(song)"
          :class="song.src == current.src ? 'song playing' : 'song'"
        >
          {{ song.title }} - {{ song.artist }}
        </v-btn>
      </section>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Itunes",
  data() {
    return {
      current: {},
      isPlaying: false,
      index: 0,
      songs: [
        {
          title: "Good music",
          artist: "George Bluth",
          src: require("../../public/music/LiamM - Exhalation.mp3"),
        },
        {
          title: "Loft style",
          artist: "George Bluth",
          src: require("../../public/music/Nockturn - Birds.mp3"),
        },
        {
          title: "My life",
          artist: "George Bluth",
          src: require("../../public/music/Shadowlike - The Passionate Spring Censored.mp3"),
        },
      ],
      player: new Audio(),
    };
  },
  methods: {
    play(song) {
      if (typeof song.src != "undefined") {
        this.current = song;
        this.player.src = this.current.src;
      }
      this.player.play();
      this.player.addEventListener('ended', function () {
        this.index++
          if (this.index > this.songs.length - 1) {
        this.index = 0;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
      }.bind(this))
      this.isPlaying = true;
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    next() {
      this.index++;
      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },
  },
  created() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  },
};
</script>

<style scoped>
.player {
  text-align: center;
  width: 400px;
}

.playlist {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control {
  display: flex;
  justify-content: space-evenly;
}
.v-card {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
