import React from 'react'
import { Link } from 'react-router-dom';
import everydays from '../../../../_everydays.json'
import port_map from '../../../../_port_map.json'
import moment from 'moment'


class ArtworkIcons extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        const daysOutOf = moment().diff("2021-03-19", "days");
        console.log(port_map.server);
        const listItems = everydays.map((everyday, index) =>
            <li key={index}>
                <Link to={"/everydays/" + everyday.date}><img className="gridImage" src={port_map.server + "/" + everyday.repo + "/artworks/thumbs/" + everyday.name.replaceAll(' ', '%20') + ".jpg"} /></Link>
            </li>
        );
        return (
            <div className="pageWrapper">
                <div className="iconspageLeadingText">
                    <p>click the art to hear the music</p>
                </div>
                <div className="container"><ul>{listItems}</ul></div>
            </div>
        )
    }
}

export default ArtworkIcons
