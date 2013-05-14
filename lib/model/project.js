module.exports = function(projectName, config) {

    return {

        name: projectName,
        description: config.description,
        is_public: config.is_public,

        playerUrl: '/player#' + projectName,
        controllerUrl: '/admin#' + projectName

    }

}