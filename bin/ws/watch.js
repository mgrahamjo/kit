const fs = require('fs'),
    spawn = require('child_process').spawn;

const DIR = 'src',
    scripts = ['js', 'scss'];

let running = 0;

function run(script) {

    running++;

    const p = spawn('npm', ['run', script], {stdio: 'inherit'});

    p.on('close', code => {

        running--;

        if (code === 1) {
            console.error(`✖ "npm run ${script}" failed.`);
        } else if (running === 0) {
            console.log(`watching ${DIR}...`);
        }

    });

}

fs.watch(DIR, {

    recursive: true

}, (e, file) => {

    const script = file.split('.').pop();

    if (scripts.includes(script)) {

        run(script);

    }

});

scripts.forEach(run);
