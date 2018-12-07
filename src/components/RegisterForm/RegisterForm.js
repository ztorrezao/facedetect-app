import React from 'react';

class RegisterForm extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
		registerName: '',
  		registerEmail: '',
  		registerPassword: '',
  		registerError: ''
  	}
  }

	onRegisterNameChange = (event) => {
		this.setState({
			registerName: event.target.value
		});
	}

  onRegisterEmailChange = (event) => {
  	this.setState({
  		registerEmail: event.target.value
  	});
  }

  onRegisterPasswordChange = (event) => {
  	this.setState({
  		registerPassword: event.target.value
  	});
  }

  onRegisterButtonClick = () => {
  	const {
  		registerEmail,
			registerPassword,
			registerName,
		} = this.state;
		
		if (!registerName || !registerPassword || !registerEmail) {
			this.setState({registerError: 'Please enter valid informations.'})
		} else {
				fetch('https://facedetect-app-api-01.herokuapp.com/register', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json; charset=utf-8'
  			},
  			body: JSON.stringify({
  				email: registerEmail,
					password: registerPassword,
					name: registerName
  			})
  		})
  		.then(res => res.json())
  		.then(user => {
  			if (user.id) {
  				this.props.updateUser(user);
  				this.props.onRouteChange('home')
  			}
			})
			.catch(err => console.log(err));
		}

  }


  render() {
    return (<div className="flex w-100 justify-center">
	<div className="pa4 w-25-l w-40-m w-60-sm black-80 bg-white shadow-1">
	  <form className="measure tl">
	    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	      <legend className="f3 fw6 ph0 mh0 tc">Register</legend>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
	        < input className = "pa2 input-reset ba bg-transparent w-100"
	        style = {
	        	{
	        		borderColor: "#005C97"
	        	}
	        }
	        type = "text"
	        name = "name"
	        id = "name"
	        placeholder = "Your name, Ex: Zacarias"  
					onChange={this.onRegisterNameChange} />
	      </div>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
	        < input className = "pa2 input-reset ba bg-transparent w-100"
	        style = {
	        	{
	        		borderColor: "#005C97"
	        	}
	        }
	        type = "email"
	        name = "email"
	        id = "email"
	        placeholder = "Your email, Ex: ztorrezao@email.com" 
					onChange={this.onRegisterEmailChange} />
	      </div>
	      <div className="mv3">
	        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
	        < input className = "pa2 input-reset ba bg-transparent w-100"
	        style = {
	        	{
	        		borderColor: "#005C97"
	        	} 
	        }
	        type = "password"
	        name = "password"
	        id = "password"
					placeholder = "Passowrd" 
					onChange={this.onRegisterPasswordChange} />
	      </div>
	    </fieldset>
	    <div className="">
	      <button className="b w-100 ph3 pv2 input-reset ba bg-transparent pointer f6 grow dib white" style={{
              background: 'linear-gradient(to right, #363795, #005C97)'
            }} type="button" onClick={this.onRegisterButtonClick}>Register</button>
	    </div>
			<div className="lh-copy mt3 tc">
				<span style={{color: 'red'}}>{this.state.registerError}</span>
			</div>
	  </form>
	</div>
    </div>);
  }

}
export default RegisterForm;