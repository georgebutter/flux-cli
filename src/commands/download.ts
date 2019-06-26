import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import * as fs from 'fs'

export default class Download extends Command {
  static description = 'Downloads a theme from your site'

  static args = [{
    name: 'environment',
    required: true,
    description: 'Choose which environment to watch',
    default: 'default'
  }]

  async getConfig () {
    const {args, flags} = this.parse(Download)
    return new Promise(resolve => {
      fs.readFile('./fluxconfig.json', 'utf8', (err, data) => {
        if (err) {
          return resolve(this.error(err));
        }
        console.log(data)
        const config = JSON.parse(data);
        resolve(config[args.environment]);
      });
    })
  }

  async run () {
    const config = await this.getConfig();
    const { url, key, password, theme } = config;
    cli.action.start('Getting asset list')
    const res = await axios.get(`https://${url}/admin/themes/${theme}.json`, {
      data: {
        key,
        password
      }
    })
    if (res.data.status.includes('error')) {
      return this.log(res.data.status)
    }
    cli.action.stop('Got asset list')
    cli.action.start('Creating directories')
    const directories = ['assets', 'layouts', 'snippets', 'templates'];
    for (var i = 0; i < directories.length; i++) {
      if (!fs.existsSync(directories[i])){
        fs.mkdirSync(directories[i]);
      }
    }
    cli.action.stop('Directories created')
    cli.action.start('Getting files')
    for (var i = 0; i < directories.length; i++) {
      const files = res.data.theme[directories[i]]
      for (var f = 0; f < files.length; f++) {
        this.log(files[f])
        const res = await axios.get(`https://${url}/admin/themes/${theme}/${directories[i]}/${files[f]}.json`, {
          data: {
            key,
            password
          }
        })
        if (res.data.status.includes('error')) {
          return this.log(res.data.status)
        }
        fs.writeFile(`./${directories[i]}/${files[f]}`, res.data.file, err => {
          if (err) {
            return this.log(err);
          }
        })
      }
    }
    cli.action.stop('Got files')

  }
}
