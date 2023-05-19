export function getPage() {
  const url = window.location.href.toString().split("#");
  const pg = url[1] || "";
  let num = 0;

  switch (pg) {
    case "assessments":
      num = 1;
      break;
  }

  return num;
}
