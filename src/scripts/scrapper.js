import axios from "axios";
import { educationSelectors, profileSelectors } from "../config/scrapperSelectors";
import { $, $$ } from "../utils/selectors";

import dayjs from 'dayjs'
import { waitForScroll, waitForSelector } from "../utils/waitFor";

//csrf-token: ajax:3795799114349228345 Este token me permite recibir la info de mi perfil pero se me genera cada vez que entro a linkeding, 
//*Puedo obtenerlo dinamicamente desde mis cookies 👉

async function scrap() {

    console.log('inicio del scrap');
    await waitForSelector('h1')
    await waitForScroll()

    const token = document.cookie.split(";") //obteniendo el token dinamicamente
        .find(cookie => cookie
            .includes('JSESSIONID'))
        .replace(/JSESSIONID=|"/g, '')
        .trim()


    const [contactInfoName] = $(profileSelectors.contactInfo).href.match(/in\/.+\/o/g) ?? []
    const contactInfoURL = `https://www.linkedin.com/voyager/api/identity/profiles${contactInfoName.slice(2, -2)}/profileContactInfo`

    const { data: { data } } = await axios.get(contactInfoURL, {
        headers: {
            accept: 'application/vnd.linkedin.normalized+json+2.1',
            'csrf-token': token,
        }
    })

    console.log(data)

    const name = $(profileSelectors.name).textContent


    const experiencesTitle = []

    const fecha = []

    const postEducation = async (education) => {
        const res = await fetch('https://scrap-5215e-default-rtdb.firebaseio.com/usersEducation.json', {
            method: 'POST',
            body: JSON.stringify(education)
        })
    }

    const educationElement = $$(educationSelectors.education)

    educationElement.map(element => {
        const info = $$('span[aria-hidden]', element).map((item) => item.textContent)

        postEducation(info)


    })

    const experiencesElement = $$(profileSelectors.experiencesElements)

    const sphereExperience = $$(profileSelectors.sphereExperience)


    const postProfile = async (profile) => {
        const res = await fetch('https://scrap-5215e-default-rtdb.firebaseio.com/usersJobs.json', {
            method: 'POST',
            body: JSON.stringify(profile)
        })
    }



    experiencesElement.map((element) => {
        if (!sphereExperience, element) {


            const [title, enterprise, dataStringInfo] = $$('span[aria-hidden]', element).map((item) => item.textContent)

            const [parsedRawDate] = dataStringInfo.match(/.+·|\d{4} - \d{4}/) ?? []
            const [startDate, endDate] = (parsedRawDate?.replace(/\s|·/g, '').split('-') ?? [])
                .map(rawDateElement => dayjs(rawDateElement).isValid() ? dayjs(rawDateElement).toDate() : null)

            const profile = ({
                title,
                enterprise,
                startDate,
                endDate,
            })

            console.log(profile);
            postProfile(profile)
        }

    })


    //!  este caracter ~ significa nextsibling (siguiente hermano)
}
scrap()