
export const fetchAuthToken = () => {
    try {
     const serializedState = localStorage.getItem("auth_token");
     return serializedState;
    } catch (e) {
     console.log("LOCALSTORAGE ERR::",e);
     return undefined;
    }
   };

// export {FetchAuthToken};