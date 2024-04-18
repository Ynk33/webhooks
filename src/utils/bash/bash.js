import util from "util";
import { exec } from "child_process";

const execute = util.promisify(exec); 

export default async function run(command, logErrors = true) {
  console.log(`Before: ${command}`);
  command = command.replace(/(\r\n|\n|\r)/gm,""); // TODO: Dirty fix, I need to find a way to really fix this.
  console.log(`After: ${command}`);
  return;
  const { stdout, stderr } = await execute(command);
  console.log(stdout);
  if (logErrors) {
    console.warn(stderr);
  }
}

export async function runAndReturn(command, logErrors = true) {
  const { stdout, stderr } = await execute(command);
  if (logErrors) {
    console.warn(stderr);
  }

  return stdout;
}

export async function runTest(command) {
  console.log(`Before: ${command}`);
  command = command.replace(/(\r\n|\n|\r)/gm,""); // TODO: Dirty fix, I need to find a way to really fix this.
  console.log(`After: ${command}`);
}