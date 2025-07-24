// Portfolio functionality
document.addEventListener('DOMContentLoaded', function() {
    // Video modal functionality
    const videoPreviews = document.querySelectorAll('.project-video .video-preview');
    const videoModal = document.querySelector('.portfolio-modal');
    const modalVideo = videoModal ? videoModal.querySelector('video') : null;
    const closeModal = videoModal ? videoModal.querySelector('.close-modal') : null;

    // Open video modal
    videoPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            if (videoModal && modalVideo) {
                modalVideo.src = videoSrc;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close video modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (videoModal && modalVideo) {
                videoModal.classList.remove('active');
                modalVideo.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                if (modalVideo) {
                    modalVideo.src = '';
                }
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            if (modalVideo) {
                modalVideo.src = '';
            }
            document.body.style.overflow = 'auto';
        }
    });

    // Portfolio scroll animation
    const projectCards = document.querySelectorAll('.project-card');
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation class with delay based on card index
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200); // 200ms delay between each card
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });
}); 