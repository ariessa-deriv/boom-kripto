import React from "react";

const Loginn = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <selection className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btn.Container">
          {hasAccount ? (
            <>
              <button>Sign in</button>
              <p>Don't have an account</p>
            </>
          ) : (
            <>
              <button>Sign up</button>
              <p>
                Have an account? <span>Sign in </span>
              </p>
            </>
          )}
        </div>
      </div>
    </selection>
  );
};
export default Loginn;
