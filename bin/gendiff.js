#!/usr/bin/env node

import { Command } from "commander";
import genDifference from "../src/index.js";

const program = new Command();

program
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .description("Compares two configuration files and shows a difference.")
  .helpOption("-h, --help", "output usage information")
  .option("-f, --format <type>", "output format")
  .action((filepath1, filepath2) => {
    console.log(genDifference(filepath1, filepath2));
  });

program.parse(process.argv);
