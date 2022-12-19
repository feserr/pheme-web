import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

type Props = {
  setUserName: (userName: string) => void
}

const cookies = new Cookies();

const Login = ({ setUserName }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_PHEME_AUTH_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    });

    setRedirect(true);

    const content = await response.json();
    setUserName(content.name);
  }

  if (redirect)
    return <Navigate to="/" />

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required
          onChange={e => setEmail(e.target.value)} />
        <label htmlFor="floatingEmail">Email address</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
          onChange={e => setPassword(e.target.value)} />
        <label htmlFor="floatingInput">Password</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  );
};

export default Login;