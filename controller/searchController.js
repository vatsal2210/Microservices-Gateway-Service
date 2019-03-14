const axios = require('axios');
const services = ["skiResort", "restaurants", "museums", "companies"];

const skiResortServiceURL = 'https://ypgateway.mybluemix.net:443/ski/resort/search';
const restaurantsServiceURL = '';
const museumsServiceURL = '';
const companies = '';

exports.search = async (req, res, next) => {
    try {
        const serviceName = req.body.serviceName;
        const searchParam = req.body.searchParam;

        if (serviceName == '' || serviceName == undefined) {
            res.send({
                code: 200,
                message: 'Please select service Name'
            });
        } else if (!services.includes(serviceName)) {
            res.send({
                code: 500,
                message: 'Please select valid service'
            });
        } else if (searchParam == "" || searchParam == undefined) {
            res.send({
                code: 200,
                message: 'Enter valid search name'
            });
        } else {
            // Found service name
            var url;
            if (serviceName.includes("skiResort")) {
                url = skiResortServiceURL;
            }

            if (serviceName.includes("restaurants")) {
                url = restaurantsServiceURL;
            }

            if (serviceName.includes("museums")) {
                url = museumsServiceURL;
            }

            if (serviceName.includes("fortuneCompanies")) {
                url = fortuneCompanies;
            }

            console.log('url ', url);
            axios.post(url, {
                    query: searchParam
                })
                .then(function (response) {
                    console.log('/search', response.data);
                    res.send(response.data);
                })
                .catch(function (error) {
                    console.log('/search error', error);
                    res.send(error);
                });
        }
    } catch (error) {
        logger.error("User login error ", error);
        next(error);
    }
};