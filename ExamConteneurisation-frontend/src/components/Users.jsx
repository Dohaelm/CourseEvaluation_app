import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import coursesService from "../services/coursesService"; // Import the service to fetch promotions
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [instructorCourses, setInstructorCourses] = useState({});
  const [promotions, setPromotions] = useState({}); // Store promotions by promotionId

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setAllUsers(response);
        setFilteredUsers(response);

        const instructorCourseMapping = {};
        await Promise.all(
          response
            .filter((user) => user.role === "TEACHER")
            .map(async (instructor) => {
              const courses = await userService.getCoursesByInstructorId(instructor.id);
              if (courses) {
                instructorCourseMapping[instructor.id] = courses.map((course) => course.title);
              }
            })
        );

        setInstructorCourses(instructorCourseMapping);

        // Fetch promotions
        const promotionMapping = {};
        await Promise.all(
          response.map(async (user) => {
            if (user.promotionId) {
              const promotion = await coursesService.getPromotionById(user.promotionId);
              if (promotion) {
                promotionMapping[user.promotionId] = promotion.name;
              }
            }
          })
        );
        setPromotions(promotionMapping);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.toLowerCase();
      const terms = query.split(" ");

      const filtered = allUsers.filter((user) => {
        return terms.every((term) => {
          return (
            user.firstName.toLowerCase().includes(term) ||
            user.lastName.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term) ||
            (user.promotionId && user.promotionId.toLowerCase().includes(term))
          );
        });
      });

      setFilteredUsers(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await userService.deleteUser(userId);
        setAllUsers(allUsers.filter((user) => user.id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      } catch (err) {
        console.error("Failed to delete user:", err);
        setError("Failed to delete user. Please try again later.");
      }
    }
  };

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <div><p>{error}</p></div>;

  return (
    <div>
      <h2>Bienvenue Admin</h2>
      <p>Voici l'ensemble des utilisateurs</p>
      <input
        type="text"
        placeholder="Search by name, promotion, role"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      {filteredUsers.length === 0 ? (
        <p>Aucun utilisateur disponible.</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </h3>
              <p>Role: {user.role}</p>
              {user.role === "STUDENT" && (
                <p>Promotion: {promotions[user.promotionId] || "Unknown"}</p> // Display the promotion name
              )}
              {user.role === "TEACHER" && (
                <div>
                  <p>Cours:</p>
                  {instructorCourses[user.id]?.length > 0 ? (
                    <ul>
                      {instructorCourses[user.id].map((courseTitle, index) => (
                        <li key={index}>{courseTitle}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun cours attribué.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
