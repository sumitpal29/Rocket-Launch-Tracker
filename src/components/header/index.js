import React from 'react';
export default class Header extends React.Component {
    
    toggeleWindow (e) {
        let dom = {
            "fav": document.getElementById('fav'), 
            "search": document.getElementById('search'),
            "favresult": document.getElementById('favResult'),
            "searchres": document.getElementById("searchResult")
        };

        e.target.id === "fav" ? (dom["fav"].classList.add("active"),
            dom["search"].classList.remove("active"), 
            (dom["favresult"].style.display = 'block'),
            (dom["searchres"].style.display = 'none')) : 
            (dom["search"].classList.add("active"),
            dom["fav"].classList.remove("active"), 
            (dom["favresult"].style.display = 'none'), 
            (dom["searchres"].style.display = 'block '));
    }
    render(){
        return (
            <div class = "header">
                <div id="search" class="grp active" onClick={this.toggeleWindow.bind(this)}>Search</div>
                <div id="fav" class="grp" onClick={this.toggeleWindow.bind(this)}>Favorites</div> 
            </div>
        );
    }
}