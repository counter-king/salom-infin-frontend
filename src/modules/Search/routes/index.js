const Search = [
  {
    path: "/search",
    name: "SearchIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/index.vue"),
  }
]
export default Search
