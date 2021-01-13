
const prod = {
    env: 'production',
    api_host: '' // deployment URL
};
const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', 
    use_frontend_test_user: false, 
    user: "user"
};

export default process.env.NODE_ENV === 'production' ? prod : dev;