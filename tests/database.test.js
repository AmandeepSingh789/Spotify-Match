import axios from "axios";
import { store } from "../redux/store";

async function getData(id) {
  const response =  await axios.get('http://spotify-match.us-west-1.elasticbeanstalk.com/users/' + id)
  store.dispatch(setName(response.data.name));
}

describe("tests getting user data", () => {
  beforeAll(() => {
    getData(0)
  })
  

  it("should return Jerry for name", () => {
    const state = store.getState().name;
    expect(state.name).toEqual(null);
  });
});