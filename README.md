# Docker development container example

Here is an example of how you can leverage Docker powerfulness to quickly provide a development environment to your employers and contributors.
Docker is ofter used to ease application shipping. It can also be used to limit frictions when a new contributor jumps into your project.

Docker development containers can be used to quickly start the application in an environment suitable for development and tests. Ran in dev mode, containers will provide the following features:

- Code live reload on modification
- Node in debug mode for the backend
- Code is no uglify in frontend

This repository contains an application example called human-apps with a complex stack to illustrate how years old projects can get complex over time. Docker is used extensivelly for both production shipping and development purpose.

This application is not really useful. It uses Qemu to boot an Ubuntu virtual machine and will offer users access to the VM interface via a web page using Apache Guacamole and its vnc driver. Users will then be able to run applications by clicking icons from the web UI and interact with them in a HTML 5 canvas.

![Alt text](/screenshot.png?raw=true "Human-apps screenshot")

More information on Docker development containers can be found in the [wiki](https://github.com/dynamiccast/docker-dev/wiki).

# Run Human-apps

Human-apps needs a Qemu disk image to run the VM. You can download an image with this command :

````
wget http://olivierberthonneau.com/human-apps/ubuntu.qcow2 -O ubuntu-qemu/images/ubuntu.qcow2
````

(Please refer to the build Ubuntu section to build it from scratch).

Then just start the containers with docker-compose:

````
docker-compose build
docker-compose up -d
````

Application will be accessible at *http://localhost*

# Run in dev mode

This is the main purpose of this repo. Simply run:

````
docker-compose -f docker-compose-dev.yml build
docker-compose -f docker-compose-dev.yml up -d
````

# Build Ubuntu

You can build a compatible Ubuntu image from scratch using packer.

A compatible image is just a Linux operating system with applications .desktop in /usr/share/applications with a user `vagrant` with password `vagrant`.

Requirements:
- packer
- qemu
- about 20 minutes

Just run `build.sh` from the `ubuntu-qemu` directory:

````
./build.sh
````

The qcow2 artifact will be stored in `ubuntu-qemu\output-ubuntu1604-desktop-qemu\ubuntu1604-desktop.qcow2` and just be copied in `ubuntu-qemu\ubuntu.qcow2`.
