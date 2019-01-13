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