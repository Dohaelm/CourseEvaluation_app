import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import coursesService from "../services/coursesService"; // Import the service to fetch promotions
import { useNavigate } from "react-router-dom";
import { Trash2, Plus } from "lucide-react"; // Import Plus icon
import "./Users.css";

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
    const Admin = userService.isAdmin();

    if (!Admin) {
      navigate('/');
    } else {
      fetchUsers();
    }
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
    <div className="users-container">
      <h2>Bienvenue Admin</h2>
      <p>Voici l'ensemble des utilisateurs</p>
      <div className="search-and-add">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, promotion, role"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <button
          className="add-user-button"
          onClick={() => navigate("/ajouter-utilisateur")}
        >
          <Plus className="w-6 h-6" /> {/* Display plus icon */}
        </button>
      </div>
      {filteredUsers.length === 0 ? (
        <p className="no-users-message">Aucun utilisateur disponible.</p>
      ) : (
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <div className="user-info">
                <h3>
                  {user.firstName} {user.lastName}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="w-6 h-6" /> {/* Display trash icon */}
                  </button>
                </h3>
                <p className="user-role">Role: {user.role}</p>
                {user.role === "STUDENT" && (
                  <p>Promotion: {promotions[user.promotionId] || "Unknown"}</p> // Display the promotion name
                )}
                {user.role === "TEACHER" && (
                  <div>
                    <p>Cours:</p>
                    {instructorCourses[user.id]?.length > 0 ? (
                      <ul className="courses-list">
                        {instructorCourses[user.id].map((courseTitle, index) => (
                          <li key={index}>{courseTitle}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Aucun cours attribué.</p>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
