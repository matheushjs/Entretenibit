from scrapers import *

def test_ICMCEventsScraper():
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

    occurences = scraper.get_occurences()
    output = [ ",".join(str(occ).split("\n")) for occ in occurences ]

    for left, right in zip(expected, output):
        assert left == right


def test_UFSCarEventsScraper():
    scraper = UFSCarEventsScraper("./scrapers/test_pages/UFSCarEventsScraper-test.html")
    scraper.scrape()

    expected = [
        'Event Title: Debate - Nós Diversos - Pessoas LGBT com deficiência,Description: None,Type: None,Cast: None,Link: https://www2.ufscar.br/evento?codigo=2227,Date: 2018-06-13,No Location,Pricing: None,',
        'Event Title: XIV Seminário Internacional Lahmiei e ABACare,Description: None,Type: None,Cast: None,Link: https://www2.ufscar.br/evento?codigo=2221,Date: 2018-06-30,No Location,Pricing: None,',
        'Event Title: International Workshop on Partial Differential Equations and Complex Analysis,Description: None,Type: None,Cast: None,Link: https://www2.ufscar.br/evento?codigo=2224,Date: 2018-08-13,No Location,Pricing: None,',
        'Event Title: V Colóquio Internacional de Análise do Discurso (V CIAD),Description: None,Type: None,Cast: None,Link: https://www2.ufscar.br/evento?codigo=2226,Date: 2018-09-12,No Location,Pricing: None,',
        'Event Title: 13th International Meeting on High Performance Computing for Computational Science (VECPAR),Description: None,Type: None,Cast: None,Link: https://www2.ufscar.br/evento?codigo=2209,Date: 2018-09-17,No Location,Pricing: None,',
        'Event Title: 1st Brazilian Symposium on Sustainable Chemistry (BSSC),Description: None,Type: None,Cast: None,Link: https://www2.ufscar.br/evento?codigo=2144,Date: 2018-10-01,No Location,Pricing: None,'
    ]

    occurences = scraper.get_occurences()
    output = [ ",".join(str(occ).split("\n")) for occ in occurences ]

    for left, right in zip(expected, output):
        assert left == right
