document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements and event listeners
    initializeUIElements();
    attachEventListeners();
    
    // Initial data loading/setup
    loadAccountsData();
});

function initializeUIElements() {
    // Initialize any UI components that need setup
    setupNotifications();
    setupUserProfileDropdown();
}

function attachEventListeners() {
    // Account menu buttons
    const accountMenuButtons = document.querySelectorAll('.account-menu-btn');
    accountMenuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            showAccountMenu(this);
        });
    });
    
    // Add new bank account button
    const addBankAccountBtn = document.querySelector('.accounts-header-button button:first-child');
    if (addBankAccountBtn) {
        addBankAccountBtn.addEventListener('click', showAddBankAccountModal);
    }
    
    // Add new wallet button
    const addWalletBtn = document.querySelector('.accounts-header-button button:nth-child(2)');
    if (addWalletBtn) {
        addWalletBtn.addEventListener('click', showAddWalletModal);
    }
    
    // Link new account button
    const linkAccountBtn = document.querySelector('.link-account-btn');
    if (linkAccountBtn) {
        linkAccountBtn.addEventListener('click', showLinkAccountModal);
    }
    
    // Linked account menu buttons
    const linkedMenuButtons = document.querySelectorAll('.linked-menu-btn');
    linkedMenuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            showLinkedAccountMenu(this);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterAccounts);
    }
    
    // Close menus when clicking elsewhere
    document.addEventListener('click', function() {
        closeAllMenus();
    });
}

function setupNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            toggleNotificationsPanel();
        });
    }
}

function setupUserProfileDropdown() {
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            toggleUserDropdown();
        });
    }
}

function toggleNotificationsPanel() {
    // Check if notifications panel already exists
    let notifPanel = document.querySelector('.notifications-panel');
    
    // Close panel if it's already open
    if (notifPanel) {
        notifPanel.remove();
        return;
    }
    
    // Create notifications panel
    notifPanel = document.createElement('div');
    notifPanel.className = 'notifications-panel';
    
    const notifHeader = document.createElement('div');
    notifHeader.className = 'notif-header';
    notifHeader.innerHTML = '<h3>Notifications</h3><button class="mark-all-read">Mark all as read</button>';
    
    const notifList = document.createElement('div');
    notifList.className = 'notif-list';
    
    // Sample notifications
    const notifications = [
        { type: 'transaction', message: 'You received $250 from Jane Smith', time: '10 minutes ago', isRead: false },
        { type: 'security', message: 'New login detected on your account', time: '2 hours ago', isRead: false },
        { type: 'alert', message: 'Your credit card payment is due tomorrow', time: '1 day ago', isRead: true }
    ];
    
    notifications.forEach(notif => {
        const notifItem = document.createElement('div');
        notifItem.className = `notif-item ${notif.isRead ? 'read' : 'unread'}`;
        
        notifItem.innerHTML = `
            <div class="notif-icon ${notif.type}">
                <i class="fas ${getNotificationIcon(notif.type)}"></i>
            </div>
            <div class="notif-content">
                <p>${notif.message}</p>
                <span class="notif-time">${notif.time}</span>
            </div>
            <button class="notif-action"><i class="fas fa-ellipsis-v"></i></button>
        `;
        
        notifList.appendChild(notifItem);
    });
    
    notifPanel.appendChild(notifHeader);
    notifPanel.appendChild(notifList);
    
    // Append to notification button
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.appendChild(notifPanel);
    
    // Add event listener to "Mark all as read" button
    const markAllReadBtn = notifPanel.querySelector('.mark-all-read');
    markAllReadBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        markAllNotificationsAsRead();
    });
}

function getNotificationIcon(type) {
    switch(type) {
        case 'transaction': return 'fa-money-bill-wave';
        case 'security': return 'fa-shield-alt';
        case 'alert': return 'fa-exclamation-circle';
        default: return 'fa-bell';
    }
}

function markAllNotificationsAsRead() {
    const unreadNotifs = document.querySelectorAll('.notif-item.unread');
    unreadNotifs.forEach(notif => {
        notif.classList.remove('unread');
        notif.classList.add('read');
    });
    
    // Update notification badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = '0';
        badge.style.display = 'none';
    }
}

