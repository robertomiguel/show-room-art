
export const isEmail = (email) => {
    const expRegEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expRegEmail.test(email);
}