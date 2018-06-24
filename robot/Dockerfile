FROM python:3.6.5

MAINTAINER "mhjsaldanha@gmail.com"

WORKDIR /robot

COPY . /robot

RUN pip3 install -r requirements.txt

# This is a slight hack to run both the command and the e-mail.
# 	The previous command was:
#		CMD ["python3", "Robot.py"]
CMD ["sh", "-c", "python3 Robot.py ; python3 send_emails.py"]
