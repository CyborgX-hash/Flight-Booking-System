const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api';

async function testBackend() {
    try {
        // 1. Check Health
        console.log('Testing Health...');
        try {
            const health = await axios.get('http://localhost:5001/');
            console.log('Root Health:', health.data);
        } catch (e) {
            console.log('Root Health Failed:', e.message);
        }

        const uniqueId = Date.now();
        const headers = { 'Content-Type': 'application/json' };

        // 2. Signup
        console.log('\nTesting Signup...');
        const user = {
            name: `Test User ${uniqueId}`,
            email: `test${uniqueId}@example.com`,
            password: 'password123'
        };

        let token = null;

        try {
            const signupRes = await axios.post(`${BASE_URL}/auth/signup`, user, { headers });
            console.log('Signup Status:', signupRes.status);
            console.log('Signup Data:', signupRes.data);
        } catch (e) {
            console.error('Signup Failed:', e.response?.data || e.message);
            // If signup fails, we can't test login unless we use a known user, but let's assume we proceed or stop.
        }

        // 3. Login
        console.log('\nTesting Login...');
        try {
            const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
                email: user.email,
                password: user.password
            }, { headers });
            console.log('Login Status:', loginRes.status);
            console.log('Login Data:', loginRes.data);
            token = loginRes.data.token;
        } catch (e) {
            console.error('Login Failed:', e.response?.data || e.message);
        }

        // 4. Flight Search (if login succeeded)
        if (token) {
            console.log('\nTesting Flight Search...');
            try {
                const flightRes = await axios.get(`${BASE_URL}/flights/search`, {
                    params: {
                        origin: 'DEL',
                        destination: 'BOM',
                        date: '2026-05-01' // Future date
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Flight Search Status:', flightRes.status);
                console.log('Flight Search Data count:', flightRes.data.length);
            } catch (e) {
                console.error('Flight Search Failed:', e.response?.data || e.message);
            }
        } else {
            console.log('\nSkipping Flight Search due to missing token.');
        }

    } catch (error) {
        console.error('Unexpected Error:', error);
    }
}

testBackend();
