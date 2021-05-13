import http from "../services/axios.service";

// Foods
const postFood = async ( food ) => {
  try {
    let result = http.post(`/foods/`, food)
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error("Bad response");
        }
        return res.data;
      })
    return result
  } catch (e) {
    console.error(e);
    return null
  }
};

const getFood = async ( id ) => {
  try {
    let result = http.get(`/foods/${id}`)
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error("Bad response");
        }
        return res.data;
      })
    return result
  } catch (e) {
    console.error(e);
    return null
  }
};

const putFood = async ( food ) => {
  try {
    let result = await http.put(`/foods/${food._id}`, food)
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error("Bad response");
        }
        return res.data;
      })
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}
const deleteFood = async ( id ) => {
  try {
    let result = await http.delete(`/foods/${id}`)
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error("Bad response");
        }
        return res.data;
      })
    return result
  } catch (e) {
    console.error(e);
    return null
  }
};

const getAllFoods = async () => {
  try {
    let result = await http.get(`/foods/`)
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error("Bad response");
        }
      //   // if (!res.headers.get("content-type").includes("application/json")) {
      //   //   throw new TypeError("Response not JSON");
      //   // }
      //   // console.log(res.data);
        return res.data;
      })
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

export default {
    postFood,
    getFood,
    putFood,
    deleteFood,
    getAllFoods,
}
