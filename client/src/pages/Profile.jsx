import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/user');
            setUser(data.user);
        } catch (error) {
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profile', file);

        setUploading(true);
        try {
            const { data } = await api.post('/user/profile', formData);
            // Assuming response contains updated user or at least success message
            toast.success('Profile picture updated!');
            fetchProfile(); // Refresh profile to get new image url
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const copyLink = () => {
        if (!user) return;
        const link = `${window.location.origin}/send/${user._id}`;
        navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard!');
    };

    if (loading) return (
        // Profile Skeleton
        <div className="container animate-fade-in" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <div className="card mb-4">
                <div style={{ height: '120px', background: 'rgba(255,255,255,0.05)' }}></div>
                <div style={{ width: '150px', height: '150px', margin: '-75px auto 1.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} className="animate-pulse"></div>
                <div style={{ width: '200px', height: '30px', margin: '0 auto 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} className="animate-pulse"></div>
                <div style={{ width: '150px', height: '20px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="animate-pulse"></div>
            </div>
        </div>
    );

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>

            {/* Profile Header Card */}
            <div className="card mb-4" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '120px',
                    background: 'linear-gradient(to right, var(--primary-start), var(--primary-end))',
                    opacity: 0.2
                }}></div>

                <div style={{ position: 'relative', marginTop: '2rem' }}>
                    <div style={{
                        width: '150px', height: '150px', margin: '0 auto 1.5rem',
                        borderRadius: '50%', padding: '4px',
                        background: 'linear-gradient(45deg, var(--primary-start), var(--accent-pink))',
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
                    }}>
                        <img
                            src={user?.Image ? user.Image : "https://via.placeholder.com/150"}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--bg-deep)' }}
                        />
                    </div>

                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                        {user?.userName}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
                </div>

                <div className="flex justify-between items-center mt-4" style={{ maxWidth: '400px', margin: '2rem auto 0' }}>
                    <label className="btn" style={{ background: 'var(--glass-border)', cursor: 'pointer', transition: '0.2s' }}>
                        {uploading ? 'Uploading...' : 'Change Photo'}
                        <input type="file" hidden onChange={handleImageUpload} />
                    </label>
                    <button className="btn btn-primary" onClick={copyLink}>
                        Copy Share Link
                    </button>
                </div>
            </div>

            {/* Share Link Card */}
            <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="mb-4" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Your Secret Link</h3>
                <div className="flex gap-4">
                    <input
                        readOnly
                        value={`${window.location.origin}/send/${user?._id}`}
                        className="form-control"
                        style={{ cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '1px' }}
                        onClick={(e) => {
                            e.target.select();
                            navigator.clipboard.writeText(e.target.value);
                            toast.success('Copied!');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
