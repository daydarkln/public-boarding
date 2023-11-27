import { exec } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

const [, , command, name, keyword, moduleName] = process.argv;

const modulePath = join(process.cwd(), "src", "modules", name);
const componentPath = () =>
  join(
    process.cwd(),
    "src",
    "modules",
    moduleName,
    "components",
    name,
    "index.jsx"
  );

function executeHygenCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      process.exit(1);
    }
    console.log(stdout);
  });
}

if (command === "module") {
  if (existsSync(modulePath)) {
    console.error(`Error: Module "${name}" already exists.`);
    process.exit(1);
  }
  executeHygenCommand(`npx hygen module with-prompt --name ${name}`);
} else if (command === "component" && keyword === "in") {
  if (!existsSync(join(process.cwd(), "src", "modules", moduleName))) {
    console.error(`Error: Module "${moduleName}" does not exist.`);
    process.exit(1);
  }
  if (existsSync(componentPath())) {
    console.error(
      `Error: Component "${name}" already exists in module "${moduleName}".`
    );
    process.exit(1);
  }
  executeHygenCommand(
    `npx hygen component with-prompt --moduleName ${moduleName} --name ${name}`
  );
} else {
  console.error(
    "Invalid command. Usage: node generate.js [module|component] name [in moduleName]"
  );
  process.exit(1);
}
