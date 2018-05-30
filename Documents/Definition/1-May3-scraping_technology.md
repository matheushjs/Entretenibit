Web Scraping Technology
===

Technologies verified:

- BeautifulSoup (Python)

- Scrapy (Python)

BeautifulSoup
---

Source:

- https://www.crummy.com/software/BeautifulSoup/bs4/doc/

- Personal experience

Conclusions:

- Low level library for manipulating HTML documents.

- Allows for navigating the DOM from top to bottom

- Simple to understand, and predictable in terms of efficiency

- Crawling recursively would need to be implemented from scratch

- Seems sufficient for retrieving the data we want from websites

	- The data we want are sentences that can be fed to a machine learning algorithm to recognize whether it's an event or not
	
Scrapy
---

Source:

- https://scrapy.org/

- https://www.analyticsvidhya.com/blog/2017/07/web-scraping-in-python-using-scrapy/

- https://docs.scrapy.org/en/latest/

Conclusions

- Powerful library for web scraping

- Does not allow navigating over the DOM from top to bottom

- Allows element fetching with css-selectors

- Scraping recursively is already implemented and is efficient (parallel)

- Is not predictable in terms of computational resources required

- Simple to use

- Allows for implementing middleware, which is a big pros

- Doesn't seem very flexible

	- *i.e.* If Scrapy does not offer a certain functionality, it might not be easy to adapt it to do such functionality
	
	- In the worst case scenario, we can access the HTML elements as strings, feed it to beautifulSoup and do the magic there.