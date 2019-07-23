import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import * as fs from 'fs'

export default class Watch extends Command {
  static description = 'Watch for any changes in your theme and upload them'

  // static flags = {
  //   help: flags.help({char: 'h'}),
  // }
  //
  static args = [{
    name: 'environment',
    required: true,
    description: 'Choose which environment to watch',
    default: 'default'
  }]

  async getConfig (): Promise<{url: string, theme: string, password: string, key: string}> {
    const {args, flags} = this.parse(Watch)
    return new Promise(resolve => {
      fs.readFile('./fluxconfig.json', 'utf8', (err, data) => {
        if (err) {
          return resolve(this.error(err));
        }
        const config = JSON.parse(data);
        resolve(config[args.environment]);
      });
    })
  }

  async getImage (file: string): Promise<string> {
    return new Promise(resolve => {
      fs.readFile(file, 'base64', (err, data) => {
        if (err) {
          return resolve(this.error(err));
        }
        const img = Buffer.from(data, 'base64').toString('base64');
        resolve(img);
      });
    })
  }

  async getFile (file: string): Promise<string> {
    return new Promise(resolve => {
      fs.readFile(file, 'utf8', (err, data: string) => {
        if (err) {
          return resolve(this.error(err));
        }
        resolve(data);
      });
    })
  }

  async handleChange (fileName: string): Promise<void> {
    const split: string[] = fileName.split('.');
    const format: string = split[split.length - 1];
    const config = await this.getConfig();
    const { url, key, password, theme } = config;
    if (format === 'png' || format === 'jpg' || format === 'ico') {
      const attachment = await this.getImage(fileName);
      const res = await axios.put(`${url}/admin/themes/master/${fileName}.json`, {
        key,
        password,
        attachment
      })
      if (res.data.status.includes('error')) {
        this.log(res.data.status);
      }
    } else {
      const content: string = await this.getFile(fileName);
      const res = await axios.put(`${url}/admin/themes/master/${fileName}.json`, {
        key,
        password,
        content
      })
      if (res.data.status.includes('error')) {
        this.log(res.data.status);
      }
    }
    return this.log(`updated: ${fileName}`)
  }

  async run() {
    const {args, flags} = this.parse(Watch)
    cli.action.start(`[${args.environment}] Listening for changes in current directory`)
    fs.watch('.', { recursive: true }, (eventType, fileName) => {
      this.handleChange(fileName)
      .catch((err: { response: string }) => {
        this.log(err.response)
      });
    })
  }
}
