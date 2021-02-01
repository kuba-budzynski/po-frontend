// Provide system variables for an app in a single object

const SETTINGS = {
    apiRoot: "https://app-back.tk:7000",
    token: () => typeof window !== "undefined" && localStorage.getItem("teamId") || null,
}

export default SETTINGS;
