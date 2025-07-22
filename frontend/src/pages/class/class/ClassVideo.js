import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './../../../pagescss/ClassVideo.css';

function ClassVideo() {
    const { type, subject, topic } = useParams();
    const [classVideo, setClassVideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:3000/classvideo');
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setClassVideo(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Filter videos based on URL parameters
    const filteredVideos = classVideo.filter(video =>
        video.type === type &&
        video.subject === subject &&
        video.topic === topic
    );

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="class-video-page">
            <header className="video-header">
                <p className="page-title">{subject} Videos</p>
            </header>

            <main className="video-gallery">
                {filteredVideos.length === 0 ? (
                    <div className="empty-state">
                        <p>Coming soon videos found for this selection.</p>
                    </div>
                ) : (
                    <div className="video-grid">
                        {filteredVideos.map((video) => (
                            <Link
                                key={video._id}
                                to={`/class-video-view/${encodeURIComponent(video.type)}/${encodeURIComponent(video.subject)}/${encodeURIComponent(video.topic)}/${encodeURIComponent(video.name)}/${encodeURIComponent(video.link)}`}
                                className="video-card-link"
                            >
                                <div className="video-card">
                                    <div className="thumbnail-container">
                                        <img
                                            src={`/uploads/${video.img}`}
                                            alt={video.name}
                                            className="video-thumbnail"
                                            onError={(e) => {
                                                e.target.src = '/images/thumbnail-fallback.jpg';
                                            }}
                                        />
                                        <div className="play-icon">
                                            <svg viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="video-info">
                                        <h2 className="video-title">{video.name}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default ClassVideo;