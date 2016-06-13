#!/bin/sh

qemu-system-x86_64 -nodefaults \
		   -name ubuntu \
		   -m 4096 \
		   -cpu host \
		   -smp 2 \
		   -machine accel=kvm \
		   -drive if=virtio,file=/images/ubuntu.qcow2 \
		   -vnc :2 \
		   -net nic,vlan=0,model=virtio \
		   -net user,vlan=0,hostfwd=tcp::22-:22 \
		   -vga qxl \
		   -global qxl-vga.vram_size=33554432
