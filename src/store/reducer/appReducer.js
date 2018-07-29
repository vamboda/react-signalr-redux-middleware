import update from "immutability-helper";

const appReducer = (state = {
    vehicles: [{
        id: 'Shuttle_2',
        location: {
            latitude: 41.0521,
            longitude: 75.96486
        }
    }]
}, action) => {
    if (action.type === 'LOCATION_MODIFIED') {
        var vehicleIndex = state.vehicles.findIndex(v => {
            console.log("Vehicle:", v);
            console.log("payload vehicle id:", action.payload.vehicleId);
            return v.id === action.payload.vehicleId
        });


        return vehicleIndex === -1 ?
            update(state, {
                vehicles: {
                    $push: [{
                        id: action.payload.vehicleId,
                        location: action.payload.location
                    }]
                }
            }) :
            update(state, {
                vehicles: {
                    [vehicleIndex]: {
                        location: {
                            $set: action.payload.location
                        }
                    }
                }
            })
    }

    return state;
};

export default appReducer;