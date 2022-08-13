export const profileSelectors = {
    name: 'h1', //El nombre del usuario de linkedin
    experiencesElements: '#experience ~ .pvs-list__outer-container > ul > li', //Estos li son los que contienen cada experiencia de trabajo
    contactInfo: '#top-card-text-details-contact-info', //Este abre el recuadro que dice mas informacion del usuario
    sphereExperience: '.pvs-entity__path-node',
}

export const searchSelectors = {
    paginateResultsContainer: '.reusable-search__entity-result-list > li'
}

export const educationSelectors = {
    education: '#education ~.pvs-list__outer-container > ul >li'
}