import util from "util";
import { exec } from "child_process";

const execute = util.promisify(exec); 

export default async function run(command, logErrors = true) {
  command = command.replace(/(\r\n|\n|\r)/gm,""); // TODO: Dirty fix, I need to find a way to really fix this.
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

  const result = stdout.replace(/(\r\n|\n|\r)/gm,""); // Removes the trailing break line that echo always adds.
  return result;
}