import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: [],
    user_email: '',
    user_password: '',
    isLogin: false,
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
      if (form.email == '' && form.password == '') {
        alert('Refill user name and password!')
      } else {
        state.user_email = form.email
        state.user_password = form.password
        alert('Register done')
        router.push('/')
      }

    },
    login(state, form) {
      if (state.user_email == '' && state.user_password == '') {
        alert('Please register first!')
        router.push("/register")
      } else if (state.user_email == form.email && state.user_password == form.password) {
        alert('Logged in')
        state.isLogin = true
      } else {
        alert('User name or password is wrong!')
      }

    },
    logout(state) {
      alert('Logged out')
      state.isLogin = false
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
