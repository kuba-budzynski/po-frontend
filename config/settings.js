// Provide system variables for an app in a single object
const SETTINGS = {
    apiRoot: process.env.NEXT_PUBLIC_API_ROOT,
    myRoot: process.env.NEXT_PUBLIC_MY_ROOT,
    token: () => typeof window !== "undefined" && localStorage.getItem("teamId") || "5ffdea931b0b224a68fd6a10",
}
export default SETTINGS;
