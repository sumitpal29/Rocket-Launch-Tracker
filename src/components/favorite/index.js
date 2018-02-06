import React from 'react';
import {connect} from 'react-redux';
import Favlist from './../favlist';

class Favorite extends React.Component {
    render(){
        const {tasks} = this.props;
        
        return (
            <div class="fav-result" id="favResult">
                <div class="inner-title">My Favorite List</div>
                <table id="list" class={!tasks.length ? "none" : "display"}>
                    <thead>
                        <th>Launch </th>
                        <th>Rocket </th>
                        <th>Start Time </th>
                        <th>Agencies </th>
                        <th>Location </th>
                        <th>Image </th>
                        <th>Delete</th>
                        
                    </thead>
                    <tbody>
                        { tasks.map((item, index) => (
                            <Favlist key={index} task={item} />
                        ))}
                    </tbody>
                </table>
                { !tasks.length && (<div class="loader-container">No data in Favorite List</div>)}
            </div>
            
        );
    }
}

function mapStateToProps (state){
    return {
        tasks:state.tasks
    }
}

export default connect(mapStateToProps)(Favorite);