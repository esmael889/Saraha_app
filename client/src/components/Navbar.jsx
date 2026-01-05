import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(curr => curr === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        toast.info('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="navbar animate-fade-in">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" className="text-2xl font-bold text-gradient" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="animate-float" style={{ fontSize: '1.5rem' }}>💬</span> Saraha
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="btn animate-scale-up"
                        style={{
                            background: 'transparent',
                            fontSize: '1.2rem',
                            padding: '0.2rem',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '50%',
                            width: '32px', height: '32px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                <div className="flex gap-4 items-center">
                    {!token ? (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary glow-effect">Get Started</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/messages" className="nav-link">Messages</Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                            <button onClick={handleLogout} className="nav-link" style={{ color: 'var(--error)' }}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
