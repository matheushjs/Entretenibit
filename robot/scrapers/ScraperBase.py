class ScraperBase():
    """Abstract Parent class for all scrapers. Every scraper should reimplement the methods here"""
    
    def __init__(self):
        pass

    def scrapeEvents(self):
        raise NotImplementedError

    def getEvents(self):
        raise NotImplementedError
