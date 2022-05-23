echo 'stopping dotnet process(s)'
killall dotnet;
echo 'destroying previous dlls'
echo '------------------------'
rm -rf obj/
rm -rf bin/
echo '------------------------'
echo 'done'
echo '------------------------'
