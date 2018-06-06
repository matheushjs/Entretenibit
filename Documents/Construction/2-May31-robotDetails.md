Robot Details
===

Technologies Used
---

Whether the web scraping would involve machine learning was in question for some time. The problem with this is that both approaches (with ML and without ML) are completely different in terms of technology demands.

A machine learning approach would require a recursive web scraping technology, provided by Scrapy, while a non-ML approach would have little to no use for such a recursive way of scraping.  Hence, my decision was to fully embrace a non-ML approach, and therefore choose technologies accordingly, that is:

- UrlLib3 for fetching HTML pages from the web

- BeautifulSoup4 for parsing these pages and getting due data

Scraping Workflow
---

![](/robot/1-May31-robotCommDiagram.png)

As can be seen in the diagram above, the main workflow begins with an external world entity that prompts Robot.py to start. This external world is yet to be decided; it could be periodically every day/hour or it could be through a GET HTTP request in a given port number.

After the start signal, the Robot creates an instance of each Scraper object, which are objects that inherit from ScraperBase. As a child of ScraperBase, each Scraper is supposed to implement the methods  scrape()  and  getOccurences() .

After instantiating all Scrapers, the Robot runs over the list of Scrapers, calling  scrape()  and then  getOccurences()  on each Scraper and finally appending the received Occurences into Robot’s own list of Occurences.

After getting all Occurences from all Scrapers, the Robot is supposed to send the acquired data somewhere. This is also yet to be decided, but it makes sense to me that Robot inserts the data directly into the database, instead of giving the data to a middle-man that will then do the insertions.

Python file-tree
---

- Event.py - **Object that represents an event**
- Location.py - **Object that represents a location**
- Occurence.py - **Object that represents an occurence. Has 1 Event and 1 optional Location**
- Robot.py - **Entrypoint of the scraping module**
- Robot\_test.py - **Test file for Robot.py**
- scrapers/ - **Directory holding the scrapers**
	- ICMCEventsScraper.py - **Scraper for ICMC events website**
	- MTScraper.py - **Scraper for municipal theater website**
	- ScraperBase.py - **A fake abstract class merely for having it as a guideline**
	- \_\_init\_\_.py - **Turns the directory into a python module**
	- test\_pages/ - **Files saved locally, that are used for testing the scrapers**
	- scrapers\_test.py - **Test file for scrapers**


Tests
---

- The **pytest** module is being used for testing the Robot module.

- The tests for each scraper should make a scrape using a page saved locally, and checking the scraped result with some **expected output**

- The **expected output** should be hardcoded in the python code. If it is too long, save it in a file under the **test\_pages** directory

- For every Scraper implemented, **there must be** a test method in the test class in scrapers/scrapers\_test.py!

- For running the tests:
```bash
pytest
```
or, on docker,
```bash
docker run robot pytest
```
And it will print a message saying whether it was successful or not.

