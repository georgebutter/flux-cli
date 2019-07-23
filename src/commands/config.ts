import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import * as inquirer from 'inquirer'
import * as fs from 'fs';

export default class Config extends Command {
  static description = 'Create a fluxconfig.json file in the current directory'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Config)
    const url = await cli.prompt('What is the url of your site?');
    const key = await cli.prompt('What is your API key?');
    const password = await cli.prompt('What is your API password?');
    cli.action.start('Getting themes')
    const res = await axios.get(`https://${url}/admin/themes.json`, {
      data: {
        key,
        password
      }
    })

    if (res.data.status.indexOf('error') > -1) {
      return cli.action.stop('Unable to connect to store, check your credentials and try again.')
    }
    cli.action.stop('Found themes')
    let responses: any = await inquirer.prompt([{
      name: 'theme',
      message: 'Select a theme',
      type: 'list',
      choices: res.data.themes,
    }]);
    fs.writeFile('fluxconfig.json',
`{
  "url": "${url}",
  "key": "${key}",
  "password": "${password}",
  "theme": "${responses.theme}"
}`,
      err => {
        if (err) {
          throw this.log(`Could not write fluxconfig.json`)
        } else {
          return this.log('Created fluxconfig.json')
        }
      }
    )
  }
}
