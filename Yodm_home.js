        // Mouse shadow effect
        document.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--x', e.clientX + 'px');
            document.documentElement.style.setProperty('--y', e.clientY + 'px');
        });

        // Button ripple effect
        document.querySelectorAll('.animated-button').forEach(button => {
            button.addEventListener('mousedown', function(e) {
                e.preventDefault();
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                const diameter = Math.max(this.clientWidth, this.clientHeight);
                ripple.style.width = ripple.style.height = `${diameter}px`;
                ripple.style.left = `${e.clientX - rect.left - diameter/2}px`;
                ripple.style.top = `${e.clientY - rect.top - diameter/2}px`;
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // 3D flip and popup
        const title = document.querySelector('.header h1');
        const popup = document.querySelector('.popup');
        const overlay = document.querySelector('.overlay');
        const closeBtn = document.querySelector('.close-btn');

        title.addEventListener('click', () => {
            title.classList.add('flipping');
            setTimeout(() => {
                popup.classList.add('show');
                overlay.classList.add('show');
            }, 300);
            setTimeout(() => {
                title.classList.remove('flipping');
            }, 600);
        });

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
            overlay.classList.remove('show');
        });

        overlay.addEventListener('click', () => {
            popup.classList.remove('show');
            overlay.classList.remove('show');
        });