import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';

// Options for the load test, including thresholds and stages
// Thresholds define performance criteria that the test should meet.
export const options = {
   vus: 0, // Number of virtual users to start with
   thresholds: {
      http_req_duration: ['p(95)<500'], // 95% of requests should be under 500ms
      http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
   },
   // Stages define the ramp-up and ramp-down of virtual users to simulate different load levels over time.
   // This helps in testing the system's performance under varying loads.
   stages: [
      { target: 10, duration: "30s" }, // Ramp up to 10 users over the next 30 seconds
      { target: 100, duration: "60s" }, // Ramp up to 100 users over the next 60 seconds
      { target: 100, duration: "60s" }, // Maintain 100 users for 60 seconds
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