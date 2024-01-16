import { createStore } from 'vuex'

export default createStore({
  state: {
    taskList: [
      {
        title: '吃饭',
        complete: false
      },
      {
        title: '逛街',
        complete: false
      },
      {
        title: '看电影',
        complete: true
      }
    ]
  },
  mutations: {
    addToDo: (state, task) => {
      state.taskList.push(task)
    },
    delToDo: (state, index) => {
      state.taskList.splice(index, 1)
    },
    clear: (state, tasks) => {
      state.taskList = tasks
    }
  },
  actions: {
  },
  modules: {
  }
})
