# Docker development container example

Here is an example of how you can leverage Docker powerfulness to quickly provide a development environment to your employers and contributors.
Docker is ofter used to ease application shipping. It can also be used to limit frictions when a new contributor jumps into your project.

This repository contains an application example called human-apps with a complex stack to illustrate how years old projects can get complex over time. Docker is used extensivelly for both production shipping and development purpose.

This application is not really useful. It uses Qemu to boot an Ubuntu virtual machine and will offer users access to the VM interface via a web page using Apache Guacamole and its vnc driver. Users will then be able to run applications by clicking icons from the web UI and interact with them in a HTML 5 canvas.

# Build Ubuntu

You can build a compatible Ubuntu image from scratch using packer.

Requirements:
- packer
- qemu
- about 20 minutes

Just run `build.sh` from the `VM` directory:

````
./build.sh
````
