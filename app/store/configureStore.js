import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import promise from 'redux-promise';
//import { autoRehydrate } from 'redux-persist'

//Reducers specify how application state changes, they except the current state and return the new state - Is a pure function
//See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce 

import reducer from '../reducers'

const level = 'info';
const logger = createLogger({
	level,
	predicate: (getState, action) => action.type !== 'GEOLOCATION_UPDATE'
})

export default function configureStore( initialState ) {

  const store = createStore(
    reducer,
    applyMiddleware(thunk, promise, logger),
    //autoRehydrate()
  )

 //  const store = createStore(
	//   reducer,
	//   {},
	//   compose(
	//     autoRehydrate(),
	//     applyMiddleware(thunk)
	//   )
	// )

  return store
}

