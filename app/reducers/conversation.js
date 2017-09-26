import { CONVERSATION_ADD } from '../actions/conversation.js'

initialState = {
	conversationId:null,
  conversationUserIds:[],
  conversationUserRoles:{}
}

export default function conversation( state = initialState, action ) {

  switch (action.type) {

    case CONVERSATION_ADD:

    let { conversationId, conversationUserIds, conversationUserRoles } = action.conversationUsers;

      return {
          ...state,
          conversationId,
          conversationUserIds,
          conversationUserRoles
      }

    default:
      return state

  }
  
}