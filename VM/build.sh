#!/bin/sh

env PACKER_LOG=1 packer build -only=ubuntu1604-desktop-qemu -var-file=ubuntu1604-desktop.json ubuntu.json
