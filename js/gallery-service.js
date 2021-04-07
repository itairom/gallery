'use strict'

console.log('Starting up');

_crateProjects()

var gProjects;

function getProjects() {
    return gProjects
}

function _crateProjects() {
    var projects = []
    if (!gProjects) {

        projects.push(_createProject('minesweeper', 'Minesweeper', 'title1', 'mine sweeper game desc...'))
        projects.push(_createProject('Pacman', 'pacman', 'title2', 'Pacman game desc...'))

    }
    gProjects = projects
}

function getProjById(projId) {
    return gProjects.filter(function(project) {
        return project.id === projId
    })

}

function _createProject(id, name, title, desc) {
    return {
        id,
        name,
        title,
        desc,
        url: `projects/${name}.index.html`,
        publishedAt: Date.now()
    }
}