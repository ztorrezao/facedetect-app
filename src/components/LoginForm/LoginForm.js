import React, {Component} from 'react';

class LoginForm extends Component {
  constructor(props) {
		super(props);
		this.state = {
			loginEmail: '',
			loginPassword: '',
			loginError: ''
		}
	}
	
	onLoginEmailChange = (event) => {
		this.setState({
			loginEmail: event.target.value
		});
	}

	onLoginPasswordChange = (event) => {
		this.setState({
			loginPassword: event.target.value
		});
	}

	onSigninButtonClick = () => {
		const {
			loginEmail,
			loginPassword,
		} = this.state;

		if(!loginEmail || !loginPassword){
			this.setState({
				loginError: 'Invalid username or password'
			});
		} else { 
			fetch('http://localhost:3001/singin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},
					body: JSON.stringify({
						email: loginEmail,
						password: loginPassword
					})
				})
				.then(res => res.json())
				.then(user => {
					if (user.id) {
						this.props.updateUser(user);
						this.props.onRouteChange('home')
					}else {
						this.setState({loginError: 'Invalid username or password'});
					}
				})
				.catch(err => console.log(err));
			}
		}

  render() {
		const {	onRouteChange	} = this.props;
    return (
			<div className="flex w-100 justify-center">
				<div className="pa4 w-25-l w-40-m w-60-sm black-80 bg-white shadow-1">
					<form className="measure tl">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f3 fw6 ph0 mh0 tc">Login</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="username" >Username</label>
								<input className="pa2 input-reset ba bg-transparent w-100" 
										style={
											{
												borderColor: "#005C97"
											}
										}
										type = "email"
										name = "username"
										id = "username"
										placeholder = "Enter your username..."
										onChange = {
											this.onLoginEmailChange
										}
										/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input 	className="pa2 input-reset ba bg-transparent w-100" 
										style=
											{
												{
													borderColor: "#005C97"
												}
											}
										type = "password"
										name = "password"
										id = "password"
										placeholder = "Enter your password..."
										onChange = {
											this.onLoginPasswordChange
										}
										/>
							</div>
						</fieldset>
						<div className="">
							<button className="b w-100 ph3 pv2 input-reset ba bg-transparent pointer f6 grow dib white" style={{
										background: 'linear-gradient(to right, #363795, #005C97)'
									}} type="button" onClick={this.onSigninButtonClick}>Sign in</button>
						</div>
						<div className="lh-copy mt3 tc">
							<span style={{color: 'red'}}>{this.state.loginError}</span>
							<p href="#0" className="f5 pointer link dim black db" onClick={() => onRouteChange('register')}>I don't have an account</p>
						</div>
					</form>
				</div>
			</div>
		);
  }

}

export default LoginForm;