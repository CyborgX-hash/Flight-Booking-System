import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        username: "",
        city: "",
        state: "",
        pincode: "",
        profilePhoto: "",
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const res = await api.get("/auth/profile");
            const userData = res.data;

            setUser({
                name: userData.name || "",
                email: userData.email || "",
                username: userData.username || userData.email?.split("@")[0] || "",
                city: userData.city || "",
                state: userData.state || "",
                pincode: userData.pincode || "",
                profilePhoto: userData.profilePhoto || "",
            });

            if (userData.profilePhoto) {
                setPhotoPreview(userData.profilePhoto);
            }

            setLoading(false);
        } catch (err) {
            console.error("Profile fetch error:", err);
            setError("Could not load profile. Please try again.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("Image size should be less than 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setPhotoFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("username", user.username);
            formData.append("city", user.city);
            formData.append("state", user.state);
            formData.append("pincode", user.pincode);

            if (photoFile) {
                formData.append("profilePhoto", photoFile);
            }

            await api.put("/auth/profile", formData);

            setSuccess("Profile updated successfully!");
            setIsEditing(false);
            setPhotoFile(null);
            setTimeout(() => setSuccess(""), 3000);

            fetchUserProfile();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        }
    };

    const getInitials = () => {
        return user.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : "U";
    };

    const removePhoto = () => {
        setPhotoPreview(null);
        setPhotoFile(null);
        setUser({ ...user, profilePhoto: "" });
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="profile-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-layout">
                {/* Sidebar Section */}
                <div className="profile-sidebar">
                    <div className="profile-avatar-wrapper">
                        {photoPreview ? (
                            <img src={photoPreview} alt="Profile" className="profile-avatar-image" />
                        ) : (
                            <div className="profile-avatar">
                                <span>{getInitials()}</span>
                            </div>
                        )}
                        {isEditing && (
                            <div className="profile-avatar-edit">
                                <label htmlFor="photo-upload" className="photo-upload-label">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                        <circle cx="12" cy="13" r="4"></circle>
                                    </svg>
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    style={{ display: "none" }}
                                />
                                {photoPreview && (
                                    <button
                                        type="button"
                                        className="photo-remove-btn"
                                        onClick={removePhoto}
                                        title="Remove photo"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <h2 className="profile-name">{user.name || "User"}</h2>
                    <p className="profile-email">{user.email}</p>
                    <p className="profile-username">@{user.username || "username"}</p>

                    {!isEditing && (
                        <button
                            className="profile-edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Main Content Section */}
                <div className="profile-main">
                    <h3 className="profile-section-title">Profile Information</h3>

                    {error && <div className="profile-error">{error}</div>}
                    {success && <div className="profile-success">{success}</div>}

                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="profile-form-row">
                            <div className="profile-form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="profile-form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className="profile-form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                disabled={true}
                            />
                        </div>

                        <div className="profile-form-row">
                            <div className="profile-form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={user.city}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="profile-form-group">
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={user.state}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className="profile-form-group">
                            <label>Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={user.pincode}
                                onChange={handleChange}
                                disabled={!isEditing}
                                maxLength="6"
                                placeholder="Enter 6-digit pincode"
                            />
                        </div>

                        {isEditing && (
                            <div className="profile-form-actions">
                                <button
                                    type="button"
                                    className="profile-cancel-btn"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setPhotoFile(null);
                                        fetchUserProfile();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="profile-save-btn">
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
