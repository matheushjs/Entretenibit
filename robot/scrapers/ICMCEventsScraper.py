import certifi
import urllib3
from bs4 import BeautifulSoup
import sys, traceback
import re
import datetime as dt

from .ScraperBase import ScraperBase
from Event import Event
from Occurence import Occurence

class ICMCEventsScraper(ScraperBase):
    """Scraper for events listed under the ICMC website."""

    def __init__(self, localPath=None):
        """If 'localPath' is given, then the scraper will use the local file
        located in the given path instead of requesting the page from the web."""

        http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())
        headers = {}
        headers["User-Agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        headers["X-Requested-With"] = "XMLHttpRequest"

        self.req = None
        self.soup = None
        self.items = [] # Will hold the scraped events

        # Try to get the page and the soup
        try:
            if not localPath:
                self.req = http.request(
                    "GET",
                    "https://www.icmc.usp.br/eventos",
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
            quadros = self.soup.select(".bloco")[0].select(".quadro")

            for quadro in quadros:
                item = {}
                item["link"] = quadro.a["href"]
                item["title"] = quadro.h4.text
                item["date"] = quadro.p.text
                item["eventType"] = Event.ACADEMIC
                self.items.append(item)
        except Exception:
            # Log any exception
            self.items = []
            traceback.print_exc(file=sys.stdout)

        # Process data items
        pattern  = r"[^0-9]*" # May begin with some non-numbers
        pattern += r"([0-9]{1,2}/[0-9]{1,2}/[0-9]{2,4})" # Date

        for item in self.items:
            try:
                m = re.match(pattern, item["date"])
                date = m.group(1).split("/")
                date = [ int(i) for i in date ]
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

    def getOccurences(self):
        return self.items
