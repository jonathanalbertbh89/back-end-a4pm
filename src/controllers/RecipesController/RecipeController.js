const express  = require('express');
const knex = require('knex');

const db = require('../../connection/Connection.js')


module.exports = class recipeController{

    async index(req, res) {
        const {id_usuarios}  = req.body;

        if(!id_usuarios){
            return(
                res.status(400).json({mensage: 'Id user not send'}) 
            )
        }

        const result = await await db.select(
            'receitas.id',
            'receitas.id_categorias',
            'receitas.nome',
            'receitas.tempo_preparo_minutos',
            'receitas.porcoes',
            'receitas.modo_preparo',
            'receitas.ingredientes'
            ).from('receitas').where('receitas.id_usuarios', id_usuarios)
            .join('categorias', 'categorias.id','=', 'receitas.id_categorias')
            .select({nomecategoria: 'categorias.nome'})
            
            
                                

        if(!result.length){
            return(
                res.status(404).json({mensage: 'Recipe not found'})
            )
        }

        return(
            res.status(200).json(result)
        )
    }

    async registerRecipe(req, res){
        const{
            id_categorias,
            id_usuarios,
            nome,
            tempo_preparo_minutos,
            porcoes,
            modo_preparo,
            ingredientes
        } = req.body;

        const date = new Date();

        const result = await db('receitas').insert({
            id_categorias :id_categorias,
            id_usuarios: id_usuarios,
            nome: nome,
            tempo_preparo_minutos: tempo_preparo_minutos,
            porcoes: porcoes,
            modo_preparo: modo_preparo,
            ingredientes: ingredientes,
            criado_em: date,
            alterado_em: date
        })

        return(
            res.status(201).json({mensage: 'Receita Criada'})
        )
    }

    async editRecipe(req, res){
        const date = new Date();

        const {
            id,
            id_categorias,
            nome,
            tempo_preparo_minutos,
            porcoes,
            modo_preparo,
            ingredientes
        } = req.body

        const result = await db('receitas').update({
                    id_categorias: id_categorias,
                    nome: nome,
                    tempo_preparo_minutos: tempo_preparo_minutos,
                    porcoes: porcoes,
                    modo_preparo: modo_preparo,
                    ingredientes: ingredientes,
                    alterado_em: date
        }).where('id', id)
            

        return(
            res.json({mensage: 'successfully changed'})
        )    
    }

}