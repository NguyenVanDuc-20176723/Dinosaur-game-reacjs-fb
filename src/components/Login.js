import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

/* ライブラリ */
import { firebase, auth, uiConfig } from "../lib/firebase";

function Login() {
  return (
    
      <div className="container">
        <div>
          <div className="modal-dialog login animated">
            <div className="modal-content">
              <div className="modal-header">
                
                <h4 className="modal-title">Login with</h4>
              </div>
              <div className="modal-body">
                <div className="box">
                  <div className="content">
                   
                      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                    <div className="form loginBox">
                      <form method="post" action="/login" acceptCharset="UTF-8">
                        <input id="email" className="form-control" type="text" placeholder="Email" name="email" />
                        <input id="password" className="form-control" type="password" placeholder="Password" name="password" />
                        <input className="btn btn-default btn-login" type="button" defaultValue="Login" onclick="loginAjax()" />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="content registerBox" style={{ display: 'none' }}>
                    <div className="form">
                      <form method="post" html="{:multipart=>true}" data-remote="true" action="/register" acceptCharset="UTF-8">
                        <input id="email" className="form-control" type="text" placeholder="Email" name="email" />
                        <input id="password" className="form-control" type="password" placeholder="Password" name="password" />
                        <input id="password_confirmation" className="form-control" type="password" placeholder="Repeat Password" name="password_confirmation" />
                        <input className="btn btn-default btn-register" type="submit" defaultValue="Create account" name="commit" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="forgot login-footer">
                  <span>Looking to
                    <a >Register</a>
                    ?</span>
                </div>
                <div className="forgot register-footer" style={{ display: 'none' }}>
                  <span>Already have an account?</span>
                  <a >Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    
  );
};

export default Login;
