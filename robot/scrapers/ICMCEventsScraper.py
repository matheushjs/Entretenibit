import urllib3
from bs4 import BeautifulSoup
import sys, traceback

from .ScraperBase import ScraperBase
from Event import Event

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
                link = quadro.a["href"]
                title = quadro.h4.text
                date = quadro.p.text
                eventType = Event.ACADEMIC
                self.items.append([link, title, date, eventType])
        except:
            # Log any exception
            self.items = []
            traceback.print_exc(file=sys.stdout)

    def getEvents(self):
        return self.items

if __name__ == "__main__":
    scraper = ICMCEventsScraper()
    scraper.scrapeEvents()
    print(scraper.getEvents)