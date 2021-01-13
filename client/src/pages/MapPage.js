import React, { useContext} from 'react';
import GoogleMapReact from 'google-map-react';
import locations from '../data/locationsData.js';
import {Link} from 'react-router-dom';
import { AuthContext } from "../App";

const IconComp = ({ text }) => <img 
src={text} 
className="icon-picture"
alt="pic"/>;

const MapPage = () => {
  const context = useContext(AuthContext);
const user = context.state.user;
    return (
      <div className = "border">
        <div className = "text-map">
        <div style={{display: "flex"}}>
        <div className = "page-title">
          Map
          </div>
          <div className="to-the-right">
            {user.role === 'admin' && <Link className="button"to={"/addlocation"}>Add a Location</Link>}
            </div>
            </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 0 }}
          defaultCenter={{
            lat: 43.6532,
            lng: -79.3832
          }}
          defaultZoom={11}
        >
          {locations.map(loc => {
                            return <IconComp
                            lat={loc.coord.lat}
                            lng={loc.coord.lng}
                            text={loc.icon.url}
                            key={loc._id}
                          />;
                            })}
        </GoogleMapReact>
      </div>
    </div>
    );
}
 
export default MapPage;