import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: [],
  },
  getters: {
    allData:(state) => state.allData
  },
  mutations: {
    set_data(state, questions) {
      state.allData = questions
    }
  },
  actions: {
    async fetchQuestions(state) {
      try {
        const questions = await axios.get('https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=20&region=MM&difficulty=medium&tags=football')
          state.commit('set_data', questions.data)
        }
        catch (error) {
            alert(error)
            console.log(error)
        }
    },
    async getData(state) {
      await axios
        .get("https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=20&region=MM&difficulty=medium&tags=football")
        .then((response) => {
          state.commit('set_data', response.data)
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  modules: {
  }
})
