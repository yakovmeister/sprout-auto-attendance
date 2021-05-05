# Sprout Automatic Attendance  
  
Lets you automatically login and logout to sprout and notifies you every time.  
  

## Prerequisite  
  
* AWS Account  
  
## Feature  
  
* Slack notification on error and on success
* Set your own login time and logout time
* Logs you in and out based on the specified login time and logout time  
  
## Setup  
  
### Step 1. Clone the repository  
  
Open your terminal and type the following command
```bash
git clone https://github.com/yakovmeister/sprout-auto-attendance.git
```
  
---
  
### Step 2. Create a slack app (optional, only if you want to enable slack notification)  
  
Go to [`https://api.slack.com/apps`](https://api.slack.com/apps) and create your app.
  
Once you are done creating your app, go to `Features -> Incoming Webhooks` and activate Incoming Webhooks.

Be sure to copy the Webhook URL, we will need that later.  
  
---
  
### Step 3. Create a `.env` file
  
If you are not yet in the project directory you have to open your terminal and change your directory
```bash
cd sprout-auto-attendance
```
and create a `.env` file from there.
You can use this example as reference:
```ini
SPROUT_CLOCK_URL=https://XXXXXXXX.hrhub.ph/WebBundy/ClockIn
SPROUT_CLOCK_USERNAME=XXXXXXXX
SPROUT_CLOCK_PASSWORD=XXXXXXXX
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXXXX/XXXXXXX/XXXXXXXXXXXXX
```
if you want to enable slack notification feature, be sure to change the `SLACK_WEBHOOK_URL` with the one you copied earlier, and add another line in the `.env` file for `SLACK_NOTIFICATION=yes`, once it's added, it should look like this:
  
```ini
SPROUT_CLOCK_URL=https://XXXXXXXX.hrhub.ph/WebBundy/ClockIn
SPROUT_CLOCK_USERNAME=XXXXXXXX
SPROUT_CLOCK_PASSWORD=XXXXXXXX
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXXXX/XXXXXXX/XXXXXXXXXXXXX
SLACK_NOTIFICATION=yes
```
Otherwise, if you want to disable it, you can leave it as is, without changing `SLACK_WEBHOOK_URL` and updating only the `SPROUT_CLOCK_URL`, `SPROUT_CLOCK_USERNAME` and `SPROUT_CLOCK_PASSWORD`.
  
---
  
### Step 4. Setting the time  
  
Inside the `sprout-auto-attendance`, locate `src/libs/timings.ts` and open it with any text editor.  
  
Update the variables to your desired schedule.  
  
Note that the scheduling is in `cron` format, you can visit the [`schedule expression page`](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html) to learn more.  
  
Also note that, the timezone that you have to input in the `src/libs/timings.ts` should be in GMT, otherwise it won't run in the expected time. Refer to [`this`](http://www.timebie.com/tz/timediff.php?q1=Greenwich%20Mean%20Time&q2=GMT%20+8%20Time) table for converting the timezones.  
  
#### Default time used:  
  
Clock In: 7:00 AM (2300 GMT)  
Clock Out: 5:00 PM (0900 GMT)  
  
---
  
### Step 5. Installation of the dependencies  
  
Once again open your terminal and type the following command
```bash
npm install
```  
  
That should install the required dependencies  
  
### Step 6. Deploying  
  
Assuming that you are already logged in to your AWS account via aws-cli, you can now then run the following command in your terminal.  
  
```
npm run deploy
```
   
That should wrap it all up.

---

## License  
  
sprout-auto-attendance is [MIT Licensed](https://github.com/yakovmeister/sprout-auto-attendance/blob/master/LICENSE).