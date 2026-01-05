import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', formData);
            if (data.Token) {
                localStorage.setItem('userToken', data.Token);
                toast.success(data.message || 'Login successful!');
                window.location.href = '/profile'; // Force reload to update navbar or use Context
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '450px', width: '100%', position: 'relative', overflow: 'hidden' }}>

                {/* Decorative background blur within card */}
                <div style={{
                    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0, pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        Welcome <span className="text-gradient">Back</span>
                    </h2>
                    <p className="text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Enter your credentials to access your secret space.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: '1rem' }}>
                            {loading ? 'Authenticating...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p style={{ color: 'var(--text-secondary)' }}>
                            New here? <Link to="/register" style={{ color: 'var(--accent-pink)', fontWeight: '600' }}>Create an Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
