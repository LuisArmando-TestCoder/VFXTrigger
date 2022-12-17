import React from 'react';

import * as Components from '../components';

export default {
	title: 'strings/Canvas3D',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.strings.Canvas3D>
			{title}
		</Components.strings.Canvas3D>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'Canvas3D',
};
