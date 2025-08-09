import os from 'os'

export function display_os_values (){
    const userInfoVal = os.userInfo();
    const uptimeVal = os.uptime();
    const hostNameVal = os.hostname();
    const homeDirVal = os.homedir();
    const machineVal = os.machine();

    
    const otherOsInfo = {
        os_type: os.type(),
        os_release:os.release(),
        os_total_memory: os.totalmem(),
        os_free_memory: os.freemem(),
        os_cpu: os.cpus(),
        os_version: os.version()
    }

    console.log(userInfoVal);
    console.log(`Uptime: ${uptimeVal}`);
    console.log(`Hostname: ${hostNameVal}`);
    console.log(`Home Directory: ${homeDirVal}`);
    console.log(`Machine:" ${machineVal}`);
    console.log(otherOsInfo);
}

//Common JS
//module.exports = display_os_values;