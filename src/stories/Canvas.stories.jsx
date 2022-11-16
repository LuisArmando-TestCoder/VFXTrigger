import React from 'react';

import * as Components from '../components';

export default {
	title: 'strings/Canvas',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.strings.Canvas>
			{title}
		</Components.strings.Canvas>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'Canvas',
};
