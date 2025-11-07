import Generator from 'yeoman-generator';

export default class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Microfrontend name:',
        default: 'mf-example',
      },
      {
        type: 'input',
        name: 'port',
        message: 'Port to run the app:',
        default: '3001',
      },
    ]);
  }

  writing() {
    const { appName, port } = this.answers;
    const sanitizedAppName = appName.replace(/[^a-zA-Z0-9_]/g, '_');

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(appName),
      { appName: sanitizedAppName, port },
      {},
      { globOptions: { dot: true } }
    );
  }

  install() {
    const { appName } = this.answers;
    const appPath = this.destinationPath(appName);

    // Initialize git repository
    this.spawnSync('git', ['init'], { cwd: appPath });

    // Install dependencies
    this.spawnSync('pnpm', ['install'], { cwd: appPath });

    // Stage all files
    this.spawnSync('git', ['add', '.'], { cwd: appPath });

    // Make initial commit
    this.spawnSync('git', ['commit', '-m', 'chore: initial commit'], { cwd: appPath });
  }
}
