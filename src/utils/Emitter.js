const Emitter = {
  events: {},
  
  on(event, cb) {
      Emitter.events[event] = Emitter.events[event] || []
      Emitter.events[event].push(cb)    
  },

  emit(event, ...args) {
      if(event in Emitter.events === false) return;
      
      Emitter.events[event].forEach((e) => {
        e(...args)
      })
  }
}


// Emitter.on('click', (name) => console.log('cliquei', name))
// Emitter.on('click', () => console.log('cliquei 2'))
// Emitter.emit('click', "luposki")

export { Emitter }
