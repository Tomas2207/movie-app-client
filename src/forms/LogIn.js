import { useState } from 'react';

const LogIn = ({ userState }) => {
  const initialValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [resMessage, setResMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let databody = {
      username: formValues.username,
      password: formValues.password,
    };

    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(databody),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResMessage(data);
        console.log(data);
        userState();
        setLoading(false);
      });
  };

  return (
    <div className="form-sub-container">
      <h2>Entrar</h2>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">User:</label>
        <input
          type="text"
          autoComplete="off"
          name="username"
          value={formValues.username}
          placeholder="username"
          onChange={handleChange}
        />
        {resMessage && <div className="error">{resMessage}</div>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="password"
          autoComplete="off"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <button className="form-btn">Entrar</button>
        )}
      </form>
    </div>
  );
};

export default LogIn;
