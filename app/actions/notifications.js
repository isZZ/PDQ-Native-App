import React, {PropTypes, Component} from 'react' 
import * as firebase from 'firebase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {DeviceEventEmitter, Platform} from 'react-native';
//import PushNotification from 'react-native-push-notification';
import {Actions} from 'react-native-router-flux'
import {conversationClick} from './conversation'



export function configurePushNotifications(){ 
	return (dispatch, getState) => {
		console.log('token')
		console.log(typeof(FCM.getFCMToken))

		this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
			console.log('REFRESHgetFCMToken')
			console.log(token)
			dispatch(writeToken(token));
			// fcm token may not be available on first load, catch it here
		});

		FCM.getFCMToken().then(token => {
			console.log('getFCMToke')
			console.log(token)
			dispatch(writeToken(token));
			// store fcm token in your server
		});

		      this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log(token)
            // fcm token may not be available on first load, catch it here
        });
		this.notificationListener = FCM.on(FCMEvent.Notification, async(notif) => {
			// there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
				if(notif.opened_from_tray){
				  //app is open/resumed because user clicked banner
					if(notif.type){
						switch(notif.type){
							case 'NEW_MESSAGE':
								dispatch(conversationClick(notif.conversationId));
						}
					}
				}

				
				if(Platform.OS ==='ios'){
				  //optional
				  //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
				  //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
				  //notif._notificationType is available for iOS platfrom
					switch(notif._notificationType){
						case NotificationType.Remote:
							notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
						break;
						case NotificationType.NotificationResponse:
							notif.finish();
						break;
						case NotificationType.WillPresent:
							notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
						break;
					}
				}
		});
	}
}

export function writeToken(token){
	console.log('REFRESH TOKEN')
	return (dispatch, getState) => {
		let state = getState();
		console.log('AUTH')
		console.log(state.auth)
		if(state.auth && state.auth.uid){
			let uid = state.auth.uid;
			console.log('STATE.AUTH.UID')
			return firebase.database().ref('fcmTokens/'+uid).set({
				token
			});
		}
	}
}

export function gotoConversation(){
	return dispatch => {
		//dispatch(conversationClick('-KhBsBzI5CKALQdlbKZn'));
	}
}

export function sendNewMessageNotification(){
	return dispatch => {
		PushNotification.localNotificationSchedule({
			message: "Here is the message to nofity the user", // (required)
			date: new Date(Date.now() + (10 * 1000)), // in 60 secs
			ongoing: false,
			data:  '{ "action":"newMessage", "conversationId":"New York" }' // OBJECT: The push data
		});
	}
}

