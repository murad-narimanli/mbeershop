const TOKEN_KEY = "jwt";

/* Auth */
export const setToken = (value, tokenKey = TOKEN_KEY) => {
    if (localStorage) {
        localStorage.setItem(tokenKey, JSON.stringify(value));
    }
};