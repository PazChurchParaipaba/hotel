// assets/js/auth.js
// Verifica se o usuário está logado. Se não, manda pro login.

(function checkAuth() {
    const isLoginPage = window.location.pathname.includes('login.html');
    const token = localStorage.getItem('user_token');

    if (!token && !isLoginPage) {
        window.location.href = 'login.html';
    }

    if (token && isLoginPage) {
        window.location.href = 'dashboard.html';
    }
})();

function logout() {
    localStorage.removeItem('user_token');
    window.location.href = 'login.html';
}