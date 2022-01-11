const API_URL = "http://api.test/api";

const updateToken = async () => {
  console.log("Access token expired, requesting new one");

  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: user.refreshToken
    })
  };

  try {
    const response = await fetch(API_URL + '/refresh', options);
    const json = await response.text();
    const data = JSON.parse(json);

    if (response.ok) {
      localStorage.removeItem("user");
      console.log("Got new access token and refresh token");
      localStorage.setItem("user", JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
  }
}

// const getTasks = async (setTasks) => {
//   const options = {
//     headers: {
//       'Authorization': getJWT()
//     }
//   };

//   try {
//     const response = await fetch(API_URL + '/tasks', options);
//     if (response.ok) {
//       const json = await response.text();
//       const data = JSON.parse(json);
//       setTasks(data);
//     } else {
//       updateToken();
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// const addTask = async newTask => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Authorization': getJWT()
//     },
//     body: JSON.stringify(newTask)
//   };

//   try {
//     const response = await fetch(API_URL + '/tasks', options);
//     if (!response.ok) {
//       updateToken();
//     }
//     getTasks();
//   } catch (error) {
//     console.log(error)
//   }

// }

// const editTask = async task => {
//   const options = {
//     method: 'PATCH',
//     headers: {
//       'Authorization': getJWT()
//     },
//     body: JSON.stringify(task)
//   };

//   try {
//     const response = await fetch(API_URL + `/tasks/${task.id}/`, options);
//     if (!response.ok) {
//       updateToken();
//     }
//     getTasks();
//   } catch (error) {
//     console.log(error)
//   }
// }

// const deleteTask = async id => {
//   const options = {
//     method: 'DELETE',
//     headers: {
//       'Authorization': getJWT()
//     }
//   };
//   try {
//     const response = await fetch(API_URL + `/tasks/${id}/`, options);
//     if (!response.ok) {
//       updateToken();
//     }
//     getTasks();
//   } catch (error) {
//     console.log(error)
//   }
// }

const taskService = {
  updateToken,
  // editTask,
  // deleteTask,
  // addTask
};


export default taskService;
