import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

function getEventType(title=null, type=null, date=null, price=null) {
  // Defining query parameters

  // Date parameters
  const dateMin = date !== null && date.min !== null ? date.min : null;
  const dateMax = date !== null && date.max !== null ? date.max : null;

  // Price parameters
  const priceMin = price !== null && price.min !== null ? price.min : null;
  const priceMax = price !== null && price.max !== null ? price.max : null;

  // Type parameters
  const academic = type !== null && type.academic ? "true" : "false";
  const music = type !== null && type.music ? "true" : "false";
  const theater = type !== null && type.theater ? "true" : "false";
  const others = type !== null && type.others ? "true" : "false";

  // Querying @ server
  const endpoint = encodeURI(
    `/eventsType?title=${title}&`+
    `academic=${academic}&`+
    `music=${music}&`+
    `theater=${theater}&`+
    `others=${others}&`+
    `dateMin=${dateMin}&`+
    `dateMax=${dateMax}&`+
    `priceMin=${priceMin}&`+
    `priceMax=${priceMax}`);

  return axios.get(endpoint).then(res => res.data);
}

function insertUser(email, name=null, searchStr=null, type=null, price=null){
  var params = {};

  params["email"] = email;
  if(name)
    params["name"] = name;
  if(searchStr)
    params["searchStr"] = searchStr;
  if(type && type.academic)
    params["academic"] = type.academic;
  if(type && type.music)
    params["music"] = type.music;
  if(type && type.theater)
    params["theater"] = type.theater;
  if(type && type.others)
    params["others"] = type.others;
  if(price && price.min)
    params["pmin"] = price.min;
  if(price && price.max)
    params["pmax"] = price.max;

  return axios({
    method: "get",
    url: "/insertUser",
    params: params
  });
}

export { getEventType, insertUser };