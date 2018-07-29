import $ from 'jquery';
window.jQuery = $;
require('signalr');

const signalRConnection = $.hubConnection('http://localhost:5000');

export function signalRRegistration(store) {
    signalRConnection.start()
        .done(function () {
            console.log('Now connected, connection ID=' + signalRConnection.id);
        })
        .fail(function () {
            console.log('Could not connect');
            window.alert('Unable to start signalR connection...')

        });

    // getting the hub proxy
    var notificationHubProxy = signalRConnection.createHubProxy('signalRNotificationHub');

    // attaching events listeners to the proxy
    notificationHubProxy.on('locationModified', function (vehicleId, location) {
        store.dispatch({
            type: 'LOCATION_MODIFIED',
            payload: {
                vehicleId: vehicleId,
                location: location
            }
        });
    });
}