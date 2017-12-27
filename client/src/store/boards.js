import { index } from '@/api/boards'

const state = {
  boards: [],
  selected: null
}

const actions = {
  fetch_all_boards({ commit }) {
    index()
      .then(res => res.body.boards)
      .then(boards => { 
        commit('receive_boards', boards)
        commit('set_selected_board', boards[0])
      })
  }
}

const mutations = {
  receive_boards (state, boards) {
    state.boards = boards
  },
  set_selected_board (state, board) {
    state.selected = board.id
  }
}

const getters = {

  get_all_boards (state) {
    return state.boards
  },

  get_selected_board (state) {
    return state.selected
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
