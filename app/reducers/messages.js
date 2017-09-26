import { MESSAGES_RECEIVED } from '../actions/messages.js'

const initialState = {
  messagesIds:[],
  messagesGroupedByConversationId:[],
  messages:{}
}

export default function messages( state = initialState, action ) {

  switch ( action.type ) { 

    // case MESSAGES_RECEIVE:

    //   let { messageId, conversationId, conversationObj } = action;
    //   let { messageIds, messagesGroupedByConversationId } = state 
      
    //   let messageIds = state.messageIds.slice();
    //   if( messageIds.indexOf(action.conversationId) > -1 )
    //     messageIds = messageIds.push( action.conversationId );

    //   let messagesGroupedByConversationId = { ...messagesGroupedByConversationId }
    //   let conversation = messagesGroupedByConversationId[conversationId];
    //   if( typeof( conversation ) == 'undefined' )
    //     messagesGroupedByConversationId[conversationId] = [messageId];
    //   elseif(){
        
    //   }
    //   else{
    //     messagesGroupedByConversationId[conversationId].push(messageId)
    //   }

      // case MESSAGES_RECEIVED:

      // let { messageId, conversationId, messageObj } = action;
      // let { messagesIds, messagesGroupedByConversationId } = state;
      
      // var newMessagesIds = messagesIds.slice();
      // if( newMessagesIds.includes(messageId) === false )
      //   newMessagesIds.push(messageId);
      
      // //var newObj = messagesGroupedByConversationId[conversationId] || {};
      // var newObj = messagesGroupedByConversationId[conversationId] || {};

      // var conversationMessages = messagesGroupedByConversationId[conversationId]||[];
      // var newConversationMessages = conversationMessages.slice();
      // if( newConversationMessages.includes(messageId) === false )
      //   newConversationMessages.push(messageId);

      // return {
      //   ...state,
      //   messagesIds: newMessagesIds,
      //   messagesGroupedByConversationId: { ...messagesGroupedByConversationId, [conversationId]:newConversationMessages },
      //   messages: {
      //     ...state.messages, 
      //     [action.messageId]:messageObj
      //   }
      // }

      case MESSAGES_RECEIVED:
        let { messagesIds, conversationId, messagesObj } = action;
        let { messagesGroupedByConversationId, messages } = state;

        var test = { [conversationId]:messagesIds, ...messagesGroupedByConversationId };

        return{
          ...state,
          messagesGroupedByConversationId: { [conversationId]:messagesIds, ...messagesGroupedByConversationId },
          messages: {
            ...messages, 
            ...messagesObj
          }
        }



      // return {
      //   ...state,
      //   messageIds,
      //   messagesGroupedByConversationId:[],
      //   messages:{
      //     ...state.messages,
      //     [action.conversationId]:{
      //       conversationId: action.conversationId,
      //       messageText: 'test'
      //     }
      //   },
      // }

    default:
      return state

  }
  
}

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}