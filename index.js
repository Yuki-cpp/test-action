const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs')











try {
    // github.context.actor
    // const clone_command = `git clone https://${username}:${token}@github.com/${username}/${repo}.git`


    // `who-to-greet` input defined in action metadata file
    const nameToGreet = github.context.actor;
    console.log(`ARGHHH ${github.context.actor}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}