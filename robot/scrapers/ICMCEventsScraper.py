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

    def __init__(self):
        http = urllib3.PoolManager()
        headers = {}
        headers["User-Agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        headers["X-Requested-With"] = "XMLHttpRequest"

        self.req = None
        self.soup = None
        self.items = [] # Will hold the scraped events

        # Try to get the page and the soup
        try:
            self.req = http.request(
                "GET",
                "https://www.icmc.usp.br/eventos",
                headers=headers
            )

            self.soup = BeautifulSoup(self.req.data, "lxml")
        except:
            # Log the exception
            self.soup = None
            self.req = None
            traceback.print_exc(file=sys.stdout)
            
    def scrapeEvents(self):
        try:
            quadros = self.soup.select(".bloco")[0].select(".quadro")
            
            for quadro in quadros:
                item = {}
                item["link"] = quadro.a["href"]
                item["title"] = quadro.h4.text
                item["date"] = quadro.p.text
                item["eventType"] = Event.ACADEMIC
                self.items.append(item)
        except:
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
            except:
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


    def getEvents(self):
        return self.items

if __name__ == "__main__":
    scraper = ICMCEventsScraper()
    scraper.scrapeEvents()
    print(scraper.getEvents())