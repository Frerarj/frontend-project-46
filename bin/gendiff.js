#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

program
  .version("1.0.0")
  .description("Compares two configuration files and shows a difference.")
  .helpOption("-h, --help", "output usage information");

program.parse(process.argv);
