const express = require('express');

const {uuid} = require('uuidv4');

const app = express();

app.use(express.json());

//http://localhost:8089/projects?title=Node&owner=Caio


const projects = [];

app.get('/projects',(request,response) => {
    return response.json(projects);
});

app.post('/projects',(request,response) => {
    const {tittle, owner} = request.body;

    const id = uuid();

    const project = {
        id,
        tittle,
        owner
    };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id',(request,response) => {
    const {id} = request.params;
    const {tittle, owner} = request.body;
    const projectIndex = projects.findIndex(project => project.id === id);
    if(projectIndex < 0 ){
        return response.status(400).json({error: 'Project Not Found!'});
    }

    const project = {
        id,
        tittle,
        owner
    };

    projects[projectIndex] = project;
    return response.json(project);
});

app.delete('/projects/:id',(request,response) => {
    const {id} = request.params;
    const projectIndex = projects.findIndex(project => project.id === id);
    if(projectIndex < 0 ){
        return response.status(400).json({error: 'Project Not Found!'});
    }

    projects.slice(projectIndex, 1);

    return response.status(204).json([]);

})

app.listen(8089, () => {
    console.log('Backend Started!');
});
