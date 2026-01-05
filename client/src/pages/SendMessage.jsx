import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const SendMessage = () => {
    const { userId } = useParams(); // Receiver ID
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    // Get sender ID (me)
    const token = localStorage.getItem('userToken');
    let senderId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            senderId = decoded.id;
        } catch (e) {
            console.error(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        if (!senderId) {
            toast.error("You must be logged in to send messages.");
            return;
        }

        setLoading(true);
        try {
            await api.post('/message', {
                content,
                reciever: userId,
                sender: senderId
            });
            toast.success('Message sent successfully!');
            setContent('');
            // Optional: navigate somewhere?
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '3rem' }}>
                <div className="text-center mb-6">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Send a Secret</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Your identity will remain anonymous. Be kind!
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            rows="6"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your constructive message here..."
                            required
                            style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.6',
                                resize: 'none',
                                background: 'rgba(15, 23, 42, 0.4)'
                            }}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block glow-effect" disabled={loading} style={{ padding: '1rem' }}>
                        {loading ? 'Sending...' : 'Send Anonymously'}
                    </button>
                    {!senderId && (
                        <p className="text-center mt-4 text-warning" style={{ fontSize: '0.9rem' }}>
                            You are sending this as a guest. <br /> Log in to track your sent messages.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SendMessage;
