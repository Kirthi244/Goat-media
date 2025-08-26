// Dashboard JavaScript Functionality
class Dashboard {
    constructor() {
        this.currentSection = 'overview';
        this.currentFilter = 'all';
        this.currentChart = 'views';
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupRippleEffects();
        this.setupKeyboardNavigation();
        this.setupIntersectionObserver();
        this.initializeChart();
        this.startFloatingAnimations();
        
        // Show initial section
        this.showSection('overview');
        
        console.log('Dashboard initialized successfully');
    }

    setupEventListeners() {
        // Navigation menu items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.showSection(section);
                this.setActiveNavItem(item);
            });
        });

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.dataset.filter;
                this.setFilter(filter);
                this.setActiveFilterBtn(btn);
            });
        });

        // Chart control buttons
        const chartBtns = document.querySelectorAll('.chart-btn');
        chartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const chart = btn.dataset.chart;
                this.setChart(chart);
                this.setActiveChartBtn(btn);
            });
        });

        // Stats cards
        const statsCards = document.querySelectorAll('.stats-card');
        statsCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleStatsCardClick(card);
            });
        });

        // Team cards
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleTeamCardClick(card);
            });
        });

        // CTA buttons
        const ctaBtns = document.querySelectorAll('.cta-btn');
        ctaBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCTAClick(btn);
            });
        });

        // Action buttons
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleActionClick(btn);
            });
        });

        // Add debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    setupRippleEffects() {
        const rippleElements = document.querySelectorAll('.nav-item, .filter-btn, .chart-btn, .cta-btn, .action-btn');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupKeyboardNavigation() {
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Ensure focus is visible
                document.body.classList.add('keyboard-navigation');
            }
            
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement && focusedElement.classList.contains('nav-item')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all dashboard cards
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach(card => observer.observe(card));
    }

    showSection(sectionId) {
        if (this.isLoading) return;
        
        this.showLoading();
        
        // Hide all sections
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section after a brief delay to simulate loading
        setTimeout(() => {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                this.currentSection = sectionId;
                
                // Load section-specific content
                this.loadSectionContent(sectionId);
            }
            
            this.hideLoading();
        }, 500);
    }

    loadSectionContent(sectionId) {
        switch (sectionId) {
            case 'analytics':
                this.loadAnalyticsContent();
                break;
            case 'content':
                this.loadContentManagement();
                break;
            case 'team':
                this.loadTeamManagement();
                break;
            default:
                // Overview is already loaded
                break;
        }
    }

    loadAnalyticsContent() {
        const analyticsContent = document.querySelector('.analytics-content');
        if (analyticsContent) {
            analyticsContent.innerHTML = `
                <div class="analytics-grid">
                    <div class="dashboard-card">
                        <h3>Traffic Sources</h3>
                        <div class="traffic-sources">
                            <div class="source-item">
                                <span class="source-name">Direct</span>
                                <span class="source-percentage">45%</span>
                            </div>
                            <div class="source-item">
                                <span class="source-name">Social Media</span>
                                <span class="source-percentage">32%</span>
                            </div>
                            <div class="source-item">
                                <span class="source-name">Search</span>
                                <span class="source-percentage">23%</span>
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-card">
                        <h3>Top Performing Content</h3>
                        <div class="content-list">
                            <div class="content-item">
                                <span class="content-title">How to Build a Media Empire</span>
                                <span class="content-views">1.2M views</span>
                            </div>
                            <div class="content-item">
                                <span class="content-title">Social Media Strategy 2024</span>
                                <span class="content-views">890K views</span>
                            </div>
                            <div class="content-item">
                                <span class="content-title">Content Creation Tips</span>
                                <span class="content-views">654K views</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    loadContentManagement() {
        const contentManagement = document.querySelector('.content-management');
        if (contentManagement) {
            contentManagement.innerHTML = `
                <div class="content-grid">
                    <div class="dashboard-card content-card">
                        <div class="content-header">
                            <h4>Recent Posts</h4>
                            <span class="content-count">24 posts</span>
                        </div>
                        <div class="content-preview">
                            <p>Manage your latest blog posts, videos, and social media content.</p>
                        </div>
                        <div class="content-actions">
                            <button class="action-link">View All</button>
                            <button class="action-link">Create New</button>
                        </div>
                    </div>
                    <div class="dashboard-card content-card">
                        <div class="content-header">
                            <h4>Scheduled Content</h4>
                            <span class="content-count">8 scheduled</span>
                        </div>
                        <div class="content-preview">
                            <p>Review and manage your upcoming content releases.</p>
                        </div>
                        <div class="content-actions">
                            <button class="action-link">View Schedule</button>
                            <button class="action-link">Add Content</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    loadTeamManagement() {
        // Team content is already loaded in HTML, just add interactivity
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
            if (!card.dataset.enhanced) {
                card.dataset.enhanced = 'true';
                card.addEventListener('click', () => {
                    this.showTeamMemberDetails(card);
                });
            }
        });
    }

    setActiveNavItem(activeItem) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    setActiveFilterBtn(activeBtn) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    setActiveChartBtn(activeBtn) {
        const chartBtns = document.querySelectorAll('.chart-btn');
        chartBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.updateStatsCards(filter);
        console.log(`Filter changed to: ${filter}`);
    }

    setChart(chart) {
        this.currentChart = chart;
        this.updateChart(chart);
        console.log(`Chart changed to: ${chart}`);
    }

    updateStatsCards(filter) {
        // Simulate data update based on filter
        const statsData = {
            all: { views: '2.4M', engagement: '8.7%', revenue: '$45.2K', campaigns: '12' },
            month: { views: '890K', engagement: '9.2%', revenue: '$18.7K', campaigns: '8' },
            week: { views: '210K', engagement: '10.1%', revenue: '$4.2K', campaigns: '3' }
        };

        const data = statsData[filter] || statsData.all;
        
        // Update card values with animation
        this.animateValue('.stats-card:nth-child(1) .card-value', data.views);
        this.animateValue('.stats-card:nth-child(2) .card-value', data.engagement);
        this.animateValue('.stats-card:nth-child(3) .card-value', data.revenue);
        this.animateValue('.stats-card:nth-child(4) .card-value', data.campaigns);
    }

    animateValue(selector, newValue) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
            }, 100);
        }
    }

    updateChart(chartType) {
        const canvas = document.getElementById('performanceChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw simple chart based on type
            this.drawChart(ctx, chartType, canvas.width, canvas.height);
        }
    }

    drawChart(ctx, type, width, height) {
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Set styles
        ctx.strokeStyle = '#ffd700';
        ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
        ctx.lineWidth = 3;
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        
        // Sample data points
        const dataPoints = this.getChartData(type);
        const maxValue = Math.max(...dataPoints);
        
        // Draw chart area
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(padding, padding, chartWidth, chartHeight);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.stroke();
        }
        
        // Draw data line
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        dataPoints.forEach((point, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1)) * index;
            const y = padding + chartHeight - (point / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Fill area under curve
        ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.closePath();
        ctx.fill();
        
        // Draw data points
        ctx.fillStyle = '#ffd700';
        dataPoints.forEach((point, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1)) * index;
            const y = padding + chartHeight - (point / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Add title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${type.charAt(0).toUpperCase() + type.slice(1)} Performance`, width / 2, 25);
    }

    getChartData(type) {
        const chartData = {
            views: [1200, 1800, 1600, 2100, 2400, 2200, 2800, 3200, 2900, 3400, 3800, 4200],
            engagement: [5.2, 6.1, 5.8, 7.2, 8.1, 7.9, 8.7, 9.2, 8.8, 9.5, 10.1, 10.8],
            revenue: [12000, 18000, 16000, 21000, 24000, 22000, 28000, 32000, 29000, 34000, 38000, 42000]
        };
        
        return chartData[type] || chartData.views;
    }

    initializeChart() {
        // Initialize with default chart
        setTimeout(() => {
            this.updateChart('views');
        }, 100);
    }

    handleStatsCardClick(card) {
        // Add click feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Get card type from icon
        const icon = card.querySelector('.card-icon i');
        let cardType = 'general';
        
        if (icon.classList.contains('fa-eye')) cardType = 'views';
        else if (icon.classList.contains('fa-heart')) cardType = 'engagement';
        else if (icon.classList.contains('fa-dollar-sign')) cardType = 'revenue';
        else if (icon.classList.contains('fa-bullhorn')) cardType = 'campaigns';
        
        this.showStatsDetails(cardType);
    }

    handleTeamCardClick(card) {
        // Add click feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        this.showTeamMemberDetails(card);
    }

    handleCTAClick(btn) {
        const btnText = btn.textContent.trim();
        
        // Add click feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.showNotification(`${btnText} action completed!`, 'success');
        }, 1000);
    }

    handleActionClick(btn) {
        if (btn.classList.contains('notification-btn')) {
            this.showNotifications();
        } else if (btn.classList.contains('profile-btn')) {
            this.showProfile();
        }
    }

    showStatsDetails(type) {
        const details = {
            views: 'Detailed view analytics showing traffic sources, popular content, and user engagement patterns.',
            engagement: 'Comprehensive engagement metrics including likes, shares, comments, and interaction rates.',
            revenue: 'Revenue breakdown by source, including advertising, sponsorships, and direct sales.',
            campaigns: 'Active campaign performance with reach, conversion rates, and ROI analysis.'
        };
        
        this.showNotification(details[type] || 'Stats details loaded successfully!', 'info');
    }

    showTeamMemberDetails(card) {
        const name = card.querySelector('h4').textContent;
        const role = card.querySelector('p').textContent;
        
        this.showNotification(`Viewing details for ${name} (${role})`, 'info');
    }

    showNotifications() {
        const notifications = [
            'New comment on your latest post',
            'Campaign performance report ready',
            'Team member Sarah uploaded new content'
        ];
        
        this.showNotification(notifications.join('\n'), 'info');
    }

    showProfile() {
        this.showNotification('Profile settings opened', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            color: #333;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            z-index: 1001;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 1rem;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    showLoading() {
        this.isLoading = true;
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }

    hideLoading() {
        this.isLoading = false;
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    startFloatingAnimations() {
        // Add floating animation to cards with staggered delays
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('floating-animation');
        });
    }

    handleResize() {
        // Redraw chart on resize
        if (this.currentSection === 'overview') {
            this.updateChart(this.currentChart);
        }
    }
}

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #ffd700 !important;
        outline-offset: 2px !important;
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
        white-space: pre-line;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});