const express  = require('express');
const knex = require('knex');

const db = require('../../connection/Connection.js')

module.exports = class Categories {
    async index(req, res){
        
         const result = await db('categorias');

         return(
             res.status(200).json(result)   
         )


    }


}

