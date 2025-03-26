import Chart from 'chart.js/auto';

// Données pour le graphique
const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [{
        label: 'Visiteurs mensuels',
        data: [1200, 1900, 3000, 5000, 8000, 12000, 15000, 18000, 22000, 25000, 28000, 32000],
        borderColor: '#388E3C',
        backgroundColor: 'rgba(56, 142, 60, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

// Configuration du graphique
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        },
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString() + ' visiteurs';
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
};

// Animation des compteurs
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('visitorsChart').getContext('2d');
    const chart = new Chart(ctx, config);

    // Animation des compteurs au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visitorCount = document.getElementById('visitorCount');
                const engagementRate = document.getElementById('engagementRate');
                
                animateValue(visitorCount, 0, 32000, 2000);
                animateValue(engagementRate, 0, 85, 2000);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}); 