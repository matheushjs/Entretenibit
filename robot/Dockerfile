FROM python:3.6.5

MAINTAINER "mhjsaldanha@gmail.com"

WORKDIR /robot

COPY . /robot

RUN pip3 install -r requirements.txt

# Update and install cron
RUN apt-get update && apt-get -y install -qq --force-yes cron

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/hello-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/hello-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# In case you want to test the cronjob without running everything, just use this
# The "-f" option will keep cron on the foreground
#CMD ["cron", "-f"]


# This is a slight hack to run both the command and the e-mail.
# 	The previous command was:
#		CMD ["python3", "Robot.py"]

# This was the command before integrating with cron:
#		CMD ["sh", "-c", "python3 Robot.py ; python3 send_emails.py"]

# The new command with cron is:
CMD ["sh", "-c", "python3 Robot.py ; python3 send_emails.py ; cron -f"]
