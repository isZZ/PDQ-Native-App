import { connect } from 'react-redux'
import ScreenChatOptionsGroupSelect from '../components/ScreenChatOptionsGroupSelect'
import { conversationCreateGroupId } from '../actions/conversationCreate.js'

const mapStateToProps = (state) => {

	let groupsMeta = state.groups.groupsMeta;
	let groups = []

	for(let key in groupsMeta){
		let group = {};
		group.groupId = key;
		group.description = groupsMeta[key].description;
		group.name = groupsMeta[key].name;
		group.createdAt = groupsMeta[key].createdAt;
		groups.push(group);
	}

	return {
		groups: groups,
	}
}

//Returns object with onButtonPress function with a dispatcher for next scene action
const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		selectGroup: ( groupId ) => {
			dispatch(conversationCreateGroupId( groupId ))
		},
		closeModal: () => {

		}
	}
}

/*Connects a React component to a Redux store.
It does not modify the component class passed to it.
Instead, it returns a new, connected component class, for you to use. */

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScreenChatOptionsGroupSelect)