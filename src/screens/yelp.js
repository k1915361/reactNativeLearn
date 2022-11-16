import axios from "axios";

export default axios.create ({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'ylmgXnk3svKzuSdIZOosAX561tv37cHS0-1YkWVB9bI5Xb1ihSndjyPechFXLJLUeoy3DyFhdThbYtRELlu3gYHewOf-FBwNXwiBbXE8HavzVLqB6u2zbZpRJ610Y3Yx',
        "Access-Control-Allow-Origin": "*",
    },
});

// How to unblock axios request by cors no access control allow origin
// https://namespaceit.com/blog/axios-request-has-been-blocked-by-cors-no-access-control-allow-origin-header-is-present-on-the-requested-resource#:~:text=Axios%20request%20has%20been%20blocked%20by%20cors%20no,add%20this%20header%20to%20the%20response%20from%20server.