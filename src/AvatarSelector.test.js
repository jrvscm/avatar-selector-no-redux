import React from 'react';
import { shallow, mount } from 'enzyme';
import AvatarSelector from './AvatarSelector';

describe('<AvatarSelector />', () => {
	let state = {
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
	
	it('Renders without crashing', () => {
		const wrapper = shallow(
			<AvatarSelector
		 		loading={state.loading}
		 		currentAvatar={state.currentAvatar}
		 		gravatars={state.avatars}
		 		hidden={state.hidden}
		 		firstLoad={state.firstLoad} />)
	});

	it('should hidden to false and set deselect to selected', () => {
		const wrapper = shallow(
			<AvatarSelector
		 		loading={state.loading}
		 		currentAvatar={state.currentAvatar}
		 		avatars={state.avatars}
		 		hidden={state.hidden}
		 		firstLoad={state.firstLoad} />)
		wrapper.find('.current-avatar-btn').simulate('click');
		expect(wrapper.find('div.deselect').length).toEqual(1);
	});
});