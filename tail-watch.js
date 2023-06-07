const { spawn } = require("child_process");

if (process.argv.length !== 3) {
  console.error("Usage: node tail-watch {dirname}");
  process.exit(1);
}

const dirname = process.argv[2];
const command = `npm run tailwind -- ./${dirname}/styles.pcss -o ./${dirname}/styles.css`;

const tailwindProcess = spawn(command, {
  shell: true,
});

tailwindProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

tailwindProcess.stderr.on("data", (data) => {
  console.error(data.toString());
});

tailwindProcess.on("exit", (code) => {
  console.log(`✅ Tailwind compilation exited with code ${code}`);
});
