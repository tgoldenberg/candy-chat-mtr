class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      register: true,
      login: false,
    }
  }
  render() {
    let login = <div></div>;
    let register = <div></div>;
    if (this.state.login) {
      login = <div>
                <form className="login" onSubmit={(e) => {
                    e.preventDefault();
                    let username = React.findDOMNode(this.refs.loginUsername).value;
                    let password = React.findDOMNode(this.refs.loginPassword).value;
                    console.log('USERNAME', username, password);
                    Meteor.loginWithPassword(username, password, function(err) {
                      if (err)
                        return throwError(err);
                    });
                  }}>
                  <p>Login</p>
                  <input type="text" ref="loginUsername" className="form-control" placeholder="username"/>
                  <input type="password" ref="loginPassword" className="form-control" placeholder="password"/>
                  <input type="submit" className="btn btn-lg" value="Login"/>
                </form>
                <a href="#" onClick={() => {
                    console.log('PRESS');
                    this.setState({register: true, login: false})
                  }}>Register</a>
                </div>
    }
    if (this.state.register) {

      register = <div>
                <form className="signup" onSubmit={(e) => {
                    e.preventDefault();
                    let username = React.findDOMNode(this.refs.registerUsername).value;
                    let code = React.findDOMNode(this.refs.registerCode).value;
                    let password = React.findDOMNode(this.refs.registerPassword).value;
                    React.findDOMNode(this.refs.registerUsername).value = '';
                    React.findDOMNode(this.refs.registerCode).value = '';
                    React.findDOMNode(this.refs.registerPassword).value = '';
                    console.log('Register', username, code, password);
                    if (username != '' && password != '' && code === 'scriptedy2')
                    Accounts.createUser({
                      username: username,
                      password: password,
                    }, function(err) {
                      if (err) {
                        console.log('ERROR', err);
                      }
                    });
                  }}>
                  <p>Signup</p>
                  <input type="text" ref='registerUsername' className="form-control" placeholder="username"/>
                  <input type="text" ref='registerCode' className="form-control" placeholder="code"/>
                  <input type="password" ref='registerPassword' className="form-control" placeholder="password"/>
                  <input type="submit" className="btn btn-lg" value="Signup"/>
                </form>
                <a href="#" onClick={() => {
                    console.log('PRESS');
                    this.setState({register: false, login: true})
                  }}>Login</a></div>
    }
    return (
      <div>
        <div className="landing-content">
          <a href="#" onClick={() => {Meteor.logout();}}>Logout</a>
          <div className="mainTitle">
            <p className="title">Candy Chat</p>
          </div>
          {register}
          {login}
        </div>
      </div>
    );
  }
};

Template.home.helpers({
  Landing: function() {
    return Landing;
  }
})
