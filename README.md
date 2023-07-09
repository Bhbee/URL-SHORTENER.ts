# Project Description: URL Shortener(scissors)

This application, a URL Shortener project aims to achieve an efficient URL shortening service. It will allow users to convert long urls into shorter ones. 

## Key Features:

1. URL Shortening(Customizable): Users can input long URLs and generate shortened versions that are easier to share and remember. Users also have the option to customize the shortened URLs to reflect their brand or preferred keywords, making them more recognizable and memorable.

2. QR-Code Generation: The system will generate QR codes for each shortened URL, allowing users to easily share them in printed materials or mobile devices.

3. User Management: The system will provide user registration and authentication functionalities, allowing users to manage their shortened URLs and access personalized features.



## Built with:
![Typescript](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

![Ejs](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

![QR Code Generator api](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

## Get a copy
1. Clone this repo
```sh
git clone https://github.com/Unique-Red/url_shortner.git
```
2. Open the directory
```sh
cd url_shortner
```
3. Create Virtual Environment
```sh
python -m venv <your-venv-name>
```
4. Activate virtual environment on CMD or Powershell
```sh
<your-venv-name>\Scripts\activate.bat
```
On gitbash terminal
```sh
source <your-venv-name>/Scripts/activate.csh
```
5. Install project packages
```sh
pip install -r requirements.txt
```
6. Set environment variable
```sh
set FLASK_APP=app.py
```
On gitbash terminal
```sh
export FLASK_APP=run.py
```
7. Create database
```sh
flask shell
```
```sh
db.create_all()
quit()
```
8. Run program
```sh
python app.py
```
<hr>


<br/>
Live link: <a href="https://www.redr.site/">RedRoute</a>