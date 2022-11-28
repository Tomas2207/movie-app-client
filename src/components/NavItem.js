import { useEffect, useState } from 'react';

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, []);
  return (
    <li className="nav-item">
      <a onClick={() => setOpen(!open)} href="#" className="icon-button">
        <img src="/img/expand.png" alt="placeholder" className="expand" />
      </a>
      {open && props.children}
    </li>
  );
};

export default NavItem;
