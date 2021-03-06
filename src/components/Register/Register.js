import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            password: ''
        }
    }

    onNameChange = (e) => {
        this.setState({name : e.target.value})
    }
    onEmailChange = (e) => {
        this.setState({email : e.target.value})
    }
    onPasswordChange = (e) => {
        this.setState({password : e.target.value})

    }

    onRegister=() => {
        
        fetch('https://immense-depths-26922.herokuapp.com/register' , {
            method : 'post', 
            headers : {'content-type' : 'application/json'} ,
            body : JSON.stringify({
                email : this.state.email ,
                name: this.state.name ,
                password : this.state.password
            })
        })
        .then(response => response.json())
        .then( data => {
            if(data.id) {
    this.props.loadUser(data)
    this.props.onRouteChange('home')

            }
        })
    }
    render() {
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                                <input
                                    onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text" name="Name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register" />
                        </div>

                    </div>
                </main>

            </article>
        )
    }
}




export default Register 