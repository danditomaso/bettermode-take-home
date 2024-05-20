export const siteSettings = {
  siteName: "BMTH",
  description: "Fill in this description",

  limits: {
    // We only want 3 cards on the home page
    homePageLimit: 3,
    // We should paginate the gallery list page by 5 cards at a time, with all the cards appearing in a single list
    galleryPageLimit: 5,
  },
  links: [
    {
      label: "dashboard",
      url: "/",
    },
    {
      label: "gallery",
      url: "/gallery",
    },
  ],
};
