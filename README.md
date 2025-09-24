# ReadMe.MD

🏷️ Student Information API

    A robust and scalable RESTful API for student record management.

🗺️ API Endpoints

| Method | Endpoint             | Description                         | Requires Auth | Request Body                     |
| ------ | -------------------- | ----------------------------------- | ------------- | -------------------------------- |
| POST   | /api/v1/authenticate | Generates a Token for a valid user. | ⛔            | {"username": "", "password": ""} |
| GET    | /api/v1/students/:id | Retrieves a single student by ID.   | ✅            | None                             |
|        |                      |                                     |               |                                  |

💁 Make a request
    + Credential on this API needs to request. Ping me via email or send a pull request.

🚀 Getting Started

Prerequisites:

* Node.js:  V18.x or higher
* Framework: Express.js
* Package Manager: npm
* Database: AWS RDS (MySQL)
* Compute: AWS EC2
* Server: Nginx with pm2
* Local Tools: MySQL Workbench

Installation

1. Clone repository

    git clone <reposity_url>

2. Install package manager

    install npm


⚙️ Configuration

        Environment Variables

        1. Create a .env file in the root directory.
        2. Add the following 

            | Variable Name  | Description                                  |
            | -------------- | -------------------------------------------- |
            | DATABASE_NAME  | Name of your database from your rds instance |
            | DATABASE_HOST  | Your AWS rds url                             |
            | DATABASE_UNAME | Database username                            |
            | DATABASE_PWORD | Database password                            |
            | DATABASE_PORT  | Rds port usually 3306 for MySQL              |
            | ENCRYPTION_KEY | 256 Bit Key                                  |
            | ENCRYPTION_IV  | 16 Bit key                                   |
            | ALGORITHM      | encryption algorithm                         |
            | API_PORT       | Port that the API will be listening          |

        Github Environment

        For secured production deployment, .env file should not be added in your repository. For the application to read your secrets you need to setup the variables above in your repository. 

    🗄️ AWS RDS Configuration

        1. Create an account to AWS and avail their 6 months worth of credits.

        2. Set-up your own MySQL database (follow the instruction on aws documentation on provisioning rds). Note: Don't forget your credential.

        3. Once provisioned, set-up an inbound rule to your RDS that will allow port 80 and accept any IP (0.0.0.0/0) or specific IP(your device IP).

        4. Connect to your instance using MySQL Workbench.

        5. Once connected, create your database and desired tables.

    🗄️ AWS EC2 Configuration

        1. Provisioned an EC2 instance (Debian Image) and connect your RDS instance to this EC2 instance.
        2. Verify if MySQL/Aurora port 3306 is created in inbound rule to your security group, otherwise, create the inbound rule.
        3. Access the EC2 instance using SSH.
        4. Once connected, get the latest update:
        
            sudo apt-get update

        5. Install nginx, pm2 and cfw

            sudo apt insall nginx
            sudo apt intall cfw

        6. Create a .conf file for proxy inside the site-available directory

        location / {
            proxy_pass http://localhost:3000; # Pass requests to a backend server
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        7. Link the created .conf file to site-enabled directory
        
            ln -s <target_path> <link_path>

            e.g. ln -s /home/user/documents/report.txt /home/user/shortcuts/my_report.txt

        8. Enable firewall

            sudo ufw allow 'Nginx Full'

        9. Test the nginx

            sudo nginx -t
    
        10. start the app

            sudo pm2 start <path to your index file or app file> --name <Any Name> --watch

Production Deployment

    This repo contained a complete Pipeline enough to deploy the API. Look at the deployment_cicd_pipeline.yaml file.

👤 Author & License

    Author: Jomar Mirabeles / 
    Github: https://github.com/Jey-Emm/
    License: This project is licensed under the MIT License - see the LICENSE.md file for details.