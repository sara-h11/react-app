const dbPath = 'db.json'
const fs = require('fs');


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const baseSchema = {
  "swagger": "2.0",
  "info": {
    "description": "Json Server - Schema by pashaie@gmail.com",
    "version": "0.1",
    "title": "Fake Json Server"
  },
  tags: ["AUTH"],
  paths: {},
  definitions: {}
}


const gen_GetAll = (tag, model) => ({
  "tags": [tag],
  "produces": ["application/json"],
  "parameters": [
    {
      "name": "q",
      "in": "query",
      "description": "Full-text search",
      "required": false,
      "type": "string"
    }, {
      "name": "_order",
      "in": "query",
      "description": "Sort direction: desc|asc",
      "required": false,
      "type": "string"
    }, {
      "name": "_sort",
      "in": "query",
      "description": "Sort field",
      "required": false,
      "type": "string"
    }, {
      "name": "_page",
      "in": "query",
      "required": false,
      "type": "string"
    }, {
      "name": "_limit",
      "in": "query",
      "required": false,
      "type": "string"
    }],
  "responses": {
    "200": {
      "description": "Definition generated from Swagger Inspector",
      "schema": {
        "$ref": "#/definitions/" + model
      }
    }
  },
})

const gen_Post = (tag, model, retModel) => ({
  "tags": [ tag ],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "parameters": [{
    "in": "body",
    "name": "body",
    "required": false,
    "schema": {
      "$ref": "#/definitions/" + model
    },

  }],
  "responses": {
    "201": {
      "description": "Definition generated from Swagger Inspector",
      "schema": {
        "$ref": "#/definitions/" + retModel
      }
    }
  }
})

const gen_Get = (tag, model) => ({
  "tags": [ tag ] ,
  "produces": ["application/json"],
  "parameters": [{
    "name": "id",
    "in": "path",
    "description": "The ID to retrieve",
    "required": true,
    "type": "integer"
  }],
  "responses": {
    "200": {
      "description": "Found",
      "schema": {
        "$ref": "#/definitions/" + model
      }
    },
    "404": {
      "description": "Not Found"
    }
  }
})

const gen_Put = (tag, model) => ({
  "tags": [tag],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "parameters": [{
    "name": "id",
    "in": "path",
    "description": "The ID of the post to retrieve",
    "required": true,
    "type": "integer"
  }, {
    "in": "body",
    "name": "body",
    "required": false,
    "schema": {
      "$ref": "#/definitions/" + model
    }
  }],
  "responses": {
    "200": {
      "description": "Definition generated from Swagger Inspector",
      "schema": {
        "$ref": "#/definitions/" + model
      }
    }
  }
})

const gen_Delete = (tag) => ({
  "tags": [tag],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "parameters": [{
    "name": "id",
    "in": "path",
    "description": "The ID to delete",
    "required": true,
    "type": "integer"
  }],
  "responses": {
    "200": {
      "description": "Deleted"
    }
  }
})

const gen_Patch = (tag, model) => ({
  "tags": [tag],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "parameters": [{
    "name": "id",
    "in": "path",
    "description": "The ID to patch",
    "required": true,
    "type": "integer"
  }, {
    "in": "body",
    "name": "body",
    "required": false,
    "schema": {
      "$ref": "#/definitions/" + model
    }
  }],
  "responses": {
    "200": {
      "description": "Definition generated from Swagger Inspector",
      "schema": {
        "$ref": "#/definitions/" + model
      }
    }
  }
})

const gen_Model = (sample) => {
  function getType(val){
    const type = typeof(val);
    if(type === 'number'){
      return {
        "type": "integer",
        "format": "int32"
      }
    }
    return {
      type,
    }
  }
  const result = {
    properties: {}
  }

  for(let key in sample){
    result.properties[key] = getType( sample[key] )
  }

  return result;
}

const gen_Endpoint = (name, first, baseSchema) => {
  const tagName = capitalizeFirstLetter(name);
  const modelName = `${tagName}Model`;
  const modelListName = `${tagName}ModelList`;
  const createModelName = `${tagName}CreateModel`;

  baseSchema.tags = [
    ...baseSchema.tags,
    tagName
  ]
  baseSchema.paths = {
    ...baseSchema.paths,
    [`/${name}`] : {
      "get": gen_GetAll(tagName, modelListName),
      "post": gen_Post(tagName, createModelName, modelName)
    },
    [`/${name}/{id}`]: {
      "get": gen_Get(tagName, modelName),
      "put": gen_Put(tagName, modelName),
      "delete": gen_Delete(tagName),
      "patch": gen_Patch(tagName, createModelName)
    }
  }

  const modelDef = gen_Model(first)
  const modelCreatDef = {properties: {...modelDef.properties} }
  delete modelCreatDef.properties.id

  baseSchema.definitions = {
    ...baseSchema.definitions,
    [modelName]: modelDef,
    [createModelName]: modelCreatDef,
    [modelListName]: {
      "type": "array",
      "items": {
        "$ref": "#/definitions/" + modelName
      }
    }
  }

  return baseSchema;
};

module.exports.gen_Endpoint = gen_Endpoint;
module.exports.baseSchema = baseSchema;

function genSchema(){
  let db =  JSON.parse(fs.readFileSync(dbPath));
  let result = baseSchema;
  for(let endPoint in db){
    result = gen_Endpoint(endPoint, db[endPoint][0], result)
  }

}


// genSchema()