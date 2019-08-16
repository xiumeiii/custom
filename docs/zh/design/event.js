import Emitter from './emitter'
export default {
  mixins: [Emitter],
  methods: {
    communicate (event, params = {}) {
      this.dispatch('ROOT', event, Object.assign({
        eventName: event
      }, params))
    }
  }
}