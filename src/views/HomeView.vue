<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div v-if="!(index == allData.length)">
      <h1>{{ allData[index].question }}</h1>
      <br /><br />
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].correctAnswer)"
            :color="backcolor"
            class="white--text"
          >
            <!-- :style="ans == true ? [trueStyles] : [falseStyles]" -->
            <h2>{{ allData[index].correctAnswer }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].incorrectAnswers[0])"
          >
            <h2>{{ allData[index].incorrectAnswers[0] }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="1"></v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].incorrectAnswers[1])"
          >
            <h2>{{ allData[index].incorrectAnswers[1] }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].incorrectAnswers[2])"
          >
            <h2>{{ allData[index].incorrectAnswers[2] }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </div>

    <div v-else>
      <!-- <v-text-field label="Total" placeholder="Placeholder" outlined disabled v-model="point"></v-text-field> -->
      <h2>Total Scores: {{ point }} / {{ allData.length }}</h2>
      <br /><br />
      <v-btn x-large outlined @click="reset">
        <h2>Reset</h2>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      index: 0,
      quiz: {},
      point: 0,
      ans: null,
      baseStyles: {
        background: "grey",
        color: "white",
      },
      trueStyles: {
        background: "green",
        color: "white",
      },
      falseStyles: {
        background: "red",
        color: "white",
      },
      backcolor: "",
    };
  },
  mounted() {
    this.$store.dispatch("getData");
  },
  computed: {
    allData() {
      let self = this;
      return self.$store.getters.allData;
    },
  },
  methods: {
    checkAnswer(value) {
      let self = this;
      if (value == self.allData[self.index].correctAnswer) {
        self.point += 1;
        self.ans = true;
        self.backcolor = "green";
        // console.log(self.point, "", self.ans);
      } else {
        self.ans = false;
        self.backcolor = "red";
      }
      // self.index++;
      if (self.allData.length == self.index) {
        console.log("Total", self.point);
      }
    },
    reset() {
      let self = this;
      self.index = 0;
      self.point = 0;
      self.ans = false;
    },
  },
};
</script>

<style scoped>
.text-danger {
  color: red;
}
.ansTrue {
  background: green;
  color: white;
}

.ansFalse {
  background: red;
  color: white;
}
.bgblue {
  background: blueviolet;
  color: white;
}

h2 {
  text-transform: capitalize;
}
</style>
