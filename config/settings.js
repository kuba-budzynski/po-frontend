// Provide system variables for an app in a single object

const SETTINGS = {
    apiRoot: "http://localhost:7000",
    myRoot: "http://localhost:3000",
    token: () => typeof window !== "undefined" && localStorage.getItem("teamId") || "5ffdea931b0b224a68fd6a10",
}
export default SETTINGS;
