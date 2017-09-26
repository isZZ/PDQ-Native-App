import { GROUPS_ADD, GROUPS_ADD_USERS, GROUPS_ADD_META } from '../actions/groups.js'

initialState = {
  groups:[],
  groupsUsers: {},
  groupsMeta: {}
}

export default function conversation( state = initialState, action ) {

  switch (action.type) {

    case GROUPS_ADD:

    let { groups } = action;

    return {
        ...state,
        groups
    }

    case GROUPS_ADD_USERS:

    let { groupsUsers } = groupsUsers;

    return {
        ...state,
        groupsUsers
    }

    case GROUPS_ADD_META:

    let { groupId, groupMeta } = action;

    return {
        ...state,
        groupsMeta: Object.assign({}, state.groupsMeta, {[groupId]:groupMeta} )
    }


    default:
      return state

  }
  
}
