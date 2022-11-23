import { useEffect, useState } from 'react';

const Register = () => {
  const initialValues = { name: '', lastname: '', username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState();
  const [resMessage, setResMessage] = useState();
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Nombre es Requerido';
    }
    if (!values.lastname) {
      errors.lastname = 'Apellido es Requerido';
    }
    if (!values.username) {
      errors.username = 'Usuario es Requerido';
    } else if (values.username.length < 6) {
      errors.username = 'El usuario debe tener al menos 6 caracteres';
    }
    if (!values.password) {
      errors.password = 'Contraseña es Requerida';
    } else if (values.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (values.password === values.username) {
      errors.password = 'La contraseña no puede ser igual al usuario';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
  };

  const makeRequest = () => {
    if (Object.keys(formErrors).length === 0) {
      let databody = {
        name: formValues.name,
        lastname: formValues.lastname,
        username: formValues.username,
        password: formValues.password,
      };

      fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(databody),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSubmit(false);
          setResMessage(data.message);
          setFormValues(initialValues);
        });
    } else {
      console.log('formerrors', formErrors);
      setSubmit(false);
    }
  };

  useEffect(() => {
    if (submit) makeRequest();
  }, [submit]);

  return (
    <div className="form-sub-container">
      <h2>Sign Up</h2>
      {resMessage && <h3 className="error">{resMessage}</h3>}

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={handleChange} />
        {formErrors && <div className="error">{formErrors.name}</div>}
        <label htmlFor="lastname">Lastname:</label>
        <input type="text" name="lastname" onChange={handleChange} />
        {formErrors && <div className="error">{formErrors.lastname}</div>}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={handleChange} />
        {formErrors && <div className="error">{formErrors.username}</div>}
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} />
        {formErrors && <div className="error">{formErrors.password}</div>}
        <button className="form-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
