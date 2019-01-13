# NgRok Controlicz AutoUpdater
A simple script that allows you to use ngrok.com's free tunnels with your Controlicz.

# What is Controlicz?
Controlicz is the gateway between your Voice Assistants such as Google Home, Echo or Google Assistant on your phone and Domoticz Home Automation running on your Raspberry Pi. It's not free but costs only 2$/month to use.

This allows the safety of a local system with the comfort of controlling it via voice commands. Effectively giving voice to your Domoticz Home Automation system.

However, to use Controlicz, you need to have Domoticz installation accesible from internet which requires some level of support from ISP (frame level and/or static IP address), router configuration (port forwarding) and network level system setup (Firewall setup, SSL certificate installation). All this is necessary to safely communicate with your Domoticz over the internet.

# What is NgRok?
NgRok (ngrok.com) is a free/paid tunneling service that provides a small client application that you run on your system (Windows/Linux/Mac). Once it starts running, it opens a secure tunnel between NgRok's servers and the client PC and provides a publicly accessible HTTP/HTTPS URLs that you can share with others. Since the connection is initiated by client, it by passes most of the requirements. 

Although, ngrok is free to use, every time you connect to ngrok, in free version, a new URL is generated everytime putting us at a disadvantage. However, this limitation is waived off in their paid versions starting from 5$ / month.

# What does this app do?
It turns out that ngrok provides a nice NPM module for ngrok that you can include in your NodeJs application and use it's event based API to do some level of automation. I then contacted Nick (@madgini) of Controlicz, if he could provide a simple API for me to be able to update just the hostname and he was kind enough to comply. 

Combining this two things, I created a simple NodeJs application that will monitor the ngrok process for changes in its URL and report it to Controlicz server. 

# How to use this app?

### 1. Install Code
````
cd ~
git clone https://github.com/mayankraichura/ngrok_controlicz_autoupdater
cd ~/ngrok_controlicz_autoupdater
npm install
`````

### 2. Configure 
1. Copy `config-sample.js` to `config.js`

````
module.exports = {
    domoticz: {
        port: 8080      //Your local Domoticz port. Preferably non-HTTPS one.
    },
    controlicz : {
        update: true,
        username: "<controlicz username>",
        password: "<controlicz password>"
    },
    ngrok: {
        authtoken: "<ngrok.com authtoken>"      //Get your authtoken from here. https://dashboard.ngrok.com/auth
    }
};
````
2. Update the relevant fields in your `config.js` and hit save.
3. Test the code by running `node index.js`. The outut should be something like this.

````
TODO: Paste log from code
````

### 3. Run it at boot.
We will be using `rc.local` to run our app at the boot. To do that, open `/etc/rc.local` file for editing.

````
sudo nano /etc/rc.local
````

Right before `exit 0`, paste the below given line.

````
su pi -c 'node /home/pi/ngrok_controlicz_autoupdater/index.js < /dev/null &'
````

In case you are running a diffrent user, don't forget to replace `pi` with that username.

Press `Ctrl + X` and then `Y`

If you are editing the file for the first time, it should look something like this:
````
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi
su pi -c 'node /home/pi/ngrok_controlicz_autoupdater/index.js < /dev/null &'
exit 0
````

And we are done. To test that everything is working, reboot your Pi by calling

````
sudo reboot now
````

And then check ngrok dashboard https://dashboard.ngrok.com/status and match the URL with the one in your Controlicz's profile page.