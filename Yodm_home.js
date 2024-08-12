        // JavaScript for Menu Button
        const menuBtn = document.getElementById('menu-btn');
        const menuList = document.getElementById('menu-list');

        menuBtn.addEventListener('click', () => {
            const isOpen = menuList.style.left === '0px';
            menuList.style.left = isOpen ? '-300px' : '0px';
        });

        // JavaScript for Dark Mode Toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;

        darkModeToggle.addEventListener('click', toggleDarkMode);

        function toggleDarkMode() {
            body.classList.toggle('dark-mode');
            darkModeToggle.textContent = body.classList.contains('dark-mode')
                ? '☀️ Light Mode'
                : '🌙 Dark Mode';

            const buttons = document.querySelectorAll('.button');
            buttons.forEach(button => {
                button.style.backgroundColor = body.classList.contains('dark-mode') ? '#444' : '#dfe7f5';
                button.style.color = body.classList.contains('dark-mode') ? '#fff' : '#3F4041';
            });

            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        }

        window.addEventListener('load', () => {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            body.classList.toggle('dark-mode', isDarkMode);
            darkModeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';

            const buttons = document.querySelectorAll('.button');
            buttons.forEach(button => {
                button.style.backgroundColor = isDarkMode ? '#444' : '#dfe7f5';
                button.style.color = isDarkMode ? '#fff' : '#272D39';
            });
        });

        // JavaScript for Search Bar
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        const buttonsContainer = document.querySelector('.container');
        const buttons = document.querySelectorAll('.button');
        const searchedButtonContainer = document.getElementById('searchedButtonContainer');

        searchBtn.addEventListener('click', () => {
            showSpinner(); // Show loading spinner

            setTimeout(() => {
                const searchText = searchInput.value.trim().toLowerCase();
                if (searchText !== '') {
                    buttonsContainer.style.display = 'none'; // Hide original buttons container
                    searchedButtonContainer.innerHTML = ''; // Clear previous search results
                    buttons.forEach(button => {
                        const buttonText = button.textContent.trim().toLowerCase();
                        if (buttonText.includes(searchText)) {
                            const clonedButton = button.cloneNode(true); // Clone matching button
                            searchedButtonContainer.appendChild(clonedButton); // Append cloned button to container
                        }
                    });
                    searchedButtonContainer.style.display = 'flex'; // Show the container for searched button(s)
                } else {
                    buttonsContainer.style.display = 'flex'; // Show original buttons container if search input is empty
                    searchedButtonContainer.innerHTML = ''; // Clear search results if search input is empty
                    searchedButtonContainer.style.display = 'none'; // Hide the container for searched button(s)
                }

                hideSpinner(); // Hide loading spinner
            }, 100); // Simulating an asynchronous operation delay of 2 seconds
        });

        // Loading Spinner
        const spinnerContainer = document.getElementById('spinnerContainer');

        function showSpinner() {
            spinnerContainer.style.display = 'flex';
        }

        function hideSpinner() {
            spinnerContainer.style.display = 'none';
        }

        // Scroll to top functionality
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');

        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }

        scrollToTopBtn.addEventListener('click', smoothScrollToTop);

        function smoothScrollToTop() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothScrollToTop);
                window.scrollTo(0, currentScroll - (currentScroll / 7));
            }
        }
