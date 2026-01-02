let currentUser = null;
let expenses = [];
let isEditing = false;
let currentEditId = null;

const authPage = document.getElementById('authPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const addExpenseForm = document.getElementById('addExpenseForm');
const expensesContainer = document.getElementById('expensesContainer');
const noExpensesMessage = document.getElementById('noExpensesMessage');
const logoutBtn = document.getElementById('logoutBtn');
const currentUserName = document.getElementById('currentUserName');
const totalExpensesElement = document.getElementById('totalExpenses');
const expenseCountElement = document.getElementById('expenseCount');
const sortBySelect = document.getElementById('sortBy');
const filterBySelect = document.getElementById('filterBy');
const loginMessage = document.getElementById('loginMessage');
const signupMessage = document.getElementById('signupMessage');
const expenseMessage = document.getElementById('expenseMessage');
const expenseSubmitBtn = document.getElementById('expenseSubmitBtn');
const tabButtons = document.querySelectorAll('.tab-btn');

const today = new Date().toISOString().split('T')[0];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('expenseDate').value = today;

    const savedUser = localStorage.getItem('expensehub_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showDashboard();
            loadUserExpenses();
        } catch {
            localStorage.clear();
            showAuthPage();
        }
    }

    tabButtons.forEach(btn =>
        btn.addEventListener('click', () => switchTab(btn))
    );

    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
    addExpenseForm.addEventListener('submit', handleAddExpense);
    logoutBtn.addEventListener('click', handleLogout);
    sortBySelect.addEventListener('change', renderExpenses);
    filterBySelect.addEventListener('change', renderExpenses);
});

