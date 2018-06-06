from scrapers import *
from Robot import Robot

def test_robot():
    rb = Robot()
    rb.scrapeAll() # Only checks for exceptions
