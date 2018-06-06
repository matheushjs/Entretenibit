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
            except Exception:
                # Log exception and go to next scraper
                traceback.print_exc(file=sys.stdout)

        return occurences

    def test(self):
        """Tests all scrapers, and exit code with due error code."""

        errorCount = 0
        exceptionCount = 0

        for scrap in self.scrapers:
            try:
                success = scrap.test()
                if not success:
                    errorCount += 1
            except Exception:
                # Log exception and go to next scraper
                traceback.print_exc(file=sys.stdout)
                exceptionCount += 1

            if errorCount or exceptionCount:
                print("Errors happened. Exiting with code 1.")
                sys.exit(1)
            else:
                print("Test was a success. Exitting with code 0.")
                sys.exit(0)


if __name__ == '__main__':
    rb = Robot()
    rb.test()
    print("Gracefully ended.")
