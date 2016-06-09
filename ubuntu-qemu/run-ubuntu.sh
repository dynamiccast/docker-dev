#!/bin/sh

qemu-system-x86_64 -nodefaults \
		   -name ubuntu \
		   -m 4096 \
		   -cpu host \
		   -smp 2 \
		   -machine accel=kvm \
		   -drive if=virtio,file=/ubuntu.qcow2 \
		   -vnc :2 \
		   -net nic,vlan=0,model=virtio \
		   -vga qxl \
		   -global qxl-vga.vram_size=33554432
