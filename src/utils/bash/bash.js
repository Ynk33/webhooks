import util from "util";
import { exec } from "child_process";

const execute = util.promisify(exec); 

export default async function run(command, logErrors = true) {
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