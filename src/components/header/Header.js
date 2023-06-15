import './Header.scss'
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="header" >
            <Link to="/" className="logo" style={{ color: '#9F0013' }}>Marvel <span style={{ color: 'black' }}>information portal</span></ Link >

            <ul className="pages" >
                <li style={{ paddingRight: 10 }}>< NavLink end style={({ isActive }) => ({ color: isActive ? '#9F0013' : 'inherit' })} to="/">Characters</ NavLink ></li>
                /
                <li style={{ paddingLeft: 10 }}>< NavLink style={({ isActive }) => ({ color: isActive ? '#9F0013' : 'inherit' })} to="/comics">Comics</ NavLink ></li>
            </ul>
        </header>
    )
}

export default Header