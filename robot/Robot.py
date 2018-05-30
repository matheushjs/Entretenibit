import sys, traceback

from scrapers import *

class Robot():
    """Main class that will provide an API for usage by common users"""

    def __init__(self):
        self.scrapers = [
                    ICMCEventsScraper(),
                ]

    def scrapeAll(self):
        occurences = []
        for scrap in self.scrapers:
            try:
                scrap.scrape()
                ret = scrap.getOccurences()
                if ret:
                    occurences.extend(ret)
            except:
                # Log exception and go to next scraper
                traceback.print_exc(file=sys.stdout)
        
        return occurences

if __name__ == '__main__':
    # Testing procedures
    rb = Robot()
    
    for i in rb.scrapeAll():
        print(i)
    
    print("Gracefully ended.")