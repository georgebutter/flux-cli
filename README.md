flux
====

Create and manage themes for the Flux CMS.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/flux.svg)](https://npmjs.org/package/flux)
[![Downloads/week](https://img.shields.io/npm/dw/flux.svg)](https://npmjs.org/package/flux)
[![License](https://img.shields.io/npm/l/flux.svg)](https://github.com/ButsAndCats/flux-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g flux
$ flux COMMAND
running command...
$ flux (-v|--version|version)
flux/0.0.0 darwin-x64 node-v10.13.0
$ flux --help [COMMAND]
USAGE
  $ flux COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`flux config`](#flux-config)
* [`flux download`](#flux-download)
* [`flux help [COMMAND]`](#flux-help-command)
* [`flux upload [FILE]`](#flux-upload-file)
* [`flux watch [FILE]`](#flux-watch-file)

## `flux config`

Create a fluxconfig.json file in the current directory

```
USAGE
  $ flux config

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.0/src/commands/config.ts)_

## `flux download`

Downloads a theme from your site

```
USAGE
  $ flux download
```

_See code: [src/commands/download.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.0/src/commands/download.ts)_

## `flux help [COMMAND]`

display help for flux

```
USAGE
  $ flux help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `flux upload [FILE]`

describe the command here

```
USAGE
  $ flux upload [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/upload.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.0/src/commands/upload.ts)_

## `flux watch [FILE]`

Watch for any changes in your theme and upload them

```
USAGE
  $ flux watch [FILE]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/watch.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.0/src/commands/watch.ts)_
<!-- commandsstop -->
