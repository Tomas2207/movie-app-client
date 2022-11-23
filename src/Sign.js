import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogIn from './forms/LogIn';
import Register from './forms/Register';

const Sign = ({ userState, user }) => {
  const navigate = useNavigate();
  if (user) navigate('/');
  const [check, setCheck] = useState(false);
  const handleCheck = (e) => {
    setCheck((current) => !current);
  };
  return (
    <div className="form-container">
      <div className="switch-container">
        <span className="switch">
          <input
            type="checkbox"
            id="switcher"
            value={check}
            onChange={handleCheck}
          />
          <label htmlFor="switcher"></label>
        </span>
      </div>
      {check && <Register />}
      {!check && <LogIn userState={userState} />}
    </div>
  );
};

export default Sign;
