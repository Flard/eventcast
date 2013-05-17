module.exports = function(projectName, config) {

    return {

        adminPassword: config.adminPassword,

        toJSON: function() {
            return {
                name: projectName,
                description: config.description,
                is_public: config.is_public,

                playerUrl: '/player#' + projectName,
                controllerUrl: '/admin#' + projectName
            }
        }

    }

}