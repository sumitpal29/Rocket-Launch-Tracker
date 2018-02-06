import React from 'react';
export default class SearchBar extends React.Component {
    render(){
        return (
            <div class = "search-bar">
                <div id="searchBox" class="search-box">
                    <div class="date-container">Start Date: <input class="select-date" id="startDate" type="date"/></div>
                    <div class="date-container">End Date: <input class="select-date" id="endDate" type="date"/></div>
                    <div id="searchBtn" onClick={this.fetchDataFromURL.bind(this)}>Search</div> 
                </div>
            </div>
        )
    }
}

                