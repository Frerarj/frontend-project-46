# Generate differences

*Generate differences* is a CLI utility that finds the difference between two data structures.

**Utility features:**

* Supports different input formats: YAML, JSON.
* Generates output as `plain` text, `style` and `json`.

**Output example:**

```
gendiff --format plain filepath1.yml filepath2.json

# Plain format

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# Stylish format

gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

## Tests

| Test | Description |
| --- | --- |
| [![Actions Status](https://github.com/Frerarj/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Frerarj/frontend-project-46/actions) | Hexlet tests and linter status |
| [![Maintainability](https://api.codeclimate.com/v1/badges/16fd0496e769e3baab58/maintainability)](https://codeclimate.com/github/Frerarj/frontend-project-46/maintainability) | Code Climate maintainability checks |
| [![Test Coverage](https://api.codeclimate.com/v1/badges/16fd0496e769e3baab58/test_coverage)](https://codeclimate.com/github/Frerarj/frontend-project-46/test_coverage) | Code Climate test coverage checks |
| [![Internal tests](https://github.com/Frerarj/frontend-project-46/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/Frerarj/frontend-project-46/actions/workflows/test.yml) | Checks of my tests |

## How to install

To install the *Generate differences* project, follow these steps:

1. Clone this repository to your local machine.
   ```
   git clone git@github.com:Frerarj/frontend-project-46.git
   ```
2. Navigate to the root folder of the project in your terminal or command prompt.
   ```
   cd frontend-project-46
   ```
3. Run the `make install` and `sudo npm link` commands.
   ```
   make install
   sudo npm link
   ```
4. Once the installation is complete, use `gendiff -h` command to see the utility reference.
   ```
   Usage: gendiff [options] <filepath1> <filepath2>

   Compares two configuration files and shows a difference.

   Options:
   -V, --version        output the version number
   -f, --format <type>  output format (default: "stylish")
   -h, --help           output usage information
   ```
    
## How it works

The following demonstrates how this utility compares JSON and YML files and generates the output in various formats.

| Formatting method | Demo |
| --- | --- |
| 1. `stylish` (default) | |
| 2. `plain` | |
| 3. `json` | |
