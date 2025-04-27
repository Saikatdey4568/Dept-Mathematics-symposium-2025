/**
 * Enhanced JavaScript for Mathematics Department Annual Talks 2025
 * Features: Preloader, Scroll animations, Smooth transitions, Header effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Show preloader until page is fully loaded
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle with animation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
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
    
    // Schedule tab switching with animation
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the sticky header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Scroll animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }
    
    // Set active state in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Add fade-in animations to specific elements if they don't already have animation classes
    const addDefaultAnimations = () => {
        document.querySelectorAll('section h2:not(.fade-in):not(.slide-in-left):not(.slide-in-right)').forEach((el, i) => {
            el.classList.add('fade-in');
        });
        
        document.querySelectorAll('.section-intro:not(.fade-in):not(.slide-in-left):not(.slide-in-right)').forEach((el, i) => {
            el.classList.add('fade-in');
        });
        
        document.querySelectorAll('.speaker-card:not(.fade-in):not(.slide-in-left):not(.slide-in-right)').forEach((el, i) => {
            if (i % 2 === 0) {
                el.classList.add('slide-in-left');
            } else {
                el.classList.add('slide-in-right');
            }
        });
        
        document.querySelectorAll('.schedule-item:not(.fade-in):not(.slide-in-left):not(.slide-in-right)').forEach((el, i) => {
            el.classList.add('fade-in');
            // Add a small delay to each subsequent item
            el.style.transitionDelay = `${i * 0.1}s`;
        });
    };
    
    // Run once after page loads
    addDefaultAnimations();
    
    // Re-run observer for the newly added animation classes
    const newAnimatedElements = document.querySelectorAll('.fade-in:not(.visible), .slide-in-left:not(.visible), .slide-in-right:not(.visible)');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        newAnimatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        newAnimatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }
});
