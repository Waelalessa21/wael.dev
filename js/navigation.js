/**
 * Tab navigation functionality
 */
function initTabs() {
    const navItems = document.querySelectorAll('.profile-nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all tabs
            navItems.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            item.classList.add('active');
            
            // Show corresponding content
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Touch/Swipe functionality for mobile navigation
 */
function initTouchNavigation() {
    const navContainer = document.querySelector('.profile-nav ul');
    const navItems = document.querySelectorAll('.profile-nav li');
    
    if (!navContainer || navItems.length === 0) return;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    // Touch events
    navContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    navContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        // Prevent default only if we're actually swiping
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    });
    
    navContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const diffX = startX - currentX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diffX) > threshold) {
            const currentActiveIndex = Array.from(navItems).findIndex(item => 
                item.classList.contains('active')
            );
            
            if (diffX > 0 && currentActiveIndex < navItems.length - 1) {
                // Swipe left - go to next tab
                navItems[currentActiveIndex + 1].click();
            } else if (diffX < 0 && currentActiveIndex > 0) {
                // Swipe right - go to previous tab
                navItems[currentActiveIndex - 1].click();
            }
        }
        
        isDragging = false;
    });
    
    // Mouse events for desktop testing
    navContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });
    
    navContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });
    
    navContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            const currentActiveIndex = Array.from(navItems).findIndex(item => 
                item.classList.contains('active')
            );
            
            if (diffX > 0 && currentActiveIndex < navItems.length - 1) {
                navItems[currentActiveIndex + 1].click();
            } else if (diffX < 0 && currentActiveIndex > 0) {
                navItems[currentActiveIndex - 1].click();
            }
        }
        
        isDragging = false;
    });
    
    // Prevent text selection during swipe
    navContainer.addEventListener('selectstart', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });
}

// Initialize both functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initTouchNavigation();
});