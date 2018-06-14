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

    def scrape_all(self):
        occurences = []
        for scrap in self.scrapers:
            try:
                scrap.scrape()
                ret = scrap.get_occurences()
                if ret:
                    occurences.extend(ret)
            except Exception:
                # Log exception and go to next scraper
                traceback.print_exc(file=sys.stdout)

        return occurences

if __name__ == '__main__':
    database.update_db(verbose=False)
    print("Gracefully ended.")
