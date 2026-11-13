import pty, os, select, sys, time

master, slave = pty.openpty()
pid = os.fork()

if pid == 0:
    os.close(master)
    os.setsid()
    os.dup2(slave, 0)
    os.dup2(slave, 1)
    os.dup2(slave, 2)
    os.close(slave)
    os.execlp('/home/kamalesh/.local/bin/gh', 'gh', 'auth', 'login', '--hostname', 'github.com', '--git-protocol', 'https', '--web')
else:
    os.close(slave)
    output = b''
    answered_git = False
    
    while True:
        r, _, _ = select.select([master], [], [], 0.5)
        if r:
            try:
                data = os.read(master, 1024)
                if not data:
                    break
                output += data
                sys.stdout.buffer.write(data)
                sys.stdout.buffer.flush()
                
                if b'Authenticate Git with your GitHub credentials?' in output and not answered_git:
                    os.write(master, b'Y\n')
                    answered_git = True
                
                if b'Press Enter to open' in output:
                    os.write(master, b'\n')
            except OSError:
                break
