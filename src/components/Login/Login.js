import React from "react";
import "../Login/Login.css";
import { BrowserRouter as Link } from "react-router-dom";
import $ from "jquery";

export function Login() {
  function Handel() {
    loginBoxToggle($(".box-login-content"), $(".js-btn-signup"));
    loginBoxToggle($(".box-login-content"), $(".js-btn-login"));

    function loginBoxToggle(box, btn) {
      box.each(function () {
        btn.on("click", function () {
          if (box.hasClass("is--login")) {
            box.removeClass("is--login");
            box.addClass("is--signup");
          } else {
            box.removeClass("is--signup");
            box.addClass("is--login");
          }
        });
      });
    }
  }

  return (
    <div>
      <section className="login">
        <img
          className="login-bg"
          src="http://lorempixel.com/output/business-q-c-1200-700-8.jpg"
          alt="some"
        />
        <div className="box-login">
          <div className="box-login-content is--login">
            <div className="box-text">
              <div className="box-text--title">Create an account?</div>
              <h3>Hello Friends!!</h3>
              <h3>Hello Friends!!</h3>
              <p>
                Start your Journey By Sigining Up with us sbjhsdbjfbdsjbfdff.
              </p>
              <div className="button js-btn-login" onClick={Handel}>
                SIGN UP
              </div>
            </div>
            <div className="box-text">
              <div className="box-text--title">Have an account?</div>
              <h3>Glad To See You Here!!</h3>
              <p>Already have a account Login Here</p>
              <div className="button js-btn-signup" onClick={Handel}>
                Login
              </div>
            </div>
            <div className="box-forms form--login">
              <div style={{ width: "100%" }}>
                <div className="box-forms--title">LOGIN</div>

                <div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      id="email"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="RememberME">
                      <input id="RememberME" type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <div className="form-group clearfix">
                    <a href="/weather">
                  
                    <button className="button-submit">LOGIN</button>
               
                     
                    </a>
                  </div>
                  <div className="form-group">
                    <a className="forget-password" href="/">
                      <svg
                        className="icon-svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.625 2.625c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75zM11.625 17.906c-0.622 0-1.125-0.504-1.125-1.125s0.503-1.125 1.125-1.125c0.621 0 1.125 0.504 1.125 1.125s-0.504 1.125-1.125 1.125zM12.75 13.031c0 0.621-0.504 1.125-1.125 1.125s-1.125-0.504-1.125-1.125v-5.25c0-0.622 0.503-1.125 1.125-1.125s1.125 0.503 1.125 1.125v5.25z" />
                      </svg>

                      <span>Forgot password?</span>
                      <p id="demo"></p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End user login */}
            <div className="box-forms form--signup">
              <div className="box-forms--title">SIGN UP</div>

              <form action id="form_signup">
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="useremail"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="userpassword"
                    placeholder="Password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="repassword"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className="form-group clearfix">
                  <button className="button-submit">SIGN UP</button>
                </div>
              </form>
            </div>
            {/* End user signup */}
          </div>
        </div>
      </section>
    </div>
  );
}
