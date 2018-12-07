import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonClick }) =>{
	return(
		<div>
			<p className="tc f4 mb0 white">Write or paste the image URL bellow and see the magic..</p>
			<div className="flex justify-center" >
				<div className="ma4 pa3 w-60 shadow-1 bg-white">
					<input 
					className="f4 w-70 center ph3 pv2 mar3" 
					type="text" 
					placeholder={'Ex: http://www.imgelink.com/image.jpg'}
					onChange={onInputChange} />
					<button 
					style={{background: 'linear-gradient(to right, #363795, #005C97)'}} 
					className="w-30 pointer bn grow f4 ph3 b0 pv2 dib white"
					onClick={onButtonClick} >Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;