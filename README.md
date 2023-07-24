# GenDiff
[![Maintainability](https://api.codeclimate.com/v1/badges/c3f07a125220375daee5/maintainability)](https://codeclimate.com/github/hitriylis/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c3f07a125220375daee5/test_coverage)](https://codeclimate.com/github/hitriylis/frontend-project-46/test_coverage)

## Description
"GenDiff" (difference generator) - is a program that determines the difference between two data structures.

### Utility features:
* Support for different input formats: yaml, json
* Report generation in the form of plain text, stylish and json

### Usage example:
```bash
# plain format
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
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

## Requirements
* Node.js > 18.0
* Ubuntu, Macos or WSL (for Windows)

## Install
```bash
make install
```
```bash
npm link
```

## Demonstration
### Help:
<a href="https://asciinema.org/a/597762" target="_blank"><img src="https://asciinema.org/a/597762.svg" width="500"/></a>

### Stylish format:
<a href="https://asciinema.org/a/597764" target="_blank"><img src="https://asciinema.org/a/597764.svg" width="500"/></a>

### Plain format:
<a href="https://asciinema.org/a/597765" target="_blank"><img src="https://asciinema.org/a/597765.svg" width="500"/></a>

### JSON format:
<a href="https://asciinema.org/a/597766" target="_blank"><img src="https://asciinema.org/a/597766.svg" width="500"/></a>
