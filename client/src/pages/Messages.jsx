import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [tab, setTab] = useState('inbox'); // 'inbox' or 'outbox'
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('userToken');
    let userId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.id;
        } catch (e) {
            console.error("Invalid token");
        }
    }

    const fetchMessages = async () => {
        if (!userId) {
            console.log("No User ID found");
            return;
        }
        setLoading(true);
        try {
            console.log("Fetching messages. Tab:", tab);
            // payload construction
            const payload = {
                flag: tab,
                reciever: userId,
            };

            if (tab === 'outbox') {
                payload.sender = userId;
            }
            console.log("Payload:", payload);

            // Sending body with GET request
            const { data } = await api.get('/message/AllMessages', {
                params: payload
            });

            if (data.message) {
                setMessages(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [tab]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/message/${id}`);
            toast.success("Message deleted");
            fetchMessages();
        } catch (error) {
            toast.error("Failed to delete");
        }
    }

    return (
        <div className="container animate-fade-in">
            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div style={{
                    background: 'var(--glass-bg)',
                    padding: '0.5rem',
                    borderRadius: '1rem',
                    border: '1px solid var(--glass-border)',
                    display: 'flex', gap: '0.5rem'
                }}>
                    <button
                        onClick={() => setTab('inbox')}
                        style={{
                            padding: '0.5rem 2rem', borderRadius: '0.75rem', fontWeight: '600', transition: 'all 0.3s',
                            background: tab === 'inbox' ? 'var(--primary-start)' : 'transparent',
                            color: tab === 'inbox' ? 'white' : 'var(--text-secondary)'
                        }}
                    >
                        Inbox
                    </button>
                    <button
                        onClick={() => setTab('outbox')}
                        style={{
                            padding: '0.5rem 2rem', borderRadius: '0.75rem', fontWeight: '600', transition: 'all 0.3s',
                            background: tab === 'outbox' ? 'var(--primary-start)' : 'transparent',
                            color: tab === 'outbox' ? 'white' : 'var(--text-secondary)'
                        }}
                    >
                        Outbox
                    </button>
                </div>
            </div>

            {loading ? (
                // Skeleton Loader Grid
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="card" style={{ height: '200px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ width: '30%', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="animate-pulse"></div>
                            <div style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="animate-pulse"></div>
                            <div style={{ width: '40%', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: 'auto' }} className="animate-pulse"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {messages.length === 0 ? (
                        <div className="text-center" style={{ gridColumn: '1/-1', padding: '4rem', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                            <p>No messages found in your {tab}.</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={msg._id} className={`card animate-scale-up delay-${Math.min((index + 1) * 100, 700)}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary-end)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {tab === 'inbox' ? 'Anonymous' : 'You Sent'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                                        "{msg.content}"
                                    </p>
                                </div>
                                <div className="flex justify-between items-center" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        className="btn"
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: 'var(--error)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '0.5rem'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
