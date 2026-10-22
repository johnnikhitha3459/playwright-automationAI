const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const allure = require('allure-commandline');

const projectRoot = path.resolve(__dirname, '..');
const resultsDirectory = path.join(projectRoot, 'allure-results');

function runTests() {
  fs.rmSync(resultsDirectory, { recursive: true, force: true });

  const result = spawnSync(
    process.execPath,
    [require.resolve('@playwright/test/cli'), 'test', ...process.argv.slice(2)],
    { cwd: projectRoot, stdio: 'inherit' },
  );

  if (result.error) {
    throw result.error;
  }
  return result.status ?? 1;
}

function generateReport() {
  return new Promise((resolve, reject) => {
    const process = allure([
      'generate',
      'allure-results',
      '--clean',
      '--output',
      'allure-report',
    ]);

    process.once('error', reject);
    process.once('close', (code) => resolve(code ?? 1));
  });
}

async function main() {
  let testExitCode;
  try {
    testExitCode = runTests();
  } catch (error) {
    console.error('Could not start the Playwright test run:', error);
    testExitCode = 1;
  }

  let reportExitCode;
  try {
    reportExitCode = await generateReport();
  } catch (error) {
    console.error('Could not generate the Allure report:', error);
    reportExitCode = 1;
  }

  if (reportExitCode === 0) {
    console.log('Allure HTML report generated in allure-report/.');
  } else {
    console.error('Allure report generation failed.');
  }

  process.exitCode = testExitCode || reportExitCode;
}

main();
