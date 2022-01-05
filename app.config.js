import "dotenv/config";

export default {
  name: "Fit Manager",
  version: "2.0.3",
  extra: {
    developmentMode: process.env.DEV === "true",
    baseURL: process.env.BASE_URL || "http://localhost:3000/",
  },
};
