import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player';
import everydays from '../../../_everydays.json';
import port_map from '../../../_port_map.json';
import Play from './Icons/Play';
import Pause from './Icons/Pause';
import Fastforward from './Icons/Fastforward';

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    //var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    //var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    return hDisplay + m + ":" + pad(s, 2);
}

class Artplayer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            playing: false,
            loaded: 0,
            played: 0,
            playedSeconds: 0,
            duration: "0:00",
            playedMintes: "0:00",
            windowWidth: window.innerWidth,
            draggingInProgress: false,
            playHeadGhostPosition: 0,
            redirect: null
        }
        this.updatePlayhead = this.updatePlayhead.bind(this)
        this.updateDuration = this.updateDuration.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.handleDragStart = this.handleDragStart.bind(this)
        this.handleDragEnd = this.handleDragEnd.bind(this)
        this.togglePlaying = this.togglePlaying.bind(this)
        this.handleOnEnded = this.handleOnEnded.bind(this)
    }
    handleResize(e) {
        this.setState({ windowWidth: window.innerWidth });
    };
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }

    updatePlayhead (update) {
        this.setState({
            loaded: update.loaded * 100,
            played: update.played * 100,
            playedMinutes: secondsToHms(update.playedSeconds)
        })
    }
    updateDuration (update) {
        this.setState({
            duration: secondsToHms(update)
        })
    }
    handleDragStart () {
        console.log('dragging!');
        this.setState({
            draggingInProgress: true
        })
    }
    handleDragEnd (data) {
        //console.log(1 / this.state.windowWidth * data.clientX);
        this.player.seekTo(1 / this.state.windowWidth * data.clientX);
        this.setState({
            draggingInProgress: false
        })
    }
    handleDrag (data) {
        //console.log(Math.floor(100 / this.state.windowWidth * data.clientX));
        this.setState({
            playHeadGhostPosition: 100 / this.state.windowWidth * data.clientX
        })

        //const playHeadDragger = document.getElementById('playHeadDragger');
        //console.log(playHeadDragger.getBoundingClientRect());
    }
    togglePlaying () {
        this.setState({ playing: !this.state.playing })
    }
    handleOnEnded (thisIndex) {
        this.setState({
            redirect: "/everydays/" + everydays[thisIndex+1].date
        })
    }

    ref = player => {
        this.player = player
    }

    render () {
        const thisIndex = everydays.findIndex( ({ date }) => date === this.props.match.params.date );
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div
                className="art"
                style={{
                  backgroundImage: `url(${port_map.server + "/" + everydays[thisIndex].repo + "/artworks/" + everydays[thisIndex].name.replaceAll(' ', '%20') + ".jpg"})`
                }}
             >

                <div className="playedMinutes">{this.state.playedMinutes}</div>
                <div className="duration">{this.state.duration}</div>
                <div className="playHead" style={{left: this.state.played + "%"}}></div>
                {this.state.draggingInProgress
                    ? <div className="playHeadGhost" style={{left: this.state.playHeadGhostPosition + "%"}}></div>
                    : <div></div>
                }
                <div className="playHeadDragger" draggable="true" bounds="parent" onDrag={this.handleDrag} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} style={{left: this.state.played + "%"}}></div>
                <div className="playHeadContainer"></div>
                <div className="playLoaded" style={{background: `-webkit-linear-gradient(${"left, #ccc, #ccc " + this.state.loaded + "%, transparent " + this.state.loaded + "%, transparent 100%"})`}}></div>
                <div className="playPlayed" style={{background: `-webkit-linear-gradient(${"left, purple, purple " + this.state.played + "%, transparent " + this.state.played + "%, transparent 100%"})`}}></div>

                <ReactPlayer
                    ref={this.ref}
                    url={port_map.server + "/" + everydays[thisIndex].repo + "/sounds/" + everydays[thisIndex].name.replaceAll(' ', '%20') + ".mp3"}
                    playing={this.state.playing}
                    controls={false}
                    height="50px"
                    config={{
                        file: {
                            forceAudio: true
                        }
                    }}
                    onProgress={(update) => this.updatePlayhead(update)}
                    onDuration={(update) => this.updateDuration(update)}
                    onEnded={() => this.handleOnEnded(thisIndex)}
                />

                {everydays[thisIndex-1]
                    ? <Link to={"/everydays/" + everydays[thisIndex-1].date} className="artPrevLink" >
                        <div className="ppContainer"><Fastforward /></div>
                        <div className="artPrev "style={{backgroundImage: `url(${port_map.server + "/" + everydays[thisIndex-1].repo + "/artworks/thumbs/" + everydays[thisIndex-1].name.replaceAll(' ', '%20') + ".jpg"})`}}></div>
                    </Link>
                    : <div></div>
                }
                {everydays[thisIndex+1]
                    ? <Link to={"/everydays/" + everydays[thisIndex+1].date} className="artNextLink" >
                        <div className="ffContainer"><Fastforward /></div>
                        <div className="artNext" style={{backgroundImage: `url(${port_map.server + "/" + everydays[thisIndex+1].repo + "/artworks/thumbs/" + everydays[thisIndex+1].name.replaceAll(' ', '%20') + ".jpg"})`}}></div>
                    </Link>
                    : <div></div>
                }
                <div className="playPauseButton" onClick={this.togglePlaying}>{this.state.playing? <Pause /> : <Play />}</div>

            </div>
        )
    }
}
//
//
export default Artplayer
