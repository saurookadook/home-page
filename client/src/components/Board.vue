<template>
  <div 
      class="board"
      v-bind:class="{ clicked: isClicked && !create, create: create }"
      @mousedown="isClicked = true"
      @mouseup="isClicked = false"
      >
    <router-link 
      v-if="board"
      @click.native="select_board_link(board)" 
      :to="{name: 'CardView', params: {id: board.id}}"> {{ board.name }} </router-link>
    <a
      v-else-if="create"
      @click="toggle_create_board"
      > Add new board </a>
    <input
      autofocus
      v-else-if="editing"
      key="board-editing"
      ref="editing"
      v-model="name"
      @keydown.esc="close"
      @keyup.enter="submit(name)">
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {

  name: 'Board',

  props: ['board', 'create', 'editing'],

  data: function() {
    return {
      name: '',
      isClicked: false
    }
  },

  mounted: function() {
    if (this.$refs.editing) {
      this.$refs.editing.focus()
    }
  },

  methods: {

    submit: function(name) {
      const self = this
      const payload = { board: { name: self.name } }
      this.create_board(payload)
        .then(_ => {
          self.toggle_create_board()
        })
        .catch(err => {
          console.log(err)
        })
    },

    close: function() {
      if (this.editing) {
        this.toggle_board_create()
      }
    },

    select_board_link: function(board) {
      this.select_board(board)
    },

    select_home: function() {
      this.select_board(null)
    },

    toggle_create_board: function() {
      this.toggle_board_create()
    },

    ...mapActions([
      'select_board',
      'toggle_board_create',
      'create_board'
    ])

  }

}

</script>

<style>

.board {
  background: white;
  height: 30px;

  border-radius: 5px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  margin: 4px 0;
  text-align: center;

  transition: box-shadow 100ms, transform 100ms, border-color 100ms, color 100ms, border 100ms; 
  cursor: pointer;

}

.board:hover {
  border-color: #3cbdb2;
  color: #3cbdb2;
}

.board a {
  color: inherit;
  text-decoration: none;
  display: block;
  margin-top: 4px;
  width: 100%;
  height: 100%;
}

.clicked {
  box-shadow: none;
  transform: translateY(2px);
}

.create {
  margin-top: 6px;
  background: transparent;
  border: 1px dashed #3cbdb2;
  box-shadow: none;
}

.board input {
  border: 1px solid transparent;
  outline: none;
  color: rgb(85, 85, 85);
  font-size: 16px;
  text-align: center;
  margin-top: 2px;
}

</style>
