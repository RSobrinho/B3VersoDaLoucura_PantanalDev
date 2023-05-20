export function getPage() {
  const url = window.location.href.toString().split("#");
  let pg = url[1] || "";
  pg = pg.split("?");
  pg = pg[0];
  let num = 0;

  switch (pg) {
    case "assessments":
      num = 1;
      break;
  }

  return num;
}

export function getQueryParams(url) {
  let params = url.split("?");
  let query = "{";

  params = params.length > 1 ? params[1] : null;

  if (params) {
    params = params.split("&");

    if (params.length > 0) {
      params.forEach((value, key) => {
        const keys = value.split("=");
        query += `"${keys[0]}":"${keys[1]}"`;
        query += key + 1 < params.length ? "," : "";
      });
    }
  }

  query += "}";
  return JSON.parse(query);
}
