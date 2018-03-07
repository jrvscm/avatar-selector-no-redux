import React, { Component } from 'react';
import AvatarImage from '../components/AvatarImage';
import '../reset.css';
import './UnusedAvatars.css';

class UnusedAvatars extends Component {

  render() { 
    const firstLoad = this.props.firstLoad;
    const hidden = this.props.hidden;
    let divClasses;
    let hiddenClasses;
    const avatars = this.props.avatars.map((avatar, i) => {
    
    if(this.props.currentAvatar.label === avatar.label) {
      divClasses = 'overlay current';
    } else {
      divClasses = 'overlay';
    }

    if(firstLoad === true) {
      hiddenClasses = "avatars-container " + (hidden ? 'hidden' : 'shown');
    } else {
      hiddenClasses = "avatars-container " + (hidden ? 'scale-out' : 'shown');
    }
    
    return (  
      <li key={i} i={i} className="avatar-li">     
        <div 
        tabIndex={"0"}
        role="button"
        onClick={this.props.avClicks}
        onKeyUp={this.props.handleKeyUp}
        className={divClasses} i={i}></div>
          <AvatarImage
            src={require(`../images/${this.props.avatars[i].src}`)}
            label={avatar.label}
            id={avatar.id}
            alt='avatar-image' />
      </li>
      )
    } 
  )

    return (
      <div className={hiddenClasses}>
        <h2 className="avatars-container-heading">Choose your avatar</h2>
        <ul className="avatar-choices">
          { avatars }
        </ul>
      </div>
    );
  }
}    

export default UnusedAvatars;