function toggleUserDropdown() {
    // Check if user dropdown already exists
    let userDropdown = document.querySelector('.user-dropdown');
    
    // Close dropdown if it's already open
    if (userDropdown) {
        userDropdown.remove();
        return;
    }
    
    // Create user dropdown
    userDropdown = document.createElement('div');
    userDropdown.className = 'user-dropdown';
    
    userDropdown.innerHTML = `
        <div class="dropdown-item">
            <i class="fas fa-user"></i>
            <span>My Profile</span>
        </div>
        <div class="dropdown-item">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </div>
        <div class="dropdown-item">
            <i class="fas fa-question-circle"></i>
            <span>Help Center</span>
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </div>
    `;
    
    // Append to user profile
    const userProfile = document.querySelector('.user-profile');
    userProfile.appendChild(userDropdown);
    
    // Add event listeners to dropdown items
    const logoutBtn = userDropdown.querySelector('.dropdown-item.logout');
    logoutBtn.addEventListener('click', function() {
        window.location.href = 'LoginScreen.html';
    });
}

function showAccountMenu(button) {
    closeAllMenus();
    
    const accountItem = button.closest('.account-item');
    if (!accountItem) return;
    
    // Create menu
    const menu = document.createElement('div');
    menu.className = 'account-action-menu';
    
    menu.innerHTML = `
        <div class="menu-item"><i class="fas fa-chart-line"></i> View Transactions</div>
        <div class="menu-item"><i class="fas fa-exchange-alt"></i> Transfer Money</div>
        <div class="menu-item"><i class="fas fa-file-invoice-dollar"></i> View Statements</div>
        <div class="menu-item"><i class="fas fa-cog"></i> Account Settings</div>
    `;
    
    // Position menu
    const buttonRect = button.getBoundingClientRect();
    menu.style.top = `${buttonRect.bottom + window.scrollY}px`;
    menu.style.right = `${window.innerWidth - buttonRect.right}px`;
    
    // Append menu to document
    document.body.appendChild(menu);
    
    // Add event listeners to menu items
    menu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            handleAccountMenuAction(this.textContent.trim(), accountItem);
        });
    });
}

function showLinkedAccountMenu(button) {
    closeAllMenus();
    
    const linkedAccount = button.closest('.linked-account');
    if (!linkedAccount) return;
    
    // Create menu
    const menu = document.createElement('div');
    menu.className = 'linked-action-menu';
    
    menu.innerHTML = `
        <div class="menu-item"><i class="fas fa-sync-alt"></i> Refresh Connection</div>
        <div class="menu-item"><i class="fas fa-eye"></i> View Account Details</div>
        <div class="menu-item"><i class="fas fa-unlink"></i> Disconnect Account</div>
    `;
    
    // Position menu
    const buttonRect = button.getBoundingClientRect();
    menu.style.top = `${buttonRect.bottom + window.scrollY}px`;
    menu.style.right = `${window.innerWidth - buttonRect.right}px`;
    
    // Append menu to document
    document.body.appendChild(menu);
    
    // Add event listeners to menu items
    menu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            handleLinkedAccountMenuAction(this.textContent.trim(), linkedAccount);
        });
    });
}

function handleAccountMenuAction(action, accountItem) {
    console.log(`Action "${action}" performed on account:`, accountItem);
    
    // Handle different actions
    if (action.includes("View Transactions")) {
        alert("Transactions view will be implemented in future updates");
    } else if (action.includes("Transfer Money")) {
        alert("Transfer functionality will be implemented in future updates");
    } else if (action.includes("View Statements")) {
        alert("Statements view will be implemented in future updates");
    } else if (action.includes("Account Settings")) {
        alert("Account settings will be implemented in future updates");
    }
    
    closeAllMenus();
}

