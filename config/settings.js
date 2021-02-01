// Provide system variables for an app in a single object

const SETTINGS = {
    apiRoot: "https://app-back.tk:7000",
    token: () => typeof window !== "undefined" && localStorage.getItem("teamId") || "5ffdea931b0b224a68fd6a10",
}
export default SETTINGS;
