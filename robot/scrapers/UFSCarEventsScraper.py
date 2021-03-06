import sys
import traceback
import re
import datetime as dt

import urllib3
from bs4 import BeautifulSoup
import certifi


from Event import Event
from Occurence import Occurence
from .ScraperBase import ScraperBase

class UFSCarEventsScraper(ScraperBase):
    """Scraper for events listed under the UFSCar website."""

    def __init__(self, localPath=None):
        """If 'localPath' is given, then the scraper will use the local file
        located in the given path instead of requesting the page from the web."""

        http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())
        headers = {}
        headers["User-Agent"] = "Mozilla/5.0 (X11; Linux x86_64) \
                \AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        headers["X-Requested-With"] = "XMLHttpRequest"

        self.req = None
        self.soup = None
        self.items = [] # Will hold the scraped events

        # Try to get the page and the soup
        try:
            if not localPath:
                self.req = http.request(
                    "GET",
                    "https://www2.ufscar.br/eventos",
                    headers=headers
                )

                page = self.req.data
            else:
                with open(localPath) as fp:
                    page = fp.read()

            self.soup = BeautifulSoup(page, "lxml")
        except Exception:
            # Log the exception
            self.soup = None
            self.req = None
            traceback.print_exc(file=sys.stdout)

    def scrape(self):
        try:
            events = self.soup.select(".tabelaeventos")[0].select("tr")

            for event in events:
                item = {}
                item["link"] = event.a["href"]
                item["title"] = event.a.text
                item["date"] = event.find_all("td")[0].text
                item["eventType"] = Event.ACADEMIC
                self.items.append(item)
        except Exception:
            # Log any exception
            self.items = []
            traceback.print_exc(file=sys.stdout)

        # Process data items
        pattern = r"([0-9]{1,2}/[0-9]{1,2}/[0-9]{2,4})" # Date

        for item in self.items:
            try:
                m = re.match(pattern, item["date"])
                date = m.group(1).split("/")
                date = [int(i) for i in date]
                date = dt.date(date[2], date[1], date[0])
                item["date"] = date
            except Exception:
                # Log any exception
                item["date"] = None
                traceback.print_exc(file=sys.stdout)

        # Get Occurence objects
        occurs = []
        for item in self.items:
            ev = Event(
                title=item["title"],
                description=None,
                eventType=item["eventType"],
                cast=None,
                link=item["link"])
            oc = Occurence(
                event=ev,
                date=item["date"],
                location=None,
                pricing=None)

            occurs.append(oc)

        # Change list of dictionaries with a list of Occurence objects
        self.items = occurs

    def get_occurences(self):
        return self.items
