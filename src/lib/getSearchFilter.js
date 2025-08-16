export function getSearchFilter(searchQuery) {
  if (!searchQuery || searchQuery.trim() === "") return {};
  const filter = {};
  const parts = searchQuery.split("|");
  parts.forEach((part) => {
    const [key, ...rest] = part.split(":");
    if (!key || rest.length === 0) return;

    const value = rest.join(":");

    if (key === "scope") {
      {
        if (value.includes(",")) {
          const scopesArray = value.split(",").map((v) => Number(v.trim()));
          filter.scope = { $in: scopesArray };
          console.log("scoop array", scopesArray);
        } else {
          filter.scope = value;
          console.log(value);
        }
      }
    } else if (key === "sector") {
      const scopesArray = value.split(",").map((v) => v.trim());
      filter.sector =
        scopesArray.length > 1 ? { $in: scopesArray } : scopesArray[0];
    } else if (key === "targetyear") {
      const scopesArray = value.split(",").map((v) => v.trim());
      filter.targetyear =
        scopesArray.length > 1 ? { $in: scopesArray } : scopesArray[0];
    } else if (key === "country") {
      const scopesArray = value.split(",").map((v) => v.trim());
      filter.country =
        scopesArray.length > 1 ? { $in: scopesArray } : scopesArray[0];
    } else if (key == "searchterm") {
      filter.companyName = { $regex: value, $options: "i" };
    }
  });
  console.log("Final filter:", filter);

  return filter;
}
