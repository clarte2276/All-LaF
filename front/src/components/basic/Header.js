import './Header.css';

function Header({ name }) {
  return (
    <>
      <div className="Header_body">
        <div className="Header_name">{name}</div>
        <div className="Header_bottomLine"></div>
      </div>
    </>
  );
}

export default Header;
