import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteFav} from '../../actions/';

class Favlist extends React.Component {
    render () {
        const {task} = this.props;
        return (
            <tr>
                <td>{task.launch}</td>
                <td>{task.rocket}</td>
                <td>{task.stime}</td>
                <td>{task.agencies}</td>
                <td>{task.location}</td>
                <td><img src={task.img} width="40px" height="40px" alt="none"/></td>
                <td>
                    <button onClick={()=> {this.props.deleteFav(task.id)}}> Delete </button>
                </td>
            </tr>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({deleteFav}, dispatch);
}

export default connect(()=>{return {};}, mapDispatchToProps)(Favlist);