import React, {useEffect, useState} from 'react';
import {getArtists} from "../../api";
import {Link} from "react-router-dom";

const HeroBanner = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    getArtists(4814224).then(data => {
      setBannerData(data);
    });
  }, []);

  if(bannerData) {
    const {name, picture_xl, tracklist} = bannerData;

    return <div className="heroBanner">
      <h1>{name}</h1>
      <div className="bgImg" style={{"background": `URL(${picture_xl})`}} />
      <Link to='/4814224/top'>Top tracks</Link>
      <Link to='/4814224/albums'>Albums</Link>
      <Link to='/4814224/related'>Related</Link>
    </div>;
  } else {
    return (
      <h1>Loading...</h1>
    );
  }
};

export default HeroBanner;