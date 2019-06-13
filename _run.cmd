@ECHO OFF
:: if you dragged this file to cmd (ex: ConEmu.exe) outside this folder, it will change path to here
cd /D "%~dp0"
CLS

:top
ECHO.
ECHO what you want to do?
ECHO 1. run (ssr/dev mode)
ECHO 2. run (ssr/prod mode)
ECHO 3. run (serve)
ECHO 4. test
ECHO 5. install
ECHO 6. open command line here
ECHO 7. generate documentation
ECHO 8. build the libraries
ECHO 9. deploy to firebase
ECHO 10. all (generate all apps & deploy)
ECHO.

CHOICE /C 12345678 /T 5 /D 1 /N /M "select (default: run ssr/dev)"
set task=%ERRORLEVEL%
:: Don't add any space in task=
IF %task% == 8 GOTO all
IF %task% == 8 GOTO firebase
IF %task% == 8 GOTO build
IF %task% == 7 GOTO doc
IF %task% == 6 GOTO cmd
IF %task% == 5 GOTO install
IF %task% == 4 GOTO test
IF %task% == 3 GOTO run
IF %task% == 2 GOTO run
IF %task% == 1 GOTO run
:: Note - list %task% in decreasing order

echo %task%
pause
:run
GOTO start

: as now we use the source of the libraries instead of 'dist', we don't need to build the libraries before starting the project, so we will skip this CHOICE.
: the code below - untill the end of this block- will not run

CHOICE /T 5 /D N /M "build libraries? if you didn't changes to any library, you don't need to build them"
IF ERRORLEVEL 2 GOTO start
IF ERRORLEVEL 1 GOTO build
ECHO.

:build
ECHO building libraries....
ECHO.
ECHO if you won't make changes to any library, you can close the cmd window after finishing the compiling process.
start ng build eldeeb --watch
:: start will open the command in a new cmd window, to enable --watch mode
pause

:start
if %task%==1 (
ECHO starting the server in SSR/dev mode, and listining to localhost:4200
call npm run start
) else if %task%==2 (
ECHO starting the server in SSR/prod mode, and listining to localhost:4200
call npm run start:dev
) else (
ECHO starting the server in browser mode "serve", and listining to localhost:4200
ECHO warning! routs that need to connect to the server using HttpClient will break
call npm run serve
)
GOTO End

:test
call npm run test
GOTO End

:install
ECHO installing packages....
call npm i
cd projects/eldeeb
call npm i
cd ../../
:: peerDependencies for all libraries are included in dependencies of workspace's package.json, so we don't need to manually add them here
:: also build the libraries,todo: no need for --watch here
GOTO build

:babel
ECHO running babel transpiler....
call npm run babel
GOTO End

:cmd
ECHO open cmd here..
cmd "%~p1"
GOTO End

:doc
call npm run doc
GOTO End

:firebase
call npm run deploy:firebase
GOTO End

:all
call npm run all
GOTO End

:End
pause
cls
GOTO top

:notes:
::in dev mode don't build with ssr (to watch for changes)
:: if the project uses some node modules (ex: fs), run with ssr
:Executing npm from DOS batch file terminates the script, use call or start https://github.com/npm/npm/issues/2938
