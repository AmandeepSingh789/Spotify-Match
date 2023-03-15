import { store } from "../redux/store";
// Importing Redux store
import {
  setName,
  setEmail,
  setGender,
  setLocation,
  setOrientation,
  setPronouns,
  setAnswer1,
  setAnswer2,
  setAnswer3,
  setQuestion1,
  setQuestion2,
  setQuestion3,
  setBirthdate,
  setBio,
  setSocials,
  setPicture1,
  setPicture2,
  setPicture3,
  setPicture4,
  setID,
  setUserToken,
} from "../redux/UserData";
import {
  updateUserData,
  updatePictures,
  getQuestions,
  questionBank,
} from "../redux/UserData";

describe("tests initial state", () => {
  it("should return null for name", () => {
    const state = store.getState().name;
    expect(state.name).toEqual(null);
  });
});

describe("tests initial state", () => {
  it("should return null for id", () => {
    const state = store.getState().id;
    expect(state.id).toEqual(null);
  });
});

describe("tests initial state", () => {
  it("should return null for bio", () => {
    const state = store.getState().bio;
    expect(state.bio).toEqual(null);
  });
});

describe("tests initial state", () => {
  it("should return null for location", () => {
    const state = store.getState().location;
    expect(state.location).toEqual(null);
  });
});

describe("tests initial state", () => {
  it("should return null for location", () => {
    const state = store.getState().location;
    expect(state.location).toEqual(null);
  });
});
describe("tests initial state", () => {
    it("should return null for name", () => {
      const state = store.getState().name;
      expect(state.name).toEqual(null);
    });
  });
  
  describe("tests initial state", () => {
    it("should return null for id", () => {
      const state = store.getState().id;
      expect(state.id).toEqual(null);
    });
  });
  
  describe("tests initial state", () => {
    it("should return null for bio", () => {
      const state = store.getState().bio;
      expect(state.bio).toEqual(null);
    });
  });
  
  describe("tests initial state", () => {
    it("should return null for location", () => {
      const state = store.getState().location;
      expect(state.location).toEqual(null);
    });
  });
  
  describe("tests initial state", () => {
    it("should return null for location", () => {
      const state = store.getState().location;
      expect(state.location).toEqual(null);
    });
  });

describe("sets name in the store", () => {

  beforeAll(() => {
    store.dispatch(setName("Amaan"));
  });

  it("should return Amaan for name", () => {
    const state = store.getState().name;
    expect(state.name).toEqual("Amaan");
  });
});

describe("sets bio in the store", () => {
  beforeAll(() => {
    store.dispatch(setBio("Bazinga"));
  });
  it("should return Bazinga for name", () => {
    const state = store.getState().bio;
    expect(state.bio).toEqual("Bazinga");
  });
});




