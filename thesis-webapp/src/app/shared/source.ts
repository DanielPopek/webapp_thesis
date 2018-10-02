export const SOURCE:any[]=[
    {
      "name": "root",
      "parent": "null",
      "id":"Intent0000",
      "event":"no_event",
      "training_set":[],
      "possible_responses_set":[],
      "children": [
        {
          "name": "Buy ticket",
          "id":"Intent001",
          "event":"simple_answer",
          "training_set":["Chciałbym kupić bilet", "Czy mógłbym kupić bilet","Czy można tu kupić bilet?"],
          "possible_responses_set":["Dokąd chcesz jechać?","Jasne, już sprawdzam połączenia. Gdzie chcesz jechać?","Dokąd?"],
          "parent": "root",
          "children": [
            {
              "name": "Place specification",
              "id":"Intent003",
              "event":"search for place",
              "training_set":["Chciałbym jechać do @!@city", "@!@city","Do @!@city"],
              "possible_responses_set":["Ok szukam połączeń w bazie danych!","Zaczekaj chwilę,zaraz znajdę możliwe połączenia","Minutka szukam"],
              "parent": "Intent001",
              "children":[]
            },
            {
              "name": "Price question ",
              "id":"Intent004",
              "event":"price_querry",
              "training_set":["Ile kosztuje bilet?", "Ile będzie to kosztować","Ile za to zapłacę?"],
              "possible_responses_set":["Sprawdzam cenę.Poczekaj chwilkę.","Nie martw się - u nas zawsze są zniżki. Sparwdzam cenę","Już sprawdzam"],
              "parent": "Intent001",
              "children":[]
            }
          ]
        },
        {
          "name": "Return ticket",
          "id":"Intent002",
          "event":"simple_answer",
          "training_set":["Chciałbym zwrócić bilet", "Czy jest możliwość zwrotu biletu?","Chcę otrzymać zwrot kosztów"],
          "possible_responses_set":["Zroumiałem.Podaj proszę numer biletu.","Ok, tylko podaj nr biletu","Jeśli podasz nr biletu, to rozpatrzymy wniosek o zwrot kosztów."],
          "parent": "Top Level",
          "children":[]
        }
      ]
    }
  ];