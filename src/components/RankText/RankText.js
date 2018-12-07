import React from 'react';

const RankText = ({name, entries}) =>{
	return(
		<div className="tc f3 white" >
			<p>Hello <strong>{name}</strong>, Your Entries are <strong>#{entries}</strong></p>
		</div>
	);
}

export default RankText;