import { CONVERSATIONS_ADD, CONVERSATIONS_ADD_META } from '../actions/conversations.js'

const initialState = {
  conversationIds:[],
  conversationsMeta:{}
}

export default function conversations( state = initialState, action ) {

  switch (action.type) { 

    case CONVERSATIONS_ADD:

      let { conversationIds } = action

      return {
          ...state,
          conversationIds  
      }

      case CONVERSATIONS_ADD_META:

      let{ conversationsMeta } = action;

      return {
        ...state,
        conversationsMeta
      } 

    // case CONVERSATIONS_ADD_META:

    //   let{ conversationMeta, conversationId } = action;

    //   return {
    //     ...state,
    //     conversationsMeta: { ...state.conversationMeta, [conversationId]:conversationMeta }
    //   } 

    default:
      return state

  }
  
}