const express  = require('express');
const knex = require('knex');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const db = require('../../connection/Connection.js')
const auth = require('../../security/auth.json')


module.exports = class Authentication{

    async Login(req, res) {
        const {
            login,
            senha
        } = req.body;

                             

        const result = await db('usuarios').where('login', login);

        if(!result.length){
            return(
                res.status(401).json({mensage: 'Usuarios não autorizado'})
            )
        }
        
        const compare = bcrypt.compare(senha, result[0].senha)
        if(!compare){
            return(
                res.status(401).json({mensage: 'not authorized'})
            )
        }    


        const token = jwt.sign(result[0].id, auth.md5);

        return(
            res.status(200).json({
                user:{
                    id: result[0].id,
                    nome: result[0].nome
                },
                jwt: token
            })
        )



    }

    async Register(req, res){
        const {
            nome,   
            login,
            senha
        } = req.body;

       

        const password = await bcrypt.hash(senha, 10)

        const date = new Date();
        
        
            const result = await db('usuarios').insert({
                nome: nome,
                login: login,
                senha: password,
                criado_em: date,
                alterado_em: date
            })

            return(
                res.status(201).json({mensage: 'user add sucess'})
            )



        
    }

}