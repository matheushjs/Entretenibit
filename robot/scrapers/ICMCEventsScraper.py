import urllib3
from bs4 import BeautifulSoup
import sys, traceback

from .ScraperBase import ScraperBase

class ICMCEventsScraper(ScraperBase):
    """Scraper for events listed under the ICMC website."""

    def __init__(self):
        http = urllib3.PoolManager()
        headers = {}
        headers["User-Agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        headers["X-Requested-With"] = "XMLHttpRequest"

        self.req = None
        self.soup = None

        # Try to get the page and the soup
        try:
            self.req = http.request(
                "GET",
                "https://www.icmc.usp.br/eventos",
                headers=headers
            )

            self.soup = BeautifulSoup(self.req.data)
        except:
            # Log the exception
            self.soup = None
            self.req = None
            traceback.print_exc(file=sys.stdout)
            
    def scrapeEvents(self):
        pass

    def getEvents(self):
        pass
