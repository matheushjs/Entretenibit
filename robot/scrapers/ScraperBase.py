class ScraperBase():
    """Abstract Parent class for all scrapers. Every scraper should reimplement the methods here"""

    def __init__(self):
        pass

    def scrape(self):
        raise NotImplementedError

    def get_occurences(self):
        raise NotImplementedError