function switchTab(button) {
    const tabId = button.dataset.tab;
    tabButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${tabId}Tab`).classList.add('active');
    clearMessage(loginMessage);
    clearMessage(signupMessage);
}

function showAuthPage() {
    authPage.style.display = 'block';
    dashboardPage.style.display = 'none';
}

function showDashboard() {
    authPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    currentUserName.textContent = currentUser.name;
}

function handleLogin(e) {
    e.preventDefault();
    const email = loginForm.loginEmail.value.trim();
    const password = loginForm.loginPassword.value;
    if (!email || !password) return showMessage(loginMessage, 'Please fill in all fields', 'error');

    const users = JSON.parse(localStorage.getItem('expensehub_users')) || [];
    const user = users.find(u => u.email === email);
    if (!user) return showMessage(loginMessage, 'User not found. Please sign up first.', 'error');
    if (user.password !== password) return showMessage(loginMessage, 'Incorrect password.', 'error');

    currentUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem('expensehub_user', JSON.stringify(currentUser));
    showDashboard();
    loadUserExpenses();
    loginForm.reset();
    showMessage(expenseMessage, 'Login successful!', 'success');
    setTimeout(() => clearMessage(expenseMessage), 2000);
}

function handleSignup(e) {
    e.preventDefault();
    const name = signupForm.signupName.value.trim();
    const email = signupForm.signupEmail.value.trim();
    const password = signupForm.signupPassword.value;
    if (!name || !email || !password) return showMessage(signupMessage, 'Please fill in all fields', 'error');
    if (password.length < 6) return showMessage(signupMessage, 'Password must be at least 6 characters', 'error');

    const users = JSON.parse(localStorage.getItem('expensehub_users')) || [];
    if (users.some(u => u.email === email)) return showMessage(signupMessage, 'User already exists', 'error');

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('expensehub_users', JSON.stringify(users));

    currentUser = { id: newUser.id, name, email };
    localStorage.setItem('expensehub_user', JSON.stringify(currentUser));
    showDashboard();
    loadUserExpenses();
    signupForm.reset();
    showMessage(expenseMessage, 'Account created successfully!', 'success');
    setTimeout(() => clearMessage(expenseMessage), 2000);
}

function handleAddExpense(e) {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const date = expenseDate.value;
    const category = expenseCategory.value;

    if (!name || !amount || amount <= 0 || !date || !category)
        return showMessage(expenseMessage, 'Please fill all fields correctly', 'error');

    let allExpenses = JSON.parse(localStorage.getItem('expensehub_expenses')) || [];

    if (isEditing) {
        const i = allExpenses.findIndex(e => e.id === currentEditId);
        if (i !== -1) allExpenses[i] = { ...allExpenses[i], name, amount, date, category };
        isEditing = false;
        currentEditId = null;
        expenseSubmitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Expense';
        showMessage(expenseMessage, 'Expense updated successfully!', 'success');
    } else {
        allExpenses.push({ id: Date.now().toString(), userId: currentUser.id, name, amount, date, category });
        showMessage(expenseMessage, 'Expense added successfully!', 'success');
    }

    localStorage.setItem('expensehub_expenses', JSON.stringify(allExpenses));
    addExpenseForm.reset();
    expenseDate.value = today;
    loadUserExpenses();
    setTimeout(() => clearMessage(expenseMessage), 3000);
}

function loadUserExpenses() {
    const all = JSON.parse(localStorage.getItem('expensehub_expenses')) || [];
    expenses = all.filter(e => e.userId === currentUser.id);
    updateStats();
    renderExpenses();
}

function renderExpenses() {
    if (!expenses.length) {
        expensesContainer.innerHTML = '';
        noExpensesMessage.style.display = 'block';
        expensesContainer.appendChild(noExpensesMessage);
        return;
    }

    noExpensesMessage.style.display = 'none';
    let list = [...expenses];

    if (filterBySelect.value !== 'all')
        list = list.filter(e => e.category === filterBySelect.value);

    list.sort((a, b) => {
        if (sortBySelect.value === 'amount-asc') return a.amount - b.amount;
        if (sortBySelect.value === 'amount-desc') return b.amount - a.amount;
        if (sortBySelect.value === 'date-asc') return new Date(a.date) - new Date(b.date);
        return new Date(b.date) - new Date(a.date);
    });

    expensesContainer.innerHTML = '';
    list.forEach(e => expensesContainer.appendChild(createExpenseElement(e)));
}

function createExpenseElement(e) {
    const d = new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const div = document.createElement('div');
    div.className = 'expense-item';
    div.innerHTML = `
        <div class="expense-info">
            <h4>${e.name}</h4>
            <div class="expense-meta">
                <span>${d}</span>
                <span>${e.category}</span>
            </div>
        </div>
        <div class="expense-amount">$${e.amount.toFixed(2)}</div>
        <div class="expense-actions">
            <button onclick="editExpense('${e.id}')">✏️</button>
            <button onclick="deleteExpenseHandler('${e.id}')">🗑️</button>
        </div>`;
    return div;
}

function editExpense(id) {
    const e = expenses.find(x => x.id === id);
    if (!e) return;
    expenseName.value = e.name;
    expenseAmount.value = e.amount;
    expenseDate.value = e.date;
    expenseCategory.value = e.category;
    isEditing = true;
    currentEditId = id;
    expenseSubmitBtn.innerHTML = '<i class="fas fa-save"></i> Update Expense';
}

function deleteExpenseHandler(id) {
    if (!confirm('Delete this expense?')) return;
    let all = JSON.parse(localStorage.getItem('expensehub_expenses')) || [];
    all = all.filter(e => e.id !== id);
    localStorage.setItem('expensehub_expenses', JSON.stringify(all));
    loadUserExpenses();
}

function updateStats() {
    totalExpensesElement.textContent = `$${expenses.reduce((s, e) => s + e.amount, 0).toFixed(2)}`;
    expenseCountElement.textContent = expenses.length;
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('expensehub_user');
    showAuthPage();
    loginForm.reset();
    addExpenseForm.reset();
    expenseSubmitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Expense';
}

function showMessage(el, msg, type) {
    el.textContent = msg;
    el.className = `message ${type}`;
}

function clearMessage(el) {
    el.textContent = '';
    el.className = 'message';
}
