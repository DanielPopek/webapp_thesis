# Web service enabling design and configuration of chatbots with user's intent recognition

This repository contains frontend application for the project implemented with Angular 6.0. 
The backend part can be found in repo server_thesis

## Project description 

This project concerns the design and implementation of a web service allowing to create a chatbot
conversation and to incorporate its logic within designer’s own applications. The system
supports the recognition of the user's intents from statements in Polish. It allows the designer
to set up an account, create the structure of the conversation expressed by the intents of the
speech, register their own client applications, and then, thanks to the provided REST interface,
it allows these applications to communicate with the conversation. The following services are
perceived in terms of competition: IBM Watson Assistant, Dialogflow, ManyChat and
Chatfuel. The system was implemented, among others using Spring Boot (backend application),
MySQL as a database technology and Angular (frontend application for conversation
designers). The system design was based on business analysis. Functional, non-functional
requirements, business rules and design assumptions were included. Then a conceptual model,
a model of use cases and prototypes of their interfaces were created. A database design and
architecture project were carried out as well. To classify users’ input the Naive Bayes classifier
and a combined lemmatization and stemming strategy in text pre-processing were used. As part
of the project, the effects of implementation and the results of unit, integration and usability tests
were also presented. The advantages of the system are: a suport for Polish language, an intuitive
interface, a suport for event handling by client applications, the ability of attaching data through
the context of speech, and broad possibilities of bot logic integration.
