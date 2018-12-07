import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, boxes}) =>{
	const boxArray = boxes.map((box, i) => {
		return <div key={`box${i}`} className="bounding-box" style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left }} ></div>
	});
	return (
			imageURL !== '' ? (
			<div className="flex justify-center">
					<div className="w-40 w-30-m w-30-l relative">
						<img 
						className="shadow-1 bg-white h-auto pa2"  
						src={imageURL} id='scnImage' alt={'Loaded'}/>
						{
							boxArray
						}
					</div>
			</div>): ''
	);
}
export default FaceRecognition;
