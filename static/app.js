const API_BASE = "http://127.0.0.1:5000";  // change when deployed

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      window.location.href = "/dashboard";
    } else {
      document.getElementById("errorMsg").innerText = data.msg || "Login failed.";
    }
  });
}

// Fetch employees
const employeeTable = document.getElementById("employeeTable");
if (employeeTable) {
  const token = localStorage.getItem("token");
  fetch(`${API_BASE}/employees`, {
    headers: {Authorization: `Bearer ${token}`}
  })
  .then(res => res.json())
  .then(data => {
    const tbody = employeeTable.querySelector("tbody");
    data.forEach((emp, i) => {
      const row = `<tr>
        <td>${i + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>${emp.department}</td>
        <td><button class='btn btn-danger btn-sm'>Delete</button></td>
      </tr>`;
      tbody.innerHTML += row;
    });
  });
}

// Add employee
const employeeForm = document.getElementById("employeeForm");
if (employeeForm) {
  employeeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("role", document.getElementById("role").value);
    formData.append("department", document.getElementById("department").value);
    formData.append("profile", document.getElementById("profile").files[0]);

    const res = await fetch(`${API_BASE}/employees`, {
      method: "POST",
      headers: {Authorization: `Bearer ${token}`},
      body: formData
    });

    if (res.ok) {
      alert("Employee added successfully!");
      window.location.href = "/dashboard";
    } else {
      alert("Failed to add employee.");
    }
  });
}

// Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}
