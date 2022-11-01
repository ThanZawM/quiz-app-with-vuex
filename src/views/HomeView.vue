<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <h3>{{allData}}</h3> -->

    <div v-if="!(index == allData.length)">
      <h1 :class="status">{{ allData[index].question }}</h1>
      <br /><br />
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].answers[0], 0)"
            :class="bgcolor1"
            id="btn1"
            ref="btn1"
          >
            <!-- :style="ans == true ? [trueStyles] : [falseStyles]" -->
            <h2>{{ allData[index].answers[0] }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].answers[1], 1)"
            :class="bgcolor2"
            id="btn2"
            ref="btn2"
          >
            <h2>{{ allData[index].answers[1] }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="1"></v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].answers[2], 2)"
            :class="bgcolor3"
            id="btn3"
            ref="btn3"
          >
            <h2>{{ allData[index].answers[2] }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="5">
          <v-btn
            x-large
            width="100%"
            @click="checkAnswer(allData[index].answers[3], 3)"
            :class="bgcolor4"
            id="btn4"
            ref="btn4"
          >
            <h2>{{ allData[index].answers[3] }}</h2>
          </v-btn>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <br /><br />
      <!-- <v-btn x-large outlined @click="next">
        <h2>NEXT</h2>
      </v-btn> -->
    </div>

    <div v-else>
      <!-- <v-text-field label="Total" placeholder="Placeholder" outlined disabled v-model="point"></v-text-field> -->
      <h2 :class="status">Total Scores: {{ point }} / {{ allData.length }}</h2>
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
      ansIndex: 0,
      point: 0,
      ans: null,
      status: "col",
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
      trueColor: "",
      falseColor: "",
      ansTrue: "ansTrue",
      ansFalse: "ansFalse",
      bgcolor1: "",
      bgcolor2: "",
      bgcolor3: "",
      bgcolor4: "",
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
    checkAnswer(value, btn) {
      let self = this;
      if (value == self.allData[self.index].correctAnswer) {
        self.point += 1;
        switch (btn) {
          case 0:
            self.bgcolor1 = "btntrue";
            break;
          case 1:
            self.bgcolor2 = "btntrue";
            break;
          case 2:
            self.bgcolor3 = "btntrue";
            break;
          case 3:
            self.bgcolor4 = "btntrue";
            break;
        }
      } else {
        switch (btn) {
          case 0:
            self.bgcolor1 = "btnfalse";
            break;
          case 1:
            self.bgcolor2 = "btnfalse";
            break;
          case 2:
            self.bgcolor3 = "btnfalse";
            break;
          case 3:
            self.bgcolor4 = "btnfalse";
            break;
        }

        let ansid = -1;
        for (let val of this.allData[self.index].answers) {
          ansid++;
          if (val == this.allData[self.index].correctAnswer) {
            console.log(ansid, val);

            switch (ansid) {
              case 0:
                self.bgcolor1 = "btntrue";
                break;
              case 1:
                self.bgcolor2 = "btntrue";
                break;
              case 2:
                self.bgcolor3 = "btntrue";
                break;
              case 3:
                self.bgcolor4 = "btntrue";
                break;
            }
          }
        }
      }

      setTimeout(() => {
        self.index++;
        self.bgcolor1 = "";
        self.bgcolor2 = "";
        self.bgcolor3 = "";
        self.bgcolor4 = "";
      }, 1200);
    },
    reset() {
      let self = this;
      self.index = 0;
      self.point = 0;
    },
    next() {
      let self = this;
      self.index++;
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
  },
};
</script>

<style scoped>
.ansTrue {
  background: green !important;
  color: white !important;
}

.ansFalse {
  background: red !important;
  color: white !important;
}

h2 {
  text-transform: capitalize;
}

.btntrue {
  background: green !important;
  color: white !important;
}

.btnfalse {
  background: red !important;
  color: white !important;
}
.col {
  color: lightseagreen;
}
</style>
