// transactions.js

document.addEventListener('DOMContentLoaded', function() {
    // Set current date for the transfer date input
    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10);
    document.getElementById('transfer-date').value = formattedDate;

    // View Toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    const views = document.querySelectorAll('.view');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Toggle active class on buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle active class on views
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === viewType + '-view') {
                    view.classList.add('active');
                }
            });

            // If grid view is selected and it's empty, generate grid items
            if (viewType === 'grid' && document.querySelector('#grid-view').children.length === 0) {
                generateGridView();
            }
        });
    });

    // New Transfer Modal
    const transferModal = document.getElementById('transfer-modal');
    const newTransferBtn = document.getElementById('new-transfer-btn');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const externalAccountGroup = document.getElementById('external-account-group');
    const toAccountSelect = document.getElementById('to-account');

    newTransferBtn.addEventListener('click', function() {
        transferModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    function closeTransferModal() {
        transferModal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('transfer-form').reset();
        externalAccountGroup.style.display = 'none';
    }

    closeModal.addEventListener('click', closeTransferModal);
    cancelBtn.addEventListener('click', closeTransferModal);

    // Close modal when clicking outside
    transferModal.addEventListener('click', function(e) {
        if (e.target === transferModal) {
            closeTransferModal();
        }
    });

    // Show external account field when "External Account" is selected
    toAccountSelect.addEventListener('change', function() {
        if (this.value === 'external') {
            externalAccountGroup.style.display = 'block';
        } else {
            externalAccountGroup.style.display = 'none';
        }
    });

    // Handle transfer form submission
    const transferForm = document.getElementById('transfer-form');
    transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fromAccount = document.getElementById('from-account').value;
        const toAccount = document.getElementById('to-account').value;
        const amount = document.getElementById('transfer-amount').value;
        const description = document.getElementById('transfer-description').value;
        const date = document.getElementById('transfer-date').value;
        
        // Validate the form
        if (fromAccount === toAccount && toAccount !== 'external') {
            alert('Please select different accounts for transfer');
            return;
        }
        
        if (toAccount === 'external' && !document.getElementById('external-account').value) {
            alert('Please enter external account details');
            return;
        }
        
        // Here you would typically send this data to your backend
        console.log('Transfer details:', {
            fromAccount,
            toAccount,
            externalAccount: toAccount === 'external' ? document.getElementById('external-account').value : null,
            amount,
            description,
            date
        });
        
        // Show success message
        alert('Transfer initiated successfully!');
        
        // Close the modal and reset the form
        closeTransferModal();
        
        // Optional: Add the new transaction to the list
        addNewTransaction(fromAccount, toAccount, amount, description, date);
    });

    // Function to add a new transaction to the transactions list
    function addNewTransaction(fromAccount, toAccount, amount, description, date) {
        const transactionsList = document.getElementById('list-view');
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        // Create transaction item
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        // Format the account names for display
        const fromAccountName = formatAccountName(fromAccount);
        const toAccountName = formatAccountName(toAccount);
        
        // Set description or default
        const transactionName = description || `Transfer to ${toAccountName}`;
        
        transactionItem.innerHTML = `
            <div class="col transaction-info">
                <div class="transaction-icon transfer">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <div class="transaction-details">
                    <p class="transaction-name">${transactionName}</p>
                    <span class="transaction-category">To: ${toAccountName}</span>
                </div>
            </div>
            <div class="col account-info">
                <span>${fromAccountName}</span>
            </div>
            <div class="col">${formattedDate}</div>
            <div class="col amount withdraw">-$${parseFloat(amount).toFixed(2)}</div>
            <div class="col"><span class="status-badge pending">Pending</span></div>
            <div class="col action-col">
                <button class="transaction-menu-btn"><i class="fas fa-ellipsis-h"></i></button>
            </div>
        `;
        
        // Insert at the top of the list
        transactionsList.insertBefore(transactionItem, transactionsList.querySelector('.transaction-item'));
        
        // Also update the grid view if it exists
        if (document.querySelector('#grid-view').children.length > 0) {
            addNewTransactionToGrid(fromAccount, toAccountName, amount, transactionName, formattedDate);
        }
    }

    // Helper function to format account names
    function formatAccountName(accountType) {
        switch(accountType) {
            case 'checking':
                return 'Checking Account';
            case 'savings':
                return 'Savings Account';
            case 'crypto':
                return 'Crypto Wallet';
            case 'external':
                return 'External Account';
            default:
                return accountType;
        }
    }

    // Function to generate grid view items
    function generateGridView() {
        const gridView = document.getElementById('grid-view');
        const listItems = document.querySelectorAll('.transaction-item');
        
        listItems.forEach(item => {
            // Extract data from list item
            const icon = item.querySelector('.transaction-icon').cloneNode(true);
            const name = item.querySelector('.transaction-name').textContent;
            const category = item.querySelector('.transaction-category').textContent;
            const account = item.querySelector('.account-info span').textContent;
            const date = item.querySelector('.col:nth-child(3)').textContent;
            const amount = item.querySelector('.amount').textContent;
            const status = item.querySelector('.status-badge').cloneNode(true);
            
            // Create grid item
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-transaction-item';
            
            gridItem.innerHTML = `
                <div class="grid-transaction-header">
                    <div class="grid-transaction-info">
                        ${icon.outerHTML}
                        <div class="grid-transaction-details">
                            <h3>${name}</h3>
                            <span class="grid-transaction-date">${date}</span>
                        </div>
                    </div>
                    <button class="transaction-menu-btn"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                <div class="grid-transaction-body">
                    <div class="${amount.includes('+') ? 'grid-amount deposit' : 'grid-amount withdraw'}">
                        ${amount}
                    </div>
                    <div class="grid-transaction-data">
                        <div class="data-item">
                            <span>Status</span>
                            <span>${status.outerHTML}</span>
                        </div>
                        <div class="data-item">
                            <span>Account</span>
                            <span>${account}</span>
                        </div>
                        <div class="data-item">
                            <span>Category</span>
                            <span>${category}</span>
                        </div>
                    </div>
                </div>
            `;
            
            gridView.appendChild(gridItem);
        });
    }

    // Function to add a new transaction to the grid view
    function addNewTransactionToGrid(fromAccount, toAccount, amount, description, date) {
        const gridView = document.getElementById('grid-view');
        
        // Create grid item
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-transaction-item';
        
        gridItem.innerHTML = `
            <div class="grid-transaction-header">
                <div class="grid-transaction-info">
                    <div class="transaction-icon transfer">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                    <div class="grid-transaction-details">
                        <h3>${description || `Transfer to ${toAccount}`}</h3>
                        <span class="grid-transaction-date">${date}</span>
                    </div>
                </div>
                <button class="transaction-menu-btn"><i class="fas fa-