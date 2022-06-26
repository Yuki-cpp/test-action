const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')





var fs = require('fs');





try {
    // github.context.actor
    const registry = core.getInput('registry');
    const token = core.getInput('token');
    const user = github.context.actor;

    const package = core.getInput('package');


    var kit = github.getOctokit(token)



    const clone_command = `git clone https://${user}:${token}@github.com/${registry}.git tmp`

    console.log(`Cloning ${registry}...`);
    shell.exec(clone_command);
    shell.cd('tmp')

    const new_branch = `${package}-${github.context.sha.substring(0, 8)}`
    console.log(`Switching to ${new_branch}...`);
    shell.exec(`git checkout -b ${new_branch}`)

    fs.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    shell.exec(`git add .`)
    shell.exec(`git push -u origin ${new_branch}`)


    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}