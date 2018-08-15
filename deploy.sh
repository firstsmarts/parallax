ssh -p 22022 root@47.98.51.239 "rm -rf /opt/lx/dist"
echo "rm done"
scp -r -P 22022 ./dist root@47.98.51.239:/opt/lx
echo "upload done"