import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Artist from "./components/Artist";
import Track from "./components/Track";
import Search from "./components/Search";
import Album from "./components/Album";
import Genre from "./components/Genre";
import Chart from "./components/Chart";


const Routes = () => {
  return (
    <div className="row">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/artists" component={Artist}/>
        <Route path="/albums" component={Album}/>
        <Route path="/tracks" component={Track}/>
        <Route path="/genres" component={Genre}/>
        <Route path="/chart" component={Chart}/>
        <Route path="/search" component={Search}/>
      </Switch>
    </div>
  );
};

export default Routes;