function handleLinkedAccountMenuAction(action, linkedAccount) {
    const accountName = linkedAccount.querySelector('h3').textContent;
    console.log(`Action "${action}" performed on linked account: ${accountName}`);
    
    // Handle different actions
    if (action.includes("Refresh Connection")) {
        showLoadingIndicator(linkedAccount);
        setTimeout(() => {
            hideLoadingIndicator(linkedAccount);
            alert(`Connection to ${accountName} refreshed successfully`);
        }, 1500);
    } else if (action.includes("View Account Details")) {
        alert(`Details view for ${accountName} will be implemented in future updates`);
    } else if (action.includes("Disconnect Account")) {
        if (confirm(`Are you sure you want to disconnect ${accountName}?`)) {
            linkedAccount.classList.add('disconnecting');
            setTimeout(() => {
                linkedAccount.remove();
            }, 500);
        }
    }
    
    closeAllMenus();
}

function showLoadingIndicator(element) {
    const status = element.querySelector('.linked-status span');
    if (status) {
        status.className = 'status-refreshing';
        status.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
    }
}

function hideLoadingIndicator(element) {
    const status = element.querySelector('.linked-status span');
    if (status) {
        status.className = 'status-connected';
        status.textContent = 'Connected';
    }
}

function closeAllMenus() {
    // Remove account action menus
    const actionMenus = document.querySelectorAll('.account-action-menu, .linked-action-menu');
    actionMenus.forEach(menu => menu.remove());
}

function showAddBankAccountModal() {
    showModal('Add New Bank Account', `
        <form id="add-bank-form">
            <div class="form-group">
                <label for="bank-name">Bank Name</label>
                <input type="text" id="bank-name" required>
            </div>
            <div class="form-group">
                <label for="account-type">Account Type</label>
                <select id="account-type" required>
                    <option value="">Select account type</option>
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="money-market">Money Market</option>
                    <option value="cd">Certificate of Deposit</option>
                </select>
            </div>
            <div class="form-group">
                <label for="account-number">Account Number</label>
                <input type="text" id="account-number" required>
            </div>
            <div class="form-group">
                <label for="routing-number">Routing Number</label>
                <input type="text" id="routing-number" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="submit-btn">Add Account</button>
                <button type="button" class="cancel-btn">Cancel</button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = document.getElementById('add-bank-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Form processing would go here
        alert('Bank account would be added here (functionality to be implemented)');
        closeModal();
    });
    
    // Handle cancel button
    const cancelBtn = form.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeModal);
}

function showAddWalletModal() {
    showModal('Add New Wallet', `
        <form id="add-wallet-form">
            <div class="form-group">
                <label for="wallet-name">Wallet Name</label>
                <input type="text" id="wallet-name" required>
            </div>
            <div class="form-group">
                <label for="wallet-type">Wallet Type</label>
                <select id="wallet-type" required>
                    <option value="">Select wallet type</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="multi">Multi-currency</option>
                </select>
            </div>
            <div class="form-group">
                <label for="wallet-address">Wallet Address</label>
                <input type="text" id="wallet-address" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="submit-btn">Add Wallet</button>
                <button type="button" class="cancel-btn">Cancel</button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = document.getElementById('add-wallet-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Form processing would go here
        alert('Crypto wallet would be added here (functionality to be implemented)');
        closeModal();
    });
    
    // Handle cancel button
    const cancelBtn = form.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeModal);
}

function showLinkAccountModal() {
    showModal('Link External Account', `
        <div class="bank-selection">
            <h3>Select your bank or service</h3>
            <div class="bank-grid">
                <div class="bank-option">
                    <img src="/api/placeholder/60/60" alt="Bank of America">
                    <span>Bank of America</span>
                </div>
                <div class="bank-option">
                    <img src="/api/placeholder/60/60" alt="Wells Fargo">
                    <span>Wells Fargo</span>
                </div>
                <div class="bank-option">
                    <img src="/api/placeholder/60/60" alt="Citibank">
                    <span>Citibank</span>
                </div>
                <div class="bank-option">
                    <img src="/api/placeholder/60/60" alt="Capital One">
                    <span>Capital One</span>
                </div>
                <div class="bank-option">
                    <img src="/api/placeholder/60/60" alt="Venmo">
                    <span>Venmo</span>
                </div>
                <div class="bank-option">
                    <img src="/api/placeholder/60/60" alt="Coinbase">
                    <span>Coinbase</span>
                </div>
            </div>
            <div class="search-bank">
                <input type="text" placeholder="Search for your bank...">
                <button><i class="fas fa-search"></i></button>
            </div>
        </div>
    `);
    
    // Add event listeners to bank options
    const bankOptions = document.querySelectorAll('.bank-option');
    bankOptions.forEach(option => {
        option.addEventListener('click', function() {
            const bankName = this.querySelector('span').textContent;
            showBankLoginForm(bankName);
        });
    });
}

