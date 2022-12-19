import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`${process.env.REACT_APP_PHEME_AUTH_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    setRedirect(true);
  }

  if (redirect)
    return <Navigate to="/login" />;

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>

      <div className="form-floating">
        <input type="name" className="form-control" id="floatingName" placeholder="name" required
          onChange={e => setName(e.target.value)} />
        <label htmlFor="floatingName">Name</label>
      </div>
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

      <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  );
};

export default Register;