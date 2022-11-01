import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: [],
    user_email: '',
    user_password: '',
  },
  getters: {
    // allData:(state) => state.allData
    allData: (state) => {
      return state.allData.map((obj) => {
        let newObj = { ...obj, answers: [obj.correctAnswer, ...obj.incorrectAnswers] }
        let ansArr = newObj.answers
        for (let i = ansArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [ansArr[i], ansArr[j]] = [ansArr[j], ansArr[i]];
        }
        return newObj
      })
    }
  },
  mutations: {
    set_data(state, questions) {
      state.allData = questions
    },
    register(state, form) {
      state.user_email = form.email
      state.user_password = form.password
      alert('Register done')
    },
    login(state, form){
      state.user_email = form.email
      state.user_password = form.password
      alert('Logged in')
    }, 
    logout(state){
      state.user_email = ''
      alert('Logged out')
    }, 
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
        .get("https://the-trivia-api.com/api/questions?limit=20")
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
