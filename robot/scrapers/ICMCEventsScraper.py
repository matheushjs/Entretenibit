import urllib3
from bs4 import BeautifulSoup
import sys, traceback
import re
import datetime as dt

from .ScraperBase import ScraperBase
from Event import Event
from Occurence import Occurence

class ICMCEventsScraper(ScraperBase):
    """Scraper for events listed under the ICMC website."""

    def __init__(self, localPath=None):
        """If 'localPath' is given, then the scraper will use the local file
        located in the given path instead of requesting the page from the web."""

        http = urllib3.PoolManager()
        headers = {}
        headers["User-Agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        headers["X-Requested-With"] = "XMLHttpRequest"

        self.req = None
        self.soup = None
        self.items = [] # Will hold the scraped events

        # Try to get the page and the soup
        try:
            if not localPath:
                self.req = http.request(
                    "GET",
                    "https://www.icmc.usp.br/eventos",
                    headers=headers
                )

                page = self.req.data
            else:
                with open(localPath) as fp:
                    page = fp.read()

            self.soup = BeautifulSoup(page, "lxml")
        except Exception:
            # Log the exception
            self.soup = None
            self.req = None
            traceback.print_exc(file=sys.stdout)

    def scrape(self):
        try:
            quadros = self.soup.select(".bloco")[0].select(".quadro")

            for quadro in quadros:
                item = {}
                item["link"] = quadro.a["href"]
                item["title"] = quadro.h4.text
                item["date"] = quadro.p.text
                item["eventType"] = Event.ACADEMIC
                self.items.append(item)
        except Exception:
            # Log any exception
            self.items = []
            traceback.print_exc(file=sys.stdout)

        # Process data items
        pattern  = r"[^0-9]*" # May begin with some non-numbers
        pattern += r"([0-9]{1,2}/[0-9]{1,2}/[0-9]{2,4})" # Date

        for item in self.items:
            try:
                m = re.match(pattern, item["date"])
                date = m.group(1).split("/")
                date = [ int(i) for i in date ]
                date = dt.date(date[2], date[1], date[0])
                item["date"] = date
            except Exception:
                # Log any exception
                item["date"] = None
                traceback.print_exc(file=sys.stdout)

        # Get Occurence objects
        occurs = []
        for item in self.items:
            ev = Event(
                title=item["title"],
                description=None,
                eventType=item["eventType"],
                cast=None,
                link=item["link"])
            oc = Occurence(
                event=ev,
                date=item["date"],
                location=None,
                pricing=None)

            occurs.append(oc)

        # Change list of dictionaries with a list of Occurence objects
        self.items = occurs

    @staticmethod
    def test():
        """This will test the scraper, returning True if test was successful, and False otherwise"""

        scraper = ICMCEventsScraper("./scrapers/test_pages/ICMCEventsScraper-test.html")
        scraper.scrape()

        expected = [
             'Event Title: Caipyra,Description: None,Type: None,Cast: None,Link: http://caipyra.python.org.br/,Date: 2018-06-08,No Location,Pricing: None,',
             'Event Title: SancaThon,Description: None,Type: None,Cast: None,Link: http://www.sel.eesc.usp.br/sel/?p=5844,Date: 2018-06-08,No Location,Pricing: None,',
             'Event Title: 6th Workshop on Poisson Geometry and Related Topics,Description: None,Type: None,Cast: None,Link: http://poisson.icmc.usp.br/,Date: 2018-06-13,No Location,Pricing: None,',
             'Event Title: Olimpíada Brasileira de Robótica - etapa regional (modalidade prática),Description: None,Type: None,Cast: None,Link: https://www.icmc.usp.br/eventos/3637-olimpiada-brasileira-de-robotica-etapa-regional-modalidade-pratica,Date: 2018-06-16,No Location,Pricing: None,',
             'Event Title: V Workshop on Applied Finance,Description: None,Type: None,Cast: None,Link: http://www.cemeai.icmc.usp.br/component/jem/event/64-v-workshop-on-applied-finance,Date: 2018-06-18,No Location,Pricing: None,',
             'Event Title: 15th International Workshop on Real and Complex Singularities / School on Singularity Theory,Description: None,Type: None,Cast: None,Link: http://www.worksing.icmc.usp.br/main_site/2018/,Date: 2018-07-15,No Location,Pricing: None,',
             'Event Title: 4º Workshop CeMEAI de Soluções Matemáticas para Problemas Industriais,Description: None,Type: None,Cast: None,Link: http://www.cemeai.icmc.usp.br/component/jem/event/56-iv-workshop-de-solucoes-matematicas-para-problemas-industriais,Date: 2018-07-16,No Location,Pricing: None,',
             'Event Title: ICM 2018 Satellite Conference on Nonlinear Partial Differential Equations,Description: None,Type: None,Cast: None,Link: http://pdes-icm2018.icmc.usp.br/icm2018/,Date: 2018-07-23,No Location,Pricing: None,',
             'Event Title: Workshop for Women in Differential Equations,Description: None,Type: None,Cast: None,Link: http://eventos.ufabc.edu.br/wwde2018/,Date: 2018-07-25,No Location,Pricing: None,',
             'Event Title: 21ª Semana da Computação - Semcomp21,Description: None,Type: None,Cast: None,Link: https://semcomp.icmc.usp.br/21/,Date: 2018-08-11,No Location,Pricing: None,',
             'Event Title: 11ª Feira USP e as Profissões - Capital,Description: None,Type: None,Cast: None,Link: http://prceu.usp.br/uspprofissoes/feiras-de-profissoes/,Date: 2018-08-16,No Location,Pricing: None,',
             'Event Title: Escola Latino Americana de Matemática,Description: None,Type: None,Cast: None,Link: http://eventos.ufabc.edu.br/elam2018/,Date: 2018-08-27,No Location,Pricing: None,'
        ]

        occurences = scraper.getOccurences()
        output = [ ",".join(str(occ).split("\n")) for occ in occurences ]

        count = 0
        errors = []
        for left, right in zip(expected, output):

            if left != right:
                count += 1
                errors.append([left, right])

        if count != 0:
            print(str(type(scraper)), ": Errors occured in the following scraped items:")

            for err in errors:
                print("\nExpected: ", err[0])
                print("Got: ", err[1])

            return False

        return True

    def getOccurences(self):
        return self.items

if __name__ == "__main__":
    if ICMCEventsScraper.test():
        sys.exit(0)
    else:
        sys.exit(1)
