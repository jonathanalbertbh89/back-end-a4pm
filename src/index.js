import Express from 'express';

const route = Express();

route.get('/', (Request, Response) =>{
    Response.json({mensage: "mensagem"})
});

route.listen(3333)