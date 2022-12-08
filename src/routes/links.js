var ret = (io)=>
{
    const express = require('express');
    const router = express.Router();
    
    const pool = require('../database');
    const { isLoggedIn } = require('../lib/auth')
    /* Sockets */

    const actualizarComunidad = async(id) =>{
        let links = await pool.query('SELECT a.*, b.fullname  FROM links a, users b WHERE a.publico = 1 and a.user_id = b.id and a.user');
        io.sockets.emit("nuevoComunidad", links);
    }

    /* Rutas del servidor */
    router.get('/add', isLoggedIn,(req, res)=>{
        res.render('links/add');
    });
    
    router.post('/add', isLoggedIn,async (req, res, next)=>{
        const { title, url, description } = req.body;
        const user_id = req.user.id
        let publico = false;
        if(req.body.publico == "on"){
            publico = true;
            io.sockets.emit("nuevoComunidad", title, url, description );
        }
        const newLink = {
            title, 
            description,
            user_id,
            url, 
            publico
        };
        await pool.query('INSERT INTO links set ?', [newLink]);
        req.flash('success', 'Guardado correctamente.');
        res.redirect('/links/add');
        //publico == true ? actualizarComunidad(newLink.id): next;
    });
    
    router.get('/', isLoggedIn, async(req,res)=>{
        const id = req.user.id;
        const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [id] );
        
        res.render('links/list', { links })
    });
    
    router.get('/delete/:id', isLoggedIn,async(req, res)=>{
        const {id} = req.params;
        await pool.query('DELETE FROM links WHERE id = ?', [id]);
        req.flash('danger', 'Eliminado correctamente.');
        res.redirect('/links');
    });
    
    router.get('/edit/:id', isLoggedIn,async (req, res) => {
        const { id } = req.params;
        const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
        res.render('links/edit', {links: links[0]});
    });
    
    router.post('/edit/:id', isLoggedIn, async (req, res) => {
        const {id} = req.params;
        const { title, url, description} = req.body;
        let publico = false;
        if (req.body.publico == "on") {
            publico = true;
        }
        const newLink = {
            title,
            url,
            description,
            publico
        };
        await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
        req.flash('success', 'Modificado correctamente.');
        res.redirect('/links')
    });
    
    router.get('/community', isLoggedIn, async (req, res) => {
        const links = await pool.query('SELECT a.*, b.fullname FROM links a, users b WHERE a.publico = 1 and a.user_id = b.id ORDER BY a.created_at DESC');
        res.render('links/community/publico', { links })
    });
    
    return router
}    

module.exports = ret