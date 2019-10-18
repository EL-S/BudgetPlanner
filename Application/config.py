with open('settings.conf') as file:
    settings = {line.split(":")[0].strip():":".join(line.split(":")[1:]).strip() for line in file.readlines()}
    
