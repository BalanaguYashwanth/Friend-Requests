const user_pending_request = () => {
  return {
    type: "USER_PENDING_REQUEST",
  };
};

const user_pending_success = (data) => {
  return {
    type: "USER_PENDING_SUCCESS",
    payload: data,
  };
};

const user_pending_error = (error) => {
  return {
    type: "USER_PENDING_ERROR",
    payload: error,
  };
};

export {user_pending_request,user_pending_success,user_pending_error}