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

	it('should hidden to false and set selected to deselect', () => {
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

	it('should show the ul and find an li overlay on click', () => {
		const wrapper = shallow(
			<AvatarSelector
		 		loading={state.loading}
		 		currentAvatar={state.currentAvatar}
		 		avatars={state.avatars}
		 		hidden={state.hidden}
		 		firstLoad={state.firstLoad} />)
		wrapper.find('.current-avatar-btn').simulate('click');
		expect(wrapper.find('ul li div.overlay').at(2).length).toEqual(1);
	});

	it('should change loading to true on click of ul li overlay', () => {
		const wrapper = mount(
			<AvatarSelector
		 		currentAvatar={state.currentAvatar}
		 		avatars={state.avatars}
		 		hidden={state.hidden}
		 		firstLoad={state.firstLoad} />)
		wrapper.find('.current-avatar-btn').simulate('click');
		wrapper.find('ul li div.overlay').at(2).simulate('click');
		expect(wrapper.state('loading')).toEqual(true);
	});

	it('should change class on ul li div.overlay to partial-border rotate', () => {
		const wrapper = mount(
			<AvatarSelector
		 		currentAvatar={state.currentAvatar}
		 		avatars={state.avatars}
		 		hidden={state.hidden}
		 		firstLoad={state.firstLoad} />)
		wrapper.find('.current-avatar-btn').simulate('click');
		wrapper.find('ul li div.overlay').at(4).simulate('click');
		expect(wrapper.find('ul li div.overlay').at(4).hasClass('partial-border rotate'))
	});


	it('should change the currentAvatar after timeout', (done) => {
		const wrapper = mount(
			<AvatarSelector
		 		currentAvatar={state.currentAvatar}
		 		avatars={state.avatars}
		 		hidden={state.hidden}
		 		firstLoad={state.firstLoad} />)
		wrapper.find('.current-avatar-btn').simulate('click');
		wrapper.find('ul li div.overlay').at(4).simulate('click');
		setTimeout(() => {
			expect(wrapper.state('currentAvatar')).toEqual({"src": "avatar5.png", "label": "Avatar 5", "id": 5})
			console.log(wrapper.state('currentAvatar'))
			done();
		}, 1100)
	});
});