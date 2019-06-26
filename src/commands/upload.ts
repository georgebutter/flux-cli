import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

export default class Upload extends Command {
  static description = 'Upload files'

  // static flags = {
  //   help: flags.help({char: 'h'}),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({char: 'n', description: 'name to print'}),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({char: 'f'}),
  // }

  static args = [{
    name: 'environment',
    required: true,
    description: 'Choose which environment to watch',
    default: 'default'
  }]

  async getConfig () {
    const {args, flags} = this.parse(Upload)
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

  async getFile (file) {
    return new Promise(resolve => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          return resolve(this.error(err));
        }
        resolve(data);
      });
    })
  }

  async upload (fileName) {
    const content = await this.getFile(fileName);
    const config = await this.getConfig();
    const { url, key, password, theme } = config;
    const res = await axios.put(`${url}/admin/themes/master/${fileName}.json`, {
      key,
      password,
      content
    })
    if (res.data.status.includes('error')) {
      this.log(res.data.status);
    }
    return this.log(`updated: ${fileName}`)
  }

  async walk (dir, done) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.readdir(dir, function(err, list) {
        if (err) {
          reject(err);
        }
        let pending = list.length;
        if (!pending) {
          resolve(results);
        }
        list.forEach(function(file) {
          results.push(file);
          if (!--pending) {
            resolve(results);
          }
        });
      });
    });
  }

  async getTree()  {
    const directories = ['assets', 'layouts', 'templates', 'snippets'];
    const tree = cli.tree();
    for (let i = 0; i < directories.length; i++) {
      const dir = directories[i];
      const results = await this.walk(dir);
      const subtree = cli.tree();
      for (var j = 0; j < results.length; j++) {
        subtree.insert(results[j])
      }
      tree.insert(dir, subtree)
    }
    return new Promise(resolve => {
      resolve(tree);
    })
  }

  async getFiles()  {
    const directories = ['assets', 'layouts', 'templates', 'snippets'];
    const tree = {};
    for (let i = 0; i < directories.length; i++) {
      const dir = directories[i];
      const results = await this.walk(dir);
      const subtree = [];
      for (var j = 0; j < results.length; j++) {
        subtree.push(results[j])
      }
      tree[dir] = subtree;
    }
    return new Promise(resolve => {
      resolve(tree);
    })
  }

  async run() {
    // const {args, flags} = this.parse(Upload)
    cli.action.start('Finding files in current directory');
    const tree = await this.getTree();
    tree.display();
    const files = await this.getFiles();
    for (var i = 0; i < files.assets.length; i++) {
      this.upload(`assets/${files.assets[i]}`);
    }
    for (var i = 0; i < files.layouts.length; i++) {
      this.upload(`layouts/${files.layouts[i]}`);
    }
    for (var i = 0; i < files.templates.length; i++) {
      this.upload(`templates/${files.templates[i]}`);
    }
    for (var i = 0; i < files.snippets.length; i++) {
      this.upload(`snippets/${files.snippets[i]}`);
    }
  }
}
