const axios = require('axios');
const fs = require('fs');

async function testGeneration() {
  try {
    console.log('Registering test user...');
    
    // 1. Register
    const email = `test_${Date.now()}@example.com`;
    const regRes = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: email,
      password: 'password123'
    });
    const token = regRes.data.token;
    console.log('User registered. Token received.');

    // 2. Generate
    console.log('Generating boilerplate...');
    const genRes = await axios.post('http://localhost:5000/api/generate', {
      name: 'my-test-app',
      frontend: 'react',
      backend: 'express',
      database: 'mongodb',
      architecture: 'microservices'
    }, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'arraybuffer'
    });

    console.log(`Received ZIP file, size: ${genRes.data.length} bytes`);
    
    if (genRes.data.length > 1000) {
      console.log('✅ Generation test PASSED: File is larger than 1KB, suggesting a valid archive.');
    } else {
      console.error('❌ Generation test FAILED: File is too small.');
    }

  } catch (err) {
    console.error('Error during test:', err.response ? err.response.data : err.message);
  }
}

testGeneration();
