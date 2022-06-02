echo 'stopping dotnet and node process(s)'
killall dotnet;
killall node;
echo 'destroying previous dlls'
echo '------------------------'
rm -rf obj/
rm -rf bin/
echo '------------------------'
echo 'done'
echo '------------------------'
