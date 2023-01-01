# Working with the sources

The project is 
- Assembled by [NPM](https://www.npmjs.com/) 
- Bundled by [Webpack](https://webpack.js.org/) 
- Coded with [TypeScript](https://www.typescriptlang.org/)
- Templated with [Pug](https://pugjs.org/)
- Styled with [SASS](https://sass-lang.com/)

To build, test and deploy the site you gonna need [`npm` installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your system.
Then to configure the dependencies and prepare development environment, execute
```
npm install
```

From now on, use one of the commands from under the `package.json` "scripts" section to do stuff. To see the full list of scripts run
```
npm run
```

## Important scripts

`npm start` - starts a dev HTTP server and incrementally recompiles the project as you change the sources (read the console output for details). Simply go to http://localhost:3000/ once the dev server is running.

`npm run build` or  
`npm run build:dev` - assembles the dev website and outputs the files to `./dist`

`npm run build:release` - same as above but outputs production ready files.

`npm run deploy` - Deploys the production files to the AWS S3. Read the section below.

# Deployment

We host the website files statically on AWS S3 service.

To automate the deployment process, the project has a simple command
```
npm run deploy
```

In order to work, the command needs [AWS Command Line Interface](https://aws.amazon.com/cli/) to be installed and configured on the system. Here's what you need to do:

### 1. Install `awscli`  

For Windows - https://awscli.amazonaws.com/AWSCLIV2.msi  
For Debian based Linux execute the command:
```
sudo apt install awscli
```

### 2. Configure `aws` profile

Here's [the doc](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) describing the AWS configuration file and format. But the configuration can be done using the `aws` command line tool.

We use `crashinvaders` profile in the `deploy` command. To setup a new profile, execute the command:
```
aws configure --profile crashinvaders
```

It will ask you to enter your AWS personal access key ID and the secret key (ask Anton for those). Here's the full set of data required and what you should put in there:
```
AWS Access Key ID: ***
AWS Secret Access Key: ***
Default region name [None]: eu-central-1
Default output format [None]: text
```

Once it's done, you're good to go with the `deploy` NPM command.
