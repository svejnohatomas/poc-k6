import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';

// This script is a k6 load test configuration file.
// It defines the options for the load test, including thresholds and stages,
// and exports a default function that performs an HTTP POST request.
export const name = 'API Load Test'; // Name of the test for identification
export const version = '1.0.0'; // Version of the test script
export const description = 'Load test for API endpoint'; // Description of the test

// Options for the load test, including thresholds and stages
// Thresholds define performance criteria that the test should meet.
export const options = {
   vus: 10, // Number of virtual users to start with
   thresholds: {
      http_req_duration: ['p(95)<500'], // 95% of requests should be under 500ms
      http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
   },
   // Stages define the ramp-up and ramp-down of virtual users to simulate different load levels over time.
   // This helps in testing the system's performance under varying loads.
   stages: [
      { target: 10, duration: "30s" }, // Ramp up to 10 users over 30 seconds
      { target: 20, duration: "30s" }, // Ramp up to 20 users over the next 30 seconds
      { target: 20, duration: "60s" }, // Ramp up to 20 users over the next 60 seconds
      { target: 0, duration: "30s" }, // Ramp down to 0 users over the next 30 seconds
   ],
};

// This script sends a POST request to the specified URL with a JSON payload
// and custom headers. It is designed to run with k6, a load testing tool.
export default function () {
   const payload = JSON.stringify({
      name: 'lorem',
      surname: 'ipsum',
   });
   const headers = { 'Content-Type': 'application/json' };
   let response = http.post('https://quickpizza.grafana.com/api/post', payload, { headers });

   describe('Response Status', () => {
      expect(response.status, 'Status should be 200').to.equal(200); // Check if the response status is 200 OK
   });

   describe('Response Time', () => {
      expect(response.timings.duration, 'Response time should be less than 500ms').to.be.below(500); // Check if the response time is below 500ms
   });
}