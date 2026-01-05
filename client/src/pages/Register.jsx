import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        ConfirmPassword: '',
        Phone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.ConfirmPassword) {
            return toast.error("Passwords don't match");
        }

        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', formData);
            if (data.message === 'Donnne' || data.user) {
                toast.success('Registration successful! Please check your email to activate account.');
                navigate('/login');
            } else {
                console.log("Register response:", data);
                toast.error(data.message || data.error || 'Registration failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <div className="card">
                <h2 className="text-center mb-4">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.userName}
                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                            required
                            minLength={3}
                            maxLength={20}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.Phone}
                            onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={formData.ConfirmPassword}
                                onChange={(e) => setFormData({ ...formData, ConfirmPassword: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center" style={{ color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
