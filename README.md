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
flux/0.0.1 darwin-x64 node-v10.13.0
$ flux --help [COMMAND]
USAGE
  $ flux COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`flux config`](#flux-config)
* [`flux download ENVIRONMENT`](#flux-download-environment)
* [`flux help [COMMAND]`](#flux-help-command)
* [`flux upload ENVIRONMENT`](#flux-upload-environment)
* [`flux watch ENVIRONMENT`](#flux-watch-environment)

## `flux config`

Create a fluxconfig.json file in the current directory

```
USAGE
  $ flux config

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.1/src/commands/config.ts)_

## `flux download ENVIRONMENT`

Downloads a theme from your site

```
USAGE
  $ flux download ENVIRONMENT

ARGUMENTS
  ENVIRONMENT  [default: default] Choose which environment to watch
```

_See code: [src/commands/download.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.1/src/commands/download.ts)_

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

## `flux upload ENVIRONMENT`

Upload files

```
USAGE
  $ flux upload ENVIRONMENT

ARGUMENTS
  ENVIRONMENT  [default: default] Choose which environment to watch

OPTIONS
  -f, --file=file  File to upload
```

_See code: [src/commands/upload.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.1/src/commands/upload.ts)_

## `flux watch ENVIRONMENT`

Watch for any changes in your theme and upload them

```
USAGE
  $ flux watch ENVIRONMENT

ARGUMENTS
  ENVIRONMENT  [default: default] Choose which environment to watch
```

_See code: [src/commands/watch.ts](https://github.com/ButsAndCats/flux-cli/blob/v0.0.1/src/commands/watch.ts)_
<!-- commandsstop -->
