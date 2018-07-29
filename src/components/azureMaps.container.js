import {
    connect
} from 'react-redux';
import {
    withRouter
} from 'react-router-dom';
import {
    AzureMap
} from './azureMaps';

const mapStateToProps = state => ({
    vehicles: state.vehicles
})

const AzureMapContainer = withRouter(connect(mapStateToProps)(AzureMap));

export default AzureMapContainer;