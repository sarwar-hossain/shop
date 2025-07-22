import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './../../../pagescss/ClassVideoView.css';
import './../../../pagescss/ClassVideo.css';


function ClassVideoView() {
  const { type, subject, topic,name, videoId, } = useParams();
  const [classVideo, setClassVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/classvideo');
        if (!response.ok) throw new Error('Failed to fetch videos');
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

  // Handle video player rendering
  const renderVideoPlayer = () => {
    if (!videoId) return <div className="error-message">No video selected</div>;
    
    const decodedUrl = decodeURIComponent(videoId);
    const isYoutubeUrl = decodedUrl.includes('youtube.com/embed/') || 
                        decodedUrl.includes('youtu.be/');

    if (!isYoutubeUrl) return <div className="error-message">Invalid video URL format</div>;

    return (
      <div className="video-main">
        <div className="video-wrapper">
          <iframe
            className="responsive-iframe"
            src={decodedUrl}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <h1> {name} </h1>
      </div>
    );
  };

  return (
    <div className="class-video-view-container">
      {/* Video Player Section */}
      {renderVideoPlayer()}

      {/* Related Videos Section */}
      <div className="related-videos">
        <header className="video-header">
          <h1 className="page-title">More {subject} Videos</h1>
          <div className="breadcrumbs">
            <span>{type} • {topic}</span>
          </div>
        </header>

        {filteredVideos.length === 0 ? (
          <div className="empty-state">
            <img src="/images/no-videos.svg" alt="No videos" />
            <p>No related videos found</p>
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
                    <h3 className="video-title">{video.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassVideoView;