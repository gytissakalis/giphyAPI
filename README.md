# Giphy image library

## Description
- [X] My system let users to use giphy image library, search their favorite gifs, upload them to giphy and
     if they are feeling lucky, can try "I am feeling lucky button" 

## Entity definition
Actually object is very big, and a lot of data comes from API requests

import_datetime: date time format
is_sticker: int
rating: string
slug: string
source: string
title: string
type: "gif" string
url: string
user: array
username: string

## API definition
All methods require api_key, which is must 

GET //api.giphy.com/v1/gifs/trending? - gets gifs trending right now

GET //api.giphy.com/v1/gifs/search?' - gets specific gifs, require api key, and what you are willing to search

GET //api.giphy.com/v1/gifs/random?' - gets random gif

POST //upload.giphy.com/v1/gifs? - requires api key, and source video url ( can be etc. youtube) + 
//api.giphy.com/v1/gifs? - requires api key and ^ method response ID, to get uploaded gif

- [X] Define specific service (konkrečios paslaugos) API methods that WEB system is going to use
- [X] Optionally define additional API methods that WEB system is going to expose
- [X] API should have at least 4 methods
    - [X] A method to return entity by ID. Should not have request body
    - [X] A method to return multiple entities (Array) by ID. This method should support at least one header value to:
        - [X] Return only entities that match pattern in one of its attributes
        - [X] Return 10 entities starting provided index
        - [ ] Return sorted entities by one of its attributes (both ascending and descending)
        - [ ] Other (should be approved by Product Owner (PO))
    - [ ] A method to remove entity by ID. Returns removed entity. Should not have request body
    - [ ] A method to update entity by ID. Accepts entity to update and returns updated entity
- [ ] Each method should have HTTP method defined
- [ ] Each method should have URI defined (use {id} as entity ID placeholder)
- [ ] Should return all 4xx errors in unified format. Define format using `joi` language
- [ ] Should return all 5xx errors in unified format. Define format using `joi` language

## UI definition
Its very easy website. It has 2 inputs, one for search, one for insert upload link. Also when you click open library, it will open
library of gifs, clicked "i am feeling lucky" will download you random gif

- [X] Define the structure of how visually the WEB system is going to look like
- [ ] Should have at least one view defined with https://wireframe.cc (or other wireframe tool):
- [X] The view should have a title
- [ ] The view should have a description of a service provided by web system
- [ ] The view should include at least 2 UI components:
    - [ ] A component to display multiple entities with all their attribute values visible. It should be posible to remove and edit selected entity.
        - [ ] Depending on chosen header of API method that returns multiple entities, it should be posible to select specific 10 entities starting index, sort entities by attribute, filter entities by attribute pattern, or other (should be approved by Product Owner (PO))
    - [ ] A component to create a new entity/edit existing entity. It should be posbile to create new entity and edit selected entity
        - [ ] Each attribute should have a dedicated editor field: text box for string or number, checkbox or radio buttons for boolean, date picker for date, etc.
