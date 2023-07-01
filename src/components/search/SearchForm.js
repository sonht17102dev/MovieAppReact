import React from "react";
import useInput from "../hook/useInput";
import "./SearchForm.css";
const isNotEmpty = (value) => value.trim() !== "";

const SearchForm = (props) => {
  const {
    value: searchValue,
    isValid: searchIsValid,
    hasError: searchHasError,
    valueChangeHandler: searchChangeHandler,
    inputBlurHandler: searchBlurHandler,
    reset: resetSearch,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (searchIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    props.onSaveData(searchValue);
    resetSearch();
  };

  return (
    <div className="container formSearch">
      <div className="row justity-content-center align-item-center ">
        <form className="col-12" onSubmit={submitHandler}>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control inputForm"
              placeholder="Enter your keyword"
              value={searchValue}
              onChange={searchChangeHandler}
              onBlur={searchBlurHandler}
            />
          </div>
          {searchHasError && (
            <div class="alert alert-danger errorMessage">
              Please enter your keyword!!
            </div>
          )}
          <div className="d-flex flex-row-reverse bd-highlight">
            <button
              class="btn btn-primary m-2 p-2 bd-highlight"
              disabled={!formIsValid}
            >
              Search
            </button>
            <button
              class="btn btn-secondary m-2 p-2 bd-highlight"
              onClick={resetSearch}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default React.memo(SearchForm);
