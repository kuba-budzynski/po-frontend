// Provide system variables for an app in a single object

const SETTINGS = {
    apiRoot: process.env.API_ROOT || "http://localhost:7000",
}

export default SETTINGS;
