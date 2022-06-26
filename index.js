const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')











try {
    // github.context.actor
    const registry = core.getInput('registry');
    const token = core.getInput('token');
    const user = github.context.actor;

    const package = core.getInput('package');


    const clone_command = `git clone https://${user}:${token}@github.com/${registry}.git tmp`

    console.log(`Cloning ${registry}...`);
    shell.exec(clone_command);
    shell.cd('tmp')

    const new_branch = `${package}-${github.context.sha}`
    console.log(`Switching to ${new_branch}...`);
    shell.exec(`git checkout -b ${new_branch}`)


    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}