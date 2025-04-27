document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    feather.replace()
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.classList.contains('hamburger')) {
            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    });
    
    // Schedule tab switching
    const dayTabs = document.querySelectorAll('.day-tab');
    const daySchedules = document.querySelectorAll('.day-schedule');
    
    if (dayTabs.length > 0) {
        dayTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and schedules
                dayTabs.forEach(t => t.classList.remove('active'));
                daySchedules.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding schedule
                tab.classList.add('active');
                if (daySchedules[index]) {
                    daySchedules[index].classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (dayTabs[0] && daySchedules[0]) {
            dayTabs[0].classList.add('active');
            daySchedules[0].classList.add('active');
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
});
