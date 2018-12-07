import React from 'react';

const Navegation = ({ onRouteChange, route }) =>{
	if(route === 'login' || route === 'register'){
		return(
				<nav className="tr">
				{
					route === 'register' ?
					<p className=" f3 link dib black pa3 pointer dim white" onClick={()=>onRouteChange('login')}>Login</p>
					:
					<p className=" f4 link dib black pa3 pointer dim white" onClick={()=>onRouteChange('register')}>Register</p>
				}
				</nav>
			);
	}else {
		return(
			<nav className="tr">
				<p className=" f4 link dib black pa3 pointer dim white" onClick={()=>onRouteChange('login')}>Logout</p>
			</nav>
			);
	}
}

export default Navegation;