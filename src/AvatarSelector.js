import React, { Component } from 'react';
import AvatarImage from './components/AvatarImage';
import UnusedAvatars from './components/UnusedAvatars';
import './reset.css';
import './AvatarSelector.css';

class AvatarSelector extends Component {
  constructor() {
    super(); 
      this.state = { 
        avatars: [
          { "src": "avatar1.png", "label": "Avatar 1", "id": 1 },
          { "src": "avatar2.png", "label": "Avatar 2", "id": 2 },
          { "src": "avatar3.png", "label": "Avatar 3", "id": 3 },
          { "src": "avatar4.png", "label": "Avatar 4", "id": 4 },
          { "src": "avatar5.png", "label": "Avatar 5", "id": 5 },
          { "src": "avatar6.png", "label": "Avatar 6", "id": 6 }
      ],
        currentAvatar: { "src": "avatar1.png", "label": "Avatar 1", "id": 1 },
        hidden: true,
        loading: false,
        firstLoad: true
      }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick.bind(this), false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.setState({hidden: true});
  }

  onClick(e) {
    if(this.state.hidden === true) {
      this.setState({
        hidden: false, 
        firstLoad: false
      });
    } else {
      this.setState({hidden: true});
    }
  }


  avClicks(e) {
    let i = e.target.getAttribute('i');
    i = parseInt(i, 10);
    e.target.className = 'partial-border rotate';
    e.persist(); //persist event so we can use it inside setTimeout()
    this.setState({loading: true});
      //fake http request//
    setTimeout(function() {
      e.target.className = 'overlay current';
      this.setState({
        loading: false,
        hidden: true,
        currentAvatar: { "src": `avatar${i+1}.png`, "label": `Avatar ${i+1}`, "id": i+1 }
      });
    }.bind(this), 1000);
  } 

  handleKeyUp(e) {
    //we need to disable if hidden is false so they cant select avatars when the popover is closed
    // eslint-disable-next-line 
    if(e.keyCode === 32 && this.state.hidden === false || e.keyCode === 13 && this.state.hidden === false) {
      let i = e.target.getAttribute('i')
      i = parseInt(i, 10);
      e.target.className = 'partial-border rotate';
      e.persist(); //persist event so we can use it inside setTimeout()
        this.setState({loading: true});
        //fake http request// 
      setTimeout(function() {
        e.target.className = 'overlay current';
        this.setState({
          loading: false, 
          hidden: true,
          currentAvatar: { "src": `avatar${i+1}.png`, "label": `Avatar ${i+1}`, "id": i+1 }
        });
      }.bind(this), 1000)
    } else {
      return;
    }
  }


  render() {
    const hidden = this.state.hidden;
    const classNames = hidden ? 'deselect':'selected';

    return (
      <div ref={node => this.node = node} className="avatar-selector">
        <div className={classNames} onClick={(e) => this.onClick(e)}>
          <button className={'current-avatar-btn'}>
          <AvatarImage 
            src={require(`./images/${this.state.currentAvatar.src}`)}
            label={this.state.currentAvatar.label}
            id={this.state.currentAvatar.id}
            alt="selected-avatar-image" />
          </button>
        </div>
        <UnusedAvatars
          handleKeyUp={(e) => this.handleKeyUp(e)}
          avClicks={(e) => this.avClicks(e)}
          loading={this.state.loading} 
          currentAvatar={this.state.currentAvatar}
          avatars={this.state.avatars}
          hidden={hidden}
          firstLoad={this.state.firstLoad} />
      </div>
    );
  }
}

export default AvatarSelector;
