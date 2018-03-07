import React from 'react';
import { shallow, mount } from 'enzyme';
import UnusedAvatars from './UnusedAvatars';

describe('<UnusedAvatars />', () => {
	let state = {
		loading: false, 
    	currentAvatar: { "src": "avatar1.png", "label": "Avatar 1", "id": 1 },
    	avatars: [
  			{ "src": "avatar1.png", "label": "Avatar 1", "id": 1 },
  			{ "src": "avatar2.png", "label": "Avatar 2", "id": 2 },
  			{ "src": "avatar3.png", "label": "Avatar 3", "id": 3 },
  			{ "src": "avatar4.png", "label": "Avatar 4", "id": 4 },
  			{ "src": "avatar5.png", "label": "Avatar 5", "id": 5 },
  			{ "src": "avatar6.png", "label": "Avatar 6", "id": 6 }
		],
    	hidden:true,
   		firstLoad: true
	}

	it('Renders without crashing', () => {
		const wrapper = shallow(
		<UnusedAvatars
			loading={state.loading}
			currentAvatar={state.currentAvatar}
			avatars={state.avatars}
			hidden={state.hidden}
			firstLoad={state.firstLoad} />)
	});

	it('should have 6 list items', () => {
		const wrapper = shallow(
		<UnusedAvatars
			loading={state.loading}
			currentAvatar={state.currentAvatar}
			avatars={state.avatars}
			hidden={state.hidden}
			firstLoad={state.firstLoad} />);
			expect(wrapper.find('li').length).toEqual(6);
	});

	it('should fire the avClicks callback onclick', () => {
		const callback = jest.fn();
		const wrapper = mount(
		<UnusedAvatars
			avClicks={callback}
			loading={state.loading}
			currentAvatar={state.currentAvatar}
			avatars={state.avatars}
			hidden={state.hidden}
			firstLoad={state.firstLoad} />);
		wrapper.find('div.overlay').at(2).simulate('click');
		expect(callback).toHaveBeenCalled();
	});

	it('it should change class when firstLoad turns false', () => {
		const wrapper = shallow(
		<UnusedAvatars
			loading={state.loading}
			currentAvatar={state.currentAvatar}
			avatars={state.avatars}
			hidden={state.hidden}
			firstLoad={false} />);
		expect(wrapper.hasClass('avatars-container scale-out')).toEqual(true);
	});
});