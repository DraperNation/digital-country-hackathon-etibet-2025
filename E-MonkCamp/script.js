document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const rememberCheckbox = document.getElementById('remember');
    const togglePassword = document.querySelector('.toggle-password');
    const notification = document.getElementById('notification');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('login-password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        }
    });
    
    // Check for saved credentials and populate if remember me was checked
    if (localStorage.getItem('rememberedUser')) {
        const savedUser = JSON.parse(localStorage.getItem('rememberedUser'));
        loginEmail.value = savedUser.email;
        loginPassword.value = savedUser.password;
        rememberCheckbox.checked = true;
    }
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get input values
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();
        
        // Very basic validation
        if (email === '' || password === '') {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Here you would normally have authentication logic
        // For demo, we'll just assume successful login
        
        // Save to localStorage if remember me is checked
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedUser', JSON.stringify({
                email: email,
                password: password
            }));
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        // Show success message
        showNotification('Login successful!', 'success');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'Dashboard.html';
        }, 1500);
    });
    
    // Social login buttons (placeholder functionality)
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 
                            this.classList.contains('facebook') ? 'Facebook' : 'Apple';
            showNotification(`${platform} login is not implemented in this demo`, 'info');
        });
    });
    
    // Forgot password link
    const forgotLink = document.querySelector('.forgot-link');
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Password reset functionality is not implemented in this demo', 'info');
    });
    
    // Function to show notification
    function showNotification(message, type = 'success') {
        const notificationElement = document.getElementById('notification');
        const messageElement = notificationElement.querySelector('.toast-message');
        const iconElement = notificationElement.querySelector('i');
        
        // Set message
        messageElement.textContent = message;
        
        // Set icon and color based on notification type
        if (type === 'success') {
            iconElement.className = 'fas fa-check-circle';
            notificationElement.style.backgroundColor = '#4caf50';
        } else if (type === 'error') {
            iconElement.className = 'fas fa-exclamation-circle';
            notificationElement.style.backgroundColor = '#f44336';
        } else if (type === 'info') {
            iconElement.className = 'fas fa-info-circle';
            notificationElement.style.backgroundColor = '#2196f3';
        }
        
        // Show notification
        notificationElement.classList.add('active');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notificationElement.classList.remove('active');
        }, 3000);
    }
});