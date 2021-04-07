'use strictx'



$(function() {
    initPage()
        // initModal()

    // $('.include-html').load("projects/minesweeper/index.html");
    // $('.include-html').load("projects/pacman/index.html");


})

function onInit() {}

function initPage() {
    var count = 0;
    console.log('init page()')
    var projects = getProjects()

    var strHTML = projects.map(function(project) {
        count++

        return `<div class = "row" onclick="initModal('${project.id}')">

        <div class = "col-md-4 col-sm-6 portfolio-item" >
        <a class = "portfolio-link" data-toggle="modal" href="#portfolioModal" >
        <div class = "portfolio-hover"  >
        <div class = "portfolio-hover-content" >
        <i class = "fa fa-plus fa-3x" > </i> </div> </div> <img class = "img-fluid" src = "img/portfolio/01-thumbnail.jpg" alt = "" >
        </a> <div class = "portfolio-caption" >
        <h4 > ${project.name} </h4> <p class = "text-muted" > ${project.id} </p> </div> </div>
        `
    })

    $('#portfolio').html(strHTML)

}

// href="#portfolioModal${count}"

function initModal(projectId) {
    console.log(projectId);

    var project = getProjById(projectId)
    project = project[0]


    var strHTML =
        `<div class="portfolio-modal modal fade" id="portfolioModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                    <div class="rl"></div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="modal-body">
                            <!-- Project Details Go Here -->
                            <h2>${project.name}</h2>
                            <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                            <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
                            <p>${project.desc}</p>
                            <ul class="list-inline">
                                <li>Date: January 2017</li>
                                <li>Client: Threads</li>
                                <li>Category: Illustration</li>
                            </ul>
                            <button class="btn btn-primary" data-dismiss="modal" type="button" >
                <i class="fa fa-times"></i>
                Close Project</button>
                <a class="btn btn-primary project-html" href="projects/${project.name}/index.html">Open project</a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`


    $('.modals-container').html(strHTML)
    console.log('after loading');
}