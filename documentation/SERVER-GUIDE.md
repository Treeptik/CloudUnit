# CloudUnit server installation

You are reading the wright guide if you want to setup a CloudUnit server, in order to frequently use it. If you simply wish to test CloudUnit, you should maybe run our [Demo Vagrant box](https://github.com/Treeptik/CloudUnit/blob/master/documentation/DEMO-GUIDE.md). If you want to setup an environment to contribute to CloudUnit development, read our [Dev guide](https://github.com/Treeptik/cloudunit/blob/master/documentation/DEV-GUIDE.md).


## Requirements

* A server or a virtual machine with debian 7.8, and at least 16 Go of RAM.

## Installation from another host

In this part, we assume you can ssh into the server. It will be installed from your machine, using [Ansible](http://www.ansible.com/). Ansible will ssh into the server and run all the commands it needs.
Unless specified, all the commands are to be run on your machine, and not on the server.

### Pre-requisites
#### On your local host
* Install Ansible 1.9+ and sshpass. On Ubuntu:
```bash
$ sudo pip install markupsafe
$ sudo pip install ansible
$ sudo apt-get install sshpass
```

* Clone the repository [CU-infrastructure](https://github.com/Treeptik/CU-infrastructure):
```
git clone https://github.com/Treeptik/CU-infrastructure.git
```

#### On the server
![](https://github.com/Treeptik/CloudUnit-images/blob/master/warning2.png)
* Check that `sudo` is installed. `which sudo` should return:
```
# which sudo
/usr/bin/sudo
```
If nothing is returned by the `which` command, `sudo`is not installed. Install it:
```
# apt-get install sudo
```
* Check that `python` is installed. `which python` should return:
```
# which python
/usr/bin/python
```
If nothing is returned, `python`is not installed. Install it:
```
# apt-get install python
```
* Create a user called `admincu` and add it to the sudo group:
```
# adduser admincu
# adduser admincu sudo
```
* Create a user called `shinken` and add it to the sudo group:
```
# adduser shinken
# adduser shinken sudo
```

### CloudUnit

**On your local host**

* Change directory into `CU-infrastrucuture` and edit the `hosts` file.
In the line `CUserver ansible_ssh_host=server_ip_address`, replace `server_ip_address` by the server IP address.

* *If your server is a KVM virtual machine*, edit the file `playbooks/CU-server/installCUserver.yml`. Replace `kvm: false` by `kvm: true`.

* Launch the CloudUnit installation playbook:
```
ansible-playbook -vvv -i hosts --ask-pass --ask-sudo-pass playbooks/CU-server/installCUserver.yml
SSH password:
SUDO password[defaults to SSH password]:

PLAY [CUserveur] ***********************************************************
```
Ansible prompts you for the ssh and the sudo passwords of the `admincu` user. In cas of error, due to a network problem for example, do not hesitate to relaunch the playbook. Ansible is able not to execute again a task when the desired state is already achieved.


### Shinken

**On your local host**

Our PaaS is monitored using [Shinken](http://www.shinken-monitoring.org/). Because it contributes to the stability of our platform, we strongly recommend you to install it as well.



* Launch the Shinken installation playbook:
```
ansible-playbook -vvv -i hosts --ask-pass --ask-sudo-pass playbooks/CU-server/shinken-standalone.yml
SSH password:
SUDO password[defaults to SSH password]:

PLAY [CUserveur] ***********************************************************
```
You are prompted for the ssh and sudo passwords of the `shinken` user.

### Local DNS entry

**On your local host**

Finally, add a local DNS entry on your host: any address ending with server.cloudunit.io shoud point to the ip address of your server. Refere to the  [Local DNS section](https://github.com/Treeptik/CloudUnit/blob/master/documentation/DEMO-GUIDE.md#local-dns) to see how to achieve this on Ubuntu.
