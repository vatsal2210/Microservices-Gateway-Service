const axios = require('axios');
const services = ["skiResort", "restaurants", "museums", "companies"];

const skiResortServiceURL = 'https://ypgateway.mybluemix.net:443/ski/resort/search';
const restaurantsServiceURL = '';
const museumsServiceURL = '';
const companies = '';

exports.search = (req, res, next) => {
    console.log('search ', req.body);
    try {
        const serviceName = req.body.serviceName;
        const query = req.body.searchParam;
        var searchData = '';

        if (serviceName == '' || serviceName == undefined) {
            console.log('Service Name is invalid');
            res.send({
                code: 200,
                message: 'Please select service Name'
            });

            // } else if (!services.includes(serviceName)) {
            //     res.send({
            //         code: 500,
            //         message: 'Please select valid service'
            //     });
        } else if (query == "" || query == undefined) {
            console.log('Search Params are invalid');
            res.send({
                code: 200,
                message: 'Enter valid search params'
            });
        } else {
            // Found service name
            var url;
            if (serviceName.includes("skiResort")) {
                console.log('In skiResort');

                const price = req.body.price;
                const resortname = req.body.resortname;
                const country = req.body.country;

                url = skiResortServiceURL;
                //searchData = `${query}?price=${price}&resortname=${resortname}&country=${country}`;
                searchData = query;
            }

            if (serviceName.includes("restaurants")) {
                console.log('In restaurants');
                url = restaurantsServiceURL;
            }

            if (serviceName.includes("museums")) {
                console.log('In museums');
                url = museumsServiceURL;
            }

            if (serviceName.includes("fortuneCompanies")) {
                console.log('In fortuneCompanies');
                url = fortuneCompanies;
            }

            console.log('url ', url);
            axios.post(url, {
                    query: searchData
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
        console.log("User login error ", error);
        next(error);
    }
};