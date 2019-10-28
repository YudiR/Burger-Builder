import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("store token when loged in", () => {
    expect(
      reducer(
        {
          idToken: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "someTokne- how we do?",
          userId: "user Id"
        }
      )
    ).toEqual({
        idToken: "someTokne- how we do?",
        userId: "user Id",
        error: null,
        loading: false,
        authRedirectPath: "/"
      })
  });
});
