import React from 'react';
import Tilt from 'react-tilt'
import Logo from './logo.png';


const Navegation = () =>{
	return(
		<div className="tl ma4 mt0">
			<Tilt className="Tilt dib" options={{ max : 90 }}>
				<img className="shadow-1 pa3  bg-white" src={Logo} alt="Logo"/>
			</Tilt>
		</div>
	);
}

export default Navegation;