import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFav} from '../../actions/';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          modified: false,
          backup: []
        };
    }

    fetchDataFromURL () {
        let sdate = document.getElementById('startDate').value,   
            edate = document.getElementById('endDate').value,
            url = "https://launchlibrary.net/1.2/launch/"+sdate+"/"+edate;

        if(sdate && edate) {
            document.getElementById('favResult').style.display = 'none';
            document.getElementById("searchResult").style.display = 'block';
            document.getElementById("fav").classList.remove("active");
            document.getElementById("search").classList.add("active");
            
            this.setState({
                isLoaded: 'loading'
            });

            fetch(url)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    
                    let data = result.launches,
                        displayData = (launches) => {
                            const launchArr = [];
                            launches.forEach(element => {
                                let name = element.name.split('|'),
                                    agencies = () => {
                                        let str = '',
                                            arr = element.rocket.agencies,
                                            len = arr.length - 1;

                                        arr.forEach((e,i) => {
                                            str += e.abbrev + (len === i ? '' : ', ');
                                        });

                                        return str;
                                    },
                                    imageURL = () => {
                                        if(element.rocket.imageURL && element.rocket.imageURL.length > 20){
                                            return element.rocket.imageURL;
                                        } else {
                                            return null;
                                        }
                                    };

                                launchArr.push({
                                    launch: name[1],
                                    rocket: name[0],
                                    stime:element.windowstart,
                                    location: element.location.name,
                                    agencies: agencies(),
                                    img: imageURL(),
                                    id: element.id
                                });
                            });
                            return launchArr;
                        };
                    //console.log(displayData(data))
                    data = displayData(data);
                    if(data.length) {
                        this.setState({
                            isLoaded: 'loaded',
                            items: data,
                            backup: data
                        });
                    } else {
                        this.setState({
                            isLoaded: 'nocontent'
                        });
                    }
                    
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                    isLoaded: 'loaded',
                    error
                    });
                }
            )
        }
    }

    filterDataFun (e) {
        let val = e.target.value.toLowerCase(),
            filterAlgo = (d, v) => {
                let arr = d.split(',');
                
                for(let i = 0, ii = arr.length; i < ii; i++ ){
                    if(arr[i].toLowerCase().indexOf(v) >= 0){
                        return true;
                    }
                }

                return false;
            };
        if(val.length > 2) {
            let state = this.state.items,
                filtered = this.state.items.filter((v) => {
                    return v.location.toLowerCase().indexOf(val) >= 0 || filterAlgo(v.agencies, val) ;
                });

            filtered.length ? this.setState({
                items: filtered,
                modified: true,
                isLoaded: 'loaded'
            }) : this.setState({
                isLoaded: "nofilterdata",
                modified: true
            });

        } else {
            this.state.modified && this.setState({
                items: this.state.backup,
                modified: false,
                isLoaded: 'loaded'
            });
        }
    }
    
    render() {
        const {isLoaded, items } = this.state;
        
        let content = null;
        if (isLoaded === 'loading') {
            content = <div class="loader-container"><div class="loader"></div></div>;
        }
        else if (isLoaded === 'nocontent') {
            content = <div class="loader-container red">No Data Found in the given dates</div>;
        } 
        else if (isLoaded ==="nofilterdata") {
            content = <div class="result-container">
                <div class="filter"><input type="text" id="filterText" onChange={this.filterDataFun.bind(this)} placeholder="Filter by Location or Agencies"/></div>
                <div class="loader-container red">No Data Matched with filtered text</div>
                </div>;
        }
        else if(isLoaded === 'loaded'){
            content =
                    <div class="result-container">
                    <div class="filter"><input type="text" id="filterText" onChange={this.filterDataFun.bind(this)} placeholder="Filter by Location or Agencies"/></div>
                    <table id="list">
                        <thead>
                            <tr>
                                <th>Launch </th>
                                <th>Rocket </th>
                                <th>Start Time </th>
                                <th>Agencies </th>
                                <th>Location </th>
                                <th>Image </th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td>{item.launch}</td>
                                <td>{item.rocket}</td>
                                <td>{item.stime}</td>
                                <td>{item.agencies}</td>
                                <td>{item.location}</td>
                                <td><img src={item.img} width="40px" height="40px" alt="none"/></td>
                                <td><button class="addFavBtn" onClick={()=>{this.props.addFav(item)}}>ADD</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>;
        } else {
            content = <div class="loader-container">No Data To Show</div>;
        }
        return (
            <div class="searchbar-container">
                <div class = "search-bar">
                    <div id="searchBox" class="search-box">
                        <div class="date-container">Start Date: <input class="select-date" id="startDate" type="date"/></div>
                        <div class="date-container">End Date: <input class="select-date" id="endDate" type="date"/></div>
                        <div id="searchBtn" onClick={this.fetchDataFromURL.bind(this)}>Search</div> 
                    </div>
                </div>
                <div class="search-result" id="searchResult">
                    {content}
                </div>
            </div>
        );
    }
}


function mapDispacthToProps (dispatch) {
    return bindActionCreators({addFav}, dispatch);
}

export default connect(()=>{return {}}, mapDispacthToProps)(Search);