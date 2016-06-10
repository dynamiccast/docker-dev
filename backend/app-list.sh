for app in /usr/share/applications/*.desktop ; do app="${app##/*/}"; echo "${app::-8}"; done