function showBankLoginForm(bankName) {
    showModal(`Connect to ${bankName}`, `
        <form id="bank-connect-form">
            <div class="form-group">
                <label for="bank-username">Username</label>
                <input type="text" id="bank-username" required>
            </div>
            <div class="form-group">
                <label for="bank-password">Password</label>
                <input type="password" id="bank-password" required>
                <small class="info-text">We use industry-standard encryption to securely connect to your account.</small>
            </div>
            <div class="form-actions">
                <button type="submit" class="submit-btn">Connect</button>
                <button type="button" class="cancel-btn">Cancel</button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = document.getElementById('bank-connect-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        submitBtn.disabled = true;
        
        // Simulate connection process
        setTimeout(() => {
            closeModal();
            showConnectionSuccessMessage(bankName);
            // Would refresh page or update UI here in a real implementation
        }, 2000);
    });
    
    // Handle cancel button
    const cancelBtn = form.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeModal);
}

function showConnectionSuccessMessage(bankName) {
    const successMessage = document.createElement('div');
    successMessage.className = 'connection-success-message';
    
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Successfully Connected!</h3>
        <p>Your ${bankName} account has been successfully linked.</p>
        <button class="close-success-btn">Continue</button>
    `;
    
    document.body.appendChild(successMessage);
    
    // Add animations
    setTimeout(() => {
        successMessage.classList.add('show');
    }, 10);
    
    // Handle continue button
    const closeBtn = successMessage.querySelector('.close-success-btn');
    closeBtn.addEventListener('click', function() {
        successMessage.classList.remove('show');
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    });
}

function showModal(title, content) {
    // Remove any existing modal
    closeModal();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${title}</h2>
            <button class="close-modal-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            ${content}
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close button
    const closeBtn = modal.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function filterAccounts() {
    const searchInput = document.querySelector('.search-container input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const accountItems = document.querySelectorAll('.account-item');
    
    accountItems.forEach(item => {
        const accountName = item.querySelector('h3').textContent.toLowerCase();
        const accountNumber = item.querySelector('.account-info p').textContent.toLowerCase();
        
        if (accountName.includes(searchTerm) || accountNumber.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update group visibility
    const accountGroups = document.querySelectorAll('.account-group');
    accountGroups.forEach(group => {
        const visibleAccounts = group.querySelectorAll('.account-item[style=""]').length;
        if (visibleAccounts === 0 && searchTerm !== '') {
            group.style.display = 'none';
        } else {
            group.style.display = '';
        }
    });
}

function loadAccountsData() {
    // This function would fetch data from an API in a real application
    // For this example, we'll just use the hardcoded data from the HTML
    
    // You could replace the hard-coded values with data fetched from an API
    // Example:
    /*
    fetch('/api/accounts')
        .then(response => response.json())
        .then(data => {
            // Process and display account data
            updateAccountBalances(data);
        })
        .catch(error => {
            console.error('Error fetching account data:', error);
        });
    */
    
    // For demonstration, we'll simulate a data refresh
    console.log('Account data loaded successfully');
}

// This function would update balances and account information
function updateAccountBalances(data) {
    // Example implementation:
    /*
    data.forEach(account => {
        const accountElement = document.querySelector(`[data-account-id="${account.id}"]`);
        if (accountElement) {
            const balanceElement = accountElement.querySelector('.account-balance h3');
            if (balanceElement) {
                balanceElement.textContent = formatCurrency(account.balance);
            }
            
            // Update other account details as needed
        }
    });
    */
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}