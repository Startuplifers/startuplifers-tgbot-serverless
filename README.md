# Telegram bot for Startuplifers

Telegram bot that sends new job postings to a publicly available Telegram channel.

# Instructions

Clone the project to your system with "git clone"

Install the dependencies "npm install"

Install serverless framework "npm i serverless".

You need to have awscli installed. With debian linux use sudo apt install awscli.

If you want to create an own IAM user for the bot, you need to grant the following permissions:
- AmazonS3FullAccess
- AWSCloudFormationFullAccess
- AmazonAPIGatewayAdministrator
- IAMFullAccess
- AWSLambdaFullAccess

After configuring awscli you need to create a bucket, name it according to environment variable BUCKET_NAME jobs.json to the bucket. jobs.json must initially contain an empty array []. After the first execution this file will contain the previous state of the json file in the API.

You need to create a new Telegram bot or use an existing one. New bot can easily be created messaging BotFather in Telegram with message /newbot.

After obtaining a bot token create .env file containing:
TOKEN=your-token
BUCKET_NAME=your-bucket-name

Finally you need to create a Telegram channel and add your bot to the channel as an admin.

Start the project: npm start
Run tests: npm run test
Deploy: npm run deploy



