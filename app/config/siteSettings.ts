export const siteSettings = {
  siteName: "BMTH",
  description: "Fill in this description",

  galleryLimts: {
    // We only want 3 cards on the home page
    homePageLimit: 3,
    // We want 5 cards on the gallery page
    initialLimit: 5,
    // We need an upper limit on the gallery page, the hasNext seems to always be false when fetching.
    loadMoreLimit: 80,
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
