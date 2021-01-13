import ENV from './../config.js'
const API_HOST = ENV.api_host

export const getEvents = (eventsList) => {
    const url = `${API_HOST}/api/events`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get events");
            }
        })
        .then(json => {
            studentList.setState({ eventsList: json.events });
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateEvents = (formComp, field) => {
    const value = field.value;
    const name = field.name;

    formComp.setState({
        [name]: value
    });
};


export const addEvents = (formComp, dashboardComp) => {
    const url = `${API_HOST}/api/events`;

    const student = formComp.state

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(student),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a student.",
                        type: "success"
                    }
                });
            } else {
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add student.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};