import sys
import traceback

from scrapers import *
import database

class Robot():
    """Main class that will provide an API for usage by common users"""

    def __init__(self):
        self.scrapers = [
                    ICMCEventsScraper(),
                    UFSCarEventsScraper(),
                ]

    def scrapeAll(self):
        occurences = []
        for scrap in self.scrapers:
            try:
                scrap.scrape()
                ret = scrap.getOccurences()
                if ret:
                    occurences.extend(ret)
            except Exception:
                # Log exception and go to next scraper
                traceback.print_exc(file=sys.stdout)

        return occurences

if __name__ == '__main__':
    database.updateDB(verbose=False)
    print("Gracefully ended.")
