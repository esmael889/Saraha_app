import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container animate-fade-in" style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Floating Background Elements */}
            <div className="animate-float delay-100" style={{ position: 'absolute', top: '20%', left: '10%', fontSize: '4rem', opacity: 0.2 }}>💌</div>
            <div className="animate-float delay-500" style={{ position: 'absolute', bottom: '20%', right: '10%', fontSize: '5rem', opacity: 0.2 }}>💬</div>
            <div className="animate-float delay-300" style={{ position: 'absolute', top: '30%', right: '20%', fontSize: '3rem', opacity: 0.2 }}>✨</div>

            <div className="card" style={{
                maxWidth: '800px',
                padding: '4rem 2rem',
                backdropFilter: 'blur(20px)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                zIndex: 1
            }}>
                <h1 className="text-gradient animate-scale-up" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                    Send Anonymous <br /> Messages with Style
                </h1>

                <p className="animate-scale-up delay-200" style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '3rem',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    Join the conversation without revealing your identity.
                    Experience the new <b>Crystal Daylight</b> interface.
                </p>

                <div className="flex gap-4 justify-center animate-scale-up delay-300">
                    <Link to="/register" className="btn btn-primary glow-effect" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Get Started
                    </Link>
                    <Link to="/login" className="btn" style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1.1rem',
                        background: 'transparent',
                        border: '1px solid var(--primary-start)',
                        color: 'var(--primary-start)'
                    }}>
                        Login
                    </Link>
                </div>
            </div>

            <footer style={{ marginTop: 'auto', padding: '2rem', color: 'var(--text-muted)' }}>
                <p>© 2026 Saraha App. Built with ❤️ and ☕</p>
            </footer>
        </div>
    );
};

export default Home;
