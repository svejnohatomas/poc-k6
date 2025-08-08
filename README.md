# Proof of Concept - k6

## Introduction

This repository demonstrates a proof of concept (PoC) for using [k6](https://k6.io/) as a load testing tool. It includes example test scripts and instructions for running performance tests against APIs or web services.

## Prerequisite

- [Node.js](https://nodejs.org/) (for script management, if applicable)
- [k6](https://k6.io/docs/getting-started/installation/) installed on your machine
- Access to the target API or web service you want to test

## Run Tests

1. Clone this repository:

   ```sh
   git clone https://github.com/svejnohatomas/poc-k6.git
   cd poc-k6
   ```

2. Run a test script with k6:

   ```sh
   k6 run script.js
   ```

   Replace `script.js` with the name of the test script you want to execute.

3. View the results in your terminal. For more advanced reporting, refer to the [k6 documentation](https://k6.io/docs/).

## Authors

- Tomas Svejnoha
  - GitHub: [svejnohatomas](https://github.com/svejnohatomas)