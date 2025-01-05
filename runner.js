const { exec } = require('child_process');

function runTest() {
    console.log('Running test at', new Date().toISOString());
    exec('npx playwright test', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running test: ${error.message}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
    });
}

setInterval(runTest, 30 * 60 * 1000);

runTest();
